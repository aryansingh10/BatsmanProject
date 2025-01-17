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
exports.userModel = void 0;
const db_1 = __importDefault(require("../database/db"));
const batsmanSchema_1 = require("../utils/batsmanSchema");
const statsschema_1 = require("../utils/statsschema");
exports.userModel = {
    fetchAllRetiredBatsmanInfo: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`
            select * from batsmanData where isRetiered=1 `);
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.error('Error in fetchAllRetiredBatsmanInfo:', error);
            throw new Error('Failed to fetch retired batsman data with stats.');
        }
    }),
    fetchBatsmanById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`SELECT * from batsmanData where id =?`, [id]);
            if (!rows[0]) {
                throw new Error(` Cannot find batsman with this id ${id}`);
            }
            return rows[0];
        }
        catch (error) {
            console.error('Error in fetchBatsmanById:', error);
            throw new Error('Failed to fetch batsman data with stats.');
        }
    }),
    fetchAverageOfABatsman: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`Select runs/notout as average from batsmanStats where batsman_id = ?`, id);
            console.log(typeof rows);
            console.log(rows);
            if (!rows[0]) {
                throw new Error(` Cannot find batsman with this id ${id}`);
            }
            return rows[0].average;
        }
        catch (error) {
            console.error('Error in fetchAverageOfABatsman:', error);
            throw new Error('Failed to fetch batsman average data.');
        }
    }),
    fetchAllBatsman: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`select * from batsmanData`);
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.error('Error in fetchAllBatsman:', error);
            throw new Error('Failed to fetch all batsman data with stats.');
        }
    }),
    addBatsmanData: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsmanSchema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const [result] = yield db_1.default.query('INSERT INTO batsmanData (firstName, lastName, isRetiered, age) VALUES (?, ?, ?, ?)', [firstName, lastName, isRetired, age]);
            console.log(result);
            return 'Player Added Successfully';
        }
        catch (error) {
            console.error('Error in addBatsmanData:', error);
            throw new Error('Failed to add batsman data.');
        }
    }),
    addBatsmanStats: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsschema_1.statsSchema.parse({
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
            const [result] = yield db_1.default.query(query, values);
            if (result.affectedRows === 0) {
                throw new Error('Failed to insert batsman stats.');
            }
            const [statsRows] = yield db_1.default.query('SELECT * FROM batsmanStats WHERE batsman_id = ?', [batsman_id]);
            if (statsRows.length === 0) {
                throw new Error('Failed to fetch batsman stats after insertion.');
            }
            return statsRows[0];
        }
        catch (error) {
            console.error('Error in addBatsmanStats:', error);
            throw new Error('Failed to add batsman stats.');
        }
    }),
    updatePlayerInfo: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsmanSchema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const [batsman] = yield db_1.default.query('SELECT * FROM batsmanData WHERE id = ?', [id]);
            if (batsman.length === 0) {
                throw new Error('Batsman not found.');
            }
            const query = `
            UPDATE batsmanData 
            SET firstName = ?, lastName = ?, isRetiered = ?, age = ? 
            WHERE id = ?
          `;
            const values = [firstName, lastName, isRetired, age, id];
            const result = yield db_1.default.query(query, values);
            if (result.affectedRows === 0) {
                throw new Error('No rows updated. Please check if the data has changed.');
            }
            return 'Player Info Updated Successfully';
        }
        catch (error) {
            console.error('Error in updatePlayerInfo:', error);
            throw new Error('Failed to update player information.');
        }
    }),
    updateStats: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut } = input;
            statsschema_1.statsSchema.parse({
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
            const result = yield db_1.default.query(query, values);
            if (result.affectedRows === 0) {
                throw new Error('No rows updated. Please check if the data has changed.');
            }
            return 'Stats Updated Successfully';
        }
        catch (error) {
            console.error('Error in updatePlayerInfo:', error);
            throw new Error('Failed to update player information');
        }
    }),
    softDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query(`Select * from batsmanData where id = ?`, [id]);
            console.log(rows);
            const batsman = rows[0];
            if (!batsman) {
                throw new Error('Batsman Not found');
            }
            if (batsman.is_deleted) {
                throw new Error(`Batsman With this id ${id} alreeady deleted`);
            }
            const [result] = yield db_1.default.query(`Update batsmanData set is_deleted=true where is_deleted=false AND id=? `, id);
            console.log(result);
            return 'Soft deleted succesfully';
        }
        catch (error) {
            console.log(error);
            throw new Error('Batsman Not Deleted');
        }
    }),
    hardDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [deletedBatsman] = yield db_1.default.query(`delete from batsmanData where id = ?`, id);
            console.log(deletedBatsman);
            return 'Batsman Deleted Successfullly';
        }
        catch (err) {
            console.log(err);
            throw new Error('Not deleted successfully');
        }
    })
};
