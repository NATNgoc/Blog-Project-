'use strict'

const { HEADER, objectIdParser } = require('../../utils/index')
const Error = require('../../core/error.response')
const KeyRepository = require('../../models/repository/key.repo')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//-------------------------------MAIN FUCNTION---------------------------------------------
const autherizeAccessToken = async (req, res, next) => {
    const { accessToken, userId } = getAccessTokenAndUserIdFromReq(req) // Get Access and userId
    await checkUserLogin(req, userId) // Check if user login or not
    await checkJWT(req, accessToken, req.keyStore.publicKey) // check JWT
    checkUserId(userId, req.decodeUser.userid) // Compare UserId with body of jwt
    next()
}


const autherizeRefreshToken = async (req, res, next) => {
    const { refreshToken, userId } = getRefreshTokenAndUserIdFromReq(req)
    await checkUserLogin(req, userId) // Check if user login or not
    await Promise.all([checkLegalRefreshToken(userId, refreshToken, req.keyStore.refreshTokenUsed), checkJWT(req, refreshToken, req.keyStore.publicKey)]);
    checkUserId(userId, req.decodeUser.userid); // So sánh UserId với nội dung của jwt
    next(); // Compare UserId with body of jwt
}


//-------------------------------SUB FUNCTION---------------------------------------------

function checkUserId(userId, legalUserId) {
    if (!isLegalUserId(userId, legalUserId)) {
        throw new Error.AuthError('Unvalid token')
    }
}

async function checkUserLogin(req, userId) {
    const keyStore = await isUserLogin(userId)
    req.keyStore = keyStore
    return keyStore
}

async function checkLegalRefreshToken(userId, refreshToken, usedRefreshTokens) {
    if (!isLegalRefreshToken(refreshToken, usedRefreshTokens)) {
        await hanldeWithIllegalToken(userId)
    }
}

async function hanldeWithIllegalToken(userId) {
    await deleteKeyStore(userId)
    throw new Error.AuthError("Invalid RefreshToken! Please Login Again")
}

async function deleteKeyStore(userId) {
    const filter = {
        userid: userId
    }
    return await KeyRepository.deleteKey(filter)
}

function isLegalRefreshToken(refreshToken, usedRefreshTokens) {
    const result = usedRefreshTokens.includes(refreshToken)
    return result === true ? false : true
}

async function isLegalUserId(userId, userIdInJWT) {
    return userId === userIdInJWT
}


function getRefreshTokenAndUserIdFromReq(req) {
    const refreshToken = getObjectFromReqHeader(req, HEADER.refreshToken)
    const userId = getObjectFromReqHeader(req, HEADER.clientId)
    if (!refreshToken) throw new Error.AuthError('Unvalid token')
    if (!userId) throw new Error.BadRequestError('Check userId again')
    return { refreshToken, userId }
}

function getAccessTokenAndUserIdFromReq(req) {
    const jwt = getObjectFromReqHeader(req, HEADER.autherization)
    const userId = getObjectFromReqHeader(req, HEADER.clientId)
    if (!jwt) throw new Error.AuthError('Unvalid token')
    if (!userId) throw new Error.BadRequestError('Check userId again')
    const accessToken = getAccessTokenFromJWT(jwt)
    if (!accessToken) throw new Error.AuthError('Unvalid token')
    return { accessToken, userId }
}

function getObjectFromReqHeader(req, keyword) {
    return req.headers[keyword]
}

function getAccessTokenFromJWT(JWT) {
    return JWT.split(' ')[1]
}

async function checkJWT(req, token, key) {
    const keyObject = await createPublicKeyObject(key)
    const decodeObject = await jwt.verify(token, keyObject)
    req.decodeUser = decodeObject
    return decodeObject
}

async function createPublicKeyObject(publicKeyString) {
    return await crypto.createPublicKey(publicKeyString)
}

async function isUserLogin(userId) {
    const keyStore = await KeyRepository.findKey({ "userid": objectIdParser(userId) })
    if (!keyStore) throw new Error.AuthError("User isn't login")
    return keyStore
}
//----------------------------------------------------------------------------

module.exports = {
    autherizeAccessToken,
    autherizeRefreshToken
}

