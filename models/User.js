const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:'); // TODO заччем это надо
//фио
//ЛОГИН
//ПАРОТЛЬ
// ПОЧТА
// рОЛЬ

const User = sequelize.define('User', {
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
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
});
