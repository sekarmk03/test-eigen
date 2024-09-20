const { book } = require('../services');
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

            let books = await book.getBooksAvailable(limit, start, sort, type);
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
    }
}