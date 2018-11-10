const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// functions takes two parameters url and call back function
// It returns an object {oilType: , galCapacity: }
const getOilInfo = (url, callback) => {
	request("https://oil.pennzoil.com/" + url, (err, res, body) => {
		if (err) throw err;
		let $ = cheerio.load(body);

		let oilType = $('.big_red').text().trim();
		let oilCapacity = $('.capacity').text().replace(/[^\d\.]*/g, '').split('');
		let galCapacity = parseFloat(oilCapacity[0] + oilCapacity[1] + oilCapacity[2] + oilCapacity[3]);

		let info = {
			oilType: oilType,
			galCapacity: `${galCapacity} (g)`,
			quartsCapacity: `${galCapacity * 4} (q)`
		}

		callback(info);
	});
}

// function gets all the models for the given car
const getCarModel = (url, cb) => {
	request("https://oil.pennzoil.com/" + url + "?format=json",
		(err, res, body) => {
			if (err) throw err;
			body = JSON.parse(body);

			let models = {
				model: Object.values(body),
				link: Object.keys(body)
			}

			cb(models);
		})
}

// function gets the car year for a given make
const getCarYear = (url, cb) => {
	request("https://oil.pennzoil.com/" + url + "?format=json",
		(err, res, body) => {
			if (err) throw err;
			body = JSON.parse(body);

			let years = {
				year: Object.values(body),
				link: Object.keys(body)
			};

			years.year.shift();
			years.link.shift();
			console.log(years)
			cb(years);
		})
}

// function gets all the makes from website
const getCarMake = (callback) => {
	request("https://oil.pennzoil.com/us/en_US/browse",
		(err, res, body) => {
			if (err) throw err;
			let $ = cheerio.load(body);

			let makes = [];

			let makeLinks = $('.scroll a');

			for(var i = 0; i < makeLinks.length; i++){
				makes.push({
					make: makeLinks[i].children[0].data,
					link: makeLinks[i].attribs.href
				})
			}

			callback(makes);
		});
}

module.exports = {
	getCarYear,
	getCarMake,
	getCarModel,
	getOilInfo
}

