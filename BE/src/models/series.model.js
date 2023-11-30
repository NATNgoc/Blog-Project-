'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'series';
const COLLECTION_NAME = 'series';

var seriesSchema = new mongoose.Schema({
    series_name: {
        type: String,
        required: true
    },
    series_user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    series_post_ids: {
        type: Array,
        default: [{
            type: mongoose.Types.ObjectId,
            ref: 'post'
        }],
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});


module.exports = mongoose.model(DOCUMENT_NAME, seriesSchema);