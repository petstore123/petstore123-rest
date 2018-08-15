var express = require('express');
var registrations = require('./controllers/registrations/controller.js');
var students = require('./controllers/students/controller.js');

var router = express.Router();

router.route('/register').post(registrations.create);
router.route('/commonstudents').get(students.findAll);
router.route('/suspend').get(students.update);
router.route('/retrievefornotifications').post(students.findAllEligibleForNotifications);

module.exports = router;