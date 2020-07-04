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

    describe("populate donors", function () {
        let data = allData.donors;
        data.forEach(function (d) {
            it('create a donor', (done) => {
                console.log(d.name)
                
            chai.request(server)
                .post('/donorManager/')
                .send(d)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    allData.donors = data;
                    dataHelper.write(file, allData);
                    done();
                });
            });
        });
    });
});