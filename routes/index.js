const express = require('express');
const router = express.Router();

const circulation = require('./circulation');
const book = require('./book');
const member = require('./member');
const author = require('./author');

router.use('/circulations', circulation);
router.use('/books', book);
router.use('/members', member);
router.use('/authors', author);

module.exports = router;