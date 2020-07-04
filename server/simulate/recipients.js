let config = require('./config');
let dataHelper = require('./loadData')

process.env.NODE_ENV = 'simulate';

let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

config.files.forEach(file => {
    let allData = dataHelper.load(file);
    let server = require('../app');

    describe("populate recipients", function () {
        let data = allData.recipients;
        data.forEach(function (d) {
            it('create a recipient', (done) => {
                console.log(d.name)
                
            chai.request(server)
                .post('/recipientManager/')
                .send(d)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    allData.recipients = data;
                    dataHelper.write(file, allData);
                    done();
                });
            });
        });
    });
});