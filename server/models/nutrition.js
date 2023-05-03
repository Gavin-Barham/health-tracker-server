// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');


// DEFINE NUTRITION MODEL
const Nutrition = DB.define('nutrition', {
    date: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
    breakfast: { 
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('breakfast must be an array.');
                    value.forEach(med => {
                    if (typeof med.calories !== 'number' || typeof med.food !== 'string') {
                        throw new Error('Breakfast "calories" values must be numbers and  "food"  values must be strings');
                    }
                
                 })
            }
        }
    },
    lunch: { 
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('lunch must be an array.');
                    value.forEach(med => {
                    if (typeof med.calories !== 'number' || typeof med.food !== 'string') {
                        throw new Error('Lunch "calories" values must be numbers and  "food"  values must be strings');
                    }
                
                 })
            }
        }
    },
    dinner: { 
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('dinner must be an array.');
                    value.forEach(med => {
                    if (typeof med.calories !== 'number' || typeof med.food !== 'string') {
                        throw new Error('Dinner "calories" values must be numbers and  "food"  values must be strings');
                    }
                
                 })
            }
        }
    },
    snacks: { 
        type: Sequelize.JSON,
        allowNull: true,
        validate: {
            isArrayOfObjects: function (value) {
                if (value === null) return;
                if (!Array.isArray(value)) throw new Error('Snacks must be an array.');
                    value.forEach(med => {
                    if (typeof med.calories !== 'number' || typeof med.food !== 'string') {
                        throw new Error('Snacks "calories" values must be numbers and  "food"  values must be strings');
                    }
                
                 })
            }
        }
    },
});



module.exports = Nutrition;
  