const supertest = require('supertest');
var should = require('should/as-function');
const { config } = require('../config/index');

const server = supertest.agent(`http://localhost:${config.port}`);

describe('Location tests', function() {
    it('should list location', function() {
        server
        .get('/v1/location')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                return err;
            }
            should(res.body.data).have.property('city');
            should(res.body.data).have.property('country');
        })
    })
})
