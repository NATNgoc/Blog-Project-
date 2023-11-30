const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const postController = require('../../controllers/post.contronller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const PostValidator = require('../../middleware/validator/post.validator')
const { autherizePermission } = require('../../middleware/auth/checkPermission')
const { Permission } = require('../../utils/role.utils')

router.post('/', catchError(autherizeAccessToken), catchError(PostValidator.createPostValidator), catchError(postController.createNewPost))
router.get('/', catchError(autherizeAccessToken), catchError(postController.getAllPost))
router.get('/author', catchError(autherizeAccessToken), catchError(postController.getAllPostOfAuthor))
router.patch('/:id/status', catchError(autherizeAccessToken), catchError(autherizePermission(Permission.ADMIN)), catchError(postController.updateStatusOfPost))


module.exports = router