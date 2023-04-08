import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";
import {Factory} from "./Factory.js";
import {Place} from "./Place.js";

export class Truck extends Model{}

Truck.init( {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pass_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        car_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name_driver: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipient_organization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checkpoint_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Place,
                key: 'id'
            }
        },
        type_production_volume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        production_volume: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        factory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Factory,
                key: 'id'
            }
        },
    }, {
        timestamps: false,
        tableName: 'Truck',
        sequelize
    })
