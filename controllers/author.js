const { sequelize } = require('../models');
const { authorSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../utils/errors');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", option = "false"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let authors = null;
            let pagination = null;
            if (option == "false") {
                authors = await authorSvc.getAuthors(limit, start, sort, type);
                pagination = paginate(authors.count, authors.rows.length, limit, page, start, end);
            } else {
                authors = await authorSvc.getAuthors(0, 0, sort, type);
                authors = authors.rows;
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Authors data retrieved successfully',
                pagination,
                data: authors,
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const author = await authorSvc.getAuthorById(id);
            if (!author) return err.not_found(res, "Author not found");

            return res.status(200).json({
                status: 'OK',
                message: 'Author data retrieved successfully',
                data: author
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { name, bio } = body;

            transaction = await sequelize.transaction();
            const author = await authorSvc.addAuthor(name, bio);

            await transaction.commit();
            return res.status(201).json({
                status: 'OK',
                message: 'Author added successfully',
                data: author
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
            const { id, name, bio } = body;

            let author = await authorSvc.getAuthorById(id);
            if (!author) return err.not_found(res, "Author not found");

            transaction = await sequelize.transaction();
            await authorSvc.updateAuthor(id, name || author.name, bio || author.bio);

            author = await authorSvc.getAuthorById(id);

            await transaction.commit();
            return res.status(200).json({
                status: 'OK',
                message: 'Author updated successfully',
                data: author
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            let author = await authorSvc.getAuthorById(id);
            if (!author) return err.not_found(res, "Author not found");

            await authorSvc.deleteAuthor(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Author deleted successfully',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}