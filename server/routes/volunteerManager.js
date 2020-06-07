let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let volunteerModel = require('../db/models/volunteer');

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

router.post('/', verifyToken, async function (req, res, next) {
    jwt.verify(req.token, 'secretKey', async(err, authData) => {
        if(err) {
            if (err.contact === 'MongoError' && err.code === 11000) {
                e = new Error();
                e.status = 403;
                e.message = "Contact details already exists";
                return next(e);
            }
    
            return next(err);
        } else {
            data = {
                contact: req.body.contact,
                firstName: req.body.firstName,
                familyName: req.body.familyName,
                gothram: req.body.gothram
            };

            let newDoc = await volunteerModel.create(data);
            res.status(200).json(newDoc.transform(),authData)
        }
    });
});

router.get('/', verifyToken, async function (req, res, next) {
    jwt.verify(req.token, 'secretKey', async(err, authData) => {
        if(err) {
            if (err.contact === 'MongoError' && err.code === 11000) {
                e = new Error();
                e.status = 403;
                e.message = "Contact details already exists";
                return next(e);
            }
    
            return next(err);
        } else {
            let volunteers = await new Promise((resolve, reject) =>
            volunteerModel.getAllVolunteers( (err, docs) => err ? reject(err) : resolve(docs)));
            return res.status(200).json(volunteers, authData);
        }
    });
});

module.exports = router;