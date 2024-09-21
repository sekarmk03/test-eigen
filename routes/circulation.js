const express = require('express');
const router = express.Router();

const { circulation } = require('../controllers');

router.get('/', circulation.index);
router.post('/', circulation.borrow);
router.put('/:id/return', circulation.return);

module.exports = router;