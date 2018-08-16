var database = require('../../database.js');

module.exports = {
    create: function(teacher, student) {
        return new Promise(function(resolve, reject) {
            let query = 'insert into registrations(teacher,student) values(?, ?)';
            let params = [teacher, student];

            database.query(query, params, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
            });
        });
    },
    findAllByTeacher: function(teacher) {
        return new Promise(function(resolve, reject) {
            let query = 'select student from registrations left join students using (student) where suspended = "N" and teacher = ?';
            let params = [teacher];
            database.query(query, params, function (err, rows, fields) {
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