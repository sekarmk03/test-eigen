'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('circulations', [
      {
        member_code: "M001",
        book_code: "JK-45",
        borrow_date: new Date("2024-09-13 12:00:00"),
        due_date: new Date("2024-09-20 23:59:59"),
        return_date: new Date("2024-09-22 17:00:00"),
        status: "returned_late",
        created_at: new Date("2024-09-13 12:00:00"),
        updated_at: new Date("2024-09-22 17:00:00"),
      },
      {
        member_code: "M002",
        book_code: "SHR-1",
        borrow_date: new Date("2024-09-14 14:00:00"),
        due_date: new Date("2024-09-21 23:59:59"),
        return_date: null,
        status: "late",
        created_at: new Date("2024-09-14 14:00:00"),
        updated_at: new Date("2024-09-22 00:01:00"),
      },
      {
        member_code: "M003",
        book_code: "JK-45",
        borrow_date: new Date("2024-09-16 13:00:00"),
        due_date: new Date("2024-09-23 23:59:59"),
        return_date: null,
        status: "borrowed",
        created_at: new Date("2024-09-16 13:00:00"),
        updated_at: new Date("2024-09-16 13:00:00"),
      },
      {
        member_code: "M004",
        book_code: "TW-11",
        borrow_date: new Date("2024-09-16 15:00:00"),
        due_date: new Date("2024-09-23 23:59:59"),
        return_date: new Date("2024-09-20 11:00:00"),
        status: "returned",
        created_at: new Date("2024-09-16 15:00:00"),
        updated_at: new Date("2024-09-20 11:00:00"),
      },
      {
        member_code: "M003",
        book_code: "HOB-83",
        borrow_date: new Date("2024-09-20 10:00:00"),
        due_date: new Date("2024-09-27 23:59:59"),
        return_date: new Date("2024-09-22 19:30:00"),
        status: "returned",
        created_at: new Date("2024-09-20 10:00:00"),
        updated_at: new Date("2024-09-22 19:30:00"),
      },
      {
        member_code: "M004",
        book_code: "HOB-83",
        borrow_date: new Date("2024-09-20 16:00:00"),
        due_date: new Date("2024-09-27 23:59:59"),
        return_date: null,
        status: "borrowed",
        created_at: new Date("2024-09-20 16:00:00"),
        updated_at: new Date("2024-09-20 16:30:00"),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('circulations', null, {});
  }
};
