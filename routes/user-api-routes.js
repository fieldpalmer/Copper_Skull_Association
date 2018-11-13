const db = require('../models');
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

module.exports = function(app) {

  //takes object with email and passport
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
  });

  //do something after successful login
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  
  app.post('/api/register', function(req, res) {
    console.log(req);
    db.User.create(req.body).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      res.status(422).json(err.errors[0].message);
    });
  });

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

  app.get('/api/certs/:techid', function(req, res) {
    db.Certification.findAll({
      where: {
        TechnicianId: req.params.techid
      }
    }).then(function(certs){
      res.json(certs);
    });
  });

  app.post('/api/certs/:techid', function(req, res){
    db.Certification.create({
      TechnicianId: req.params.techid,
      dateAchieved: req.body.dateAchieved,
      title: req.body.title
    }).then(function(cert) {
      res.json(cert);
    });
  });

  app.delete('/api/certs/:id', function(req, res){
    db.Certification.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result){
      res.json(result);
    });
  });

  app.get('/api/review/:techID', function(req, res){
    db.Review.findAll({
      where: {
        TechnicianId: req.params.techID
      }
    }).then(function(reviews){
      res.json(reviews);
    });
  });

  app.post('/api/review/:custID/:techID', function(req, res) {
    db.Review.create({
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      TechnicianId: req.params.custID,
      UserId: req.params.techID
    }).then(function(result){
      res.json(result);
    });
  });

  app.delete('/api/review/:id', function(req, res){
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result){
      res.json(result);
    });
  });

};