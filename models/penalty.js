'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penalty.init({
    member_code: DataTypes.STRING,
    circulation_id: DataTypes.INTEGER,
    penalty_start: DataTypes.DATEONLY,
    penalty_end: DataTypes.DATEONLY,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Penalty',
    tableName: 'penalties',
    underscored: true,
    timestamps: true,
  });
  return Penalty;
};