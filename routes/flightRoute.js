const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)

router.route("/api/v1/flights").get(controller.getAllFlights).post(controller.addFlight)

router.route("/api/v1/flights/:id").get(controller.getFlight).patch(controller.updateFlight).delete(controller.deleteFlight)


module.exports = router;

