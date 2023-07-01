let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const apiUrl = '/api/counterManagements';

module.exports = {
    name: "analyze_counter_state",
    test: function (app) {
        chai.request(app)
            .post(apiUrl)
            .set('Content-Type', 'application/json')
            .send({type: 'increase', value:0})
            .end(function (err, res) {
                try {

                    chai.expect(err).to.equal(null);
                    chai.expect(res.status).to.equal(200);

                    console.log('passed --------');
                } catch (err) {
                    console.log('====== test failed ======', err);
                }
            });

    }
};
