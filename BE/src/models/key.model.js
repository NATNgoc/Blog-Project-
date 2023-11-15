'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'key';
const COLLECTION_NAME = 'keys';

var keySchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    publicKey: {
        type: String,
        require: true
    },
    refreshTokenUsed: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, keySchema);