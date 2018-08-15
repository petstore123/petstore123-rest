var express = require('express');
var registrations = require('./controllers/registrations/controller.js');
var students = require('./controllers/students/controller.js');

var router = express.Router();

router.route('/register').post(registrations.create);
router.route('/commonstudents').post(students.findAll);

module.exports = router;