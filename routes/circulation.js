const express = require('express');
const router = express.Router();

const { circulation } = require('../controllers');

router.post('/', circulation.borrow);

module.exports = router;