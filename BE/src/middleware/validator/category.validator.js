const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')

const createCategoryValidator = (req, res, next) => {
    const { name, description } = req.body

    checkNullForObject({ name, description })
    if (name.length < 3 || description.length < 10) throw new Error.BadRequestError("Input is not valid")
    next()
}

module.exports = {
    createCategoryValidator
}

