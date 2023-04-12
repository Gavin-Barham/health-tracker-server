// IMPORT DATABASE ORM
const DB = require('./database');
const Sequelize = require('sequelize');


// DEFINE MEDICAL MODEL
const Medical = DB.define('medical', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  date: Sequelize.DATEONLY,
  oxygen: Sequelize.STRING,
  heart_rate: Sequelize.STRING,
  blood_pressure: Sequelize.STRING,
  blood_glucose: Sequelize.STRING,
  weight: Sequelize.STRING,
  morning_meds: Sequelize.TIME,
  noon_meds: Sequelize.TIME,
  evening_meds: Sequelize.TIME
})


// EXPORT MEDICAL MODEL
module.exports = Medical;