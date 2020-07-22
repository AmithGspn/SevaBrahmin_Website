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

router.get('/getDonorById', async function (req, res, next) {
    let Id= req.body['donor_id'] || req.query['donor_id']
    let user = await new Promise((resolve, reject) =>
    donorModel.getDonorByEmail(Id, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

router.post('/', async function (req, res, next) {
    try {
        data = {
            email: req.body.email,
            contact: req.body.contact,
            firstName: req.body.firstName,
            familyName: req.body.familyName,
            donor_id: req.body.donor_id,
            fund_donated: req.body.fund_donated
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
        donorModel.getAllDonors( (err, docs) => err ? reject(err) : resolve(docs)));
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

router.delete('/', async function (req, res, next) {
    let donorId = req.query['donor_id'] || req.body['donor_id'];
    try {
        let delDoc = await donorModel.findOneAndRemove({ donor_id: donorId });
        if (!delDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

            return next(e);
        } else {
            return res.status(200).json({ donor_id: donorId, "deleted": true });
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;