const express = require('express')
const compression = require('compression')
const helmet = require('helmet');
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')

const mongoSanitize = require('express-mongo-sanitize');
//INIT MIDDLEWARE
app.use(cors())
//morgan
app.use(morgan('dev'))
//mongoSanitize
app.use(mongoSanitize());
//Wiston
const logger = require('./configs/config.wiston')
//Helmet
require('./configs/config.helmet')(app)
//Compression
app.use(compression())
// setting body parser, cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
//init db
require('./dbs/init.mongodb')
//init app route
require('./routes/index')(app)
//init docs
require('./configs/config.swagger')(app)
// hanlde error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    logger.error({ message: error.message, userId: req.decodeUser.userid, stack: error.stack })
    return res.status(statusCode).json({
        error: true,
        code: statusCode,
        message: error.message
    })
})

module.exports = app