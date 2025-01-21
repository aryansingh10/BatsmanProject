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
const batsman_schema_1 = require("../inputValidation/batsman.schema");
const stats_schema_1 = require("../inputValidation/stats.schema");
const errors_1 = require("../errorhandling/errors");
const batsmanData_1 = __importDefault(require("../database/models/batsmanData"));
const batsmanStats_1 = __importDefault(require("../database/models/batsmanStats"));
exports.batsmanModel = {
    fetchAllRetiredBatsmanInfo: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batsmen = yield batsmanData_1.default.findAll({
                where: { isRetired: true },
                include: {
                    model: batsmanStats_1.default,
                    as: 'stats',
                    required: true // INNER JOIN IF FALSE IT WILL PERFORM  LEFT OUTERJOIN
                }
            });
            return batsmen;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch retired batsman data with stats'));
        }
    }),
    fetchBatsmanById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batsman = yield batsmanData_1.default.findByPk(id);
            if (!batsman) {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('batsman', id));
            }
            return batsman;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch batsman data with stats'));
        }
    }),
    fetchAverageOfABatsman: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batsman = yield batsmanStats_1.default.findOne({ where: { batsman_id: id } });
            return ` Average of batsman with ID ${id} is ${batsman === null || batsman === void 0 ? void 0 : batsman.dataValues.average}`;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch batsman average data'));
        }
    }),
    fetchAllBatsman: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield batsmanData_1.default.findAll({
                include: {
                    model: batsmanStats_1.default,
                    as: 'stats',
                    required: true
                }
            });
            return result;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.DATABASE_ERROR('fetch all batsman data with stats'));
        }
    }),
    addBatsmanData: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, isRetired, age } = input;
            batsman_schema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const result = yield batsmanData_1.default.create({ firstName, lastName, isRetired, age });
            return `Player Added Successfully with ID ${result.dataValues.id}`;
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
            const result = yield batsmanStats_1.default.create({ batsman_id, runs, highestScore, strikeRate, hundreds, fiftys, notOut });
            return `Batsman Stats Added for playerID ${result.dataValues.batsman_id}  `;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.INSERTION_FAILED('batsman stats'));
        }
    }),
    updatePlayerInfo: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, firstName, lastName, isRetired, age } = input;
            batsman_schema_1.batsManSchema.parse({ firstName, lastName, isRetired, age });
            const batsman = yield batsmanData_1.default.findOne({
                where: {
                    id: id
                }
            });
            if (batsman !== null) {
                const result = yield batsmanData_1.default.update({ firstName: firstName, lastName: lastName, isRetired: isRetired, age: age }, {
                    where: {
                        id: id
                    }
                });
                if (result[0] === 0) {
                    return new Error(errors_1.ErrorMessages.NO_DATA_UPDATED);
                }
                return `Player Info Updated Successfully for batsman ID ${id}`;
            }
            else {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('batsman', id));
            }
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
            const batsman = yield batsmanData_1.default.findOne({
                where: {
                    id: batsman_id
                }
            });
            if (batsman !== null) {
                const result = yield batsmanStats_1.default.update({ runs: runs, highestScore: highestScore, strikeRate: strikeRate, hundreds: hundreds, fiftys: fiftys, notOut: notOut }, {
                    where: {
                        batsman_id: batsman_id
                    }
                });
                if (result[0] === 0) {
                    return new Error(errors_1.ErrorMessages.NO_DATA_UPDATED);
                }
                return `Stats Updated for Batsman ID ${batsman_id}`;
            }
            else {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('batsman', batsman_id));
            }
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.UPDATE_FAILED('player stats'));
        }
    }),
    softDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batsman = yield batsmanData_1.default.findByPk(id);
            if (batsman !== null) {
                const result = yield batsmanData_1.default.update({ is_deleted: true }, {
                    where: {
                        id: id
                    }
                });
                if (result[0] === 0) {
                    return new Error(errors_1.ErrorMessages.ALREADY_DELETED('batsman', id));
                }
                return `Batsman with id ${id} Soft Deleted Successfully`;
            }
            else {
                return new Error(errors_1.ErrorMessages.NOT_FOUND('Batsman', id));
            }
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.SOFT_DELETE_FAILED);
        }
    }),
    hardDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedBatsman = yield batsmanData_1.default.destroy({ where: { id: id } });
            if (deletedBatsman === 0) {
                return new Error(errors_1.ErrorMessages.ALREADY_DELETED('batsman', id));
            }
            return `Batsman with ID ${id} deleted successfully `;
        }
        catch (_a) {
            throw new Error(errors_1.ErrorMessages.HARD_DELETE_FAILED);
        }
    })
};
