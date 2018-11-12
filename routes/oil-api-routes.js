const scraper = require('../scraper.js');
module.exports = app => {
	app.get('/api/make', (req, res) => {
		scraper.getCarMake(make => {
			res.json(make);
		})
	});

	app.post('/api/year', (req, res) => {
		let url = req.body.url;

		car.make = req.body.makeName;

		if(url) {
			scraper.getCarYear(url, year => {
				res.json(year);
			});
		}
	});

	app.post('/api/model', (req, res) => {
		let url = req.body.url;

		car.year = req.body.carYear;

		if(url) {
			scraper.getCarModel(url, models => {
				res.json(models);
			})
		}
	})

	app.post('/api/car', (req, res) => {
		let url = req.body.url;

		car.model = req.body.modelName;

		if(url) {
			scraper.getOilInfo(url, info => {
				res.json({car: car, info: info});
			})
		}
	})
}