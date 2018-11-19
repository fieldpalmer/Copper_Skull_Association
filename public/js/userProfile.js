$(document).ready(function() {
  window.user = {};
  $.get("/api/user_data").then(function(userData) {
    sessionStorage.setItem('userName', userData.name); // stores session user
    sessionStorage.setItem('userEmail', userData.email); // stores session email
    sessionStorage.setItem('id', userData.id); //store user's ID
    user.name = userData.name;
    user.email = userData.email;
    user.id = userData.id;
    user.location = userData.location;
    user.role = userData.role;
    $.get("/api/vehicle/" + userData.id).then(function(carData){
      // console.log(carData);
      if(carData.length > 0){
        user.carMake = carData[0].make;
        user.carModel = carData[0].model;
        user.carYear = carData[0].year;
      }
      $.get("/api/users/orders/" + userData.id).then(function(orderData){
        if(orderData){
          for(let j=0; j<orderData.length; j++){
            orderData[j].custId = user.id;
            orderData[j].date = orderData[j].date.split("T")[0];
          }
          user.orders = orderData
        };
        $.get("/api/technician").then(function(techData){
          if(techData.length > 0){
            user.technicians = [];
            for(let i=0; i<10 && i<techData.length; i++){
              var tech = {};
              tech.techID = techData[i].id;
              tech.techSkills = techData[i].skills;
              tech.userId = techData[i].UserId;
              user.technicians.push(tech);
              // console.log(tech);
              // tech.techRating = techData[i].rating;
            }
            for(let j=0; j<user.technicians.length; j++){
              $.get("/api/users/" + user.technicians[j].userId).then(function(response){
                user.technicians[j].name = response.name;
                for(let h=0; h<user.orders.length; h++){
                  if(user.orders[h].technician_id == user.technicians[j].userId){
                    user.orders[h].techName = user.technicians[j].name;
                  }
                }
                renderTemplate(user);
              });
            }
          } else{renderTemplate(user)};
        });
      });
    });
  });

  function renderTemplate(data) {
    // console.log(data);
    var source = $("#user-page-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
  }

  //get order ID
  //show technicians
  //on tech select, get tech id
  //update order with tech id

  $(document).on("click", ".addTech", function(){
    var order = {};
    order.id = $(this).attr("data-order-id");
    $("#tech-select-container").show();
    $(document).on("click", ".selectTech", function(){
      order.technician_id = $(this).attr("data-tech-id");
      $.post("/api/orders/tech", order).then(function(){
        location.reload();
      });
    });
  });

  $(document).on("click", ".reviewOrder", function(){
    var review= {};
    review.order_id = parseInt($(this).attr("data-order-id"));
    console.log(review.order_id);
    review.technician_id = parseInt($(this).attr("data-tech-id")); //tech's userId, not their ID from tech table
    review.customer_id = parseInt($(this).attr("data-user-id")); 
    $("#review-box").show();
    $(document).on("click", "#addReview", function(){
      review.rating = $("#review-rating").val();
      review.reviewText = $("#review-text").val();
      $.post("/api/review", review).then(function(){
        location.reload();
      });
    });
  });
});