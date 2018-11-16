const db = require('../models');

module.exports = function(app) {
  app.post('/api/orders', function(req, res) {
		console.log(req.body);
    let customer = req.body;
    let quote = parseFloat(customer.quartsCapacity.replace(/[^\d\.]*/g, '') * 6);
    		quote += 5; // cost of oil filter
    		quote += 35; // cost of labor + trip
    		quote = quote.toFixed(2);
		
				// this is creating a prospective order with the jobComplete status as 'Quoted'
    db.Order.create({
			firstName: customer.firstName,
			lastName: customer.lastName,
			address: customer.address,
			jobComplete: 'Quoted',
			jobDescription: customer.services,
			laborCost: quote,
			vehicle: customer.car,
			phone: customer.phone,
			email: customer.email,
			quartsCapacity: customer.quartsCapacity
    }).then(quote => {
			let quoteId = quote.id;
			let costEstimate = quote.laborCost;
    	// returns cost of service and new user id
  		res.json({cost: costEstimate, id: quoteId});
    });
  });
};