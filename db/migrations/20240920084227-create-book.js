'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.INTEGER
      },
      stock_total: {
        type: Sequelize.INTEGER
      },
      stock_available: {
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING,
        unique: true,
      },
      publisher_id: {
        type: Sequelize.INTEGER
      },
      published_date: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('books', ['isbn'], {
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};