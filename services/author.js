const { Author, Book } = require('../models');

module.exports = {
    getAuthors: async (limit, offset, sort, sortType) => {
        let opts = {};
        if (limit && limit && undefined && limit != null && limit > 0) {
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

        const authors = await Author.findAndCountAll({
            ...opts,
            order: [
                [sort, sortType]
            ]
        });

        return authors;
    },

    addAuthor: async (name, bio) => {
        const author = await Author.create({
            name: name,
            bio: bio
        });

        return author;
    },

    deleteAuthor: async (id) => {
        const author = await Author.destroy({
            where: {
                id: id
            }
        });

        return author;
    },

    updateAuthor: async (id, name, bio) => {
        const author = await Author.update({
            name: name,
            bio: bio
        }, {
            where: {
                id: id
            }
        });

        return author;
    },
}