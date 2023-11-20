'use strict'

const UserRepository = require("../models/repository/user.repo")
const Error = require('../core/error.response')
const bcrypt = require('bcrypt')
const KeyService = require("./key.service")
const { encryptString } = require("../utils")
const OTPService = require("./otp.service")
//-------------------------MAIN FUNCTION-----------------------
class AccessService {
    static signUp = async (body) => {
        // await checkEmailUser(body.user_email)
        // await checkOTP(body.otp, body.user_email)
        await Promise.all([checkEmailUser(body.user_email), checkOTP(body.otp, body.user_email)])
        body.user_password = await encryptString(body.user_password, 10)
        const user = await UserRepository.createNewUser(body)
        return await KeyService.genToken(user, "NEW")
    }

    static login = async ({ email, password }) => {
        const user = await checkEmailAndPassword(email, password)
        const { accessToken, refreshToken } = await KeyService.genToken(user, "NEW")
        return { accessToken, refreshToken }
    }
}

//--------------------------SUB FUNCTION-----------------------


async function checkOTP(otp, email) {
    const OTPs = await getOTPsByEmail(email)
    if (OTPs.length === 0) throw new Error.AuthError("Your OTP code has expired or not correct!")
    const newestOTP = OTPs[0].otp.toString()
    console.log("OTP:::", OTPs, newestOTP)
    if (!await bcrypt.compare(otp, newestOTP)) throw new Error.AuthError("Your OTP code has expired or not correct!")
}

async function getOTPsByEmail(email) {
    return await OTPService.getOTPsByEmail(email)
}


async function checkEmailUser(email) {
    const currentEmail = await UserRepository.findUserByEmail(email)
    if (currentEmail) {
        throw new Error.ConflictRequestError("Email has existed!")
    }
}

async function checkEmailAndPassword(email, password) {
    const currentUser = await UserRepository.findUserByEmail(email)
    if (!currentUser) throw new Error.AuthError("User's not signed up")
    if (!await isCorrectPassword(password, currentUser.user_password)) throw new Error.AuthError("Password is not correct")
    return currentUser
}



async function isCorrectPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}



module.exports = AccessService;