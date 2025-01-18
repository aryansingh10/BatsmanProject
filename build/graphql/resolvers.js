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
exports.resolvers = void 0;
const db_1 = __importDefault(require("../database/db"));
const BatsmanModel_1 = require("../services/BatsmanModel");
exports.resolvers = {
    //  BatsmanData: {
    //      stats: async (batsman: Batsman): Promise<BatsmanStats | null> => {
    //          try {
    //              const [rows]: any = await pool.query(
    //                  `
    //         SELECT * FROM batsmanStats WHERE batsman_id = ?;
    //       `,
    //                  [batsman.id]
    //              );
    //              return rows.length > 0 ? rows[0] : null;
    //          } catch {
    //              throw new Error('Failed to fetch batsman stats.');
    //          }
    //      }
    //  },
    BatsmanStats: {
        batInfo: (batsman) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query(`SELECT * FROM batsmanData WHERE id= ?`, [batsman.batsman_id]);
                return rows.length > 0 ? rows[0] : null;
            }
            catch (_a) {
                throw new Error(`Failed to fetch batsman stats.`);
            }
        })
    },
    Query: {
        fetchAllRetiredBatsmanInfo: () => __awaiter(void 0, void 0, void 0, function* () { return yield BatsmanModel_1.batsmanModel.fetchAllRetiredBatsmanInfo(); }),
        fetchBatsmanById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.fetchBatsmanById(id); }),
        fetchAverageOfABatsman: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.fetchAverageOfABatsman(id); }),
        fetchAllBatsman: () => __awaiter(void 0, void 0, void 0, function* () { return yield BatsmanModel_1.batsmanModel.fetchAllBatsman(); })
    },
    Mutation: {
        addBatsmanData: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            return yield BatsmanModel_1.batsmanModel.addBatsmanData(input);
        }),
        addBatsmanStats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            return yield BatsmanModel_1.batsmanModel.addBatsmanStats(input);
        }),
        updatePlayerInfo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            return yield BatsmanModel_1.batsmanModel.updatePlayerInfo(input);
        }),
        updateStats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            return yield BatsmanModel_1.batsmanModel.updateStats(input);
        }),
        softDelete: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.softDelete(id); }),
        hardDelete: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.hardDelete(id); })
    }
};
