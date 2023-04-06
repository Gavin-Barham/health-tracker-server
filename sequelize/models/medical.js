'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medical extends Model {
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
  medical.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    oxygen: DataTypes.STRING,
    heart_rate: DataTypes.STRING,
    blood_pressure: DataTypes.STRING,
    blood_glucose: DataTypes.STRING,
    weight: DataTypes.STRING,
    morning_meds: DataTypes.TIME,
    evening_meds: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'medical',
  });
  return medical;
};