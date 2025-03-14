const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer
} = require( '../Controller/OfferController.js');

const router = express.Router();

router.post('/' , authenticate , authorize(['admin']),createOffer); 
router.get('/' , getAllOffers); 
router.put('/:id' , authenticate , authorize(['admin']),updateOffer); 
router.delete('/:id' , authenticate , authorize(['admin']),deleteOffer); 




module.exports = router;
