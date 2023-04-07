import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

const Factory = sequelize.define('Factory', { id: DataTypes.INTEGER });
export const Truck = sequelize.define('Truck', { //Todo изменить 2 по заезда
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
    checkpoint_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_production_volume: {
        type: DataTypes.INTEGER,
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
    }
}, {
    timestamps: false,
    tableName: 'Truck',
    sequelize
});
