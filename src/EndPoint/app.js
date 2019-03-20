const express = require('express');
const app = express();
const port = 4000;

// Junjie Lu's weather API
const weatherFunction = require('./cityWeather.js');
app.get('/weather', weatherFunction);

app.listen(port, () => {
    return console.log(`Example app listening on port ${port}!`);
})