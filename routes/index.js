const express = require('express');
const router = express.Router();

const circulation = require('./circulation');
const book = require('./book');
const member = require('./member');
const author = require('./author');
const publisher = require('./publisher');

router.use('/circulations', circulation);
router.use('/books', book);
router.use('/members', member);
router.use('/authors', author);
router.use('/publishers', publisher);

module.exports = router;