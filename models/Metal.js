import {DataTypes } from 'sequelize';
import {sequelize} from "../exports.js";

const Factory = sequelize.define('Factory', { id: DataTypes.INTEGER });

export const Metal = sequelize.define('Metal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
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
    tableName: 'Metal',
    sequelize
});
