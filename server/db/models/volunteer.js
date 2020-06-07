let mongoose = require('mongoose');
let db = require('./mongoConnect');
let uuid = require('uuid');
let config = require('../../config')
let Schema = mongoose.Schema;
let recipientModel = require('./recipient');
const projectionsDefaults = { _id: 0, __v: 0 };

let volunteerSchema = Schema({
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
    gothram: {
        type: String,
        trim: true
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
                            console.log(volunteers, "bbbbbbbbbb")
                        });
                    });
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                console.log(volunteers, "aaaaaaaaaa")
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

module.exports = db.model('volunteers', volunteerSchema);