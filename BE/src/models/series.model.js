'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'series';
const COLLECTION_NAME = 'series';

var seriesSchema = new mongoose.Schema({
    series_name: [{
        type: String,
        required: true
    }],
    series_detail: {
        type: Array,
        validate: {
            validator: function (arr) {
                return arr.length >= 2;
            },
            message: 'series_detail must have at least two elements',
        },
        required: true
    },
    /*
    {
        _id: ,
        post name,
        
    }
    */
    series_status: {
        type: String,
        required: true,
        enum: ['active', 'draft']
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});


module.exports = mongoose.model(DOCUMENT_NAME, seriesSchema);