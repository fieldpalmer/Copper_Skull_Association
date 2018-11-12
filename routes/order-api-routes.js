const db = require('../models');

module.exports = function(app) {
  app.post('/api/orders', function(req, res) {
    // let order = {...req.body};
    // order.User = {};
    // order.Technician = {};

    db.Order.create(req.body, {
      include: [
        {model: db.User.UserId, as: 'technicianId'},
        {model: db.User.UserId, as: 'userId'}
      ]
    }).then(function(dbOrder) {
      res.json(dbOrder)
    });
  });

  // app.put('/api/technician', function(req, res) {
  //   db.Technician.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbTechnician) {
  //       res.json(dbTechnician);
  //     })
  // });

  // app.get('/api/technician/:id', function(req, res) {
  //   db.Technician.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbTechnician) {
  //     res.json(dbTechnician);
  //   });
  // });


};