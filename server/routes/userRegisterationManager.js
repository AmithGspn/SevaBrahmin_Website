let express = require('express');
let router = express.Router();
let registerationModel = require('../db/models/registeration');

router.post('/', async function (req, res, next) {
    data = {
        userName: req.body.userName,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password,
        approved: false,
        contact: req.body.contact,
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

router.get('/', async function (req, res, next) {
    let users = await new Promise((resolve, reject) =>
    registerationModel.getAllUsers( (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(users);
});

router.put('/', async function (req, res, next) {
    data = {
        userName: req.body.userName,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password,
        approved: req.body.approved,
        contact: req.body.contact
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

module.exports = router;