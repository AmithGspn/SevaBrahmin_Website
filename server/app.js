let express = require('express');

let cookieParser = require('cookie-parser');
let logger = require('morgan');
let device = require('express-device');
let browser = require('browser-detect');
let bodyParser = require('body-parser');
let compression = require('compression');
let cors = require('cors');
let config = require('./config');


// Define Routes
let registerationRouter = require('./routes/userRegisterationManager');
let volunteerRouter = require('./routes/volunteerManager');
let recipientRouter = require('./routes/recipientManager');

// Initialize the Express App and Configure
let app = express();
app.enable('trust proxy');

// CORS
app.use(cors({
    'allowedHeaders': ['X-Requested-With', 'Content-Type', config.SWITCH_HEADER],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(device.capture({ parseUserAgent: true }));
app.use(compression({
    threshold: 1
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Logging Configuration
logger.token('deviceSource', function (req, res) {
    let deviceSource = req.headers['device'];
    if (deviceSource == undefined) deviceSource = "Browser";
    return deviceSource;
});
logger.token('browser', function (req, res) {
    let result = browser(req.headers['user-agent']);
    if (result.name === undefined) result.name = 'Safari';
    return result.name;
});
logger.token('device-type', function (req, res) { return req.device.type; });
logger.token('device-name', function (req, res) { return req.device.name; });

if (process.env.NODE_ENV !== 'simulate') {
    app.use(
        logger('[:date[iso]]  :method  :status  :url  :remote-addr  :response-time ms :device-type :device-name :browser :deviceSource')
    );
}

// URLs
// Authenticated URLs

app.use('/userRegisterationManager', registerationRouter);
app.use('/volunteerManager', volunteerRouter);
app.use('/recipientManager', recipientRouter);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Page not found');
    err.status = 404;
    err.message = "Invalid API Call"
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err.stack);
    let message = err.message || "Internal Server Error";
    let errStatus = err.status || 500;
    res.status(errStatus);
    res.json({
        warning: message
    });
});

module.exports = app;