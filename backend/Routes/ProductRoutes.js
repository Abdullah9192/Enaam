const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js'); 
const {
    createProduct , updateProduct , deleteProduct , getProduct
} = require( '../Controller/ProductController.js');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']),createProduct);
router.put('/:id', authenticate, authorize(['admin']),updateProduct);
router.delete('/:id', authenticate, authorize(['admin']),deleteProduct); 
router.get('/', getProduct);



module.exports = router;
