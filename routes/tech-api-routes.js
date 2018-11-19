const db = require('../models');

module.exports = function(app) {
  app.post('/api/technician', function(req, res) {
    //spread operator '...'
    let user = {...req.body};
    user.name = user.fName + ' ' + user.lName;
    console.log('user', user);
    user.Technician = {};
    db.User.create(user, {
      include: [db.Technician]
    }).then(function() {
      res.redirect(307, '/api/login');
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      res.status(422).json(err.errors[0].message);
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
      },
      include: [db.User]
    }).then(function(dbTechnician) {
      res.json(dbTechnician);
    });
  });

  app.get('/api/technician', function(req, res){
    db.Technician.findAll({
      include: [db.User]
    }).then(function(technicians){
      res.json(technicians);
    });
  });

  app.get('/api/technician/orders/:id', function(req, res) {
    db.Order.findAll({
      where: {
        technician_id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
