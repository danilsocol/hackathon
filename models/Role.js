import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";


export class Role extends Model {}

Role.init({
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
    tableName: 'Role',
    sequelize
})