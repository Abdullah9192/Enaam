const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
  assignRole,
  removeRole,
  createRole,
  getAllRoles
} = require( '../Controller/AssignRolesController.js');

const router = express.Router();

router.post('/:id', authenticate, authorize(['admin']),assignRole); 
router.delete('/:id', authenticate, authorize(['admin']),removeRole); 
router.post('/', authenticate, authorize(['admin']),createRole); 
router.get('/', authenticate , authorize(['admin']),getAllRoles);

module.exports = router;
