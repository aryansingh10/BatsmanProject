import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequilize';
class BatsmanStats extends Model {}

BatsmanStats.init(
    {
        batsman_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        runs: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        highestScore: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        average: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        strikeRate: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        hundreds: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        fiftys: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        notOut: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'batsmanStats',
        timestamps: false
    }
);

export default BatsmanStats;
