

const { objectIdParser } = require('../../utils')
const followModel = require('../follow.model')

class FollowRepository {
    // var followSchema = new mongoose.Schema({
    //     follower_user_id: {
    //         type: mongoose.Types.ObjectId,
    //         required: true
    //     },
    //     following_user_id: {
    //         type: mongoose.Types.ObjectId,
    //         required: true
    //     },
    //     status: {
    //         type: Boolean,
    //         required: true,
    //         default: true
    //     }
    // }, {
    //     timestamps: true,
    //     collection: COLLECTION_NAME
    // });

    static async getListOfFollower(filter, limit, skip, select, sortOption = {}) {
        return await followModel.find({ ...filter })
            .skip(skip)
            .limit(limit)
            .sort(sortOption)
            .select(select)
            .populate('follower_user_id', 'user_nickname')
            .lean()
    }

    static async changeStatusFollow(filter, newStatus) {
        return await followModel.updateOne({ ...filter }, {
            $set: {
                status: newStatus
            }
        })
    }

    static async getListOfFollowing(filter, limit, skip, select, sortOption = {}) {
        return await followModel.find({ ...filter })
            .skip(skip)
            .limit(limit)
            .sort(sortOption)
            .select(select)
            .populate('following_user_id', 'user_nickname')
            .lean()
    }

    static async createNewFollowWithSession(followerUserID, followingUserID, session) {
        const newFollowObject = {
            follower_user_id: followerUserID,
            following_user_id: followingUserID
        }
        return await followModel.create([{ ...newFollowObject }], { session: session })
    }

    static async createNewFollow(followerUserID, followingUserID) {
        const newFollowObject = {
            follower_user_id: followerUserID,
            following_user_id: followingUserID
        }
        return await followModel.create({ ...newFollowObject })
    }

    static async deleteFollowByIdWithSession(followId, session) {
        return await followModel.deleteOne({ _id: followId }, { session: session })
    }

    static async removeFollowById(followId) {
        return followModel.findByIdAndDelete(followId)
    }


    static async findFollowByUserId(followerUserID, followingUserID) {
        const filter = {
            follower_user_id: followerUserID,
            following_user_id: followingUserID
        }
        return await followModel.findOne({ ...filter })
    }

}

module.exports = FollowRepository