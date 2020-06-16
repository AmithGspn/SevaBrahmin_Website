let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

let requestSchema = Schema({
    firstName: {
        type: String
    },
    familyName: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    contact: {
        type: Number
    },
    occupation: {
        type: String,
        trim: true,
        required: [true,"required"]
    },
    type: {
        type: String,
        required: [true,"required"]
    },
    amount: {
        type: Number,
        trim: true,
        required: [true,"required"]
    },
    description: {
        type: String,
        trim: true,
        required: [true,"required"]
    },
    status: {
        type: String,
    }
}, {
    collection: config.collections.request
});