import {DataTypes, Model} from "sequelize";
import {sequelize} from "./exports.js";
import {Truck} from "./Truck.js";

export class StatusTruck extends Model {}


StatusTruck.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isArrived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    truck_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Truck,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'StatusTruck',
    sequelize,
})