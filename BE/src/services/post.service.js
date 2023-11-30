'use strict'
const Error = require('../core/error.response')
const CategoryRepository = require('../models/repository/category.repo')
const PostRepository = require('../models/repository/post.repo')
const { objectIdParser, getUnselectDataForQuery, checkNullForObject } = require('../utils')
const UserService = require('./user.service')

const statusOfPost = {
    ACTIVE: 'active',
    PENDING: 'pending',
    BLOCKED: 'blocked'
}
class PostService {

    static async createNewPost(userId, payload) {
        await UserService.checkUser(userId)
        await checkCategoryIds(payload.post_category_ids)
        const newPost = createPostObject(userId, payload.post_title, payload.post_content, payload.post_thumb_url, payload.post_description, payload.post_category_ids)
        const result = await PostRepository.createNewPost(newPost)
        if (!result) throw new Error.NotFoundError("Something went wrong")
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

    static async getAllPost({ limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, category, authorId }) {
        const skip = limit * offset
        let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
        const unSelectField = ["status", "__v"]
        let filter = {
            status: statusOfPost.ACTIVE
        }
        configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, category, authorId)
        return await PostRepository.findPosts(filter, limit, skip, getUnselectDataForQuery(unSelectField), sortOption)
    }

    static async getAllPostOfAuthor(userId, { limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, category, status }) {
        const skip = limit * offset
        let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
        const unSelectField = ["__v"]
        let filter = {
            post_user_id: objectIdParser(userId)
        }
        configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, category, "", status)
        return await PostRepository.findPosts(filter, limit, skip, getUnselectDataForQuery(unSelectField), sortOption)
    }


}
//-------------------SUB FUNCTION--------------------

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


function configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, category, authorId, status) {
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
    filter.post_category_ids = objectIdParser(categoryId)
}

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}


function createPostObject(userId, title, content, thumbUrl, description, categoryIds) {
    const newPost = {
        post_user_id: objectIdParser(userId),
        post_title: title,
        post_content: content,
        post_thumb_url: thumbUrl,
        post_description: description,
        post_category_ids: categoryIds.map(id => objectIdParser(id)),
    }
    return newPost
}


async function checkCategoryIds(categoryIds) {
    const initialNumberOfCategory = categoryIds.length
    const listOfCategories = await findCategoriesByIds(categoryIds)
    if (initialNumberOfCategory !== listOfCategories.length) throw new Error.BadRequestError("Check category info again!")
}

async function findCategoriesByIds(listOfCategoryIds) {
    const filter = {
        _id: {
            $in: listOfCategoryIds
        }
    }
    const unSelectField = ["__v", "status"]
    return await CategoryRepository.findCategories(filter, getUnselectDataForQuery(unSelectField))
}

module.exports = PostService