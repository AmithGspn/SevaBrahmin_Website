let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

let recipientSchema = Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "required"],
    },
    familyName: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        unique: true,
        required: [true, "required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "required"]
    },
    recipient_id: {
        type: String
    },
    bankAccountNumber: {
        type: Number,
        match: /^\d{11}$/,
        unique: true,
        trim: true,
        required: [true, "required"],
    },
    IFSC: {
        type: String,
    },
    referedBy: {
        type: String,
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

recipientSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
});

recipientSchema.statics.getAllRecipients = function (callback) {
    this.find({ }, projectionsDefaults).lean().exec(function (err, allRecipients) {
        if (err) {;
            return callback(err);
        }
        if (allRecipients) {
            return callback(null, allRecipients);
        }
    })
};

recipientSchema.statics.getRecipientsByReferedBy = function (referedBy,callback) {
    this.find({ referedBy: referedBy }, projectionsDefaults).lean().exec(function (err, Recipients) {
        if (err) {;
            return callback(err);
        }
        if (Recipients) {
            return callback(null, Recipients);
        }
    })
};

recipientSchema.statics.getRecipientById = function (Id,callback) {
    this.find({ recipient_id: Id }, projectionsDefaults).lean().exec(function (err, Recipients) {
        if (err) {;
            return callback(err);
        }
        if (Recipients) {
            return callback(null, Recipients);
        }
    })
};

module.exports = db.model('recipients', recipientSchema);