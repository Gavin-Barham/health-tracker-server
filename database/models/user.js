'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.medical, { foreignKey: 'user_id'});
      this.hasMany(models.nutrition, { foreignKey: 'user_id'})
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    height: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};