const express = require('express');
const router = express.Router();
const { book } = require('../controllers');

router.get('/', book.index);
router.get('/available', book.available);
router.get('/:book_code', book.show);
router.post('/', book.create);
router.put('/:book_code', book.update);
router.delete('/:book_code', book.delete);

module.exports = router;