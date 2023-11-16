const ApiKeyModel = require('../apikey.model')


class ApiKeyRepository {

    static async findApiKey(filter, select) {
        return await ApiKeyModel.findOne({ ...filter })
            .select({ ...select })
            .lean()
    }

}

module.exports = ApiKeyRepository