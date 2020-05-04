const supertest = require('supertest');
var should = require('should/as-function');
const { config } = require('../config/index');

const server = supertest.agent(`http://localhost:${config.port}`);

describe('Current tests', function() {
    const city = 'London';
    const wrongCity = 'Toontown';

    it('should list current', function() {
        server
        .get('/v1/current')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                return err;
            }
            should(res.body.data).have.property('name');
            should(res.body.data).have.property('dt');
            should(res.body.data.main).have.property('temp');
            should(res.body.data.main).have.property('pressure');
            should(res.body.data.main).have.property('humidity');
            should(res.body.data.wind).have.property('speed');
            should(res.body.data.weather[0]).have.property('description');
            should(res.body.data.weather[0]).have.property('icon');
        })
    })

    it('should list current with city', function() {
        server
        .get(`/v1/current/${city}`)
        .expect(200)
        .end(function(err, res) {
            should(res.body.data).have.property('name');
            should(res.body.data).have.property('dt');
            should(res.body.data.main).have.property('temp');
            should(res.body.data.main).have.property('pressure');
            should(res.body.data.main).have.property('humidity');
            should(res.body.data.wind).have.property('speed');
            should(res.body.data.weather[0]).have.property('description');
            should(res.body.data.weather[0]).have.property('icon');
        })
    })

    it('should list current with wrong city', function() {
        server
        .get(`/v1/current/${wrongCity}`)
        .expect(400)
        .end(function(err, res) {
            should(res.body.data).have.property('message').be.exactly('city not found');
        })
    })
})
