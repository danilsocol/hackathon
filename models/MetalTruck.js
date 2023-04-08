import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";
import {Metal} from "./Metal.js";
import {Truck} from "./Truck.js";
import {Factory} from "./Factory.js";


export class MetalTruck extends Model {}

MetalTruck.init( {
    metal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Metal,
            key: 'id'
        }
    },
    truck_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Truck,
            key: 'id'
        }
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
    tableName: 'Metal-Truck',
    sequelize
});