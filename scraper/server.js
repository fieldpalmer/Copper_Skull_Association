const express = require('express');
const PORT = 8080;

const app = express();

const scraper = require('./scraper.js');

let url = "https://oil.pennzoil.com/us/en_US/equipment/chevrolet_(us)/2010/colorado_2_9_2wd_colorado_EFt8PikDB";

scraper.getOilInfo(url, info => {
	console.log(info);
});

app.listen(PORT, () => console.log("server running"));