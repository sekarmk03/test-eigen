const { Member } = require('../models');

module.exports = {
    getMemberByCode: async (memberCode) => {
        const member = await Member.findOne({
            where: {
                member_code: memberCode
            }
        });

        return member;
    }
}