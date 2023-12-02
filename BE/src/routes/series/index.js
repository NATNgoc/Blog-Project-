const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const seriesController = require('../../controllers/series.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const seriesValidator = require('../../middleware/validator/series.validator')

router.post('/', catchError(autherizeAccessToken), catchError(seriesValidator.SeriesValidator), catchError(seriesController.createNewSeries))
router.delete('/:id', catchError(autherizeAccessToken), catchError(seriesController.deleteSeries))
router.get('/user', catchError(autherizeAccessToken), catchError(seriesController.findAllSeriesOfUser))
router.post('/:id/posts', catchError(autherizeAccessToken), catchError(seriesController.addPostsIntoSeries))
router.delete('/:id/posts', catchError(autherizeAccessToken), catchError(seriesController.removePostsFromSeries))
module.exports = router