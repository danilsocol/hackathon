import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');


const Truck = sequelize.define('Truck', {
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
    checkpoint_number: { // todo ключ
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //todo возможно хранение id набора или типо того
    type_production_volume: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    production_volume: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
});
