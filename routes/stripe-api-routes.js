const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
const axios = require("axios");

//handle charge 
module.exports = function(app) {
  app.post("/charge", function(req, res) {
      //get quoted amount from database to determin charge amount - prevents charge amt from being changed on front end
      axios.get("http://mobile-mechanics.herokuapp.com/api/quote/" + req.body.quoteId).then(function(response){
      var amount = response.data.quoteAmt * 100;
      //stripe stuff
      stripe.customers.create({
        email: req.body.email,
        card: req.body.id
      })
      .then(customer =>
        stripe.charges.create({
          amount: amount,
          description: "Sample Charge",
          currency: "usd",
          customer: customer.id
        }))
      .then(charge => res.send(charge))
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
    });
  });

    
}
