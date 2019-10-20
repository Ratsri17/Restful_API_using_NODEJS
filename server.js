const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Database Config
var jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connect to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        "Tutorial": "Build REST API with node.js"
    });
});

// Public routes
app.use('/users', users);

// Private routes
app.use('/movies', validateUser, movies);

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['X-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            if (err)
                res.json({
                    status: 'error',
                    message: err.message,
                    data: null
                });
            else {
                // add user id to request
                req.body.userId = decoded.id;
                next();
            }
        }
    )
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
    res.status(404).json({message: "Not Found"});
    else
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(PORT, (err) => {
    if (err)
        throw err;
    else
        console.log(`Node server listening on PORT ${PORT}`);
});