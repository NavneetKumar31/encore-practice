var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require("morgan");
var mongoose = require('mongoose');
const dataBaseConfig = require('./configurations/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var app = express();

mongoose.connect(dataBaseConfig.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ==> ' + dataBaseConfig.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

var conn = mongoose.connection;

/** Setting up server to accept cross-origin browser requests */
app.use(cors());
app.use(function (req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Port Number
const port = 3000;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/productImages/', express.static('./productImages'));

// for logger
app.use(morgan("dev"));

// Body Parser Middleware
app.use(bodyParser.json());

//routes for api
const users = require('./routes/users-routes');
const notes = require('./routes/notes-routes');

app.use('/users', users);
app.use('/notes', notes);

// for all unhandled routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

// Index Route
app.get('/', (req, res) => {
    // res.send('<h3>Hi! you have reached to the end point of IIFT Server</h3>');
    res.sendFile(path.join(__dirname + '/index.html'));
});

// for swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server
app.listen(port, () => {
    console.log('Server started on port >> ' + port);
});