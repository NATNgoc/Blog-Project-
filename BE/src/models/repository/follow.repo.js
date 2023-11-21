

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
    static async createNewFollowWithSession(followerUserID, followingUserID, session) {
        const newFollowObject = {
            follower_user_id: followerUserID,
            following_user_id: followingUserID
        }
        return await followModel.create([{ ...newFollowObject }], { session: session })
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