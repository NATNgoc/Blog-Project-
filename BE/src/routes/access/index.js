const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const AcccessValidator = require('../../middleware/validator/access.validator')
const AccessController = require('../../controllers/access.controller')

router.post('/sign_up', catchError(AcccessValidator.signUpValidator), catchError(AccessController.signUp))
router.post('/login', catchError(AcccessValidator.loginValidator), catchError(AccessController.login))


module.exports = router


