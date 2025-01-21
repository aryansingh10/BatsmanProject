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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const BatsmanModel_1 = require("../services/BatsmanModel");
const scalar_1 = require("./scalar/scalar");
exports.resolvers = {
    Date: scalar_1.dateScalar,
    Query: {
        fetchAllRetiredBatsmanInfo: () => __awaiter(void 0, void 0, void 0, function* () { return yield BatsmanModel_1.batsmanModel.fetchAllRetiredBatsmanInfo(); }),
        fetchBatsmanById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.fetchBatsmanById(id); }),
        fetchAverageOfABatsman: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.fetchAverageOfABatsman(id); }),
        fetchAllBatsman: () => __awaiter(void 0, void 0, void 0, function* () { return yield BatsmanModel_1.batsmanModel.fetchAllBatsman(); })
    },
    Mutation: {
        addBatsmanData: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) { return yield BatsmanModel_1.batsmanModel.addBatsmanData(input); }),
        addBatsmanStats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) { return yield BatsmanModel_1.batsmanModel.addBatsmanStats(input); }),
        updatePlayerInfo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) { return yield BatsmanModel_1.batsmanModel.updatePlayerInfo(input); }),
        updateStats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) { return yield BatsmanModel_1.batsmanModel.updateStats(input); }),
        softDelete: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.softDelete(id); }),
        hardDelete: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield BatsmanModel_1.batsmanModel.hardDelete(id); })
    }
};
