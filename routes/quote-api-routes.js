const db = require('../models');

module.exports = function(app) {
  app.post('/api/quote', function(req, res) {
    let customer = req.body;
    let quote = parseFloat(customer.quartsCapacity.replace(/[^\d\.]*/g, '') * 6);
    		quote += 5; // cost of oil filter
    		quote += 35; // cost of labor + trip
    		quote.toFixed(2);

    // creates new user when btn quote is pressed
    /********************************************
		PROBLEM:
		- if email already exists, it should notify the user
		to log it
		- if user doesn't enter correct information it should
		send an error response
    *********************************************/
    db.User.create({
    	email: customer.email,
    	password: "update",
    	name: customer.name,
    	location: customer.address,
    	phone: customer.phone
    }).then(user => {
    	let userId = user.id;
    	// returns cost of service and new user id
  		res.json({cost: quote, id: userId});
    });
  });
};