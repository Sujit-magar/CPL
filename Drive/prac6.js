const express = require('express');
const axios = require('axios');
const path = require('path'); // Add this line to import 'path' module
const app = express();
const port = 3000;
const newsApiKey = '2fbee83b196142c38a070fcfe30c360c';
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/prac6.html')); // Use path.join to build file path
});
app.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'in', // You can change this to get news from a different country
                apiKey: newsApiKey,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'An error occurred while fetching news data' });
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});