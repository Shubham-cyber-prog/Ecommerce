
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); 

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search/:query', productController.searchProduct);

module.exports = router;
