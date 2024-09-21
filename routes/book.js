const express = require('express');
const router = express.Router();
const { book } = require('../controllers');

router.get('/', book.index);

module.exports = router;