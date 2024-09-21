const express = require('express');
const router = express.Router();
const { member } = require('../controllers');

router.get('/', member.index);
router.get('/:member_code', member.show);
router.get('/:member_code/penalties', member.penalty);
router.get('/:member_code/circulations', member.circulation);
router.post('/', member.create);
router.put('/:member_code', member.update);
router.delete('/:member_code', member.delete);

module.exports = router;