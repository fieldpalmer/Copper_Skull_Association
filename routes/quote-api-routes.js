const db = require('../models');

module.exports = function(app) {
  app.post('/api/quote', function(req, res) {
    console.log(req.body);
    let quote = (Math.ceil(req.body.info.split(" ")[0]) * 5) + 35;
    res.json(quote);
  });
};