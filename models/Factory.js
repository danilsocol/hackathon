import {DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

export const Factory = sequelize.define('Factory', {
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
    tableName: 'Factory',
    sequelize
});
