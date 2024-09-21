const { Book, Author, Publisher } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getBookByCode: async (bookCode) => {
        const book = await Book.findOne({
            where: {
                code: bookCode
            }
        });

        return book;
    },
    
    updateBookAvailable: async (bookCode, number) => {
        const book = await Book.findOne({
            where: {
                code: bookCode
            }
        });

        const updated = await book.update({
            stock_available: book.stock_available + number
        });

        return updated;
    },

    getBooksAvailable: async (limit, offset, sort, sortType) => {
        const books = await Book.findAndCountAll({
            where: {
                stock_available: {
                    [Op.gt]: 0
                }
            },
            include: [
                {
                    model: Author,
                    as: 'author',
                    attributes: ['id', 'name']
                },
                {
                    model: Publisher,
                    as: 'publisher',
                    attributes: ['id', 'name']
                }
            ],
            limit: limit,
            offset: offset,
            order: [
                [sort, sortType]
            ]
        });

        return books;
    },
}