let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let registerationModel = require('../db/models/registeration');

router.post('/', async function (req, res, next) {
    data = {
        state: req.body.state,
        email: req.body.email,
        name: req.body.name,
        userType: req.body.userType,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        approved: req.body.approved || false,
        contact: req.body.contact,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        pincode: req.body.pincode,
        familName: req.body.familyName
    };

    try {
        let newDoc = await registerationModel.create(data);
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
    let users = await new Promise((resolve, reject) =>
    registerationModel.getAllUsers( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(users);
});

router.put('/', async function (req, res, next) {
    data = {
        state: req.body.state,
        email: req.body.email,
        name: req.body.name,
        userType: req.body.userType,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        approved: req.body.approved,
        contact: req.body.contact,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        pincode: req.body.pincode,
        familName: req.body.familyName
    };

    try {
        let updateDoc = await registerationModel.findOneAndUpdate(
            { email: req.body.email},
            { $set: data, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

        if (!updateDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

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

router.get('/getUserByEmail', async function (req, res, next) {
    let email= req.body['emailId'] || req.query['emailId']
    let user = await new Promise((resolve, reject) =>
    registerationModel.getUserByEmail(email, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

module.exports = router;