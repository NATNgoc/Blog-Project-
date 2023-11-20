const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const userController = require('../../controllers/user.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const UserValidator = require('../../middleware/validator/user.validator')
router.patch('/password', catchError(autherizeAccessToken), catchError(userController.resetPassword))
router.patch('/', catchError(autherizeAccessToken), catchError(UserValidator.updateProfileValidator), catchError(userController.updateGeneralProfile))


module.exports = router