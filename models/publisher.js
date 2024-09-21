'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publisher.hasMany(models.Book, { foreignKey: 'publisher_id', as: 'books' });
    }
  }
  Publisher.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publisher',
    tableName: 'publishers',
    underscored: true,
    timestamps: true
  });
  return Publisher;
};