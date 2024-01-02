// helmet.js
const helmet = require('helmet');

module.exports = function configureHelmet(app) {
    const reqDuration = 2629746000;
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.hsts({ maxAge: reqDuration }));
    app.use(helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
        },
    }));
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.referrerPolicy({ policy: "no-referrer" }));
};