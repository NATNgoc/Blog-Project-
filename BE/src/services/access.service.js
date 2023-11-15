'use strict'

const UserRepository = require("../models/repository/user.repo")
const Error = require('../core/error.response')
const bcrypt = require('bcrypt')
const KeyService = require("./key.service")
//-------------------------MAIN FUNCTION-----------------------
class AccessService {

    static signUp = async (body) => {
        if (await isExistingEmail(body.user_email)) {
            throw new Error.ConflictRequestError("Email has existed!")
        }
        body.user_password = await bcrypt.hash(body.user_password, 10)
        const user = await UserRepository.createNewUser(body)
        return await KeyService.genToken(user, "NEW")
    }

}
//--------------------------SUB FUNCTION-----------------------

async function isExistingEmail(email) {
    return await UserRepository.findUser({
        user_email: email
    })
}

module.exports = AccessService