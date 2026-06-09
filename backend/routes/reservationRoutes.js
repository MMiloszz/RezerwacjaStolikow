const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, reservationController.getReservations);
router.get('/add', isAuthenticated, reservationController.showReservationForm);
router.post('/add', isAuthenticated, reservationController.createReservation);

router.get('/cancel/:id', isAuthenticated, reservationController.cancelReservation);

module.exports = router;
