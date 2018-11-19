const db = require('../models');

module.exports = function(app) {
  //post route, build the body with 'technician_id' for technician and 'customer_id' for customer
  app.post('/api/review', function(req, res) {
    db.Review.create({
      technician_id: req.body.technician_id,
      customer_id: req.body.customer_id,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    }).then(function(dbReview) {
      db.Order.update(
        {
          reviewed: true
        },
        {
          where: {
            id: req.body.order_id
          }
      }).then(function(){
        res.json(dbReview);
      });
    });
    
  });

  //find all reviews related to a specific technician
  app.get('/api/review/technician/:techID', function(req, res){
    db.Review.findAll({
      where: {
        technician_id: req.params.techID
      },
      include: [
        {model: db.User, as: 'customerAuthor'},
        {
          model: db.User, as: 'technicianReviewed',
          include: [{model: db.Technician}]
        }
      ]
    }).then(function(reviews){
      res.json(reviews);
    });
  });

  //find all reviews written by a specific customer
  app.get('/api/review/customer/:userID', function(req, res) {
    db.Review.findAll({
      where: {
        customer_id: req.params.userID
      },
      include: [
        {model: db.User, as: 'customerAuthor'},
        {
          model: db.User, as: 'technicianReviewed',
          include: [{model: db.Technician}]
        }
      ]
    }).then(function(reviews) {
      res.json(reviews);
    });
  });

  app.put('/api/review', function(req, res) {
    db.Review.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbReview) {
      res.json(dbReview);
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


