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
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Delete series succesfully!",
            metaData: await SeriesService.deleteSeries(req.decodeUser.userid, req.params.id)
        }).send(res)
    }

    findAllSeriesOfUser = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "All series of user!",
            metaData: await SeriesService.findAllSeriesOfUser(req.decodeUser.userid, req.query)
        }).send(res)
    }

    addPostsIntoSeries = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Add post successfully!",
            metaData: await SeriesService.addPostsIntoSeries(req.decodeUser.userid, req.body, req.params.id)
        }).send(res)
    }

    removePostsFromSeries = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Add post successfully!",
            metaData: await SeriesService.removePostFromSeries(req.decodeUser.userid, req.body, req.params.id)
        }).send(res)
    }

}

const seriesController = new SeriesController()
module.exports = seriesController
