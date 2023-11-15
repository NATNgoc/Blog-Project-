const { default: mongoose } = require("mongoose")

const HEADER = {
    autherization: "authorization",
    refreshToken: 'x-rtoken-id'
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
module.exports = {
    HEADER,
    checkNullForObject,
    objectIdParser
}