const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const requiredFields = {
    CREATE: ["series_name", "series_post_ids", "series_status"]
}

const SeriesValidator = (req, res, next) => {
    const filteredRequestObject = Utils.getRequiredFieldsFromReqBody(req.body, requiredFields.CREATE)
    console.log("🚀 ~ file: series.validator.js:11 ~ SeriesValidator ~ filteredRequestObject:", filteredRequestObject)
    checkNullForObject(filteredRequestObject)
    checkSeriesName(filteredRequestObject.series_name)
    checkSeriesPostIds(filteredRequestObject.series_post_ids)
    req.body = filteredRequestObject
    next()
}



const updateCategoryValidator = (req, res, next) => {

}

function checkSeriesPostIds(seriesPostIds) {
    if (!isValideSeriesPostIds(seriesPostIds)) throw new Error.BadRequestError("Check ids again!")
}

function isValideSeriesPostIds(seriesPostIds) {
    if (seriesPostIds.length === 0) return false
    seriesPostIds.forEach(element => {
        if (element.length !== 24) return false
    });
    return true
}

function checkSeriesName(name) {
    if (!isValidName(name)) throw new Error.BadRequestError("Series name is not valid!")
}

function isValidName(name) {
    return name.length >= 10
}



module.exports = {
    SeriesValidator,
    updateCategoryValidator
}

