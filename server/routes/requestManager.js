let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let requestModel = require('../db/models/request');

router.post('/', async function (req, res, next) {
    data = {
        recipientName: req.body.recipientName,
        familyName: req.body.familyName,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        email: req.body.email,
        contact: req.body.contact,
        occupation: req.body.occupation,
        requestType: req.body.requestType,
        amount: req.body.amount,
        description: req.body.description,
        status: req.body.status,
        handledBy: req.body.handledBy,
        donor: req.body.donor,
        request_id: req.body.request_id,
        recipient_id: req.body.recipient_id
    };

    try {
        let newDoc = await requestModel.create(data);
        res.status(200).json(newDoc.transform())
    }
    catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 409;
            e.message = "email already in use, choose a different one";
            return next(e);
        }
        return next(err);
    }
});

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

router.get('/', async function (req, res, next) {
    let requests = await new Promise((resolve, reject) =>
    requestModel.getAllrequests( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(requests);
});

router.get('/getRequestsById', async function (req, res, next) {
    let Id= req.body['recipient_id'] || req.query['recipient_id']
    let requests = await new Promise((resolve, reject) =>
    requestModel.getRequestsById(Id, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(requests);
})

router.get('/getRequestsByHandledBy', async function (req, res, next) {
    let handledBy= req.body['handledBy'] || req.query['handledBy']
    let requests = await new Promise((resolve, reject) =>
    requestModel.getRequestsByHandledBy(handledBy, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(requests);
})

router.put('/', async function (req, res, next) {
    data = {
        recipientName: req.body.recipientName,
        familyName: req.body.familyName,
        contact: req.body.contact,
        email: req.body.email,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        requestType: req.body.requestType,
        amount: req.body.amount,
        status: req.body.status,
        description: req.body.description,
        occupation: req.body.occupation,
        handledBy: req.body.handledBy,
        donor: req.body.donor,
        request_id: req.body.request_id,
        recipeint_id: req.body.recipeint_id,
    };
    try {
        console.log('ddddddddddddddd')
        let updateDoc = await requestModel.findOneAndUpdate(
            { request_id: req.body.request_id},
            { $set: data, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );
        console.log(updateDoc, "lllllllllllllllll")

        if (!updateDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'request not found';

            return next(e);
        } else {
            return res.status(200).json(updateDoc.transform());
        }
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 409;
            e.message = "name already in use, choose a different one";
            return next(e);
        }

        return next(err);
    }
});

/* Delete a request */
router.delete('/', async function (req, res, next) {
    let requestId = req.query['request_id'] || req.body['request_id'];
    try {
        let delDoc = await requestModel.findOneAndRemove({ request_id: requestId });
        if (!delDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

            return next(e);
        } else {
            return res.status(200).json({ request_id: requestId, "deleted": true });
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;