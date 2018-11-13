const db = require('../models');

module.exports = function(app) {
  app.post('/api/orders', function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  

  

};