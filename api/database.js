const mysql=require('mysql');
const connection=mysql.createPool({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'abcd1234',
    database : 'petstore123'
});
module.exports=connection;