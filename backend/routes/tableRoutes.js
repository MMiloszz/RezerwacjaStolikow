const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

router.get('/', tableController.getTables);
router.post('/add', tableController.createTable);

router.get('/delete/:id', tableController.deleteTable);

module.exports = router;