'use strict'

const Error = require('../core/error.response')
const PostRepository = require('../models/repository/post.repo')
const { objectIdParser } = require('../utils')
const UserService = require('./user.service')

class PostService {
    /*
    post_user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    post_thumb_url: {
        type: String,
        required: true
    },
    post_likes_count: {
        type: Number,
        default: 0
    },
    post_description: {
        type: String,
        required: true
    },
    post_coments_count: {
        type: Number,
        default: 0
    },
    post_likes_ids: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'user'
    },
    post_coments_ids: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'user'
    },
    post_category_ids: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked']
    },
    post_is_series: {
        type: Boolean,
        required: true
    },
    post_series_id: {
        type: mongoose.Types.ObjectId,
        ref: 'series'
    }
    */
    static async createNewPost(userId, { title, content, thumb_url, description, category_ids }) {
        await UserService.checkUser(userId)
        await checkCategoryIds(category_ids)
        const newPost = createNewPost(userId, title, content, thumb_url, description, category_ids)
        return await PostRepository.createNewPost(newPost)
    }
}
//-------------------SUB FUNCTION--------------------
function createNewPost(userId, title, content, thumbUrl, description, categoryIds) {
    const newPost = {
        post_user_id: objectIdParser(userId),
        post_title: title,
        post_content: content,
        post_thumb_url: thumbUrl,
        post_description: description,
        post_category_ids: categoryIds,
    }
    return newPost
}


async function checkCategoryIds(categoryIds) {

}

function isExistedCategory(categoryId) {

}

module.exports = PostService