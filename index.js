import express from "express"
import {Sequelize} from "sequelize"

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/database.sqlite'
});




try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

