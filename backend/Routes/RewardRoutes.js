const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js');  
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
    createReward,
    updateReward,
    deleteReward,
    getRewards
} = require( '../Controller/RewardController.js');

const router = express.Router();

router.post('/', authenticate,authorize(['admin']), createReward);
router.put('/:id', authenticate, authorize(['admin']),updateReward);
router.delete('/:id', authenticate, authorize(['admin']),deleteReward);
router.get('/',getRewards);

module.exports = router;
