const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')
const Utils = require('../../utils/index')
//------------------UPDATE GENERAL PROFILE---------------------
const requiredFields = {
    UPDATE: ["user_nickname", "user_profilePhotoURL", "user_website", "user_bio", "user_gender"],
    RESET_PASSWORD: ["oldPassword", "newPassword"]

}

const updateProfileValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.UPDATE)
    const { user_nickname, user_gender } = filteredRequestObject
    checkNullForObject({ user_nickname, user_gender })
    await Promise.all([UserUtils.checkGender(filteredRequestObject.user_gender), UserUtils.checkNickName(filteredRequestObject.user_nickname)])
    next()
}

const resetPasswordValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.RESET_PASSWORD)
    checkNullForObject(filteredRequestObject)
    await Promise.all([UserUtils.checkPassword(filteredRequestObject.oldPassword), UserUtils.checkPassword(filteredRequestObject.newPassword)])
    next()
}

module.exports = { updateProfileValidator, resetPasswordValidator }