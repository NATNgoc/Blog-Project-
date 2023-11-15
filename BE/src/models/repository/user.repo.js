const { default: mongoose } = require('mongoose')
const userModel = require('../user.model')
const { ObjectId } = require('mongodb')

class UserRepository {
    /**
     * 
     * @param {*} shopId : "Id of shop you want to find"
     */
    static async findUsers(filter, limit, skip, select = {}, sortOption = {}) {

    }

    static async findUser(filter, select = {}) {
        return await userModel.findOne({ ...filter }).select({ ...select }).lean()
    }
    // user_nickname: {
    //     type: String,
    //     trim: true,
    //     maxLength: 100,
    //     required: true
    // },
    // user_email: {
    //     type: String,
    //     unique: true,
    //     trim: true,
    //     required: true
    // },
    // user_password: {
    //     type: String,
    //     required: true
    // },
    // user_profilePhotoURL: {
    //     type: String,
    //     default: ''
    // },
    // user_website: {
    //     type: String,
    //     default: ''
    // },
    // user_bio: {
    //     type: String,
    //     default: ''
    // },
    static async createNewUser({ user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender }) {
        return await userModel.create({
            user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender
        })
    }

}

module.exports = UserRepository