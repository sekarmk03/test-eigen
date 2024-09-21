const express = require('express');
const router = express.Router();

const { circulation } = require('../controllers');

router.post('/', circulation.borrow);
router.put('/:id/return', circulation.return);

module.exports = router;