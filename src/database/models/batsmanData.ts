import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequilize';
import BatsmanStats from './batsmanStats';

class BatsmanData extends Model {}

BatsmanData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isRetired: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'batsmanData',
        timestamps: false
    }
);

BatsmanData.hasOne(BatsmanStats, {
    foreignKey: 'batsman_id',
    as: 'stats'
});

export default BatsmanData;
