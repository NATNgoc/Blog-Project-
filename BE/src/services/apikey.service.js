const Error = require('../core/error.response')
const ApiKeyRepository = require('../models/repository/apikey.repo')

class ApiKeyService {

    static async checkApiKey(apikey) {
        if (!apikey) throw new Error.BadRequestError('Unvalid Api Key')
        const filter = {
            "key": apikey,
            "status": true
        }
        const currentApiKey = await ApiKeyRepository.findApiKey(filter)
        if (!currentApiKey) throw new Error.BadRequestError('Unvalid Api Key')
        return currentApiKey
    }

}


module.exports = ApiKeyService