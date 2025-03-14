const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    getSalesAndParticipants,
    getSalesAndTicketsByDate
} = require( '../Controller/OrderController.js');

const router = express.Router();

router.post('/', authenticate, authorize(['user']),createOrder);
router.post('/getsaledifference', authenticate, authorize(['view','admin']), getSalesAndTicketsByDate);
router.get('/totalsalesandparticipants', authenticate, authorize(['view','admin']),getSalesAndParticipants); 
router.get('/', authenticate, authorize(['admin']),getAllOrders);
router.get('/:id', authenticate, authorize(['admin', 'user']),getOrdersByUserId); 


module.exports = router;
