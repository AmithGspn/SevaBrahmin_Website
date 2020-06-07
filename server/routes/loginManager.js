let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let registerationModel = require('../db/models/registeration');

router.post('/', (req, res) => {
    data = req.body;
    registerationModel.findOne({ email: data.email}, (error, user)  => {
        if(error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== data.password) {
                    res.status(401).send('Invalid Passowrd') 
                } else if (user.approved === false) {
                    res.status(401).send('Account has not been activated yet')
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