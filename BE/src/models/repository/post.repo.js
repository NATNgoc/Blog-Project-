const postModel = require('../post.model')

class PostRepository {

    static async createNewPost(object) {
        return await postModel.create(object)
    }

    static async findPost(filter, selectField = {}) {
        return await postModel.findOne(filter).select(selectField).lean()
    }

}

module.exports = PostRepository