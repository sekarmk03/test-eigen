const { publisherSvc } = require('../services');
const { sequelize } = require('../models');
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

            let publishers = null;
            let pagination = null;
            if (option == "false") {
                publishers = await publisherSvc.getPublishers(limit, start, sort, type);
                pagination = paginate(publishers.count, publishers.rows.length, limit, page, start, end);
            } else {
                publishers = await publisherSvc.getPublishers(0, 0, sort, type);
                publishers = publishers.rows;
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Publishers data retrieved successfully',
                pagination,
                data: publishers,
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const publisher = await publisherSvc.getPublisherById(id);
            if (!publisher) return err.not_found(res, "Publisher not found");

            return res.status(200).json({
                status: 'OK',
                message: 'Publisher data retrieved successfully',
                data: publisher
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;
            const { name, address, email } = body;

            transaction = await sequelize.transaction();
            const publisher = await publisherSvc.addPublisher(name, address, email);

            await transaction.commit();
            return res.status(201).json({
                status: 'OK',
                message: 'Publisher created successfully',
                data: publisher
            }); 
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        try {
            const { id } = req.params;
            const body = req.body;
            const { name, address, email } = body;

            let publisher = await publisherSvc.getPublisherById(id);
            if (!publisher) return err.not_found(res, "Publisher not found");

            transaction = await sequelize.transaction();
            publisher = await publisherSvc.updatePublisher(
                publisher.id,
                name || publisher.name,
                address || publisher.address,
                email || publisher.email
            );

            publisher = await publisherSvc.getPublisherById(id);

            await transaction.commit();
            return res.status(200).json({
                status: 'OK',
                message: 'Publisher updated successfully',
                data: publisher
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            let publisher = await publisherSvc.getPublisherById(id);
            if (!publisher) return err.not_found(res, "Publisher not found");

            await publisherSvc.deletePublisher(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Publisher deleted successfully',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}