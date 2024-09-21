const { sequelize } = require('../models');
const { memberSvc, penaltySvc, circulationSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../utils/errors');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", option = "false"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let members = null;
            let pagination = null;

            if (option == "false") {
                members = await memberSvc.getMembers(limit, start, sort, type);
                pagination = paginate(members.count, members.rows.length, limit, page, start, end);
            } else {
                members = await memberSvc.getMembers(0, 0, sort, type);
            }

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

    show: async (req, res, next) => {
        try {
            const { member_code } = req.params;

            const member = await memberSvc.getMemberByCode(member_code);
            if (!member) return err.not_found(res, "Member not found");

            return res.status(200).json({
                status: 'OK',
                message: 'Member data retrieved successfully',
                data: member
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

    circulation: async (req, res, next) => {
        try {
            const { member_code } = req.params;
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", option = "false"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let circulations = null;
            let pagination = null;
            if (option == "false") {
                circulations = await circulationSvc.getCirculationsByMember(member_code, limit, start, sort, type);
                pagination = paginate(circulations.count, circulations.rows.length, limit, page, start, end);
            } else {
                circulations = await circulationSvc.getCirculationsByMember(member_code, 0, 0, sort, type);
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Circulations data retrieved successfully',
                pagination,
                data: circulations.rows,
            });
        } catch (error) {
            next(error);
        }
    },

    penalty: async (req, res, next) => {
        try {
            const { member_code } = req.params;
            const penalties = await penaltySvc.getPenaltiesByMember(member_code);

            return res.status(200).json({
                status: 'OK',
                message: 'Penalties data retrieved successfully',
                data: penalties
            });
        } catch (error) {
            next(error);
        }
    }
}