const { bookSvc } = require('../services');
const { sequelize } = require('../models');
const err = require('../utils/errors');
const paginate = require('../utils/generate_pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let books = await bookSvc.getBooksAvailable(limit, start, sort, type);
            let pagination = paginate(books.count, books.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Books data retrieved successfully',
                pagination,
                data: books.rows,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { title, author_id, stock, isbn, publisher_id, published_date } = body;

            transaction = await sequelize.transaction();
            const book = await bookSvc.addBook(title, author_id, stock, isbn, publisher_id, published_date);

            await transaction.commit();
            return res.status(201).json({
                status: 'OK',
                message: 'Book added successfully',
                data: book
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { book_code } = req.params;
            const { title, author_id, stock, isbn, publisher_id, published_date } = body;

            let book = await bookSvc.getBookByCode(book_code);
            if (!book) return err.not_found(res, "Book not found");

            transaction = await sequelize.transaction();
            book = await bookSvc.updateBook(
                book.code,
                title || book.title,
                author_id || book.author_id,
                stock || book.stock_total,
                isbn || book.isbn,
                publisher_id || book.publisher_id,
                published_date || book.published_date
            );

            book = await bookSvc.getBookByCode(book_code);

            await transaction.commit();
            return res.status(200).json({
                status: 'OK',
                message: 'Book updated successfully',
                data: book
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { book_code } = req.params;

            let book = await bookSvc.getBookByCode(book_code);
            if (!book) return err.not_found(res, "Book not found");

            await bookSvc.deleteBook(book.code);

            return res.status(200).json({
                status: 'OK',
                message: 'Book deleted successfully',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}