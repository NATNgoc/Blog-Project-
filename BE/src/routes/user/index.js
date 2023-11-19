const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const userController = require('../../controllers/user.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')

router.patch('/password', catchError(autherizeAccessToken), catchError(userController.resetPassword))



module.exports = router