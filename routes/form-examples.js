const express = require('express');
const router = express.Router();
const FormExamplesController = require('../controllers/form-example');

router.post('/form-example',  FormExamplesController.addFormExample);
router.get('/form-example', FormExamplesController.getFormExamples);
router.put('/form-example/:id', FormExamplesController.updateFormExample);

module.exports = router;