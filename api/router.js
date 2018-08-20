const express = require('express');
const registrations = require('./controllers/registrations/controller.js');
const students = require('./controllers/students/controller.js');

const router = express.Router();

router.route('/register').post(registrations.create);
router.route('/commonstudents').get(students.findAll);
router.route('/suspend').post(students.update);
router.route('/retrievefornotifications').post(students.findAllEligibleForNotifications);

module.exports = router;