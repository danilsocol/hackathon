import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";

export class Factory extends Model {}


Factory.init({
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
    sequelize,
})
