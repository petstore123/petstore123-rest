var _ = require('lodash');

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

        let query = 'select student from registrations where teacher = "'+ teachers[0] + '"';
        teachers.forEach(function(teacher){
            if(teacher !== teachers[0]){
                const condition = ' and student in (select student from registrations where teacher = "' + teacher + '")';
                query = query.concat(condition);
            }
        });
        console.log(query);

        try {
            response.locals.connection.query(query, function (error, results, fields) {
                if(error) throw error;

                let students = [];
                results.forEach(function(student){
                    students.push(student['student']);
                });
                let data = {
                    "students": students
                }
                response.status(200).send(data);
            });
        }catch(err){
            throw err;
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
        students = _.forEach(students, function(student){
            return student.substr(1);
        });

        console.log(students);

    },
    update: function(request, response){
        console.log("request:");
        console.log(request.body);

        const student = request.body['student'];

        if(_.isEmpty(student)){
            console.log("at least one one student");
        }

        try {
            response.locals.connection.query('update students set suspended = "Y" where student = "' + student + '"', function (error, results, fields) {
                if(error) throw error;
            });
            response.sendStatus(204);
        }catch(err){
            throw err;
        }
    }
}