var express = require('express');
var app = express();
app.use(express.json());


var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
    res.locals.connection = mysql.createConnection({
        host     : 'petstore123.cautoveljups.ap-southeast-1.rds.amazonaws.com',
        port     : '9876',
        user     : '',
        password : '',
        database : 'petstore123'
    });
    res.locals.connection.connect();
    next();
});

var router = require('./router.js');
app.use('/api', router);

app.listen(3000, function () {
    console.log('Dev app listening on port 3000!');
});