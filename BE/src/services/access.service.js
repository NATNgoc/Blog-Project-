'use strict'

const UserRepository = require("../models/repository/user.repo")
const Error = require('../core/error.response')

//-------------------------MAIN FUNCTION-----------------------
class AccessService {

    static signUp = async (body) => {
        if (isExistingEmail(body.user_email)) {
            throw Error.ConflictRequestError("Email has existed!")
        }
        body.user_password = await bcrypt.hash(req.body.user_password, 10)
        return UserRepository.createNewUser(body)
    }

}
//--------------------------SUB FUNCTION-----------------------

async function isExistingEmail(email) {
    return await UserRepository.findUser({
        user_email: email
    })
}

module.exports = AccessService