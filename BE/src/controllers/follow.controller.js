const FollowService = require('../services/follow.service')
const SuccesResponse = require('../core/success.response')

class FollowController {
    followUser = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Follow succesfully",
            metaData: await FollowService.followUser(req.decodeUser.userid, req.body.followingUserId)
        }).send(res)
    }

    unFollowUser = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Unfollow succesfully",
            metaData: await FollowService.unFollowUser(req.decodeUser.userid, req.body.unFollowingUserId)
        }).send(res)
    }

}
const followController = new FollowController()
module.exports = followController