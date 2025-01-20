"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batsmanModel = void 0;
const db_1 = __importDefault(require("../database/db"));
const batsman_schema_1 = require("../inputValidation/batsman.schema");
const stats_schema_1 = require("../inputValidation/stats.schema");
const errors_1 = require("../errorhandling/errors");
exports.batsmanModel = {
    fetchAllRetiredBatsmanInfo: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`
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
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch retired batsman data with stats'));
        }
    }),
    fetchBatsmanById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT * from batsmanData where id =?`, [id]);
            if (!rows[0]) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
            return rows[0];
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch batsman data with stats'));
        }
    }),
    fetchAverageOfABatsman: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT runs / notout AS average from batsmanStats where batsman_id = ?`, [id]);
            if (!rows[0]) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
            return rows[0].average;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch batsman average data'));
        }
    }),
    fetchAllBatsman: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT * FROM batsmanData`);
            return rows;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch all batsman data with stats'));
        }
    }),
    addBatsmanData: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsman_schema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const [result] = yield db_1.default.query('INSERT INTO batsmanData (firstName, lastName, isRetiered, age) VALUES (?, ?, ?, ?)', [
                firstName,
                lastName,
                isRetired,
                age
            ]);
            if (result.affectedRows === 0) {
                throw new Error(errors_1.ErrorMessages.INSERTION_FAILED('batsman data'));
            }
            return 'Player Added Successfully';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.INSERTION_FAILED('batsman data'));
        }
    }),
    addBatsmanStats: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            stats_schema_1.statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });
            const [batsmanRows] = yield db_1.default.query('SELECT * FROM batsmanData WHERE id = ?', [batsman_id]);
            if (batsmanRows.length === 0) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', batsman_id));
            }
            const query = `
                INSERT INTO batsmanStats (batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut];
            const [result] = yield db_1.default.query(query, values);
            if (result.affectedRows === 0) {
                throw new Error(errors_1.ErrorMessages.INSERTION_FAILED('batsman stats'));
            }
            return 'Batsman Stats Added';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.INSERTION_FAILED('batsman stats'));
        }
    }),
    updatePlayerInfo: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsman_schema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const [batsman] = yield db_1.default.query('SELECT * FROM batsmanData where id =? ', [id]);
            if (batsman.length === 0) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
            const query = `
                UPDATE batsmanData 
                SET firstName = ?, lastName = ?, isRetiered = ?, age = ? 
                WHERE id = ?
            `;
            const values = [firstName, lastName, isRetired, age, id];
            const [result] = yield db_1.default.query(query, values);
            if (result.changedRows === 0) {
                return new Error(errors_1.ErrorMessages.NO_DATA_UPDATED);
            }
            return 'Player Info Updated Successfully';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.UPDATE_FAILED('player info'));
        }
    }),
    updateStats: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            stats_schema_1.statsSchema.parse({
                batsman_id,
                runs,
                highestScore,
                strikeRate,
                hundreds,
                fiftys,
                notOut
            });
            const [batsman] = yield db_1.default.query('SELECT * FROM batsmanStats WHERE batsman_id = ?', [batsman_id]);
            if (batsman.length === 0) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman stats', batsman_id));
            }
            const query = `
                UPDATE batsmanStats
                SET runs = ?, highestScore = ?, strikeRate = ?, hundreds = ?, fiftys = ?, notOut = ? 
                WHERE batsman_id = ?
            `;
            const values = [runs, highestScore, strikeRate, hundreds, fiftys, notOut, batsman_id];
            const result = yield db_1.default.query(query, values);
            if (result.affectedRows === 0) {
                return new Error(errors_1.ErrorMessages.NO_DATA_UPDATED);
            }
            return 'Stats Updated Successfully';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.UPDATE_FAILED('player stats'));
        }
    }),
    softDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT * FROM batsmanData WHERE id = ?`, [id]);
            const batsman = rows[0];
            if (!batsman) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
            if (batsman.is_deleted) {
                return new Error(errors_1.ErrorMessages.ALREADY_DELETED('Batsman', id));
            }
            const [result] = yield db_1.default.query(`UPDATE batsmanData SET is_deleted = true WHERE is_deleted = false AND id = ?`, [id]);
            if (result.affectedRows === 0) {
                return new Error(errors_1.ErrorMessages.SOFT_DELETE_FAILED);
            }
            return 'Soft Deleted Successfully';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.SOFT_DELETE_FAILED);
        }
    }),
    hardDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT * FROM batsmanData WHERE id = ?`, [id]);
            const batsman = rows[0];
            if (!batsman) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
            const [deletedBatsman] = yield db_1.default.query(`DELETE FROM batsmanData WHERE id = ?`, [id]);
            if (deletedBatsman.afffectedRows === 0) {
                return new Error(errors_1.ErrorMessages.HARD_DELETE_FAILED);
            }
            return 'Batsman Deleted Successfully';
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.HARD_DELETE_FAILED);
        }
    })
};
