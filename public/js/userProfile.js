$(document).ready(function() {

  var user = {};

  $.get("/api/user_data").then(function(userData) {
    user.name = userData.name;
    user.email = userData.email;
    user.id = userData.id;
    user.location = userData.location;
    $.get("/api/vehicle/" + userData.id).then(function(carData){
      console.log(carData);
      user.carMake = carData[0].make;
      user.carModel = carData[0].model;
      user.carYear = carData[0].year;
      renderTemplate(user);
      $.get("/api/orders/ + userData.id").then(function(orderData){
        user.orders = orderData;
      })
    })
    
  });

  function renderTemplate(data) {
    console.log(data);
    var source = $("#user-page-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
  }
});

