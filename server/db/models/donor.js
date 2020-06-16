let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
let recipientModel = require('./recipient');
const projectionsDefaults = { _id: 0, __v: 0 };

let donorSchema = Schema({
    email: {
        type: String,
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
        trim: true,
        required: [true, "required"]
    },
    state: {
        type: String,
        trim: true,
        // required: [true, "required"]
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
    collection: config.collections.donor
});

donorSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    let obj = this;

    if (this._update && this._update['$set']){
        obj = this._update['$set'];
    }

    obj.id = obj.id || uuid();

    next();
});

donorSchema.method('transform', function () {
    let obj = this.toObject();

    delete obj._id;
    delete obj.__v;

    return obj;
});

donorSchema.statics.getAllDonors = function (callback) {
    try {
        this.find({ }, projectionsDefaults).lean().exec(function (err, allDonors) {
        if (err) {;
            return callback(err);
        }
        let donors = [];

        async.each(
            allDonors,
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
                            donors.push(doc);
                        });
                    });
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null, donors);
            });
        })
    } catch (err) {
        return callback(err);
    }


    this.find({ }, projectionsDefaults).lean().exec(function (err, allDonors) {
        if (err) {;
            return callback(err);
        }
        if (allDonors) {
            return callback(null, allDonors);
        }
    })
};

module.exports = db.model('donors', donorSchema);