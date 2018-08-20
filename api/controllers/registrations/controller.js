const _ = require('lodash');
const registrationsDao = require('../../persistence/registrations/persistence.js');
const studentsDao = require('../../persistence/students/persistence.js');
const boom = require('boom');

module.exports = {
    create: function(request, response, next){
        console.log("request:");
        console.log(request.body);

        const teacher = request.body['teacher'];
        const students = request.body['students'];

        if(_.isEmpty(teacher)){
            return next(boom.badRequest('teacher is empty or not present'));
        }
        if((_.size(students) < 1)){
            return next(boom.badRequest('student list is empty or not present'));
        }
        students.map(function(student){
            if(_.isEmpty(student)){
                return next(boom.badRequest('one or more student is empty'));
            }
        });
        if(_.uniq(students.map(student => student.toLowerCase())).length !== _.size(students.map(student => student.toLowerCase()))){
            return next(boom.badRequest('student list has duplicates'));
        }

        try {
            students.forEach(function(student){
                studentsDao.create(student);
                registrationsDao.create(teacher, student);
            });
            response.sendStatus(204);
        }catch(err){
            throw err;
        }
    }
}