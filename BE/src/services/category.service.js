const Error = require('../core/error.response')
const CategoryRepository = require('../models/repository/category.repo');
const PostRepository = require('../models/repository/post.repo');
const { objectIdParser } = require('../utils');

//---------------MAIN SERVICE---------------------------
class CategoryService {

    static async createNewCategory({ name, description }) {
        await checkDuplicatedCatogoryName(name)
        return await CategoryRepository.createNewCategory(name, description)
    }

    static async removeCategory({ name }) {
        const currentCategory = await checkNotExistingCategoryByName(name)
        await checkPostsWithoutCategory(currentCategory._id)
        return await CategoryRepository.removeCategory({ _id: currentCategory._id })
    }

    static async updateCategory(categoryId, { name, description }) {
        await checkNotExistingCategoryById(categoryId)
        return await updateNewCategory(categoryId, name, description)
    }

    static async findAllCategory() {
        return await CategoryRepository.findAllCategory()
    }

}
//---------------SUB FUNCTION---------------------------

async function updateNewCategory(categoryId, name, description) {
    const filter = {
        _id: categoryId
    }
    const newCategoryObject = {
        category_name: name,
        category_description: description
    }
    return await CategoryRepository.updateCategory(filter, newCategoryObject)
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

async function checkNotExistingCategoryByName(name) {
    const currentCategory = await findExistingCategoryByName(name)
    if (!currentCategory) throw new Error.BadRequestError("Category's not existed")
    return currentCategory
}

async function checkNotExistingCategoryById(categoryId) {
    const currentCategory = await findExistingCategoryById(categoryId)
    if (!currentCategory) throw new Error.BadRequestError("Category's not existed")
    return currentCategory
}

async function checkPostsWithoutCategory(categoryId) {
    const postWithCategory = await findPostWithCategory(categoryId)
    if (postWithCategory) throw new Error.BadRequestError("You have to delete all post with this category before remove category!")
}

async function findPostWithCategory(categoryId) {
    const filter = {
        _id: objectIdParser(categoryId)
    }
    return await PostRepository.findPost(filter)
}



module.exports = CategoryService