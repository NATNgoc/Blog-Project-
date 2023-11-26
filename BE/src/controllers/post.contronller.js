const PostService = require('../services/post.service')
const SuccesResponse = require('../core/success.response')

class PostController {
    createNewPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Create Post succesfully!",
            metaData: await PostService.createNewPost(req.decodeUser.userid, { ...req.body })
        }).send(res)
    }
}
const postController = new PostController()
module.exports = postController