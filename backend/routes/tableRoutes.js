const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, tableController.getTables);
router.post('/add', isAuthenticated, tableController.createTable);

router.get('/delete/:id', isAuthenticated, tableController.deleteTable);

router.get('/edit/:id', isAuthenticated, tableController.showEditForm);
router.post('/update/:id', isAuthenticated, tableController.updateTable);

module.exports = router;