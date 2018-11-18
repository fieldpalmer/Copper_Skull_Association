var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_fHJB9fIE30QMwnuL4WQAT8jG",
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "Sample Store",
    description: "Example Purchase",
    token: handleToken
  });
});

$(document).on("click", "#btnPay", function() {
  console.log("button clicked");
  // when user clicks the appointment verify every field and payment information
  // when the user has verified their dates
  // send the car information to server
  // make work order on server and let them enter pay information
  let date = $('#txtDate').val().trim();
  let time = $('#txtTime').val().trim();
  let appointment = {
    date: date,
    time: time
  }
  if(!date || !time) {
    showErrMessage("Please select a day and a time");
  } else {
    console.log("you did something");
    car.appointment = appointment;
    // send information to server
    // when response
    // $("#main").load("templates/workorder.html");
    checkoutHandler.open({
      name: "Mobile Mechanic",
      description: "Oil Change",
      token: handleToken
    });
    console.log(appointment);
    
  }
});

function handleToken(token) {
  fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(token)
  }).then(output => {
    if (output.status === "succeeded")
      $('#order').load('/templates/workorder.html');
    else{
      alert("Your payment was not accepted, please try again");
    }
  })
}