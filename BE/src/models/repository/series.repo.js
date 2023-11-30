const seriesModel = require('../series.model')

class SeriesRepository {

    static async createNewSeries(newSeriesObject) {
        return await seriesModel.create(newSeriesObject)
    }

    static async findSeriesById(seriesId) {
        return await seriesModel.findById(seriesId)
    }

    static async deleteSeriesById(seriesId) {
        return await seriesModel.findByIdAndDelete(seriesId)
    }

}

module.exports = SeriesRepository