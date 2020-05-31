// let mongoose = require('mongoose');
// let db = require('../mongoConnect');
// let uuid = require('uuid');
// // let async = require('async');
// let config = require('../../config')
// let Schema = mongoose.Schema;

// let loginSchema = Schema({
    // id: {
    //     type: String,
    //     unique: true,
    //     trim: true
    // },
//     userName: {
//         type: String,
//         unique: true,
//         trim: true 
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     loginType: {
//         type: String,
//         enum: ['volunteer', 'recipient', 'donor']
//     }
// }, {
//     collection: config.collections.logins
// });

// module.exports = db.model('login', loginSchema);