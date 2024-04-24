const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
const options = {
  method: 'GET',
  url: 'https://yahoo-weather5.p.rapidapi.com/weather',
  params: {
    location: city,
    format: 'json',
    u: 'f'
  },
  headers: {
    'X-RapidAPI-Key': '598b81eac1msh044d8879b3df711p145782jsn7ff791315b2d',
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  }
};
const response = await axios.request(options);
	console.log("got the data");
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});