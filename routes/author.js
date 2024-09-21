const express = require('express');
const router = express.Router();
const { author } = require('../controllers');

router.get('/', author.index);
router.get('/:id', author.show);
router.post('/', author.create);
router.put('/:author_id', author.update);
router.delete('/:author_id', author.delete);

module.exports = router;