let mongoose = require('mongoose');
let db = require('./mongoConnect');
let config = require('../../config')
let Schema = mongoose.Schema;
const projectionsDefaults = { _id: 0, __v: 0 };

const UserSchema = Schema({
    firstName: {
        type: String,
        trim: true,
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
    pincode: {
        type: String,
        trim: true
    },
    familyName: {
        type: String,
        trim: true
    },
    user_id: {
        type: String
    },
    country: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true
    },
    referedBy: {
        type: String
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

UserSchema.statics.getUserById = function (Id, callback) {
    this.find({ user_id: Id }, projectionsDefaults).lean().exec(function (err, User) {
        if (err) {
            return callback(err);
        }
        if (User) {
            return callback(null, User)
        }
    })
}

UserSchema.statics.getUserByReferedBy = function (referedBy, callback) {
    this.find({ referedBy: referedBy }, projectionsDefaults).lean().exec(function (err, User) {
        if (err) {
            return callback(err);
        }
        if (User) {
            return callback(null, User);
        }
    })
}
module.exports = db.model('user', UserSchema);