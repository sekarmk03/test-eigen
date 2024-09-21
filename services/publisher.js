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
                    attributes: ['id', 'title']
                }
            ];
        }

        const publishers = await Publisher.findAndCountAll({
            ...opts,
            order: [
                [sort, sortType]
            ]
        });

        return publishers;
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