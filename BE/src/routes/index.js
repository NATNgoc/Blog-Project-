const express = require('express')
const { autherizeAccessToken, autherizeRefreshToken } = require('../middleware/auth/checkAuthentication')
const { catchError } = require('../core/error.response')
const router = express.Router()

const initApiRoute = (app) => {
    router.post("/authen", catchError(autherizeRefreshToken))
    router.use('/users', require('./access/index'))
    return app.use("/api/v1", router)
}

module.exports = initApiRoute