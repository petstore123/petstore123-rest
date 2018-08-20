const _ = require('lodash');
const studentsDao = require('../../persistence/students/persistence.js');
const registrationsDao = require('../../persistence/registrations/persistence.js');
const boom = require('boom');

module.exports = {
    findAllByTeacher: function(request, response, next){
        console.log("request:");
        console.log(request.body);
        console.log("query:");
        console.log(request.query);

        const teachers = request.query['teacher'];

        if(teachers instanceof Array){
            const teacher = teachers.some(teacher => _.isEmpty(teacher));
            if(teacher){
                return next(boom.badRequest('one or more teacher is empty'));
            }
        }else{
            if(_.isEmpty(teachers)){
                return next(boom.badRequest('teacher is empty'));
            }
        }

        if(teachers instanceof Array){
            studentsDao.findAllByCommonTeachers(teachers).then(function(students) {
                let data = {
                    "students": students
                }
                response.status(200).send(data);
            }).catch((err) => setImmediate(() => { throw err; }));
        }else{
            studentsDao.findAllByTeacher(teachers).then(function(students) {
                let data = {
                    "students": students
                }
                response.status(200).send(data);
            }).catch((err) => setImmediate(() => { throw err; }));
        }
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
    update: function(request, response, next){
        console.log("request:");
        console.log(request.body);

        const student = request.body['student'];

        if(_.isEmpty(student)){
            console.log("at least one one student");
        }

        studentsDao.findOne(student).then(function(students){
            if(!students){
                return next(boom.badRequest('student not found'));
            }

            studentsDao.update(student).then(function(){
                response.sendStatus(200);
            });
        });
    }
}