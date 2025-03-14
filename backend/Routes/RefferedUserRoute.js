const express = require( 'express');
const { authorize } = require( '../Middleware/Aurthorize.js');
const { authenticate } = require( '../Middleware/Authenticate.js');
const {
    getReferredUsers
} = require( '../Controller/RefferedUser.js');

const router = express.Router();

router.get('/users/:id', authenticate, authorize(['ambassador' , 'admin']), getReferredUsers); 


module.exports = router;
