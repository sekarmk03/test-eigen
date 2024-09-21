const express = require('express');
const router = express.Router();
const { publisher } = require('../controllers');

router.get('/', publisher.index);
router.get('/:id', publisher.show);
router.post('/', publisher.create);
router.put('/:id', publisher.update);
router.delete('/:id', publisher.delete);

module.exports = router;