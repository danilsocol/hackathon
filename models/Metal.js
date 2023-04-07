import {DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

export const Metal = sequelize.define('Metal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'Metal',
    sequelize
});
