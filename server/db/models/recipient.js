let mongoose = require('mongoose');
let db = require('../mongoConnect');
let uuid = require('uuid');
// let async = require('async');
let config = require('../../config')
let Schema = mongoose.Schema;

let recipientSchema = Schema({
    contact: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    firstName: {
        type: String,
        unique: true,
        trim: true
    },
    familyName: {
        type: String,
        unique: true,
        trim: true

    },
    gothram: {
        type: String,
        unique: true,
        trim: true
    },
    bankAccountNumber: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{11}/.test(v);
            },
            unique: true,
            trim: true,
            message: '{VALUE} is not a valid 11 digit number!'
        }
    },
    IFSC: {
        type: String,
        match: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/
    },
    state: {
        type: String,
        unique: true,
        trim: true
    },
    district: {
        type: String,
        unique: true,
        trim: true
    },
    taluk: { type: String,
        type: String,
        unique: true,
        trim: true
    },
    village: {
        type: String,
        unique: true,
        trim: true
    }
}, {
    collection: config.collections.recipients
});

recipientSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    obj.id = obj.id || uuid();

    next();
});

module.exports = db.model('recipients', recipientSchema);