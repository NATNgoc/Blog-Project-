const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')
//------------------UPDATE GENERAL PROFILE---------------------
const updateProfileValidator = async (req, res, next) => {
    const {
        user_nickname, user_profilePhotoURL,
        user_website, user_bio, user_gender
    } = req.body

    if (checkNullForObject({ user_nickname, user_gender })) throw new Error.BadRequestError('NickName and Gender are required!')

    await Promise.all([UserUtils.checkGender(user_gender), UserUtils.checkNickName(user_nickname)])
    next()
}

module.exports = { updateProfileValidator }