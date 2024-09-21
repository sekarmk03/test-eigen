const { Member, sequelize } = require('../models');

module.exports = {
    getMemberByCode: async (memberCode) => {
        const member = await Member.findOne({
            where: {
                member_code: memberCode
            }
        });

        return member;
    },
    getMembers: async (limit, offset, sort, sortType) => {
        const query = `SELECT m.code, m.name, m.email, m.phone, COUNT(c.book_code) AS book_count FROM members m
                        LEFT JOIN circulations c ON m.code = c.member_code
                        WHERE c.status = 'borrowed'
                        GROUP BY m.code, m.name, m.email, m.phone
                        ORDER BY ${sort} ${sortType}
                        LIMIT ${limit} OFFSET ${offset}`;

        const members = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        // const members = await Member.findAndCountAll({
        //     limit: limit,
        //     offset: offset,
        //     order: [
        //         [sort, sortType]
        //     ]
        // });

        return members;
    },
}