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
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('Blood pressure must be an array.');
                    value.forEach(bp => {
                    if (!bp.hasOwnProperty('sys') || !bp.hasOwnProperty('dias')) {
                    throw new Error('Blood pressure must contain "sys" and "dias" values.');
                    }
                    if (typeof bp.sys !== 'number' || typeof bp.dias !== 'number') {
                    throw new Error('Blood pressure "sys" and "dias" values must be numbers.');
                    }
                
                 })
            }
        }
    },
    blood_glucose: {
        type: Sequelize.JSON,
        allowNull: true
    },
    medication: {
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('Medication must be an array.');
                    value.forEach(med => {
                    if (
                        typeof med !== 'string' ||
                        typeof med !== 'string' || 
                        typeof med !== 'string') {
                    throw new Error('Blood pressure "morning", "noon" and "night" values must be numbers.');
                    }
                
                 })
            }
        }
    }
})



module.exports = Medical;