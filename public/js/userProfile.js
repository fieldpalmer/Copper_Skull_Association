$(document).ready(function() {

  var user = {};

  $.get("/api/user_data").then(function(userData) {
    user.name = userData.name;
    user.email = userData.email;
    user.id = userData.id;
    user.location = userData.location;
    $.get("/api/vehicle/" + userData.id).then(function(carData){
      // console.log(carData);
      if(carData.length > 0){
        user.carMake = carData[0].make;
        user.carModel = carData[0].model;
        user.carYear = carData[0].year;
      }
      $.get("/api/orders/ + userData.id").then(function(orderData){
        if(orderData.length > 0){user.orders = orderData};
        $.get("/api/technician").then(function(techData){
          if(techData.length > 0){
          user.technicians = [];
            for(let i=0; i<10 && i<techData.length; i++){
              tech = {};
                tech.techSkills = techData[i].skills;
                // tech.techRating = techData[i].rating;
                user.technicians.push(tech);
            }
          }
          renderTemplate(user);
        });
      });
    });
  });

  function renderTemplate(data) {
    console.log(data);
    var source = $("#user-page-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
  }
});

