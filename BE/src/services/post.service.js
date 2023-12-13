'use strict'
const Error = require('../core/error.response')
const CategoryRepository = require('../models/repository/category.repo')
const PostRepository = require('../models/repository/post.repo')
const { objectIdParser, getUnselectDataForQuery, checkNullForObject } = require('../utils')
const { UserService } = require('./user.service')

const statusOfPost = {
    ACTIVE: 'active',
    PENDING: 'pending',
    BLOCKED: 'blocked'
}

//-------------------MAIN FUNCTION--------------------
class PostService {

    static async createNewPost(userId, payload) {
        await UserService.checkUser(userId)
        const listOfCategories = await checkCategoryIds(payload.post_category_ids)
        const newPost = createPostObject(userId, payload.post_title, payload.post_content, payload.post_thumb_url, payload.post_description, listOfCategories)
        const result = await Promise.all([PostRepository.createNewPost(newPost), updateCountOfCategoryByIds(payload.post_category_ids, 1)])
        return result[0]
    }

    static async updateStatusOfPost(postId, { newStatus }) {
        checkNullForObject({ newStatus })
        checkNotExistingStatus(newStatus)
        const currentPost = await checkExistingPost(postId)
        checkDuplicatedStatus(currentPost.status, newStatus)
        const filter = {
            _id: objectIdParser(postId)
        }
        return await PostRepository.updateStatusOfPost(filter, newStatus)
    }



    static async getAllPost({ limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, categoryId, authorId }) {
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["status", "__v"])
        const { filter, sortOption } = configQueryForgetAllPost(sortBy, keyword, startDate, endDate, categoryId, authorId)
        return await PostRepository.findPosts(filter, limit, skip, unSelectField, sortOption)
    }

    static async getAllPostOfUser(userId, { limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, categoryId, status }) {
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["__v"])
        const { filter, sortOption } = configQueryForgetAllPostOfUser(userId, sortBy, keyword, startDate, endDate, categoryId, status)
        return await PostRepository.findPosts(filter, limit, skip, unSelectField, sortOption)
    }


}
//-------------------SUB FUNCTION--------------------

async function updateCountOfCategoryByIds(categoryIds, count) {
    const filter = {
        _id: {
            $in: categoryIds.map(id => objectIdParser(id))
        }
    }
    const updateObject = {
        $inc: {
            category_post_count: count
        }
    }
    return await CategoryRepository.updateCategorys(filter, updateObject)
}

function configQueryForgetAllPost(sortBy, keyword, startDate, endDate, categoryId, authorId) {
    let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    let filter = {
        status: statusOfPost.ACTIVE
    }
    configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, authorId)
    return { filter, sortOption }
}

function configQueryForgetAllPostOfUser(userId, sortBy, keyword, startDate, endDate, categoryId, status) {
    let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    let filter = {
        post_user_id: objectIdParser(userId)
    }
    configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, "", status)
    return { filter, sortOption }
}

function checkNotExistingStatus(newStatus) {
    const result = Object.values(statusOfPost).includes(newStatus)
    if (!result) throw new Error.BadRequestError("Status is not availible")
}
function checkDuplicatedStatus(oldStatus, newStatus) {
    const result = oldStatus === newStatus ? true : false
    if (result) throw new Error.BadRequestError("Status is already like that!")
}
async function checkExistingPost(postId) {
    const currentPost = await PostRepository.findPostById(postId)
    if (!currentPost) throw new Error.BadRequestError("Post isn't existed")
    return currentPost
}


function configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, authorId, status) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (status) {
        configForStatus(filter, status)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (categoryId) {
        configForCategory(filter, categoryId)
    }
    if (authorId) {
        configForAuthor(filter, authorId)
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
    filter["post_categories._id"] = objectIdParser(categoryId);
}

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}


function createPostObject(userId, title, content, thumbUrl, description, listOfCategories) {
    const newPost = {
        post_user_id: objectIdParser(userId),
        post_title: title,
        post_content: content,
        post_thumb_url: thumbUrl,
        post_description: description,
        post_categories: listOfCategories,
    }
    return newPost
}


async function checkCategoryIds(categoryIds) {
    const initialNumberOfCategory = categoryIds.length
    const listOfCategories = await findCategoriesByIds(categoryIds)
    if (initialNumberOfCategory !== listOfCategories.length) throw new Error.BadRequestError("Check category info again!")
    return listOfCategories
}

async function findCategoriesByIds(listOfCategoryIds) {
    const filter = {
        _id: {
            $in: listOfCategoryIds
        }
    }
    const unSelectField = getUnselectDataForQuery(["__v", "status", "createdAt", "updatedAt"])
    return await CategoryRepository.findCategories(filter, unSelectField)
}

module.exports = { PostService, checkExistingPost, configForStartDate, configForEndDate }