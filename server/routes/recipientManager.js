let express = require('express');
let router = express.Router();
let recipientModel = require('../db/models/recipient');

router.post('/', async function (req, res, next) {
    data = {
        contact: req.body.contact,
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        gothram: req.body.gothram,
        bankAccountNumber: req.body.bankAccountNumber,
        IFSC: req.body.IFSC,
        state: req.body.state,
        district: req.body.district,
        taluk: req.body.taluk,
        village: req.body.village,
        volunteerNo: req.body.volunteerNo || " "
    };

    try {
        let newDoc = await recipientModel.create(data);
        res.status(200).json(newDoc.transform())
    }
    catch (err) {
        if (err.contact === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 409;
            e.message = "Contact details already exists";
            return next(e);
        }

        return next(err);
    }
});

router.get('/', async function (req, res, next) {
    let recipients = await new Promise((resolve, reject) =>
    recipientModel.getAllRecipients( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(recipients);
});

module.exports = router;