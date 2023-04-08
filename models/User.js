import { Model, DataTypes } from 'sequelize';
import {sequelize} from "./exports.js";
import {Factory} from "./Factory.js";
import {Role} from "./Role.js";
export class User extends Model{}

/*
const Factory = sequelize.define('Factory', { id: DataTypes.INTEGER });
const Role = sequelize.define('Role', { id: DataTypes.INTEGER });
*/

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    factory_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Factory,
            key: 'id'
        }
    },
    /*place_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Place,
            key: 'id'
        }
    }*/
}, {
    timestamps: false,
    tableName: 'User',
    sequelize
});

