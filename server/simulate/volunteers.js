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

    describe("populate volunteers", function () {
        let data = allData.volunteers;
        data.forEach(function (d) {
            it('create a volunteer', (done) => {
                console.log(d.name)
                
            chai.request(server)
                .post('/volunteerManager/')
                .send(d)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    allData.volunteers = data;
                    dataHelper.write(file, allData);
                    done();
                });
            });
        });
    });
});