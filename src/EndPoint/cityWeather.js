// Junjie Lu's API
const axios = require('axios');

const weatherAPI = (req, res) => {
    axios.get('https://www.metaweather.com/api/location/search/?query=' + req.query.city)
        .then((networkResponse) => {
            let cityInfo = networkResponse.data[0].woeid
            axios.get('https://www.metaweather.com/api/location/' + cityInfo)
                .then((networkResponse) => {
                    let weatherStatus = networkResponse.data.consolidated_weather
                    let state = weatherStatus[0].weather_state_name
                    let minTemp = weatherStatus[0].min_temp
                    let maxTemp = weatherStatus[0].max_temp
                    let day = weatherStatus[0].applicable_date
                    let curTemp = weatherStatus[0].the_temp
                    let cityName = networkResponse.data.title
                    let time = networkResponse.data.time

                    //res.send(networkResponse.data);
                    
                    res.json({
                        "date": time,
                        "params": {
                            "city": cityName
                        },
                        "response": {
                            "state": state,
                            "maxTemp": maxTemp.toFixed(2) + ' °C',
                            "minTemp": minTemp.toFixed(2) + ' °C',
                            "currentTemp": curTemp.toFixed(2) + ' °C',
                            "day": day,
                        },
                        "description": 'Weather status in ' + cityName + '.'
                    })
                })
        })
        .catch(() => {
            res.send('<h1><center><font color="red">:( Check your city name.</h1> </font> <br/> <h2><center>Please Enter: city = mycity</h2>');
        });
}
module.exports = weatherAPI