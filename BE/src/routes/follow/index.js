const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const followController = require('../../controllers/follow.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')

router.post('/', catchError(autherizeAccessToken), catchError(followController.followUser))
router.delete('/', catchError(autherizeAccessToken), catchError(followController.unFollowUser))
router.get('/followers', catchError(autherizeAccessToken), catchError(followController.getAllFollower))
router.get('/followings', catchError(autherizeAccessToken), catchError(followController.getAllFollowing))
router.post('/status', catchError(autherizeAccessToken), catchError(followController.changeStatus))


module.exports = router


