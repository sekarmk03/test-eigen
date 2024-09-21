const { Penalty, sequelize, Circulation } = require('../models');

module.exports = {
    getPenaltiesActiveByMember: async (memberCode) => {
        const query = `SELECT * FROM penalties
                        WHERE member_code = '${memberCode}'
                        AND NOW() BETWEEN penalty_start AND penalty_end;`;

        const penalties = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        return penalties;
    },

    getPenaltiesByMember: async (memberCode) => {
        const penalties = await Penalty.findAll({
            where: {
                member_code: memberCode
            },
            include: {
                model: Circulation,
                as: 'circulation',
                attributes: ['id', 'book_code', 'borrow_date', 'due_date', 'return_date', 'status']
            }
        });
        
        return penalties;
    },
    
    addPenalty: async (memberCode, penaltyStart, notes) => {
        const penaltyEnd = new Date(penaltyStart) + 3;
        const penalty = await Penalty.create({
            member_code: memberCode,
            penalty_start: penaltyStart,
            penalty_end: penaltyEnd,
            notes: notes
        });

        return penalty;
    }
}