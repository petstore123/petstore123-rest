const database = require('../../database.js');

module.exports = {
    create: function(student) {
        return new Promise(function(resolve, reject) {
            let query = 'insert into students (student, suspended) select * from (select ?, "N") as tmp where not exists (select student, suspended from students where student = ?) limit 1';
            let params = [student, student];

            database.query(query, params, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
            });
        });
    },
    update: function(student) {
        return new Promise(function(resolve, reject) {
            let query = 'update students set suspended = "Y" where student = ?';
            let params = [student];

            database.query(query, params, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
            });
        });
    },
    findAll: function(teachers) {
        return new Promise(function(resolve, reject) {
            let query = 'select student from registrations where teacher = "'+ teachers[0] + '"';
            teachers.forEach(function(teacher){
                if(teacher !== teachers[0]){
                    const condition = ' and student in (select student from registrations where teacher = "' + teacher + '")';
                    query = query.concat(condition);
                }
            });

            database.query(query, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                let students = [];
                rows.forEach(function(student){
                    students.push(student['student']);
                });
                resolve(students);
            });
        });
    },
    findAllNotSuspended: function(students) {
        return new Promise(function(resolve, reject) {
            // check if students in notification list is suspended
            let query = 'select student from students where suspended = "N" and student in (';
            students.forEach(function(student){
                const condition = '"' + student + '",';
                query = query.concat(condition);
            });
            // remove last ','
            query = query.slice(0, -1);
            query = query.concat (')');
            console.log("query: " + query);
            database.query(query, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                let students = [];
                rows.forEach(function(student){
                    students.push(student['student']);
                });
                resolve(students);
            });
        });
    }
}