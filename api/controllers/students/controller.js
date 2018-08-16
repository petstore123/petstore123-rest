var _ = require('lodash');
var studentsDao = require('../../persistence/students/persistence.js');
var registrationsDao = require('../../persistence/registrations/persistence.js');

module.exports = {
    findAll: function(request, response){
        console.log("request:");
        console.log(request.body);
        console.log("query:");
        console.log(request.query);

        const teachers = request.query['teacher'];

        if(!(_.size(teachers) >= 1)){
            console.log("at least one teacher");
        }
        if(_.uniq(teachers).length !== _.size(teachers)){
            console.log("teachers list contains duplicate");
        }

        studentsDao.findAll(teachers).then(function(students) {
            let data = {
                "students": students
            }
            response.status(200).send(data);
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    findAllEligibleForNotifications: function(request, response){
        console.log("request:");
        console.log(request.body);

        const teacher = request.body['teacher'];
        const notification = request.body['notification'];

        const pattern = /(@[A-Za-z0-9._]*@[A-Za-z0-9.]*.[a-zA-z])\w+/g;
        let students = notification.match(pattern);

        // remove @ prefix
        students = students.map(function(student){ return student.substr(1); });

        console.log("students in notification: " + students);

        studentsDao.findAllNotSuspended(students).then(function(studentsNotSuspended) {
            console.log("students not suspended: " + studentsNotSuspended);
            registrationsDao.findAllByTeacher(teacher).then(function(studentsAssociatedWithTeacher) {
                console.log("students associated with teacher not suspended: " + studentsAssociatedWithTeacher);

                let eligibleStudents = _.uniq(studentsNotSuspended.concat(studentsAssociatedWithTeacher));
                const data = {
                    "recipients": eligibleStudents
                }
                response.status(200).send(data);
            }).catch((err) => setImmediate(() => { throw err; }));
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    update: function(request, response){
        console.log("request:");
        console.log(request.body);

        const student = request.body['student'];

        if(_.isEmpty(student)){
            console.log("at least one one student");
        }

        studentsDao.update(student).then(function() {
            response.sendStatus(200);
        }).catch((err) => setImmediate(() => { throw err; }));
    }
}