const db = require('../models');

module.exports = function(app) {
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
      //custID assigned to technicianID and techID assigned to UserID?
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


