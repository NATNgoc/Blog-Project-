const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')
//------------------UPDATE GENERAL PROFILE---------------------
const updateProfileValidator = async (req, res, next) => {
    const {
        user_nickname, user_profilePhotoURL,
        user_website, user_bio, user_gender
    } = req.body

    checkNullForObject({ user_nickname, user_gender })
    await Promise.all([UserUtils.checkGender(user_gender), UserUtils.checkNickName(user_nickname)])
    next()
}

const resetPasswordValidator = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    checkNullForObject({ oldPassword, newPassword })
    await Promise.all([UserUtils.checkPassword(oldPassword), UserUtils.checkPassword(newPassword)])
    next()
}

module.exports = { updateProfileValidator, resetPasswordValidator }