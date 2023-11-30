const Error = require('../core/error.response')
const CategoryRepository = require('../models/repository/category.repo');
const PostRepository = require('../models/repository/post.repo');
const Utils = require('../utils');

//---------------MAIN SERVICE---------------------------
class CategoryService {

    static async createNewCategory(body) {
        await checkDuplicatedCatogoryName(body.category_name)
        return await CategoryRepository.createNewCategory(body.category_name, body.category_description)
    }

    static async removeCategory(categoryId) {
        const currentCategory = await CategoryService.checkNotExistingCategoryById(categoryId)
        await checkPostsWithoutCategory(currentCategory._id)
        await CategoryRepository.removeCategory({ _id: currentCategory._id })
    }

    static async updateCategory(categoryId, bodyUpdate) {
        await CategoryService.checkNotExistingCategoryById(categoryId)
        return await updateNewCategory(categoryId, bodyUpdate)
    }

    static async findAllCategory() {
        const unSelectField = ["createdAt", "updatedAt", "__v"]
        return await CategoryRepository.findAllCategory(Utils.getUnselectDataForQuery(unSelectField))
    }

    static async checkNotExistingCategoryById(categoryId) {
        const currentCategory = await findExistingCategoryById(categoryId)
        if (!currentCategory) throw new Error.BadRequestError("Category's not existed")
        return currentCategory
    }

}
//---------------SUB FUNCTION---------------------------

async function updateNewCategory(categoryId, bodyUpdate) {
    const filter = {
        _id: categoryId
    }
    bodyUpdate = Utils.nullObjectParser(bodyUpdate)
    return await CategoryRepository.updateCategory(filter, bodyUpdate)
}

async function findExistingCategoryByName(name) {
    const filter = {
        category_name: name
    }
    return await CategoryRepository.findCategory(filter)
}

async function findExistingCategoryById(categoryId) {
    const filter = {
        _id: categoryId
    }
    return await CategoryRepository.findCategory(filter)
}

async function checkDuplicatedCatogoryName(name) {
    const currentCategory = await findExistingCategoryByName(name)
    if (currentCategory) throw new Error.BadRequestError("Category's already existed")
}

async function checkPostsWithoutCategory(categoryId) {
    const postWithCategory = await findPostWithCategory(categoryId)
    if (postWithCategory) throw new Error.BadRequestError("You have to delete all post with this category before remove category!")
}

async function findPostWithCategory(categoryId) {
    const filter = {
        post_category_ids: Utils.objectIdParser(categoryId)
    }
    return await PostRepository.findPost(filter)
}



module.exports = CategoryService