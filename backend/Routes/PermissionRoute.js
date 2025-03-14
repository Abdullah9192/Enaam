const express = require('express');
const { authenticate } = require ('../Middleware/Authenticate.js');
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
    createPermission,
    assignPermissionToRole,
    getAllPermissions,
    removePermissionFromRole
} = require ('../Controller/PermissionController.js');

const router = express.Router();

router.post('/'  , authenticate, authorize(['admin']),createPermission); 
router.post('/assign'  ,authenticate, authorize(['admin']),assignPermissionToRole); 
router.get('/' ,authenticate, authorize(['admin']),getAllPermissions); 
router.delete('/'  ,authenticate, authorize(['admin']),removePermissionFromRole); 



module.exports = router;
