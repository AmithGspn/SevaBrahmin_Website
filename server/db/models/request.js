let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

let RequestSchema = Schema({
    firstName: {
        type: String
    },
    familyName: {
        type: String
    },
    email: {
        type: String,
        trim: true
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

RequestSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    next();
});

RequestSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj.__id;
    delete obj.__v;

    return obj;
});

RequestSchema.statics.getAllrequests = function (callback) {
    this.find({ }, projectionsDefaults).lean().exec(function (err, allRequests) {
        if (err) {;
            return callback(err);
        }
        if (allRequests) {
            return callback(null, allRequests);
        }
    })
};

module.exports = db.model('request', RequestSchema);