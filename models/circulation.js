'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Circulation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Circulation.belongsTo(models.Member, { foreignKey: 'member_code', as: 'member' });
      Circulation.belongsTo(models.Book, { foreignKey: 'book_code', as: 'book' });
      Circulation.hasOne(models.Penalty, { foreignKey: 'circulation_id', as: 'penalty' });
    }
  }
  Circulation.init({
    member_code: DataTypes.STRING,
    book_code: DataTypes.STRING,
    borrow_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    status: DataTypes.ENUM('borrowed', 'returned', 'late', 'returned_late')
  }, {
    sequelize,
    modelName: 'Circulation',
    tableName: 'circulations',
    underscored: true,
    timestamps: true,
  });
  return Circulation;
};