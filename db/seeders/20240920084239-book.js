'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [
      {
        code: "JK-45",
        title: "Harry Potter",
        author_id: 1,
        stock_total: 5,
        stock_available: 1,
        isbn: "978-0-7475-3269-9",
        publisher_id: 1,
        published_date: "1997-06-26",
        created_at: new Date("2024-09-10 10:00:00"),
        updated_at: new Date("2024-09-10 10:00:00"),
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlett",
        author_id: 2,
        stock_total: 3,
        stock_available: 1,
        isbn: "978-1599866741",
        publisher_id: 2,
        published_date: "2007-11-07",
        created_at: new Date("2024-09-10 10:05:00"),
        updated_at: new Date("2024-09-10 10:05:00"),
      },
      {
        code: "TW-11",
        title: "Twilight",
        author_id: 3,
        stock_total: 3,
        stock_available: 1,
        isbn: "978-0-316-16017-9",
        publisher_id: 3,
        published_date: "2005-09-27",
        created_at: new Date("2024-09-10 10:10:00"),
        updated_at: new Date("2024-09-10 10:10:00"),
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author_id: 4,
        stock_total: 2,
        stock_available: 1,
        isbn: "978-0618150823",
        publisher_id: 3,
        published_date: "2001-09-01",
        created_at: new Date("2024-09-10 10:15:00"),
        updated_at: new Date("2024-09-10 10:15:00"),
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author_id: 5,
        stock_total: 3,
        stock_available: 2,
        isbn: "978-0064404990",
        publisher_id: 3,
        published_date: "2008-01-02",
        created_at: new Date("2024-09-10 10:20:00"),
        updated_at: new Date("2024-09-10 10:20:00"),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
