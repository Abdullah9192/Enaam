const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require( '../Controller/UserController.js');

const router = express.Router();

router.post('/' , createUser); 
router.get('/', getAllUsers); 
router.get('/:id', authenticate ,authorize(['admin']),getUserById); 
router.put('/:id', authenticate , updateUser); 
router.delete('/:id', authenticate , deleteUser); 


module.exports = router;
