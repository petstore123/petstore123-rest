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

        const query = '';
        teachers.forEach(function(teacher){
            const registrations = 'select student from registrations where teacher = "' + teacher + '"';
            query.concat(registrations, " intersect");
        });
        query.slice(-10); // remove last occurrence of 'intersect'

        try {
            response.locals.connection.query(query, function (error, results, fields) {
                if(error) throw error;
            });
            response.sendStatus(204);
        }catch(err){
            throw err;
        }
    },
    update: function(request, response){
        console.log("request:");
        console.log(request.body);

        const student = request.body['student'];

        if(_.isEmpty(student)){
            console.log("at least one one student");
        }

        try {
            response.locals.connection.query('update students set suspend = "Y" where student = "' + student + '")', function (error, results, fields) {
                if(error) throw error;
            });
            response.sendStatus(204);
        }catch(err){
            throw err;
        }
    }
}