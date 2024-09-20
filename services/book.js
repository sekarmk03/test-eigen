const { Book } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getBookByCode: async (bookCode) => {
        const book = await Book.findOne({
            where: {
                book_code: bookCode
            }
        });

        return book;
    },
    
    updateBookAvailable: async (bookCode, number) => {
        const book = await Book.findOne({
            where: {
                book_code: bookCode
            }
        });

        const updated = await book.update({
            stock_available: book.stock_available + number
        });

        return updated;
    },

    getBooks: async (limit, offset, sort, sortType) => {
        const books = await Book.findAndCountAll({
            where: {
                stock_available: {
                    [Op.gt]: 0
                }
            },
            limit: limit,
            offset: offset,
            order: [
                [sort, sortType]
            ]
        });

        return books;
    },
}