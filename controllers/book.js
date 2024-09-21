const { bookSvc } = require('../services');
const { sequelize } = require('../models');
const err = require('../utils/errors');
const paginate = require('../utils/generate_pagination');

module.exports = {
    available: async (req, res, next) => {
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

    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", option = "false"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let books = null;
            let pagination = null;
            if (option == "false") {
                books = await bookSvc.getBooks(limit, start, sort, type);
                pagination = paginate(books.count, books.rows.length, limit, page, start, end);
            } else {
                books = await bookSvc.getBooks(0, 0, sort, type);
            }

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

    show: async (req, res, next) => {
        try {
            const { book_code } = req.params;

            const book = await bookSvc.getBookByCode(book_code);
            if (!book) return err.not_found(res, "Book not found");

            return res.status(200).json({
                status: 'OK',
                message: 'Book data retrieved successfully',
                data: book
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { code, title, author_id, stock, isbn, publisher_id, published_date } = body;

            let book = await bookSvc.getBookByCode(code);
            if (book) return err.conflict(res, "Book already exists");

            transaction = await sequelize.transaction();
            book = await bookSvc.addBook(code, title, author_id, stock, isbn, publisher_id, published_date);

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