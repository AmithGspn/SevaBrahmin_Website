let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

let recipientSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, "required"]
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "required"],
    },
    familyName: {
        type: String,
        trim: true
    },
    // gothram: {
    //     type: String,
    //     trim: true
    // },
    bankAccountNumber: {
        type: Number,
        match: /^\d{11}$/,
        unique: true,
        trim: true,
        required: [true, "required"],
    },
    IFSC: {
        type: String,
        // match: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
    },
    state: {
        type: String,
        trim: true
    },
    volunteerNo: {
        type: Number,
        match: /^\d{10}$/
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
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

module.exports = db.model('recipients', recipientSchema);