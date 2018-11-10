const express = require('express');
const PORT = 8080;
const path = require('path');


const app = express();
const scraper = require('./scraper.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/make', (req, res) => {
	scraper.getCarMake(make => {
		res.json(make);
	})
});

app.post('/api/year', (req, res) => {
	let url = req.body.url
	if(url) {
		scraper.getCarYear(url, year => {
			res.json(year);
		});
	}
	console.log(req.body);
})


app.get('/', (req, res) => {
	res.sendFile(__dirname, '/public/index.html');
})

app.listen(PORT, () => console.log("server running"));