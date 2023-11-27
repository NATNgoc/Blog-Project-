const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const createCategoryValidator = (req, res, next) => {
    const { category_name, category_description } = req.body
    checkNullForObject({ category_name, category_description })
    if (category_name.length < 3 || category_description.length < 10) throw new Error.BadRequestError("Input is not valid")
    req.body = { category_name, category_description }
    next()
}

const updateCategoryValidator = (req, res, next) => {
    const { category_name, category_description } = req.body
    const bodyUpdate = Utils.nullObjectParser({ category_name, category_description })
    if (Utils.isEmptyObject(bodyUpdate)) throw new Error.BadRequestError("Input is not valid")
    if (category_name?.length < 3 || category_description?.length < 10) throw new Error.BadRequestError("Input is not valid")
    req.body = bodyUpdate
    next()
}

module.exports = {
    createCategoryValidator,
    updateCategoryValidator
}

