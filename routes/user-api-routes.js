const db = require('../models');

module.exports = function(app) {
  app.post('/api/register', function(req, res) {
    console.log(req);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post('/api/techregister', function(req, res) {
    //spread operator '...'
    let user = {...req.body};
    user.Technician = {};

    db.User.create(user, {
      include: [db.Technician]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get('/api/users', function(req, res) {
    db.User.findAll().then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get('/api/users/:id', function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  app.delete('/api/users/:id', function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put('/api/users', function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post('/api/review/:custID/:techID', function(req, res) {
    db.Review.create({
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      technicianID: req.params.custID,
      custID: req.params.techID
    }).then(function(result){
      res.json(result);
    })
  })

};