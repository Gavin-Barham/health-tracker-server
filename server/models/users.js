// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');

// IMPORT MODELS
const Nutrition = require('./nutrition');
const Medical = require('./medical');

// DEFINE USER MODEL
const Users = DB.define('users',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    target_cal: {
      type: Sequelize.STRING,
      allowNull: true
    },
})

// DEFINE USER  MODEL ASSOCIATIONS
Users.hasMany(Nutrition, { onDelete: 'cascade', hooks: true });
Nutrition.belongsTo(Users, {foreignKey: 'user_id'});
Users.hasMany(Medical, { onDelete: 'cascade', hooks: true });
Nutrition.belongsTo(Users, {foreignKey: 'user_id'});


// EXPORT USER MODEL
module.exports = Users;