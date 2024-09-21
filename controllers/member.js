const { sequelize } = require('../models');
const { memberSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../utils/errors');

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

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { name, email, phone } = body;

            transaction = await sequelize.transaction();
            const member = await memberSvc.addMember(name, email, phone);

            await transaction.commit();
            return res.status(201).json({
                status: 'OK',
                message: 'Member added successfully',
                data: member
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { member_code } = req.params;
            const { name, email, phone } = body;

            let member = await memberSvc.getMemberByCode(member_code);
            if (!member) return err.not_found(res, "Member not found");

            transaction = await sequelize.transaction();
            member = await memberSvc.updateMember(
                member.code,
                name || member.name,
                email || member.email,
                phone || member.phone
            );

            member = await memberSvc.getMemberByCode(member_code);

            await transaction.commit();
            return res.status(200).json({
                status: 'OK',
                message: 'Member updated successfully',
                data: member
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { member_code } = req.params;

            let member = await memberSvc.getMemberByCode(member_code);
            if (!member) return err.not_found(res, "Member not found");

            await memberSvc.deleteMember(member.code);

            return res.status(200).json({
                status: 'OK',
                message: 'Member deleted successfully',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    },
}