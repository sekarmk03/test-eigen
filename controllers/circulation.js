const { sequelize } = require('../models');
const { circulationSvc, penaltySvc, memberSvc, bookSvc } = require('../services');
const err = require('../utils/errors');

module.exports = {
    borrow: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;

            const { member_code, book_code } = body;

            // if member doesn't exists
            const memberData = await memberSvc.getMemberByCode(member_code);
            if (!memberData) return err.not_found(res, 'Member does not exist');

            // if book unavailable
            const bookData = await bookSvc.getBookByCode(book_code);
            if (!bookData) return err.not_found(res, 'Book does not exist');
            if (bookData.stock_available <= 0) return err.bad_request(res, 'Book stock unavailable');

            // if member borrow > 2 books
            let borrowList = await circulationSvc.getCirculationsByMember(member_code, 0, 0, 'created_at', 'asc');
            borrowList = borrowList.rows;
            let borrowedCount = 0;
            borrowList.forEach(borrow => {
                if (borrow.status == "borrowed") return borrowedCount++;
            });
            if (borrowedCount >= 2) return err.bad_request(res, 'Member already borrowed 2 books');

            // if member has late borrow not returned
            if (borrowList.some(borrow => borrow.status == "late")) return err.bad_request(res, 'Member has late borrow not returned');

            // if member has penalty
            const penalties = await penaltySvc.getPenaltiesByMember(member_code);
            if (penalties.length > 0) return err.bad_request(res, 'Member has penalties');

            // transaction
            transaction = await sequelize.transaction();
            const circulationData = await circulationSvc.addCirculation(member_code, book_code);
            await bookSvc.updateBookAvailable(book_code, -1);

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

            let circulationData = await circulationSvc.getCirculationById(id);
            if (!circulationData) return err.not_found(res, 'Circulation does not exist');

            // if book already returned
            if (circulationData.status == "returned") return err.bad_request(res, 'Book already returned');

            // transaction
            transaction = await sequelize.transaction();

            if (circulationData.status == "late") {
                await penaltySvc.addPenalty(circulationData.member_code, new Date(), "late return book");
            }

            let status = "";
            if (new Date(circulationData.due_date) < new Date()) {
                status = "returned_late";
            } else {
                status = "returned";
            }

            circulationData = await circulationSvc.returnCirculation(id, status);
            circulationData = await circulationSvc.getCirculationById(id);

            await bookSvc.updateBookAvailable(circulationData.book_code, 1);

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