
const ApiKeyService = require('../../services/apikey.service')
const { HEADER } = require('../../utils/index')
const Error = require('../../core/error.response')

const checkApiKey = async (req, res, next) => {
    if (!req.header[HEADER.apiKey]) throw new Error.AuthError('unvalid api key')
    const key = req.header[HEADER.apiKey].toString()
    const apiKeyInstance = ApiKeyService.getApiKey(key)
    req.apiKey = apiKeyInstance
    next()
}

const checkPermission = async (permission) => {
    return (req, res, next) => {
        const currentApiKey = req.apiKey
        if (!currentApiKey.permission) throw new Error.AuthError('Denied permission')
        if (!isContainPermission(permission, currentApiKey)) throw new Error.AuthError('Denied permission')
        next()
    }
}


const isContainPermission = (permission, apiKey) => {
    return apiKey.permissions.includes(permission)
}

module.exports = {
    checkApiKey,
    checkPermission
}

