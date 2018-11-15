const db = require('../models');

module.exports = function(app) {
  app.post('/api/quote', function(req, res) {
    let customer = req.body;
    console.log(customer);

    let quote = parseFloat(customer.quartsCapacity.replace(/[^\d\.]*/g, '') * 6);
    		quote += 5; // cost of oil filter
    		quote += 35; // cost of labor + trip
    		quote.toFixed(2);

    res.json(quote);
  });
};