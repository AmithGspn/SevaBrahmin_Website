let express = require('express');
let router = express.Router();
let volunteerModel = require('../db/models/volunteer');

router.post('/', async function (req, res, next) {
    data = {
        contact: req.body.contact,
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        gothram: req.body.gothram
    };

    try {
        let newDoc = await volunteerModel.create(data);
        res.status(200).json(newDoc.transform())
    }
    catch (err) {
        if (err.contact === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 409;
            e.message = "Contact details already exists";
            return next(e);
        }

        return next(err);
    }
});

router.get('/', async function (req, res, next) {
    let volunteers = await new Promise((resolve, reject) =>
    volunteerModel.getAllVolunteers( (err, docs) => err ? reject(err) : resolve(docs)));
    console.log(volunteers, "manager")
    return res.status(200).json(volunteers);
});

module.exports = router;