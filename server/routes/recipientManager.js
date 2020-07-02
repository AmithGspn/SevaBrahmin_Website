let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let recipientModel = require('../db/models/recipient');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    } 
    let token = req.headers.authorization.spilt(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    } 
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/getRecipientsByReferedBy', async function (req, res, next) {
    let referedBy= req.body['referedBy'] || req.query['referedBy']
    let user = await new Promise((resolve, reject) =>
    recipientModel.getRecipientsByReferedBy(referedBy, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

router.get('/getRecipientByEmail', async function (req, res, next) {
    let email= req.body['email'] || req.query['email']
    let user = await new Promise((resolve, reject) =>
    recipientModel.getRecipientByEmail(email, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

router.post('/', async function (req, res, next) {
    data = {
        email: req.body.email,
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        referedBy: req.body.referedBy,
        bankAccountNumber: req.body.bankAccountNumber,
        IFSC: req.body.IFSC,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        volunteerNo: req.body.volunteerNo || " ",
        referedBy: req.body.referedBy
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

router.get('/',async function (req, res, next) {
    let recipients = await new Promise((resolve, reject) =>
    recipientModel.getAllRecipients( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(recipients);
});

module.exports = router;