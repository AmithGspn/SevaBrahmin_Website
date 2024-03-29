let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid').v4;
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

let RequestSchema = Schema({
    recipientName: {
        type: String
    },
    familyName: {
        type: String,
        trim:true
    },
    request_id: {
        trim: true,
        type: String
    },
    recipient_id: {
        trim: true,
        type: String
    },
    contact: {
        type: String,
        required: [true, "required"],
    },
    email: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trime: true
    },
    state: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    requestType: {
        type: String,
        required: [true,"required"]
    },
    amount: {
        type: String,
        trim: true,
        required: [true,"required"]
    },
    status: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
        required: [true,"required"]
    },
    occupation: {
        type: String,
        trim: true,
        required: [true,"required"]
    },
    handledBy: {
        type: String,
        trim: true
    },
    donor: {
        type: String
    }
}, {
    collection: config.collections.request
});

RequestSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    obj.request_id = obj.request_id || uuid();
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

RequestSchema.statics.getRequestsById = function (Id, callback) {
    this.find({ recipient_id: Id }, projectionsDefaults).lean().exec(function (err, Requests) {
        if (err) {
            return callback(err);
        }
        if (Requests) {
            return callback(null, Requests)
        }
    })
}

RequestSchema.statics.getRequestsByHandledBy = function (handledBy,callback) {
    this.find({ handledBy: handledBy }, projectionsDefaults).lean().exec(function (err, Requests) {
        if (err) {
            return callback(err);
        }
        if (Requests) {
            return callback(null, Requests)
        }
    })
}

module.exports = db.model('request', RequestSchema);