const FollowRepository = require('../models/repository/follow.repo')
const mongoose = require('mongoose')
const ErrorRespone = require('../core/error.response')
const UserRepository = require('../models/repository/user.repo');
const followModel = require('../models/follow.model');
const TransactionWrapper = require('../dbs/transaction.wrapper');
const { objectIdParser, getSelectDataForQuery, checkNullForObject } = require('../utils');


//------------------------------MAIN-FUNCTION--------------------
class FollowService {
    static async followUser(followerUserID, followingUserID) {
        //TRANSACTION
        // return await new TransactionWrapper(processFollowingUser).process({ followerUserID, followingUserID })
        // TRIGGER
        await Promise.all([checkUser(followerUserID), checkUser(followingUserID)])
        if (await getFollowExisted(followerUserID, followingUserID)) throw new ErrorRespone.BadRequestError("User has followed this user before!")
        await FollowRepository.createNewFollow(followerUserID, followingUserID)
    }

    static async unFollowUser(followerUserID, unFollowingUserId) {
        return await new TransactionWrapper(processUnFollowingUser).process({ followerUserID, unFollowingUserId })
    }

    static async getAllFollower(userId, { sortBy = 'ctime', limit = 20, offset = 0, startDate = '2002-01-01', endDate = new Date() }) {
        const filter = {
            following_user_id: objectIdParser(userId),
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        }
        const skip = limit * offset
        const sortOption = settingSortOption(sortBy)
        const selectField = getSelectDataForQuery(['follower_user_id', 'status', 'createdAt'])
        return await FollowRepository.getListOfFollower(filter, limit, skip, selectField, sortOption)
    }

    static async getAllFollowing(userId, { sortBy = 'ctime', limit = 20, offset = 0, startDate = '2002-01-01', endDate = new Date() }) {
        const filter = {
            follower_user_id: objectIdParser(userId),
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        }
        const skip = limit * offset
        const sortOption = settingSortOption(sortBy)
        const selectField = getSelectDataForQuery(['following_user_id', 'status', 'createdAt'])
        return await FollowRepository.getListOfFollower(filter, limit, skip, selectField, sortOption)
    }

    static async changeStatusFollow(userId, { newStatus, followerId }) {
        const [currentFollow] = await Promise.all([checkFollow(followerId, userId), checkNullForObject({ newStatus, followerId })]);
        checkStatus(currentFollow.status, newStatus)
        const filter = {
            _id: currentFollow._id
        }
        console.log(currentFollow)
        return await FollowRepository.changeStatusFollow(filter, newStatus)
    }

}

//--------------------------SUB-FUNCTION------------------------


function settingSortOption(sortBy) {
    return sortBy === 'ctime' ? { createAt: -1 } : { createAt: 1 }
}

function checkStatus(oldStatus, newStatus) {
    if (isDuplicateStatus(oldStatus, newStatus))
        throw new ErrorRespone.BadRequestError('Something went wrong')
}

function isDuplicateStatus(oldStatus, newStatus) {
    return oldStatus === newStatus
}

async function checkFollow(followerId, followingId) {
    const currentFollow = await getFollowExisted(followerId, followingId)
    if (!currentFollow) throw new ErrorRespone.BadRequestError('Follow not exist')
    return currentFollow
}

async function processFollowingUser({ followerUserID, followingUserID }, session) {
    await Promise.all([checkUser(followerUserID), checkUser(followingUserID)])
    if (await getFollowExisted(followerUserID, followingUserID)) throw new ErrorRespone.BadRequestError("User has followed this user before!")
    await Promise.all([increaseFollowerCountOfUser(followingUserID, session), increaseFollowingCountOfUser(followerUserID, session), FollowRepository.createNewFollowWithSession(followerUserID, followingUserID, session)])
}

async function processUnFollowingUser({ followerUserID, unFollowingUserId }, session) {
    await Promise.all([checkUser(followerUserID), checkUser(unFollowingUserId)])
    const follow = await getFollowExisted(followerUserID, unFollowingUserId)
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


async function getFollowExisted(followerUserID, followingUserID) {
    const currentFollow = await getFollowByUserId(followerUserID, followingUserID)
    return currentFollow
}

async function getFollowByUserId(followerUserID, followingUserID) {
    return await FollowRepository.findFollowByUserId(followerUserID, followingUserID)
}

module.exports = FollowService