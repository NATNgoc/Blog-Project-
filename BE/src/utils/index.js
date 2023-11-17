const { default: mongoose } = require("mongoose")

const HEADER = {
    autherization: "authorization",
    refreshToken: 'x-rtoken-id',
    apiKey: 'x-api-key',
    clientId: 'x-client-id'
}

const objectIdParser = (id) => {
    return new mongoose.Types.ObjectId(id)
}

const checkNullForObject = (object) => {
    Object.values(object).every(value => {
        if (value === null) {
            return true;
        }

        return false;
    })
}

const isEmptyObject = (object) => {
    return Object.keys(object).length === 0
}

module.exports = {
    HEADER,
    checkNullForObject,
    objectIdParser,
    isEmptyObject
}