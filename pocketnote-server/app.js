var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require("morgan");
var mongoose = require('mongoose');
const dataBaseConfig = require('./configurations/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const AppError = require('./helpers/error-handler');
const globalErrorHandler = require('./controllers/error-controller');

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
const usersRouter = require('./routes/users-routes');
const notesRouter = require('./routes/notes-routes');
const storiesRouter = require('./routes/stories-routes');
const productsRouter = require('./routes/products-routes');
const categoriesRouter = require('./routes/categories-routes');
const subcategoriesRouter = require('./routes/subcategories-routes');
const cartsRouter = require('./routes/cart-routes');
const ordersRouter = require('./routes/orders-routes');
const addressesRouter = require('./routes/addresses-routes');

app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/stories', storiesRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/addresses', addressesRouter);

// Index Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// for swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// for all unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

// Start Server
app.listen(port, () => {
    console.log('Server started on port >> ' + port);
});