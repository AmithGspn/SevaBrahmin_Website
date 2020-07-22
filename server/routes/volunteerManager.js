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

router.post('/', async function (req, res, next) {
    // jwt.verify(req.token, 'secretKey', async(err, authData) => {
        try {
            data = {
                approved: req.body.approved || false,
                email: req.body.email,
                contact: req.body.contact,
                firstName: req.body.firstName,
                familyName: req.body.familyName,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                volunteer_id: req.body.volunteer_id,
                requests: req.body.requests,
                // requestType: req.body.requestType,
                requests_handled: req.body.requests_handled
            };

            let newDoc = await volunteerModel.create(data);
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
    // });
});

router.get('/', async function (req, res, next) {
    // jwt.verify(req.token, 'secretKey', async(err, authData) => {
        try {
            let volunteers = await new Promise((resolve, reject) =>
            volunteerModel.getAllVolunteers( (err, docs) => err ? reject(err) : resolve(docs)));
            return res.status(200).json(volunteers);
        }
        catch (err) {
            if (err.contact === 'MongoError' && err.code === 11000) {
                e = new Error();
                e.status = 403;
                e.message = "Contact details already exists";
                return next(e);
            }
        }
    // });
});

router.put('/', async function (req, res, next) {
    data = {
        approved: req.body.approved,
        // approved: req.body.approved || false,
        email: req.body.email,
        contact: req.body.contact,
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        volunteer_id: req.body.volunteer_id,
        requests: req.body.requests,
        requests_handled: req.body.requests_handled
};

    try {
        let updateDoc = await volunteerModel.findOneAndUpdate(
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

router.get('/getVolunteerById', async function (req, res, next) {
    let Id= req.body['volunteer_id'] || req.query['volunteer_id']
    console.log(Id)
    let user = await new Promise((resolve, reject) =>
    volunteerModel.getVolunteerById(Id, (err, docs) => err ? reject(err) : resolve(docs)));
    return res.status(200).json(user);
});

router.delete('/', async function (req, res, next) {
    let volunteerId = req.query['volunteer_id'] || req.body['volunteer_id'];
    try {
        let delDoc = await volunteerModel.findOneAndRemove({ volunteer_id: volunteer_id });
        if (!delDoc) {
            e = new Error();
            e.status = 404;
            e.message = 'user not found';

            return next(e);
        } else {
            return res.status(200).json({ volunteer_id: volunteer_id, "deleted": true });
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;