const { Member, sequelize, Circulation } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getMemberByCode: async (memberCode) => {
        const member = await Member.findOne({
            where: {
                code: memberCode
            }
        });

        return member;
    },
    getMembers: async (limit, offset, sort, sortType) => {
        // const data = await Member.findAndCountAll({
        //     attributes: [
        //         'code', 
        //         'name', 
        //         'email', 
        //         'phone',
        //         [sequelize.fn('COUNT', sequelize.col('circulations.book_code')), 'book_count']
        //     ],
        //     include: [{
        //         model: Circulation,
        //         attributes: [], // Exclude Circulation fields from result
        //         as: 'circulations',
        //         where: {
        //             status: {
        //                 [Op.or]: ['borrowed', 'late']
        //             }
        //         },
        //         required: false // LEFT JOIN equivalent
        //     }],
        //     group: ['Member.code', 'Member.name', 'Member.email', 'Member.phone'],
        //     order: [[sort, sortType]],
        //     limit: limit,
        //     offset: offset
        // });

        const query = `SELECT 
                        m.code, 
                        m.name, 
                        m.email, 
                        m.phone, 
                        COUNT(c.book_code) AS book_count
                    FROM 
                        members m
                    LEFT JOIN 
                        circulations c ON m.code = c.member_code AND (c.status = 'borrowed' OR c.status = 'late')
                    GROUP BY 
                        m.code, m.name, m.email, m.phone
                    ORDER BY 
                        ${sort} ${sortType}
                    LIMIT 
                        ${limit} OFFSET ${offset};
                    `;
        
        // const query = `SELECT m.code, m.name, m.email, m.phone, COUNT(c.book_code) AS book_count FROM members m
        //                 JOIN circulations c ON m.code = c.member_code
        //                 WHERE c.status = 'borrowed' OR c.status = 'late'
        //                 GROUP BY m.code, m.name, m.email, m.phone
        //                 ORDER BY ${sort} ${sortType}
        //                 LIMIT ${limit} OFFSET ${offset}`;

        const members = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        const count = await Member.count({
            include: {
                model: Circulation,
                as: 'circulations'
            },
            distinct: true
        });

        const data = {
            rows: members,
            count: count,
        }
        // const members = await Member.findAndCountAll({
        //     limit: limit,
        //     offset: offset,
        //     order: [
        //         [sort, sortType]
        //     ]
        // });

        return data;
    },
}