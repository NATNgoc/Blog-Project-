const express = require('express')
const router = express.Router()

const initApiRoute = (app) => {
    router.use('/users', require('./access/index'))
    return app.use("/api/v1", router)
}

module.exports = initApiRoute