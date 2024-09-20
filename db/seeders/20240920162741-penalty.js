'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('penalties', [
      {
        member_code: 'M001',
        circulation_id: 1,
        penalty_start: "2024-09-22",
        penalty_end: '2024-09-25',
        note: 'late return',
        created_at: "2024-09-22 17:00:00",
        updated_at: "2024-09-22 17:00:00",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('penalties', null, {});
  }
};
