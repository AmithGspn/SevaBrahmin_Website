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
        enum: ['Volunteer', 'Recipient', 'Donor', 'Admin'],
        required: [true, "required"]
    },
    password: {
        type: String,
        required: [true, "required"],
    },
    approved: {
        type: Boolean
    },
    address: {
        type: String,
        trim: true
    }, 
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    pincode: {
        type: String,
        trim: true
    }
}, {
    collection: config.collections.registerations
});

UserSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }
    // obj.id = obj.id || uuid();

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
        if (err) {
            return callback(err);
        }
        if (allUsers) {
            return callback(null, allUsers);
        }
    })
};

UserSchema.statics.getUserByEmail = function (email, callback) {
    this.find({ email: email }, projectionsDefaults).lean().exec(function (err, User) {
        if (err) {
            return callback(err);
        }
        if (User) {
            return callback(null, User)
        }
    })
}

module.exports = db.model('user', UserSchema);