let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let async = require('async');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

const UserSchema = Schema({
    userName: {
        type: String,
        required: [true, "required"]
    },
    email: {
        type: String,
        unique: true,
        sparse:true,
        required: [true, "required"]
    },
    userType: {
        type: String,
        enum: ['volunteer', 'recipient', 'donor'],
        required: [true, "required"]
    },
    contact: {
        type: Number,
        match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        unique: true,
        required: [true, "required"]
    },
    password: {
        type: String,
        required: [true, "required"],
    }
}, {
    collection: config.collections.registerations
});

UserSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
});

UserSchema.statics.getAllUsers = function (callback) {
    this.find({ }, projectionsDefaults).lean().exec(function (err, allUsers) {
        if (err) {;
            return callback(err);
        }
        if (allUsers) {
            return callback(null, allUsers);
        }
    })
};

module.exports = db.model('user', UserSchema);