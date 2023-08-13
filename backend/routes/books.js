const express = require('express');
const ctrlBooks = require('../controllers/books');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const sharp = require('../middlewares/sharp-config');
const router = express.Router();
//La méthodeexpress.Router() permet de créer des routeurs séparés pour chaque route principale de l'application 

router.post('/',auth,multer,sharp,ctrlBooks.createBook )
router.put('/:id', auth,multer,sharp, ctrlBooks.modifyBook);
router.delete('/:id',auth, ctrlBooks.deleteBook);
router.get('/',ctrlBooks.getAllBooks);
router.get('/bestrating',ctrlBooks.getBestRated);
router.get('/:id',ctrlBooks.getOneBook);
router.post('/:id/rating',auth,ctrlBooks.rateBook);

module.exports = router;