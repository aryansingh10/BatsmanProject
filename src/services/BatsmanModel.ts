import pool from '../database/db';
import { batsmanDataArgs, batsmanStatsArgs, batsmanupdateDataArgs } from '../interfaces/interfaces';
import { batsManSchema } from '../inputValidation/batsman.schema';
import { statsSchema } from '../inputValidation/stats.schema';
import { ErrorMessages } from '../errorhandling/errors';

export const batsmanModel = {
    fetchAllRetiredBatsmanInfo: async () => {
        try {
            const [rows]: any = await pool.query(`
                SELECT bd.*,
    JSON_OBJECT(
        'batsman_id', bs.batsman_id,
        'runs', bs.runs,
        'highestScore', bs.highestScore,
        'average', bs.average,
        'strikeRate', bs.strikeRate,
        'hundreds', bs.hundreds,
        'fiftys', bs.fiftys,
        'notOut', bs.notOut
    ) AS stats
FROM batsmanData AS bd
LEFT JOIN batsmanStats AS bs 
ON bd.id = bs.batsman_id
WHERE bd.isRetiered = 1;

            `);
            console.log(rows);

            // const mappedRows = rows.map((row: any) => ({
            //     id: row.batsman_id,
            //     firstName: row.firstName,
            //     lastName: row.lastName,
            //     age: row.age,
            //     isRetired: row.isRetiered,
            //     is_deleted: row.is_deleted,
            //     stats: row.runs !== null
            //         ? {
            //               batsman_id: row.batsman_id,
            //               runs: row.runs,
            //               highestScore: row.highestScore,
            //               average: row.runs / (row.notOut || 1),
            //               strikeRate: row.strikeRate,
            //               hundreds: row.hundreds,
            //               fiftys: row.fiftys,
            //               notOut: row.notOut
            //           }
            //         : null
            // }));

            // console.log('Mapped rows:', mappedRows);

            return rows;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch retired batsman data with stats'));
        }
    },

    fetchBatsmanById: async (id: number) => {
        try {
            const [rows]: any = await pool.query(`SELECT * from batsmanData where id =?`, [id]);

            if (!rows[0]) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', id));
            }
            return rows[0];
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch batsman data with stats'));
        }
    },

    fetchAverageOfABatsman: async (id: number) => {
        try {
            const [rows]: any = await pool.query(`SELECT runs / notout AS average from batsmanStats where batsman_id = ?`, [id]);
            if (!rows[0]) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', id));
            }
            return rows[0].average;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch batsman average data'));
        }
    },

    fetchAllBatsman: async () => {
        try {
            const [rows]: any = await pool.query(`SELECT * FROM batsmanData`);
            return rows;
        } catch {
            throw new Error(ErrorMessages.DATABASE_ERROR('fetch all batsman data with stats'));
        }
    },

    addBatsmanData: async (input: batsmanDataArgs) => {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const [result]: any = await pool.query('INSERT INTO batsmanData (firstName, lastName, isRetiered, age) VALUES (?, ?, ?, ?)', [
                firstName,
                lastName,
                isRetired,
                age
            ]);

            if (result.affectedRows === 0) {
                throw new Error(ErrorMessages.INSERTION_FAILED('batsman data'));
            }

            return 'Player Added Successfully';
        } catch {
            throw new Error(ErrorMessages.INSERTION_FAILED('batsman data'));
        }
    },

    addBatsmanStats: async (input: batsmanStatsArgs) => {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });

            const [batsmanRows]: any = await pool.query('SELECT * FROM batsmanData WHERE id = ?', [batsman_id]);

            if (batsmanRows.length === 0) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', batsman_id));
            }

            const query = `
                INSERT INTO batsmanStats (batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut];
            const [result]: any = await pool.query(query, values);

            if (result.affectedRows === 0) {
                throw new Error(ErrorMessages.INSERTION_FAILED('batsman stats'));
            }

            return 'Batsman Stats Added';
        } catch {
            throw new Error(ErrorMessages.INSERTION_FAILED('batsman stats'));
        }
    },

    updatePlayerInfo: async (input: batsmanupdateDataArgs) => {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const [batsman]: any = await pool.query('SELECT * FROM batsmanData where id =? ', [id]);

            if (batsman.length === 0) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', id));
            }

            const query = `
                UPDATE batsmanData 
                SET firstName = ?, lastName = ?, isRetiered = ?, age = ? 
                WHERE id = ?
            `;
            const values = [firstName, lastName, isRetired, age, id];

            const [result]: any = await pool.query(query, values);

            if (result.changedRows === 0) {
                return new Error(ErrorMessages.NO_DATA_UPDATED);
            }

            return 'Player Info Updated Successfully';
        } catch {
            throw new Error(ErrorMessages.UPDATE_FAILED('player info'));
        }
    },

    updateStats: async (input: batsmanStatsArgs) => {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });

            const [batsman]: any = await pool.query('SELECT * FROM batsmanStats WHERE batsman_id = ?', [batsman_id]);

            if (batsman.length === 0) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman stats', batsman_id));
            }

            const query = `
                UPDATE batsmanStats
                SET runs = ?, highestScore = ?, strikeRate = ?, hundreds = ?, fiftys = ?, notOut = ? 
                WHERE batsman_id = ?
            `;
            const values = [runs, highestScore, strikeRate, hundreds, fiftys, notOut, batsman_id];

            const result: any = await pool.query(query, values);

            if (result.affectedRows === 0) {
                return new Error(ErrorMessages.NO_DATA_UPDATED);
            }

            return 'Stats Updated Successfully';
        } catch {
            throw new Error(ErrorMessages.UPDATE_FAILED('player stats'));
        }
    },

    softDelete: async (id: number) => {
        try {
            const [rows]: any = await pool.query(`SELECT * FROM batsmanData WHERE id = ?`, [id]);

            const batsman = rows[0];

            if (!batsman) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', id));
            }
            if (batsman.is_deleted) {
                return new Error(ErrorMessages.ALREADY_DELETED('Batsman', id));
            }

            const [result]: any = await pool.query(`UPDATE batsmanData SET is_deleted = true WHERE is_deleted = false AND id = ?`, [id]);

            if (result.affectedRows === 0) {
                return new Error(ErrorMessages.SOFT_DELETE_FAILED);
            }

            return 'Soft Deleted Successfully';
        } catch {
            throw new Error(ErrorMessages.SOFT_DELETE_FAILED);
        }
    },

    hardDelete: async (id: number) => {
        try {
            const [rows]: any = await pool.query(`SELECT * FROM batsmanData WHERE id = ?`, [id]);

            const batsman = rows[0];

            if (!batsman) {
                return new Error(ErrorMessages.NOT_FOUND('Batsman', id));
            }

            const [deletedBatsman]: any = await pool.query(`DELETE FROM batsmanData WHERE id = ?`, [id]);

            if (deletedBatsman.afffectedRows === 0) {
                return new Error(ErrorMessages.HARD_DELETE_FAILED);
            }
            return 'Batsman Deleted Successfully';
        } catch {
            throw new Error(ErrorMessages.HARD_DELETE_FAILED);
        }
    }
};
