const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const seriesController = require('../../controllers/series.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const seriesValidator = require('../../middleware/validator/series.validator')

router.post('/', catchError(autherizeAccessToken), catchError(seriesValidator.createSeriesValidator), catchError(seriesController.createNewSeries))
router.delete('/:id', catchError(autherizeAccessToken), catchError(seriesController.deleteSeries))

module.exports = router