var mysql=require('mysql');
var connection=mysql.createPool({
    host     : 'localhost',
    port     : '3306',
    user     : '',
    password : '',
    database : 'petstore123'
});
module.exports=connection;