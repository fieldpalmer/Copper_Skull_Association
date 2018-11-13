const db = require('../models');

module.exports = function(app) {
  app.post('/api/vehicle', function(req, res) {
    db.Vehicle.create(req.body).then(function(dbVehicle) {
      res.json(dbVehicle)
    });
  });

  app.get('/api/vehicle/:id', function(req, res) {
    db.Vehicle.findAll({
      where: {
        UserId: req.params.id
      },
      include: {
        model: db.User
      }
    }).then(function(dbVehicle){
      res.json(dbVehicle);
    });
  });

  app.put('/api/vehicle', function(req, res) {
    db.Vehicle.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbVehicle) {
        res.json(dbVehicle);
      })
  });

  app.delete('/api/vehicle/:id', function(req, res) {
    db.Vehicle.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbVehicle) {
      res.json(dbVehicle);
    });
  });
};