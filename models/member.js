'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.hasMany(models.Circulation, { foreignKey: 'member_code', as: 'circulations' });
    }
  }
  Member.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Member',
    tableName: "members",
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email', 'phone']
      },
    ]
  });
  return Member;
};