require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8000,
    urlOpenWeather: process.env.URL_OPENWEATHERMAP || 'http://api.openweathermap.org/data/2.5/',
    appidOpenWeather: process.env.APPID_OPENWEATHERMAP || 'e4d96acf2548e3262cacbc42fe1a14c1'
}

module.exports = { config };
