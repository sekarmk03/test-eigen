const { sequelize } = require('../models');
const { circulation, penalty, member, book } = require('../services');
const err = require('../utils/errors');

module.exports = {
    borrow: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;

            const { member_code, book_code } = body;

            // if member doesn't exists
            const memberData = await member.getMemberByCode(member_code);
            if (!memberData) return err.not_found(res, 'Member does not exist');

            // if book unavailable
            const bookData = await book.getBookByCode(book_code);
            if (!bookData) return err.not_found(res, 'Book does not exist');
            if (bookData.stock_available <= 0) return err.bad_request(res, 'Book stock unavailable');

            // if member borrow > 2 books
            const borrowList = await circulation.getBorrowListByMember(member_code);
            let borrowedCount = 0;
            borrowList.forEach(borrow => {
                if (borrow.status == "borrowed") return borrowedCount++;
            });
            if (borrowedCount >= 2) return err.bad_request(res, 'Member already borrowed 2 books');

            // if member has late borrow not returned
            if (borrowList.some(borrow => borrow.status == "late")) return err.bad_request(res, 'Member has late borrow not returned');

            // if member has penalty
            const penalties = await penalty.getPenaltiesByMember(member_code);
            if (penalties.length > 0) return err.bad_request(res, 'Member has penalties');

            // transaction
            transaction = await sequelize.transaction();
            const circulationData = await circulation.addCirculation(member_code, book_code);
            await book.updateBookAvailable(book_code, -1);

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: "Borrow book success",
                data: circulationData
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    return: async (req, res, next) => {
        let transaction;
        try {
            const { id } = req.params;

            let circulationData = await circulation.getCirculationById(id);
            if (!circulationData) return err.not_found(res, 'Circulation does not exist');

            // if book already returned
            if (circulationData.status == "returned") return err.bad_request(res, 'Book already returned');

            // transaction
            transaction = await sequelize.transaction();

            if (circulationData.status == "late") {
                await penalty.addPenalty(circulationData.member_code, new Date(), "late return book");
            }

            circulationData = await circulation.returnCirculation(id);
            circulationData = await circulation.getCirculationById(id);

            await book.updateBookAvailable(circulationData.book_code, 1);

            await transaction.commit();

            return res.status(200).json({
                status: 'OK',
                message: "Return book success",
                data: circulationData
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}