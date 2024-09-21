const circulationSvc = require('./circulation');
const penaltySvc = require('./penalty');
const memberSvc = require('./member');
const bookSvc = require('./book');
const authorSvc = require('./author');
const publisherSvc = require('./publisher');

module.exports = {
    circulationSvc,
    penaltySvc,
    memberSvc,
    bookSvc,
    authorSvc,
    publisherSvc
}