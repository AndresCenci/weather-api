const { config } = require('../config/index');
const fetch = require('node-fetch');
let ipapi = require('ipapi.co');

class WeatherService {
    constructor() {
        this.location = {};
        ipapi.location(loc => this.location = loc);
    }

    async getLocation() {
        return this.location || {};
    }

    async getCurrent(city = this.location.city) {
        let url = config.urlOpenWeather.concat(`weather?q=${city}&appid=${config.appidOpenWeather}&units=metric`);

        const current = await fetch(url);
        const json = await current.json();
        return json || {};
    }

    async getForecast(city = this.location.city) {
        let url = config.urlOpenWeather.concat(`forecast?q=${city}&appid=${config.appidOpenWeather}&units=metric`);

        const current = await fetch(url);
        const json = await current.json();
        return json || {};
    }

    async getFind(city, country) {
        let url = config.urlOpenWeather.concat(`find?q=${city}${country != null ? ', '.concat(country) : ''}&appid=${config.appidOpenWeather}&units=metric`);
        if (country != null) {
            url = url.concat()
        }

        const current = await fetch(url);
        const json = await current.json();
        return json || {};
    }
}

module.exports = WeatherService;