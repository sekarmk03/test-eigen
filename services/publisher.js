const { Publisher, Book } = require('../models');

module.exports = {
    getPublishers: async (limit, offset, sort, sortType) => {
        let opts = {};
        if (limit && limit != undefined && limit != null && limit > 0) {
            opts.limit = limit;
            opts.offset = offset;
            opts.include = [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['code', 'title']
                }
            ];
        } else {
            opts.attributes = ['id', 'name'];
        }

        const publishers = await Publisher.findAndCountAll({
            ...opts,
            order: [
                [sort, sortType]
            ]
        });

        return publishers;
    },

    getPublisherById: async (id) => {
        const publisher = await Publisher.findByPk(id, {
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['code', 'title']
                }
            ]
        });

        return publisher;
    },

    addPublisher: async (name, address, email) => {
        const publisher = await Publisher.create({
            name: name,
            address: address,
            email: email
        });

        return publisher;
    },

    deletePublisher: async (id) => {
        const publisher = await Publisher.destroy({
            where: {
                id: id
            }
        });

        return publisher;
    },

    updatePublisher: async (id, name, address, email) => {
        const publisher = await Publisher.update({
            name: name,
            address: address,
            email: email
        }, {
            where: {
                id: id
            }
        });

        return publisher;
    },
}