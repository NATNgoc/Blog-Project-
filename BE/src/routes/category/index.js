const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const categoryController = require('../../controllers/category.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const { autherizePermission } = require('../../middleware/auth/checkPermission')
const { Permission } = require('../../utils/role.utils')
const { createCategoryValidator } = require('../../middleware/validator/category.validator')


router.post('/', catchError(createCategoryValidator), catchError(autherizeAccessToken), catchError(autherizePermission(Permission.ADMIN)), catchError(categoryController.createNewCategory))


module.exports = router


