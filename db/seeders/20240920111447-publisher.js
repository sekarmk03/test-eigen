'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('publishers', [
      {
        name: "Bloomsbury Publishing",
        address: "United Kingdom",
        email: "publicity@bloomsbury.com",
        created_at: "2024-09-10 10:00:00",
        updated_at: "2024-09-10 10:00:00",
      },
      {
        name: "Ward, Lock & Co.",
        address: "United Kingdom",
        email: "info@wardlock.co.uk",
        created_at: "2024-09-10 11:00:00",
        updated_at: "2024-09-10 11:00:00",
      },
      {
        name: "Little, Brown and Company",
        address: "United States",
        email: "info@littlebrown.com",
        created_at: "2024-09-10 13:00:00",
        updated_at: "2024-09-10 13:00:00",
      },
      {
        name: "George Allen & Unwin",
        address: "United Kingdom",
        email: "info@allenandunwin.com",
        created_at: "2024-09-10 15:00:00",
        updated_at: "2024-09-10 15:00:00",
      },
      {
        name: "Geoffrey Bles",
        address: "United Kingdom",
        email: "info@geoffreybles.co.uk",
        created_at: "2024-09-10 16:00:00",
        updated_at: "2024-09-10 16:00:00",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('publishers', null, {});
  }
};
