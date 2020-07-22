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

router.get('/getRecipientById', async function (req, res, next) {
    let Id= req.body['recipient_id'] || req.query['recipient_id']
    let user = await new Promise((resolve, reject) =>
    recipientModel.getRecipientById(Id, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

router.post('/', async function (req, res, next) {
    data = {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        email: req.body.email,
        contact: req.body.contact,
        recipient_id: req.body.recipient_id,
        bankAccountNumber: req.body.bankAccountNumber,
        IFSC: req.body.IFSC,
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

router.delete('/', async function (req, res, next) {
    let recipientId = req.query['recipient_id'] || req.body['recipient_id'];
    try {
        let delDoc = await recipientModel.findOneAndRemove({ recipient_id: recipientId });
        if (!delDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

            return next(e);
        } else {
            return res.status(200).json({ recipient_id: recipientId, "deleted": true });
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;