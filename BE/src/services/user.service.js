const UserRepository = require('../models/repository/user.repo')
const Error = require('../core/error.response')
const { encryptString, compareEncryptedStrings, checkNullForObject, objectIdParser } = require('../utils')

//------------------------------MAIN-FUNCTION--------------------
class UserService {
    static async resetPassword(userId, { oldPassword, newPassword }) {
        if (checkNullForObject({ oldPassword, newPassword })) throw new Error.BadRequestError("All field are required")
        const currentUser = await checkUser(userId)
        await checkOldPassword(oldPassword, currentUser.user_password)
        const encryptedNewPassword = await encryptString(newPassword, 10)
        console.log("mới: ", encryptedNewPassword, "cũ: ", currentUser.user_password)
        await updateUserPassword(userId, encryptedNewPassword)
    }
}
//--------------------------SUB-FUNCTION------------------------

async function updateUserPassword(userId, encryptedPassword) {
    const filter = {
        _id: objectIdParser(userId)
    }
    const bodyUpdate = {
        user_password: encryptedPassword
    }
    return await UserRepository.updateUser(filter, bodyUpdate)
}

async function checkOldPassword(plainPassword, encryptedPassword) {
    const result = await compareEncryptedStrings(plainPassword, encryptedPassword)
    if (!result) throw new Error.BadRequestError("Incorrect password")
}

async function checkUser(userId) {
    const currentUser = await UserRepository.findUserById(userId)
    if (!currentUser) throw new Error.BadRequestError("Not exits user")
    return currentUser
}

module.exports = UserService