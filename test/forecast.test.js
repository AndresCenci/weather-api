const supertest = require('supertest');
var should = require('should/as-function');
const { config } = require('../config/index');

const server = supertest.agent(`http://localhost:${config.port}`);

describe('Forecast tests', function() {
    const city = 'London';
    const wrongCity = 'Toontown';

    it('should list forecast', function() {
        server
        .get('/v1/forecast')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                return err;
            }
            should(res.body.data).have.property('list');
            should(res.body.data.list).be.instanceof(Array).and.have.lengthOf(40);
            should(res.body.data.list[0]).have.property('dt');
            should(res.body.data.list[0]).have.property('dt_txt');
            should(res.body.data.list[0].main).have.property('temp');
            should(res.body.data.list[0].main).have.property('pressure');
            should(res.body.data.list[0].main).have.property('humidity');
            should(res.body.data.list[0].wind).have.property('speed');
            should(res.body.data.list[0].weather[0]).have.property('description');
            should(res.body.data.list[0].weather[0]).have.property('icon');
        })
    })

    it('should list forecast with city', function() {
        server
        .get(`/v1/forecast/${city}`)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                return err;
            }
            should(res.body.data.city).have.property('name').be.exactly(city);
            should(res.body.data).have.property('list');
            should(res.body.data.list).be.instanceof(Array).and.have.lengthOf(40);
            should(res.body.data.list[0]).have.property('dt');
            should(res.body.data.list[0]).have.property('dt_txt');
            should(res.body.data.list[0].main).have.property('temp');
            should(res.body.data.list[0].main).have.property('pressure');
            should(res.body.data.list[0].main).have.property('humidity');
            should(res.body.data.list[0].wind).have.property('speed');
            should(res.body.data.list[0].weather[0]).have.property('description');
            should(res.body.data.list[0].weather[0]).have.property('icon');
        })
    })

    it('should list forecast with wrong city', function() {
        server
        .get(`/v1/forecast/${wrongCity}`)
        .expect(400)
        .end(function(err, res) {
            if (err) {
                return err;
            }
            should(res.body.data).have.property('message').be.exactly('city not found');
        })
    })
})
