const { memberSvc } = require('../services');
const paginate = require('../utils/generate_pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let members = await memberSvc.getMembers(limit, start, sort, type);
            let pagination = paginate(members.count, members.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Members data retrieved successfully',
                pagination,
                data: members.rows,
            });
        } catch (error) {
            next(error);
        }
    },
}