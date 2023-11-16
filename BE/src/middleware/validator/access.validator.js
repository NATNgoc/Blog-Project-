'use strict'

const { checkNullForObject, isEmptyObject } = require("../../utils")
const Error = require('../../core/error.response')
const emailRegrex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const bcrypt = require('bcrypt')

//---------------------SIGN UP---------------------------------
const signUpValidator = async (req, res, next) => {
    const {
        user_nickname, user_email, user_password, user_profilePhotoURL,
        user_website, user_bio, user_gender
    } = req.body

    if (checkNullForObject({ user_nickname, user_email, user_password, user_gender })) throw new Error.BadRequestError('Not find info for sign Up')

    if (!emailRegrex.test(user_email)) throw new Error.BadRequestError('Email not availible for sign Up')

    if (user_nickname.length < 3 || user_nickname.length > 20) throw new Error.BadRequestError('Nickname not valid')

    if (user_password.length < 8) throw new Error.BadRequestError('Password for valid')

    next()
}
//-----------------LOGIN--------------------------------------
const loginValidator = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) throw new Error.BadRequestError("Please check login information again!")

    next()
}


module.exports = {
    signUpValidator,
    loginValidator
}


