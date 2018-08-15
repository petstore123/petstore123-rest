var _ = require('lodash');

module.exports = {
    create: function(request, response){
        console.log("request:");
        console.log(request.body);

        const teacher = request.body['teacher'];
        const students = request.body['students'];

        if(_.isEmpty(teacher) || !(_.size(students) >= 1)){
            console.log("at least one teacher and one student");
        }
        if(_.uniq(students).length !== _.size(students)){
            console.log("students list contains duplicate");
        }

        try {
            students.forEach(function(student){
                response.locals.connection.query('insert into registrations(teacher,student) values("'+teacher+'","'+student+'")', function (error, results, fields) {
                    if(error) throw error;
                });
            });
            response.sendStatus(204);
        }catch(err){
            throw err;
        }
    }
}