const express = require('express')
const { autherizeAccessToken, autherizeRefreshToken } = require('../middleware/auth/checkAuthentication')
const { catchError } = require('../core/error.response')
const router = express.Router()

const initApiRoute = (app) => {
    router.use("/users", require('./user/index'))
    router.use('/access', require('./access/index'))
    router.use('/otps', require('./otp/index'))
    router.use('/followers', require('./follow/index'))
    return app.use("/api/v1", router)
}

module.exports = initApiRoute