const db = require('../models');

module.exports = function(app) {
  app.post('/api/technician', function(req, res) {
    //spread operator '...'
    let user = {...req.body};
    user.Technician = {}

    db.User.create(user, {
      include: [db.Technician]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

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
