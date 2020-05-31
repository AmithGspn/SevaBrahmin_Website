let express = require('express');
let router = express.Router();
let registerationModel = require('../db/models/registeration');

router.post('/', async function (req, res, next) {
    data = {
        userName: req.body.userName,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password
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
    registerationModel.getAllUsers( function (err, allDocs) {
        if (err) {
            return next(err);
        }
        return res.status(200).json(allDocs);
    });
});

module.exports = router;