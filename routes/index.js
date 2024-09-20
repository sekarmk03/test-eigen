const express = require('express');
const router = express.Router();

const circulation = require('./circulation');

router.use('/circulations', circulation);

module.exports = router;