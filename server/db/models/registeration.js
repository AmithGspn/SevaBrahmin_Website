let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let async = require('async');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

const UserSchema = Schema({
    id: {
        type: String,
        unique: true,
        trim: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ['volunteer', 'recipient', 'donor']
    },
    password: {
        type: String,
        required: true
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
        async.each(allUsers,
            function (user, cb) {
                allUsersArray = []
                allUsersArray.push(user)
                console.log(allUsersArray)
                }, function (err){
                    if (err){
                        return callback(err);
                    }
                    cb();
                })
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null, allUsers);
            })
    };

module.exports = db.model('user', UserSchema);