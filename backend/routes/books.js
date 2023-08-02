const express = require('express');
const ctrlBooks = require('../controllers/books');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const router = express.Router();


router.post('/',auth,multer,ctrlBooks.createBook )
router.put('/:id', auth, ctrlBooks.modifyBook);
router.delete('/:id',auth, ctrlBooks.deleteBook);
router.get('/',ctrlBooks.getAllBooks);
router.get('/:id',ctrlBooks.getOneBook);

module.exports = router;