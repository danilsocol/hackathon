import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";
import {Factory} from "./Factory.js";


export class Place extends Model {}

Place.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    factory_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Factory,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'Place',
    sequelize
})