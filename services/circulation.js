const { Circulation, Member, Book } = require('../models');

module.exports = {
    getBorrowListByMember: async (memberCode, limit, offset, sort, sortType) => {
        const borrowList = await Circulation.findAll({
            where: {
                member_code: memberCode
            },
        });

        return borrowList;
    },

    addCirculation: async (memberCode, bookCode) => {
        const borrowDate = new Date();
        const dueDate = new Date() + 7;
        const status = "borrowed";
        const circulation = await Circulation.create({
            member_code: memberCode,
            book_code: bookCode,
            borrow_date: borrowDate,
            due_date: dueDate,
            return_date: null,
            status: status
        });

        return circulation;
    },

    getCirculationById: async (id) => {
        const circulation = await Circulation.findByPk(id);

        return circulation;
    },

    returnCirculation: async (id) => {
        const returnDate = new Date();
        const status = "returned";
        
        const circulation = await Circulation.update({
            return_date: returnDate,
            status: status
        }, {
            where: {
                id: id
            }
        });

        return circulation;
    },

    getCirculations: async (limit, offset, sort, sortType) => {
        let opts = {};
        if (limit && limit != undefined && limit != null && limit > 0) {
            opts.limit = limit;
            opts.offset = offset;
            opts.incule = [
                {
                    model: Member,
                    as: 'member',
                    attributes: ['code', 'name']
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: ['code', 'title']
                }
            ];
        }

        const circulations = await Circulation.findAndCountAll({
            ...opts,
            order: [
                [sort, sortType]
            ]
        });

        return circulations;
    },

    getCirculationsByMember: async (memberCode, limit, offset, sort, sortType) => {
        const circulations = await Circulation.findAndCountAll({
            where: {
                member_code: memberCode
            },
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: ['code', 'title']
                }
            ],
            limit: limit,
            offset: offset,
            order: [
                [sort, sortType]
            ]
        });

        return circulations;
    },

    updateCirculationStatus: async (id, status) => {
        const circulation = await Circulation.update({
            status: status
        }, {
            where: {
                id: id
            }
        });

        return circulation;
    }
}