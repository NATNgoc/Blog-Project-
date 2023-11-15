const HEADER = {
    autherization: "authorization",
    refreshToken: 'x-rtoken-id'
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
    checkNullForObject
}