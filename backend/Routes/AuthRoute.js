const express = require( 'express');
const { login , logoutUser } = require( '../Controller/AuthController.js');

const router = express.Router();

router.post('/login', login);  
router.get('/logout/:id', logoutUser);  

module.exports = router;