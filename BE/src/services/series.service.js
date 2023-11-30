const { config } = require('dotenv')
const Error = require('../core/error.response')
const SeriesRepository = require('../models/repository/series.repo')
const Utils = require('../utils')
const PostRepository = require('../models/repository/post.repo')
const TransactionWrapper = require('../dbs/transaction.wrapper');
const UserRepository = require('../models/repository/user.repo')
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
            series_user_id: objectIdParser(userId)
        }
        configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, category, "", status)
        return await PostRepository.findPosts(filter, limit, skip, getUnselectDataForQuery(unSelectField), sortOption)
    }

}
//--------------SUB FUNCTION-----------------------
function configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, userId, status) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (status) {
        configForStatus(filter, status)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (category) {
        configForCategory(filter, category)
    }
    if (userId) {
        configForAuthor(filter, userId)
    }
    if (keyword) {
        configForKeyWord(filter, sortOption, keyword)
    }
}

function configForStatus(filter, status) {
    filter.status = status
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

function configForAuthor(filter, authorId) {
    filter.post_user_id = objectIdParser(authorId)
}
function configForCategory(filter, categoryId) {
    filter.post_category_ids = objectIdParser(categoryId)
}

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}


function checkUserIdInSeries(checkUserId, userId) {
    return checkUserId === userId
}
async function processRemoveSeries({ userId, seriesId }) {
    const currentUser = await UserRepository.findUserById(userId)
    const currentSeries = await SeriesRepository.findSeriesById(seriesId)
    if (!currentSeries || !currentUser) throw new Error.BadRequestError("Check again!")
    checkUserIdInSeries(userId, currentSeries.series_user_id)
    await Promise.all([SeriesRepository.deleteSeriesById(currentSeries._id), removeSeriesFromPost(currentSeries.series_post_ids)])
}


async function processCreateNewSeries({ userId, filteredObject }) {
    const newSeriesObject = createNewSeriesObject(userId, filteredObject)
    await checkValidPostIds(newSeriesObject.series_post_ids)
    const result = await SeriesRepository.createNewSeries(newSeriesObject)
    if (!result) throw new Error.NotFoundError("Something went wrong!")
    updateSeriesForPost(newSeriesObject.series_post_ids, result._id)
    return result
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
    return await PostRepository.updatePosts(filter, updateBody)
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
    const initialNumberOfPostIds = postIds.length
    const foundedPost = await findPostByIds(postIds)
    if (initialNumberOfPostIds !== foundedPost.length) throw new Error.BadRequestError("PostIds aren't not valid!")
}

async function findPostByIds(postIds) {
    const filter = {
        _id: {
            $in: postIds
        },
        post_is_series: false
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


