const Sequelize = require('sequelize');
const DB = require('../utils/database');
// const Nutrition = require('./nutrition');
// const Medical = require('./medical');

const User = DB.define('user',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    height: Sequelize.INTEGER
})

// User.hasMany(Nutrition);
// User.hasMany(Medical);


module.exports = User;