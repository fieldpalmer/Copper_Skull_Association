const db = require('../models');

module.exports = function(app) {
  app.put('/api/technician', function(req, res) {
    db.Technician.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTechnician) {
        res.json(dbTechnician);
      })
  });

  app.get('/api/technician/:id', function(req, res) {
    db.Technician.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTechnician) {
      res.json(dbTechnician);
    });
  });


};
