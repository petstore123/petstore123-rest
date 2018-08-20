const express = require('express');

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();
app.use(express.json());

const router = require('./router.js');
app.use('/api', router);

app.use((err, req, res, next) => {
    return res.status(err.output.statusCode).json(err.output.payload);
});

app.listen(PORT, HOST, function () {
    console.log('App listening on port ' + PORT);
});