let mongoose = require('mongoose');
let db = require('./mongoConnect');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

const UserSchema = Schema({
    name: {
        type: String,
        trim: true,
    },
    contact: {
        type: Number,
        unique: true,
        required: [true, "required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "required"]
    },
    age: {
        type: Number,
        required: [true, "required"]
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, "required"]
    },
    userType: {
        type: String,
        enum: ['volunteer', 'recipient', 'donor', 'admin'],
        required: [true, "required"]
    },
    password: {
        type: String,
        required: [true, "required"],
    },
    approved: {
        type: Boolean
    }
}, {
    collection: config.collections.registerations
});

UserSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    next();
});

UserSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj.__id;
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