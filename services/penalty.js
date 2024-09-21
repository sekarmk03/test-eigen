const { Penalty, sequelize } = require('../models');

module.exports = {
    getPenaltiesByMember: async (memberCode) => {
        const query = `SELECT * FROM penalties
                        WHERE member_code = '${memberCode}'
                        AND NOW() BETWEEN penalty_start AND penalty_end;`;

        const penalties = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

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