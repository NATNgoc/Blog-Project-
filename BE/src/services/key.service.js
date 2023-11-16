const crypto = require('crypto')
const keyModel = require('../models/key.model')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const KeyRepository = require('../models/repository/key.repo')
const Error = require('../core/error.response')



class KeyService {

    static genToken = async (user, typeOfGenToken) => {
        const { privateKey, publicKey } = await this.genPubicAndPrivateKey()
        const { accessToken, refreshToken } = await this.createPairToken(
            {
                userid: user._id,
                email: user.email
            },
            privateKey,
            {
                algorithm: 'RS256',
                expiresIn: '2days'
            },
            {
                algorithm: 'RS256',
                expiresIn: '7days'
            }
        )
        const result = await tokenAction[typeOfGenToken](publicKey, user._id)
        if (!result) {
            throw new Error.ServiceUnAvailible("Something went wrong!")
        }
        return { accessToken, refreshToken }
    }

    static async genNewKey(publicKey, userId) {
        const result = await KeyRepository.createNewKey(userId, publicKey.toString())
        return result
    }

    static genPubicAndPrivateKey = async () => {
        const { privateKey, publicKey } = await crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Độ mạnh của thuật toán generateKey
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
        })
        return { privateKey, publicKey }
    }

    static async createPairToken(payload, privateKey, optionAccessToken, optionRefreshToken) {
        const accessToken = await jwt.sign(payload, privateKey, optionAccessToken)
        const refreshToken = await jwt.sign(payload, privateKey, optionRefreshToken)
        return {
            accessToken,
            refreshToken
        }
    }
}

const tokenAction = {
    "NEW": KeyService.genNewKey,
    "REFRESH": "s"
}

module.exports = KeyService

