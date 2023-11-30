const SeriesService = require('../services/series.service')
const SuccesResponse = require('../core/success.response')

class SeriesController {
    createNewSeries = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Create series succesfully!",
            metaData: await SeriesService.createNewSeries(req.decodeUser.userid, req.body)
        }).send(res)
    }

    deleteSeries = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Delete series succesfully!",
            metaData: await SeriesService.deleteSeries(req.decodeUser.userid, req.params.id)
        }).send(res)
    }

}

const seriesController = new SeriesController()
module.exports = seriesController
