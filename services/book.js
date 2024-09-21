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
                    attributes: ['id', 'name', 'address']
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

    addBook: async (title, authorId, stock, isbn, publisherId, publishedDate) => {
        const book = await Book.create({
            title: title,
            author_id: authorId,
            stock_total: stock,
            stock_available: stock,
            isbn: isbn,
            publisher_id: publisherId,
            published_date: publishedDate
        });

        return book;
    },

    updateBook: async (bookCode, title, authorId, stock, isbn, publisherId, publishedDate) => {
        const updated = await Book.update({
            title: title,
            author_id: authorId,
            stock_total: stock,
            isbn: isbn,
            publisher_id: publisherId,
            published_date: publishedDate
        }, {
            where: {
                code: bookCode
            }
        });

        return updated;
    },

    deleteBook: async (bookCode) => {
        const deleted = await Book.destroy({
            where: {
                code: bookCode
            }
        });

        return deleted;
    }
}