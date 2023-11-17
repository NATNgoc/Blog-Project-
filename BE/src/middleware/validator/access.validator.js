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

    if (!isCorrectEmail(user_email)) throw new Error.BadRequestError('Email not availible for sign Up')

    if (!isCorrectNickName(user_nickname)) throw new Error.BadRequestError('Nickname not valid')

    if (!isCorrectPassword(user_password)) throw new Error.BadRequestError('Password for valid')

    next()
}
//-----------------LOGIN--------------------------------------
const loginValidator = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) throw new Error.BadRequestError("Please check login information again!")

    next()
}

function isCorrectPassword(password) {
    return password.length >= 8
}

function isCorrectNickName(nickname) {
    return nickname.length >= 3 && user_nickname.length <= 20
}

function isCorrectEmail(email) {
    return emailRegrex.test(email)
}


module.exports = {
    signUpValidator,
    loginValidator
}


