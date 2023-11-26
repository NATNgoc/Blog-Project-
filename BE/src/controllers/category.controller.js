const CategoryService = require('../services/category.service')
const SuccesResponse = require('../core/success.response')



class CategoryController {
    createNewCategory = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Create category succesfully!",
            metaData: await CategoryService.createNewCategory({ ...req.body })
        }).send(res)
    }
}

const categoryController = new CategoryController()
module.exports = categoryController
