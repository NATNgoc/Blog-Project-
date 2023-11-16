'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'comments'
const DOCUMENTS_NAME = 'comment'

var commentSchema = new mongoose.Schema({
    cmt_parent_comment_id: {
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    },
    cmt_post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cmt_user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cmt_content: {
        type: String,
        required: true
    },
    cmt_likes_count: {
        type: Number,
        default: 0
    },
    cmt_likes: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, commentSchema);
