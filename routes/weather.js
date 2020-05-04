const express = require('express');
const WeatherService = require('../services/weather');

function weatherApi(app) {
    const router = express.Router();
    app.use("/v1", router);
    const weatherService = new WeatherService();

    router.get('/location', async function(req, res, next) {
        try {
            const weather = await weatherService.getLocation();
            res.status(200).json({
                data: weather,
                message: 'weather listed'
            });
        } catch(err) {
            next(err);
        }
    });

    router.get('/current/:city?', async function(req, res, next) {
        const { city } = req.params;

        try {
            const weather = await weatherService.getCurrent(city);
            res.status(200).json({
                data: weather,
                message: 'weather listed'
            });
        } catch(err) {
            next(err);
        }
    });

    router.get('/forecast/:city?', async function(req, res, next) {
        const { city } = req.params;

        try {
            const weather = await weatherService.getForecast(city);
            res.status(200).json({
                data: weather,
                message: 'weather listed'
            });
        } catch(err) {
            next(err);
        }
    });

    router.get('/find/:city?/:country?', async function(req, res, next) {
        const { city, country } = req.params;

        try {
            const weather = await weatherService.getForecast(city, country);
            res.status(200).json({
                data: weather,
                message: 'weather listed'
            });
        } catch(err) {
            next(err);
        }
    });
}

module.exports = weatherApi;
