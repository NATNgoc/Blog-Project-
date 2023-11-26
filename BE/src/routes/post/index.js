const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const postController = require('../../controllers/post.contronller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')


router.post('/', catchError(autherizeAccessToken), catchError(postController.createNewPost))



module.exports = router