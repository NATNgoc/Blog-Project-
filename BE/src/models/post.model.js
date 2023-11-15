'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'posts'
const DOCUMENTS_NAME = 'post'

var postSchema = new Schema({
    post_user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    post_thumb_url: {
        type: String,
        required: true
    },
    post_likes_count: {
        type: Number,
        default: 0
    },
    post_description: {
        type: String,
        required: true
    },
    post_coments_count: {
        type: Number,
        default: 0
    },
    post_likes_ids: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    post_coments_ids: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    post_category_ids: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked']
    },
    post_is_series: {
        type: Boolean,
        required: true
    },
    post_series_id: {
        type: mongoose.Types.ObjectId,
        ref: 'series'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, postSchema);
