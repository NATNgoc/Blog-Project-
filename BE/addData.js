const userModel = require('./src/models/user.model')
const likeModel = require('./src/models/like.model')
const postModel = require('./src/models/post.model')
const utils = require('./src/utils/index')

async function createLikes(req, res, next) {
    const userIds = await userModel.find({}, { _id: 1 })
    const postIds = await postModel.find({}, { _id: 1 })
    let count = 0
    for (let i = 0; i < userIds.length; i++) {
        const currentId = userIds[i]._id
        const likes = []
        for (let j = 0; j < postIds.length; j++) {
            let randomValue = Math.random() < 0.5 ? 0 : 1;
            if (randomValue === 1) {
                const likeObject = createLikeObject(currentId, postIds[j]._id)
                likes.push(likeObject)
                count += 1
            }
        }
        await likeModel.insertMany(likes)
        console.log("Đã thêm ", count, " follows", " cho id ", currentId, "/n")
    }
    return new SuccesResponse.CreatedResponse({
        ...req.body,
        message: "addsuccess!",
        metaData: {}
    }).send(res)
}

function createLikeObject(userFollower, userFollowing) {
    return {
        "like_user_id": utils.objectIdParser(userFollower),
        "like_post_id": utils.objectIdParser(userFollowing)
    }
}

module.exports = createLikes