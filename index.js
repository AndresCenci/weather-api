const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const { config } = require('./config/index');
const weatherApi = require('./routes/weather');

weatherApi(app);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});
