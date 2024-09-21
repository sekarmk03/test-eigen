const express = require('express');
const router = express.Router();
const { member } = require('../controllers');

router.get('/', member.index);

module.exports = router;