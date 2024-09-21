const express = require('express');
const router = express.Router();
const { author } = require('../controllers');

router.get('/', author.index);
router.get('/:id', author.show);
router.post('/', author.create);
router.put('/:id', author.update);
router.delete('/:id', author.delete);

module.exports = router;