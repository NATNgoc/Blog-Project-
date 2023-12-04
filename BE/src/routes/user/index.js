const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const userController = require('../../controllers/user.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const UserValidator = require('../../middleware/validator/user.validator')



router.patch('/password', catchError(autherizeAccessToken), catchError(UserValidator.resetPasswordValidator), catchError(userController.resetPassword))
router.patch('/', catchError(autherizeAccessToken), catchError(UserValidator.updateProfileValidator), catchError(userController.updateGeneralProfile))
router.post('/wishList', catchError(autherizeAccessToken), catchError(UserValidator.addWishListValidator), catchError(userController.addToWishList))
router.delete('/wishList', catchError(autherizeAccessToken), catchError(UserValidator.removeWishListValidator), catchError(userController.removeToWishList))

module.exports = router