const express = require('express')
const compression = require('compression')
const helmet = require('helmet');
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser');

//INIT MIDDLEWARE

app.use(morgan('dev'))
// setting base
app.use(helmet.frameguard({
    action: 'deny'
}));
// strict transport security
const reqDuration = 2629746000;
app.use(
    helmet.hsts({
        maxAge: reqDuration,
    })
);
// content security policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
    },
}))
// x content type options
app.use(helmet.noSniff());
// x xss protection
app.use(helmet.xssFilter())
// referrer policy
app.use(helmet.referrerPolicy({
    policy: "no-referrer",
}))
app.use(compression())
// setting body parser, cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
//init db
require('./dbs/init.mongodb')
//init app route
require('./routes/index')(app)

// hanlde error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    console.error(error)
    return res.status(statusCode).json({
        error: true,
        code: statusCode,
        message: error.message
    })
})

module.exports = app