const mongoose = require('mongoose');
const userModel = require('../user.model')

class UserRepository {
    /**
     * 
     * @param {*} shopId : "Id of shop you want to find"
     */
    static async findUsers(filter, limit, skip, select = {}, sortOption = {}) {

    }

    static async updateUser(filter, bodyUpdate) {
        return await userModel.findOneAndUpdate({ ...filter }, {
            $set: {
                ...bodyUpdate
            }
        })
    }

    static async findUser(filter, select = {}) {
        return await userModel.findOne({ ...filter }).select({ ...select }).lean()
    }

    static async findUserByEmail(email) {
        return await userModel.findOne({
            user_email: email
        }).lean()
    }

    static async findUserById(userId) {
        return await userModel.findOne({ _id: userId }).lean()
    }

    static async createNewUser({ user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender }) {
        return await userModel.create({
            user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender
        })
    }

}

module.exports = UserRepository