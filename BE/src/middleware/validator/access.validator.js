'use strict'

const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')

//---------------------SIGN UP---------------------------------
const signUpValidator = async (req, res, next) => {
    const {
        user_nickname, user_email, user_password, user_profilePhotoURL,
        user_website, user_bio, user_gender
    } = req.body

    checkNullForObject({ user_nickname, user_email, user_password, user_gender })
    await Promise.all([UserUtils.checkEmail(user_email), UserUtils.checkGender(user_gender), UserUtils.checkNickName(user_nickname), UserUtils.checkPassword(user_password)])

    next()
}

//-----------------LOGIN--------------------------------------
const loginValidator = async (req, res, next) => {
    const { email, password } = req.body

    if (checkNullForObject({ email, password })) throw new Error.BadRequestError("Please check login information again!")

    next()
}


module.exports = {
    signUpValidator,
    loginValidator
}


