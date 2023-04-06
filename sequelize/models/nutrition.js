'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {foreignKey: 'user_id'})
    }
  }
  nutrition.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    daily_steps: DataTypes.INTEGER,
    first_meal_cal: DataTypes.INTEGER,
    first_meal_time: DataTypes.TIME,
    second_meal_cal: DataTypes.INTEGER,
    second_meal_time: DataTypes.TIME,
    first_meal_cal: DataTypes.ARRAY(DataTypes.INTEGER),
    snack_time: DataTypes.ARRAY(DataTypes.TIME),
    exercise_cal: DataTypes.ARRAY(DataTypes.INTEGER),
    exercise_time: DataTypes.ARRAY(DataTypes.TIME)
  }, {
    sequelize,
    modelName: 'nutrition',
  });
  return nutrition;
};