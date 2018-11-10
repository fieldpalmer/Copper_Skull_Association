const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// functions takes two parameters url and call back function
// It returns an object {oilType: , galCapacity: }
const getOilInfo = (url, callback) => {
	request(url, (err, res, body) => {
		if (err) throw err;
		let $ = cheerio.load(body);

		let oilType = $('.big_red').text().trim();
		let oilCapacity = $('.capacity').text().replace(/[^\d\.]*/g, '').split('');
		let galCapacity = parseFloat(oilCapacity[0] + oilCapacity[1] + oilCapacity[2] + oilCapacity[3]);

		let info = {
			oilType: oilType,
			galCapacity: galCapacity
		}

		callback(info);
	});
}

module.exports = {
	getOilInfo
}

