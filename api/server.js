const express = require('express');
const app = express();
app.use(express.json());

const router = require('./router.js');
app.use('/api', router);

app.use((err, req, res, next) => {
    return res.status(err.output.statusCode).json(err.output.payload);
});

app.listen(3000, function () {
    console.log('Dev app listening on port 3000!');
});