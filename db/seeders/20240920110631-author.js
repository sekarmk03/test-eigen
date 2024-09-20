'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('authors', [
      {
        name: "J.K Rowling",
        bio: "Joanne Rowling (born 31 July 1965), known by her pen name J. K. Rowling, is a British author and philanthropist. She is the author of Harry Potter, a seven-volume fantasy novel series published from 1997 to 2007. The series has sold over 600 million copies, been translated into 84 languages, and spawned a global media franchise including films and video games.",
        created_at: new Date("2024-09-10 10:00:00"),
        updated_at: new Date("2024-09-10 10:00:00"),
      },
      {
        name: "Arthur Conan Doyle",
        bio: "Sir Arthur Ignatius Conan Doyle KStJ, DL (22 May 1859 - 7 July 1930) was a British writer and physician. He created the character Sherlock Holmes in 1887 for A Study in Scarlet, the first of four novels and fifty-six short stories about Holmes and Dr. Watson. The Sherlock Holmes stories are milestones in the field of crime fiction.",
        created_at: new Date("2024-09-10 13:00:00"),
        updated_at: new Date("2024-09-10 13:00:00"),
      },
      {
        name: "Stephenie Meyer",
        bio: "Stephenie Meyer (born December 24, 1973) is an American author and film producer. She is best known for writing the vampire romance book series Twilight, which has sold over 160 million copies, with translations into 49 different languages. She was the bestselling author of 2008 and 2009 in the United States, having sold over 29 million books in 2008 and 26.5 million in 2009.",
        created_at: new Date("2024-09-10 16:00:00"),
        updated_at: new Date("2024-09-10 16:00:00"),
      },
      {
        name: "J.R.R. Tolkien",
        bio: "John Ronald Reuel Tolkien CBE FRSL (ROOL TOL-keen;[a] 3 January 1892 - 2 September 1973) was an English writer and philologist. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
        created_at: new Date("2024-09-10 17:00:00"),
        updated_at: new Date("2024-09-10 17:00:00"),
      },
      {
        name: "C.S. Lewis",
        bio: "Clive Staples Lewis FBA (29 November 1898 - 22 November 1963) was a British writer, literary scholar, and Anglican lay theologian. He held academic positions in English literature at both Magdalen College, Oxford (1925-1954), and Magdalene College, Cambridge (1954-1963). He is best known as the author of The Chronicles of Narnia, but he is also noted for his other works of fiction, such as The Screwtape Letters and The Space Trilogy, and for his non-fiction Christian apologetics, including Mere Christianity, Miracles, and The Problem of Pain.",
        created_at: new Date("2024-09-10 19:00:00"),
        updated_at: new Date("2024-09-10 19:00:00"),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('authors', null, {});
  }
};
