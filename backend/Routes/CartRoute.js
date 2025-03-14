const express = require( 'express');
const {
    updateCart,
    getCart
} = require( '../Controller/CartController.js');

const router = express.Router();

router.put('/:id', updateCart); 
router.get('/:id', getCart); 

module.exports = router;
