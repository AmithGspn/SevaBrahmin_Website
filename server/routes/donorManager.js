let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let donorModel = require('../db/models/donor');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    } 
    let token = req.headers.authorization.split(' ')[1]
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

router.post('/', async function (req, res, next) {
    try {
        data = {
            email: req.body.email,
            firstName: req.body.firstName,
            familyName: req.body.familyName,
            gothram: req.body.gothram,
            state: req.body.state,
            address: req.body.address,
            postalCode: req.body.postalCode
        };

        let newDoc = await donorModel.create(data);
        res.status(200).json(newDoc.transform())
    }
    catch (err) {
        if (err.contact === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 403;
            e.message = "Contact details already exists";
            return next(e);
        }

        return next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {
        let volunteers = await new Promise((resolve, reject) =>
        donorModel.getAllVolunteers( (err, docs) => err ? reject(err) : resolve(docs)));
        return res.status(200).json(volunteers);
    }
    catch (err) {
        if (err.contact === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 403;
            e.message = "Contact details already exists";
            return next(e);
        }

        return next(err);
    }
});

module.exports = router;