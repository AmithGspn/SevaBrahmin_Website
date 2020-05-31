let mongoose = require('mongoose');
let db = require('../mongoConnect');
let uuid = require('uuid');
// let async = require('async');
let config = require('../../config')
let Schema = mongoose.Schema;

let volunteerSchema = Schema({
    id: {
        type: String,
        unique: true,
        trim: true
    },
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
    }
}, {
    collection: config.collections.volunteers
});

volunteerSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    obj.id = obj.id || uuid();

    next();
});

module.exports = db.model('volunteers', volunteerSchema);