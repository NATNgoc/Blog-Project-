const { config } = require('dotenv')
const Error = require('../core/error.response')
const SeriesRepository = require('../models/repository/series.repo')
const Utils = require('../utils')
const PostRepository = require('../models/repository/post.repo')
const TransactionWrapper = require('../dbs/transaction.wrapper');
const UserRepository = require('../models/repository/user.repo')
const PostUtils = require('../utils/post.utils')


class SeriesService {

    static async createNewSeries(userId, filteredObject) {
        return await new TransactionWrapper(processCreateNewSeries).process({ userId, filteredObject })
    }

    static async deleteSeries(userId, seriesId) {
        return await new TransactionWrapper(processRemoveSeries).process({ userId, seriesId })
    }

    static async findAllSeriesOfUser(userId, { limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, status }) {
        const skip = limit * offset
        let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
        const unSelectField = ["__v"]
        let filter = {
            series_user_id: Utils.objectIdParser(userId)
        }
        configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, status)
        return await SeriesRepository.findSeries(filter, limit, skip, Utils.getUnselectDataForQuery(unSelectField), sortOption)
    }

    static async addPostsIntoSeries(userId, { series_post_ids }, seriesId) {
        series_post_ids = series_post_ids.map(id => Utils.objectIdParser(id))
        await Promise.all([checkExistingSeries(seriesId, userId), checkValidPostIds(series_post_ids)])
        const filter = {
            _id: seriesId
        }
        const results = await Promise.all([SeriesRepository.addPostsIntoSeries(filter, series_post_ids), updateSeriesForPost(series_post_ids, seriesId)])
        return results[0]
    }

    static async removePostFromSeries(userId, { series_post_ids }, seriesId) {
        const listPostIdForRemoving = series_post_ids.map(id => Utils.objectIdParser(id))
        await Promise.all([checkExistingSeries(seriesId, userId), checkValidPostIdsWithSeries(listPostIdForRemoving, seriesId)])
        const filter = {
            _id: seriesId
        }
        const results = await Promise.all([SeriesRepository.removePostsFromSeries(filter, listPostIdForRemoving), cancleSeriesStatusForPost(listPostIdForRemoving, seriesId)])
        return results[0]
    }

}
//--------------SUB FUNCTION-----------------------

async function checkExistingSeries(seriesId, userId) {
    const currentSeries = await findOneSeries(seriesId, userId)
    if (!currentSeries) throw new Error.BadRequestError("Series is not your own or dont existed!")
    return currentSeries
}

async function findOneSeries(seriesId, userId) {
    console.log("🚀 ~ file: series.service.js:45 ~ findOneSeries ~ seriesId, userId:", seriesId, userId)
    const filter = {
        _id: Utils.objectIdParser(seriesId),
        series_user_id: Utils.objectIdParser(userId)
    }
    return await SeriesRepository.findOneSeries(filter)
}


function configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, status) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (status) {
        configForStatus(filter, status)
    }
    if (keyword) {
        configForKeyWord(filter, sortOption, keyword)
    }
}

function configForStatus(filter, status) {
    filter.series_status = status
}

function configForStartDate(filter, startDate) {
    filter.createdAt = {
        $gte: startDate,
    }
}

function configForKeyWord(filter, sortOption, keyword) {
    filter.$text = {
        $search: keyword
    }
    sortOption.score = {
        $meta: "textScore"
    }
}

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}

async function processRemoveSeries({ userId, seriesId }) {
    const currentUser = await UserRepository.findUserById(userId)
    if (!currentUser) throw new Error.BadRequestError("Check again!")
    const currentSeries = await checkExistingSeries(seriesId, userId)
    await Promise.all([SeriesRepository.deleteSeriesById(currentSeries._id), removeSeriesFromPost(currentSeries.series_post_ids)])
}


async function processCreateNewSeries({ userId, filteredObject }) {
    const newSeriesObject = createNewSeriesObject(userId, filteredObject)
    await checkValidPostIds(newSeriesObject.series_post_ids)
    const result = await SeriesRepository.createNewSeries(newSeriesObject)
    if (!result) throw new Error.NotFoundError("Something went wrong!")
    return await updateSeriesForPost(newSeriesObject.series_post_ids, result._id)
}



async function updateSeriesForPost(seriesPostIds, seriesId) {
    const filter = {
        _id: {
            $in: seriesPostIds
        }
    }
    const updateBody = {
        post_is_series: true,
        post_series_id: seriesId
    }
    const option = {
        new: true
    }
    return await PostRepository.updatePosts(filter, updateBody, option)
}

async function cancleSeriesStatusForPost(seriesPostIds, seriesId) {
    const filter = {
        _id: {
            $in: seriesPostIds
        }
    }
    const updateBody = {
        post_is_series: false,
        post_series_id: null
    }
    const option = {
        new: true
    }
    return await PostRepository.updatePosts(filter, updateBody, option)
}

async function removeSeriesFromPost(seriesPostIds) {
    const filter = {
        _id: {
            $in: seriesPostIds
        }
    }
    const updateBody = {
        post_is_series: false,
        post_series_id: null
    }
    return await PostRepository.updatePosts(filter, updateBody)
}

async function checkValidPostIds(postIds) {
    if (!Array.isArray(postIds)) {
        throw new Error.BadRequestError('postIds must be an array')
    }
    const initialNumberOfPostIds = postIds.length
    const foundedPost = await findPostWithoutSeriesByIds(postIds)
    if (initialNumberOfPostIds !== foundedPost.length) throw new Error.BadRequestError("Post id you want to add is not valid!")
}

async function checkValidPostIdsWithSeries(postIds, seriesId) {
    if (!Array.isArray(postIds)) {
        throw new Error.BadRequestError('postIds must be an array')
    }
    const initialNumberOfPostIds = postIds.length
    const foundedPost = await findPostWithSeriesByIds(postIds, seriesId)
    if (initialNumberOfPostIds !== foundedPost.length) throw new Error.BadRequestError("Post id you want to remove is not valid!")
}

/**
 * 
 * @param {*} postIds : "Những post ids mà chưa có tồn tại series"
 * @returns : "Trả về những post thỏa điều kiện chưa có series và đã được duyệt(trạng thái không phải pending hoặc blocked"
 */
async function findPostWithoutSeriesByIds(postIds) {
    const filter = {
        _id: {
            $in: postIds
        },
        post_is_series: false,
        status: {
            $nin: [PostUtils.statusOfPost.BLOCKED, PostUtils.statusOfPost.PENDING]
        }
    }
    return await PostRepository.findPosts(filter)
}

async function findPostWithSeriesByIds(postIds, seriesId) {
    const filter = {
        _id: {
            $in: postIds
        },
        post_is_series: true,
        post_series_id: Utils.objectIdParser(seriesId),
        status: {
            $nin: [PostUtils.statusOfPost.BLOCKED, PostUtils.statusOfPost.PENDING]
        }
    }
    return await PostRepository.findPosts(filter)
}

function createNewSeriesObject(userId, filteredObject) {
    const object = {
        series_name: filteredObject.series_name,
        series_post_ids: filteredObject.series_post_ids.map(id => Utils.objectIdParser(id)),
        series_user_id: Utils.objectIdParser(userId),
        series_status: filteredObject.series_status
    }
    return object
}


module.exports = SeriesService


