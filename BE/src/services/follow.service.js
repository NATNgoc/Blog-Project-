const FollowRepository = require('../models/repository/follow.repo')
const mongoose = require('mongoose')
const ErrorRespone = require('../core/error.response')
const UserRepository = require('../models/repository/user.repo');
const followModel = require('../models/follow.model');
const TransactionWrapper = require('../dbs/transaction.wrapper');
const { objectIdParser } = require('../utils');


//------------------------------MAIN-FUNCTION--------------------
class FollowService {
    static async followUser(followerUserID, followingUserID) {
        return await new TransactionWrapper(processFollowingUser).process({ followerUserID, followingUserID })
    }

    static async unFollowUser(followerUserID, unFollowingUserId) {
        return await new TransactionWrapper(processUnFollowingUser).process({ followerUserID, unFollowingUserId })
    }
}

//--------------------------SUB-FUNCTION------------------------


async function processFollowingUser({ followerUserID, followingUserID }, session) {
    await Promise.all([checkUser(followerUserID), checkUser(followingUserID)])
    if (await isFollowExisted(followerUserID, followingUserID)) throw new ErrorRespone.BadRequestError("User has followed this user before!")
    await Promise.all([increaseFollowerCountOfUser(followingUserID, session), increaseFollowingCountOfUser(followerUserID, session), FollowRepository.createNewFollowWithSession(followerUserID, followingUserID, session)])
}

async function processUnFollowingUser({ followerUserID, unFollowingUserId }, session) {
    await Promise.all([checkUser(followerUserID), checkUser(unFollowingUserId)])
    const follow = await isFollowExisted(followerUserID, unFollowingUserId)
    if (!follow) throw new ErrorRespone.BadRequestError("User hasn't followed this user before!")
    await Promise.all([decreaseFollowerCountOfUser(unFollowingUserId, session), decreaseFollowingCountOfUser(followerUserID, session), FollowRepository.deleteFollowByIdWithSession(follow._id, session)])
}

async function increaseFollowerCountOfUser(userId, session) {
    const options = {
        new: false,
        session: session
    }
    return await UserRepository.updateFollowerCountOfUser(userId, 1, options)
}

async function decreaseFollowerCountOfUser(userId, session) {
    const options = {
        new: false,
        session: session
    }
    return await UserRepository.updateFollowerCountOfUser(userId, -1, options)
}

async function decreaseFollowingCountOfUser(userId, session) {
    const options = {
        new: false,
        session: session
    }
    return await UserRepository.updateFollowingCountOfUser(userId, -1, options)
}

async function increaseFollowingCountOfUser(userId, session) {
    const options = {
        new: false,
        session: session
    }
    return await UserRepository.updateFollowingCountOfUser(userId, 1, options)
}

async function checkUser(userId) {
    const currentUser = await UserRepository.findUserById(userId)
    if (!currentUser) throw new ErrorRespone.BadRequestError("User's not exist")
    return currentUser
}


async function isFollowExisted(followerUserID, followingUserID) {
    const currentFollow = await getFollowByUserId(followerUserID, followingUserID)
    return currentFollow
}

async function getFollowByUserId(followerUserID, followingUserID) {
    return await FollowRepository.findFollowByUserId(followerUserID, followingUserID)
}

module.exports = FollowService