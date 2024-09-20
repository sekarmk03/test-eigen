'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('members', [
      {
        code: "M001",
        name: "Angga Yudha",
        email: "anggayudha@example.com",
        phone: "6289123456789",
        created_at: "2024-09-13 10:00:00",
        updated_at: "2024-09-13 10:00:00"
      },
      {
        code: "M002",
        name: "Ferry Maulana",
        email: "ferrymaulana@example.com",
        phone: "6289123456781",
        created_at: "2024-09-14 11:00:00",
        updated_at: "2024-09-14 11:00:00"
      },
      {
        code: "M003",
        name: "Putri Dania",
        email: "putridania@example.com",
        phone: "6289123456782",
        created_at: "2024-09-16 12:00:00",
        updated_at: "2024-09-16 12:00:00"
      },
      {
        code: "M004",
        name: "Leyla",
        email: "leyla@example.com",
        phone: "6289123456783",
        created_at: "2024-09-16 14:00:00",
        updated_at: "2024-09-16 14:00:00"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
