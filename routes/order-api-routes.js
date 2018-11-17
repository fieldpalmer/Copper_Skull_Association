const db = require('../models');

module.exports = function(app) {
  app.post('/api/orders', function(req, res) {
    console.log(req.body);
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder)
    });
  });

  app.put('/api/orders', function(req, res) {
    db.Order.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbOrder) {
        // res.json(dbOrder);
        db.Order.findOne({
          where: {
            id: req.body.id
          }
        }).then(function(dbOrder) {
          res.json(dbOrder);
        });
      });
  });

  app.get('/api/orders/:id', function(req, res) {
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
        // {model: db.Vehicle},
        {model: db.User, as: 'customer', attributes: { exclude: ['password'] }},
        {
          model: db.User, as: 'technician',
          include: [{model: db.Technician}]
        }
      ]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.get('/api/orders/tech/:techid', function(req, res) {
    db.Order.findAll({
      where: {
        technician_id: req.params.techid
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.get('/api/orders/customer/:custid', function(req, res) {
    db.Order.findAll({
      where: {
        customer_id: req.params.custid
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.delete('/api/orders/:id', function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
};