const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')
const HEADER = {
    autherization: "authorization",
    refreshToken: 'x-rtoken-id',
    apiKey: 'x-api-key'
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


async function encryptString(keyword, salt) {
    return await bcrypt.hash(keyword, salt)
}

async function compareEncryptedStrings(plainString, encryptedString) {
    return await bcrypt.compare(plainString, encryptedString);
}

function getObjectFromReqHeader(req, keyword) {
    return req.headers[keyword]
}

const isEmptyObject = (object) => {
    return Object.keys(object).length === 0
}

module.exports = {
    HEADER,
    checkNullForObject,
    objectIdParser,
    isEmptyObject,
    getObjectFromReqHeader,
    encryptString,
    compareEncryptedStrings
}