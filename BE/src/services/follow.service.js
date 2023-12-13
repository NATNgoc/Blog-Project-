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
        if (followerUserID === followingUserID) throw new ErrorRespone.BadRequestError("You can't follow yourself")
        //TRANSACTION
        return await new TransactionWrapper(processFollowingUser).process({ followerUserID, followingUserID })
        // TRIGGER
        // await Promise.all([checkUser(followerUserID), checkUser(followingUserID)])
        // if (await getFollowExisted(followerUserID, followingUserID)) throw new ErrorRespone.BadRequestError("User has followed this user before!")
        // await FollowRepository.createNewFollow(followerUserID, followingUserID)
    }

    static async unFollowUser(followerUserID, unFollowingUserId) {
        if (followerUserID === followingUserID) throw new ErrorRespone.BadRequestError("You can't follow yourself")
        return await new TransactionWrapper(processUnFollowingUser).process({ followerUserID, unFollowingUserId })
    }

    static async getAllFollower(requesterId, ownerId, { sortBy = 'ctime', limit = 20, offset = 0, startDate = '2002-01-01', endDate = new Date(), status }) {
        await checkUser(requesterId)
        if (isOwnerOfFollows(requesterId, ownerId)) {
            return await queryAllFollowers(requesterId, sortBy, limit, offset, startDate, endDate, status)
        } else {
            return await queryAllFollowers(requesterId, sortBy, limit, offset, startDate, endDate, status = true)
        }
    }

    static async getAllFollowing(requesterId, ownerId, { sortBy = 'ctime', limit = 20, offset = 0, startDate = '2002-01-01', endDate = new Date(), status }) {
        await checkUser(requesterId)
        if (isOwnerOfFollows(requesterId, ownerId)) {
            return await queryAllFollowings(requesterId, sortBy, limit, offset, startDate, endDate, status)
        } else {
            return await queryAllFollowings(requesterId, sortBy, limit, offset, startDate, endDate, status = true)
        }
    }

    static async changeStatusFollow(userId, followId, { newStatus }) {
        const result = await Promise.all([checkFollowById(followId), checkNullForObject({ newStatus, followId })]);
        const currentFollow = result[0]
        checkFollowingUser(userId, currentFollow.following_user_id)
        checkStatus(currentFollow.status, newStatus)
        return await changeStatusOfFollow(currentFollow._id, newStatus)
    }

}

//--------------------------SUB-FUNCTION------------------------

function isOwnerOfFollows(requesterId, ownerId) {
    return requesterId === ownerId
}

async function queryAllFollowers(userId, sortBy, limit, offset, startDate, endDate, status) {
    const filter = {
        following_user_id: objectIdParser(userId),
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    }
    configFilterForStatus(filter, status)
    const skip = limit * offset
    const sortOption = settingSortOption(sortBy)
    const selectField = getSelectDataForQuery(['follower_user_id', 'status', 'createdAt'])
    return await FollowRepository.getListOfFollower(filter, limit, skip, selectField, sortOption)
}
async function queryAllFollowings(userId, sortBy, limit, offset, startDate, endDate, status) {
    const filter = {
        follower_user_id: objectIdParser(userId),
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    }
    configFilterForStatus(filter, status)
    const skip = limit * offset
    const sortOption = settingSortOption(sortBy)
    const selectField = getSelectDataForQuery(['following_user_id', 'status', 'createdAt'])
    return await FollowRepository.getListOfFollowing(filter, limit, skip, selectField, sortOption)
}

function configFilterForStatus(filter, status) {
    if (status) {
        filter.status = status
    }
}

async function changeStatusOfFollow(followId, newStatus) {
    const filterForChangeStatus = {
        _id: followId
    }
    return await FollowRepository.changeStatusFollow(filterForChangeStatus, newStatus)
}

function checkFollowingUser(userId, followingId) {
    if (!isFollowingUser(userId, followingId))
        throw new ErrorRespone.BadRequestError("You not autherize for doing that")
}

function settingSortOption(sortBy) {
    return sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
}

function isFollowingUser(checkingUserId, followingUserId) {
    return checkingUserId === followingUserId.toString()
}

function checkStatus(oldStatus, newStatus) {
    if (isDuplicateStatus(oldStatus, newStatus))
        throw new ErrorRespone.BadRequestError('Status is already like that!')
}

function isDuplicateStatus(oldStatus, newStatus) {
    return oldStatus === newStatus
}


async function checkFollowById(followId) {
    const currentFollow = await FollowRepository.findFollowById(followId)
    if (!currentFollow) throw new ErrorRespone.BadRequestError("Follow is not existing")
    return currentFollow
}

async function processFollowingUser({ followerUserID, followingUserID }, session) {
    await checkUser(followerUserID)
    await checkUser(followingUserID)
    if (await getFollowExisted(followerUserID, followingUserID)) throw new ErrorRespone.BadRequestError("User has followed this user before!")
    await increaseFollowerCountOfUser(followingUserID, session)
    await increaseFollowingCountOfUser(followerUserID, session)
    await FollowRepository.createNewFollowWithSession(followerUserID, followingUserID, session)
}

async function processUnFollowingUser({ followerUserID, unFollowingUserId }, session) {
    await checkUser(followerUserID)
    await checkUser(unFollowingUserId)
    const follow = await getFollowExisted(followerUserID, unFollowingUserId)
    if (!follow) throw new ErrorRespone.BadRequestError("User hasn't followed this user before!")
    await decreaseFollowerCountOfUser(unFollowingUserId, session)
    await decreaseFollowingCountOfUser(followerUserID, session)
    await FollowRepository.deleteFollowByIdWithSession(follow._id, session)
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