const UserService = require('../services/user.service')
const SuccesResponse = require('../core/success.response')

class UserController {
    resetPassword = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Reset password successfully",
            metaData: await UserService.resetPassword(req.decodeUser.userid, { ...req.body })
        }).send(res)
    }

}
const userController = new UserController()
module.exports = userController