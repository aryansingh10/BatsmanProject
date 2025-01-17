import pool from '../database/db';
import {
    batsmanDataArgs,
    batsmanStatsArgs,
    batsmanupdateDataArgs
} from '../interfaces/interfaces';
import { batsManSchema } from '../utils/batsmanSchema';
import { statsSchema } from '../utils/statsschema';
export const userModel = {
    fetchAllRetiredBatsmanInfo: async () => {
        try {
            const [rows]: any = await pool.query(`
            select * from batsmanData where isRetiered=1 `);
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error in fetchAllRetiredBatsmanInfo:', error);
            throw new Error('Failed to fetch retired batsman data with stats.');
        }
    },

    fetchBatsmanById: async (id: number) => {
        try {
            const [rows]: any = await pool.query(
                `SELECT * from batsmanData where id =?`,
                [id]
            );

            if (!rows[0]) {
                throw new Error(` Cannot find batsman with this id ${id}`);
            }
            return rows[0];
        } catch (error) {
            console.error('Error in fetchBatsmanById:', error);
            throw new Error('Failed to fetch batsman data with stats.');
        }
    },

    fetchAverageOfABatsman: async (id: number) => {
        try {
            const [rows]: any = await pool.query(
                `Select runs/notout as average from batsmanStats where batsman_id = ?`,
                id
            );
            console.log(typeof rows);
            console.log(rows);

            if (!rows[0]) {
                throw new Error(` Cannot find batsman with this id ${id}`);
            }
            return rows[0].average;
        } catch (error) {
            console.error('Error in fetchAverageOfABatsman:', error);
            throw new Error('Failed to fetch batsman average data.');
        }
    },

    fetchAllBatsman: async () => {
        try {
            const [rows]: any = await pool.query(`select * from batsmanData`);
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error in fetchAllBatsman:', error);
            throw new Error('Failed to fetch all batsman data with stats.');
        }
    },

    addBatsmanData: async (input: batsmanDataArgs) => {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const [result]: any = await pool.query(
                'INSERT INTO batsmanData (firstName, lastName, isRetiered, age) VALUES (?, ?, ?, ?)',
                [firstName, lastName, isRetired, age]
            );
            console.log(result);

            return 'Player Added Successfully';
        } catch (error) {
            console.error('Error in addBatsmanData:', error);
            throw new Error('Failed to add batsman data.');
        }
    },

    addBatsmanStats: async (input: batsmanStatsArgs) => {
        try {
            const {
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });

            const [batsmanRows]: any = await pool.query(
                'SELECT * FROM batsmanData WHERE id = ?',
                [batsman_id]
            );

            if (batsmanRows.length === 0) {
                throw new Error('Batsman not found.');
            }
            const query = `
        INSERT INTO batsmanStats (batsman_id, runs, highestScore,strikeRate, hundreds, fiftys, notOut) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
            const values = [
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            ];
            const [result]: any = await pool.query(query, values);

            if (result.affectedRows === 0) {
                throw new Error('Failed to insert batsman stats.');
            }

            const [statsRows]: any = await pool.query(
                'SELECT * FROM batsmanStats WHERE batsman_id = ?',
                [batsman_id]
            );

            if (statsRows.length === 0) {
                throw new Error(
                    'Failed to fetch batsman stats after insertion.'
                );
            }

            return statsRows[0];
        } catch (error) {
            console.error('Error in addBatsmanStats:', error);
            throw new Error('Failed to add batsman stats.');
        }
    },

    updatePlayerInfo: async (input: batsmanupdateDataArgs) => {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsManSchema.parse({ firstName, lastName, isRetired, age });

            const [batsman]: any = await pool.query(
                'SELECT * FROM batsmanData WHERE id = ?',
                [id]
            );

            if (batsman.length === 0) {
                throw new Error('Batsman not found.');
            }

            const query = `
            UPDATE batsmanData 
            SET firstName = ?, lastName = ?, isRetiered = ?, age = ? 
            WHERE id = ?
          `;
            const values = [firstName, lastName, isRetired, age, id];

            const result: any = await pool.query(query, values);

            if (result.affectedRows === 0) {
                throw new Error(
                    'No rows updated. Please check if the data has changed.'
                );
            }
            return 'Player Info Updated Successfully';
        } catch (error) {
            console.error('Error in updatePlayerInfo:', error);
            throw new Error('Failed to update player information.');
        }
    },

    updateStats: async (input: batsmanStatsArgs) => {
        try {
            const {
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            } = input;
            statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });
            const [batsman]: any = await pool.query(
                'SELECT * FROM batsmanStats WHERE batsman_id = ?',
                [batsman_id]
            );

            if (batsman.length === 0) {
                throw new Error('Batsman not found.');
            }

            const query = `
              UPDATE batsmanStats
              SET runs = ?, highestScore = ?, strikeRate = ?, hundreds =?, fiftys = ?,notOut=? 
              WHERE batsman_id = ?
            `;
            const values = [
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut,
                batsman_id
            ];

            const result: any = await pool.query(query, values);

            if (result.affectedRows === 0) {
                throw new Error(
                    'No rows updated. Please check if the data has changed.'
                );
            }

            return 'Stats Updated Successfully';
        } catch (error) {
            console.error('Error in updatePlayerInfo:', error);
            throw new Error('Failed to update player information');
        }
    },

    softDelete: async (id: number) => {
        try {
            const [rows]: any = await pool.query(
                `Select * from batsmanData where id = ?`,
                [id]
            );
            console.log(rows);
            const batsman = rows[0];

            if (!batsman) {
                throw new Error('Batsman Not found');
            }
            if (batsman.is_deleted) {
                throw new Error(`Batsman With this id ${id} alreeady deleted`);
            }

            const [result]: any = await pool.query(
                `Update batsmanData set is_deleted=true where is_deleted=false AND id=? `,
                id
            );
            console.log(result);

            return 'Soft deleted succesfully';
        } catch (error) {
            console.log(error);
            throw new Error('Batsman Not Deleted');
        }
    },

    hardDelete: async (id: number) => {
        try {
            const [deletedBatsman]: any = await pool.query(
                `delete from batsmanData where id = ?`,
                id
            );
            console.log(deletedBatsman);

            return 'Batsman Deleted Successfullly';
        } catch (err) {
            console.log(err);
            throw new Error('Not deleted successfully');
        }
    }
};
