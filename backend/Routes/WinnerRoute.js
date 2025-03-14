const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
    winner,
    getWinners,
    deleteWinner
} = require( '../Controller/Winner.js');

const router = express.Router();

router.post('/create' , authenticate , authorize(['admin']),winner); 
router.get('/winner' , getWinners); 
router.delete('/delete/:id' , authenticate ,authorize(['admin']), deleteWinner); 



module.exports = router;
