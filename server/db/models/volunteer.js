let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid').v4;
let config = require('../../config')
let Schema = mongoose.Schema;
let recipientModel = require('./recipient');
let async = require('async')
const projectionsDefaults = { _id: 0, __v: 0 };

let volunteerSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, "required"]
    },
    contact: {
        type: Number,
        match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        unique: true,
        required: [true, "required"]
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "required"]
    },
    familyName: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    approved: {
        type: Boolean
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true
    },
    requestType: {
        type: String,
        // enum: ['None','food', 'clothes', 'education', 'medicines', 'finance'],
        required: [true, "required"]
    },
    requests_handled: {
        type: Number
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

volunteerSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
});

volunteerSchema.statics.getAllVolunteers = function (callback) {
    try {
        this.find({ }, projectionsDefaults).lean().exec(function (err, allVolunteers) {
        if (err) {;
            return callback(err);
        }
        let volunteers = [];

        async.each(
            allVolunteers,
            function (doc, cb) {
                doc.recipients = [];
                recipients = [];
                recipientModel.getAllRecipients( function (err, recipients) {
                    if (err) {
                        return callback(err);
                    }
                    async.each(recipients,
                        function (recipient, fcb) {
                            if (doc.contact === recipient.volunteerNo) {
                                doc.recipients.push(recipient);
                                fcb();
                            }
                        }, function (err) {
                            if (err) {
                                return callback(err);
                            }
                            volunteers.push(doc);
                        });
                    });
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null, volunteers);
            });
        })
    } catch (err) {
        return callback(err);
    }


    this.find({ }, projectionsDefaults).lean().exec(function (err, allVolunteers) {
        if (err) {;
            return callback(err);
        }
        if (allVolunteers) {
            return callback(null, allVolunteers);
        }
    })
};

volunteerSchema.statics.getVolunteerByEmail = function (email, callback) {
    this.find({ email: email }, projectionsDefaults).lean().exec(function (err, volunteer) {
        if (err) {
            return callback(err);
        }
        if (volunteer) {
            return callback(null, volunteer)
        }
    })
}

module.exports = db.model('volunteers', volunteerSchema);