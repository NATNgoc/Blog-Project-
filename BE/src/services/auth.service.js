const jwt = require("jsonwebtoken")
const errorHandler = require("../core/error.response")
const crypto = require('crypto')
const HEADER = require('../utils/index')

//-------------MAIN SERVICE FUNCTION-------------------------
class AuthService {

    // static createAccessToken = ()

}
//--------------SUB FUNCTION--------------------------------
const getAccessTokenFromJWT = (JWT) => {
    return JWT.split(' ')[1]
}

const createPublicKeyObject = async (publicKeyString) => {
    return await crypto.createPublicKey(publicKeyString)
}


