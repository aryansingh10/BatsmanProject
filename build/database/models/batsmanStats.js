"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequilize_1 = __importDefault(require("../sequilize"));
class BatsmanStats extends sequelize_1.Model {
}
BatsmanStats.init({
    batsman_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    runs: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    highestScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    average: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    strikeRate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    hundreds: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    fiftys: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    notOut: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: sequilize_1.default,
    tableName: 'batsmanStats',
    timestamps: false
});
exports.default = BatsmanStats;
