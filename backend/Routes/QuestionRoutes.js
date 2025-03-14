const express = require( 'express');
const { authenticate } = require( '../Middleware/Authenticate.js'); 
const { authorize } = require( '../Middleware/Aurthorize.js');
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
} = require( '../Controller/QuestionController.js');

const router = express.Router();


router.post('/', authenticate, authorize(['admin']),createQuestion);
router.put('/:id', authenticate,authorize(['admin']), updateQuestion);
router.delete('/:id', authenticate,authorize(['admin']), deleteQuestion);
router.get('/', authenticate, authorize(['admin' , 'user']),getQuestions);

module.exports = router;
