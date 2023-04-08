import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";
import {Factory} from "./Factory.js";
import {User} from "./User.js";


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
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'Place',
    sequelize
})