import { DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

const Metal = sequelize.define('Metal', { id: DataTypes.INTEGER });
const Truck = sequelize.define('Truck', { id: DataTypes.INTEGER });


export const Metal_Truck = sequelize.define('Metal_Truck', {
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
    }
}, {
    timestamps: false,
    tableName: 'Metal-Truck',
    sequelize
});
