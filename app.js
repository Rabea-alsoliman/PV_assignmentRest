const express =require('express');
const bodyParser = require('body-parser');
const logger =require('morgan');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/PV-restAssignment1')

// Import routes modules
const users = require('./routes/users.route');

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});


// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
// Roures 
app.use('/users', users);


// Catch 404 Errors and forward then to error handler 
app.use((req, res, next) => {
    //console.log(req);
    const err = new Error(`Route ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});


// Error handler function 
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    // Respond to ourselves
    console.error(err);
});

// Start the server 
const port = app.get('port') || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
