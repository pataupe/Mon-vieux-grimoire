const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const optimizeImage = require('../middleware/optimize-image');

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllBooks);
router.post('/', auth, multer, optimizeImage, stuffCtrl.createBook);
router.get('/bestrating', stuffCtrl.getBestRatedBooks);
router.get('/:id', stuffCtrl.getOneBook);
router.put('/:id', auth, multer, optimizeImage, stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.post('/:id/rating', auth, stuffCtrl.rateBook);


module.exports = router;