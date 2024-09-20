const { sequelize } = require('../models');

module.exports = {
    borrow: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;

            // validator

            const { member_code, book_code } = body;

            // if member borrow < 2 books
            // if member has penalty
        } catch (error) {
            next(error);
        }
    }
}