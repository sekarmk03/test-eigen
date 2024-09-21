const express = require('express');
const router = express.Router();

const circulation = require('./circulation');
const book = require('./book');
const member = require('./member');

router.use('/circulations', circulation);
router.use('/books', book);
router.use('/members', member);

module.exports = router;