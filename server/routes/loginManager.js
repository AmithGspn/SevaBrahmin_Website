let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let registerationModel = require('../db/models/registeration');

router.post('/', (req, res,next) => {
    data = req.body;
    registerationModel.findOne({ email: data.email}, (error, user)  => {
        if(error) {
            console.log(error)
        } else {
            if (!user) {
                try {
                    throw new Error('Invalid Email');
                } catch (er) {
                    return next(er)
                }
            } else {
                if (user.password !== data.password) {
                    try {
                        throw new Error('Invalid Password');
                    } catch (er) {
                        return next(er)
                    }
                } else if (user.approved === false) {
                    try {
                        throw new Error('Account has not been activated yet');
                    } catch (er) {
                        return next(er)
                    }
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token, user})
                }
            }
        }
    })
})

module.exports = router;