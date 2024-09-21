'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Author, { foreignKey: 'author_id', as: 'author' });
      Book.belongsTo(models.Publisher, { foreignKey: 'publisher_id', as: 'publisher' });
    }
  }
  Book.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    stock_total: DataTypes.INTEGER,
    stock_available: DataTypes.INTEGER,
    isbn: {
      type: DataTypes.STRING,
      unique: true,
    },
    publisher_id: DataTypes.INTEGER,
    published_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['isbn']
      }
    ]
  });
  return Book;
};