let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let registerationModel = require('../db/models/registeration');

router.post('/', async function (req, res, next) {
    data = {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        email: req.body.email,
        firstName: req.body.firstName,
        userType: req.body.userType,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        approved: false || req.body.approved,
        contact: req.body.contact,
        address: req.body.address,
        pincode: req.body.pincode,
        user_id: req.body.user_id,
        familyName: req.body.familyName,
        referedBy: req.body.referedBy
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
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        email: req.body.email,
        firstName: req.body.firstName,
        userType: req.body.userType,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        approved: req.body.approved,
        contact: req.body.contact,
        address: req.body.address,
        pincode: req.body.pincode,
        user_id: req.body.user_id,
        familyName: req.body.familyName,
        referedBy: req.body.referedBy
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

router.get('/getUserById', async function (req, res, next) {
    let Id= req.body['user_id'] || req.query['user_id']
    let user = await new Promise((resolve, reject) =>
    registerationModel.getUserById(Id, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

router.delete('/', async function (req, res, next) {
    let userId = req.query['user_id'] || req.body['user_id'];
    console.log(userId);
    try {
        let delDoc = await registerationModel.findOneAndRemove({ user_id: userId });
        if (!delDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

            return next(e);
        } else {
            return res.status(200).json({ user_id: userId, "deleted": true });
        }
    } catch (err) {
        return next(err);
    }
});

router.get('/getUserByReferedBy', async function (req, res, next) {
    let referedBy= req.body['referedBy'] || req.query['referedBy']
    let user = await new Promise((resolve, reject) =>
    registerationModel.getUserByReferedBy(referedBy, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
})

module.exports = router;