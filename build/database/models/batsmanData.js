"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequilize_1 = __importDefault(require("../sequilize"));
const batsmanStats_1 = __importDefault(require("./batsmanStats"));
class BatsmanData extends sequelize_1.Model {
}
BatsmanData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    isRetired: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    is_deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: sequilize_1.default,
    tableName: 'batsmanData',
    timestamps: false
});
BatsmanData.hasOne(batsmanStats_1.default, {
    foreignKey: 'batsman_id',
    as: 'stats'
});
exports.default = BatsmanData;
