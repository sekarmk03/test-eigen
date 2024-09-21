const express = require('express');
const router = express.Router();
const { member } = require('../controllers');

router.get('/', member.index);
router.post('/', member.create);
router.put('/:member_code', member.update);
router.delete('/:member_code', member.delete);

module.exports = router;