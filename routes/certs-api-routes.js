const db = require('../models');

module.exports = function(app) {
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

};


