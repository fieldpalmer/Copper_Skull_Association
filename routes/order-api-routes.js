const db = require('../models');

module.exports = function(app) {
  app.post('/api/orders', function(req, res) {
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
        db.Order.findOne({
          where: {
            id: req.body.id
          }
        }).then(function(dbOrder) {
          res.json(dbOrder);
        });
      });
  });

  app.post('/api/orders/complete/:id', function(req, res) {
    
  });

  app.get('/api/orders/:id', function(req, res) {
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
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

  app.delete('/api/orders/:id', function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.post('/api/orders/tech', function(req, res) {
    db.Order.update(
      {
        technician_id: req.body.technician_id
      },
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbOrder) {
        res.json(dbOrder);
      })
  });
};