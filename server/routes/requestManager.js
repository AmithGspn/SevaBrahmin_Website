let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let requestModel = require('../db/models/request');

router.post('/', async function (req, res, next) {
    data = {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        email: req.body.email,
        contact: req.body.contact,
        occupation: req.body.occupation,
        type: req.body.type,
        amount: req.body.amount,
        descrition: req.body.descrition,
        status: req.body.status
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
    requestModel.getAllRequests( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(requests);
});

router.put('/', async function (req, res, next) {
    data = {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        email: req.body.email,
        contact: req.body.contact,
        occupation: req.body.occupation,
        type: req.body.type,
        amount: req.body.amount,
        descrition: req.body.descrition,
        status: req.body.status
    };

    try {
        let updateDoc = await requestModel.findOneAndUpdate(
            { email: req.body.email},
            { $set: data, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

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