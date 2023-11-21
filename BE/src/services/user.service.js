const UserRepository = require('../models/repository/user.repo')
const Error = require('../core/error.response')
const { encryptString, compareEncryptedStrings, checkNullForObject, objectIdParser, getUnselectDataForQuery } = require('../utils')


//------------------------------MAIN-FUNCTION--------------------
class UserService {
    static async resetPassword(userId, { oldPassword, newPassword }) {
        checkNullForObject({ oldPassword, newPassword })
        const currentUser = await checkUser(userId)
        await checkOldPassword(oldPassword, currentUser.user_password)
        const encryptedNewPassword = await encryptString(newPassword, 10)
        console.log("mới: ", encryptedNewPassword, "cũ: ", currentUser.user_password)
        await updateUserPassword(userId, encryptedNewPassword)
    }

    static async updateGeneralProfile(userId, bodyUpdate) {
        await checkUser(userId)
        const filter = {
            _id: userId
        }
        const { user_nickname, user_profilePhotoURL, user_website, user_bio, user_gender } = bodyUpdate
        const unSelectField = getUnselectDataForQuery(["role", "updatedAt", "createdAt", "__v", "user_password"])
        const option = {
            new: true
        }
        return await UserRepository.updateUser(filter, { user_nickname, user_profilePhotoURL, user_website, user_bio, user_gender }, unSelectField, option)
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
    const options = {
        new: true
    }
    return await UserRepository.updateUser(filter, bodyUpdate, {}, options)
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