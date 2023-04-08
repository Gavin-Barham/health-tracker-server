const Sequelize = require('sequelize');
const DB = require('../utils/database');
// const User = require('./user');

const Medical = DB.define('medical', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id: Sequelize.INTEGER,
  date: Sequelize.DATEONLY,
  oxygen: Sequelize.STRING,
  heart_rate: Sequelize.STRING,
  blood_pressure: Sequelize.STRING,
  blood_glucose: Sequelize.STRING,
  weight: Sequelize.STRING,
  morning_meds: Sequelize.TIME,
  evening_meds: Sequelize.TIME
})
// Medical.belongsTo(User)

module.exports = Medical;