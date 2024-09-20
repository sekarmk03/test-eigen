'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('circulations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_code: {
        type: Sequelize.STRING
      },
      book_code: {
        type: Sequelize.STRING
      },
      borrow_date: {
        type: Sequelize.DATE
      },
      due_date: {
        type: Sequelize.DATE
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('borrowed', 'returned', 'late', 'returned_late')
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('circulations');
  }
};