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
        const query = `SELECT m.code, m.name, m.email, m.phone, COUNT(c.book_code) AS book_count
                    FROM members m
                    LEFT JOIN circulations c ON m.code = c.member_code AND (c.status = 'borrowed' OR c.status = 'late')
                    GROUP BY m.code, m.name, m.email, m.phone
                    ORDER BY ${sort} ${sortType}
                    LIMIT ${limit} OFFSET ${offset};`;
        
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

        return data;
    },

    addMember: async (name, email, phone) => {
        const member = await Member.create({
            name: name,
            email: email,
            phone: phone
        });

        return member;
    },

    updateMember: async (memberCode, name, email, phone) => {
        const update = await Member.update({
            name: name,
            email: email,
            phone: phone
        }, {
            where: {
                code: memberCode
            }
        });

        return update;
    },

    deleteMember: async (memberCode) => {
        const member = await Member.destroy({
            where: {
                code: memberCode
            }
        });

        return member;
    },
}