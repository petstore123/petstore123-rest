var express = require('express');
var app = express();
app.use(express.json());

var router = require('./router.js');
app.use('/api', router);

app.use((err, req, res, next) => {
    return res.status(err.output.statusCode).json(err.output.payload);
})

app.listen(3000, function () {
    console.log('Dev app listening on port 3000!');
});