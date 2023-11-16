'use strict'

const UserRepository = require("../models/repository/user.repo")
const Error = require('../core/error.response')
const bcrypt = require('bcrypt')
const KeyService = require("./key.service")
//-------------------------MAIN FUNCTION-----------------------
class AccessService {
    static signUp = async (body) => {
        if (await getExistingUserByEmail(body.user_email)) {
            throw new Error.ConflictRequestError("Email has existed!")
        }
        body.user_password = await bcrypt.hash(body.user_password, 10)
        const user = await UserRepository.createNewUser(body)
        return await KeyService.genToken(user, "NEW")
    }

    static login = async ({ email, password }) => {
        const user = await checkValidateForLoginSection(email, password)
        const { accessToken, refreshToken } = await KeyService.genToken(user, "NEW")
        return { accessToken, refreshToken }
    }


}
//--------------------------SUB FUNCTION-----------------------

async function checkValidateForLoginSection(email, password) {
    const currentUser = await getExistingUserByEmail(email)
    if (!currentUser) throw new Error.AuthError("User's not signed up")
    if (!isCorrectPassword(password, currentUser.user_password)) throw new Error.AuthError("Password is not correct")
    return currentUser
}


async function getExistingUserByEmail(email) {
    return await UserRepository.findUser({
        user_email: email
    })
}

async function isCorrectPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}



module.exports = AccessService