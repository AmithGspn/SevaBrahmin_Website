let express = require('express');
let router = express.Router();

router.post('/', async function (req, res, next) {
    let switchId = util.getSwitchId(req);

    data = {
        type: req.body.type,
        size: req.body.size,
        name: req.body.name,
        switchId: switchId
    };

    try {
        let newDoc = await typedefSchema.create(data);

        res.status(200).json(newDoc.transform())
    }
    catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            e = new Error();
            e.status = 409;
            e.message = "name already in use, choose a different one";
            return next(e);
        }

        return next(err);
    }
});