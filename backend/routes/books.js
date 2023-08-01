const express = require('express');
const ctrlBooks = require('../controllers/books');
const auth = require('../middlewares/auth');
const router = express.Router();


// router.post('/',auth,ctrlBooks.createBook )
// router.put('/:id', auth, ctrlBooks.modifyBook);
// router.delete('/:id',auth, ctrlBooks.deleteBook);
// router.get('/', auth,ctrlBooks.getOneBook);
router.get('/:id', ctrlBooks.getAllBooks);

module.exports = router;