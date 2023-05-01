// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');


// DEFINE MEDICAL MODEL
const Medical = DB.define('medical', {
    date: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
    oxygen: {
        type: Sequelize.STRING,
        allowNull: true
    },
    heart_rate: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    blood_pressure: {
        type: Sequelize.STRING,
        allowNull: true
    },
    blood_glucose: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    morning_meds: {
        type: Sequelize.STRING,
        allowNull: true
    },
    noon_meds: {
        type: Sequelize.STRING,
        allowNull: true
    },
    evening_meds: {
        type: Sequelize.STRING,
        allowNull: true
    }
})



module.exports = Medical;