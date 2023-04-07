import { DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

const Metal = sequelize.define('Metal', { id: DataTypes.INTEGER });
const Truck = sequelize.define('Truck', { id: DataTypes.INTEGER });
const Factory = sequelize.define('Factory', { id: DataTypes.INTEGER });

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
