$(document).ready(function(){
  M.AutoInit();

  displayQuoteTemplate('#calculator');

	$(document).on("click", "#btnQuoteMe", function() {
		// before loading the estimate template validate user input
		// variables store user address information
		let address = $('#txtAddress').val().trim();
		let firstName = $('#txtFirstName').val().trim();
		let lastName = $('#txtLastName').val().trim();
		let phone = $('#txtPhone').val().trim();
		let email = $('#txtEmail').val().trim();

		console.log(window.car);
		$.post("/api/quote", {
			info: car.info.quartsCapacity
		}).then(function(response) {
			console.log(response);
			if(!car.make || !car.year || !car.model) {
				showErrMessage("You must select your car make/year/model");
			}
			// check if user has selected a service
			else if (!car.services) {
				showErrMessage("You must select a service")
			}
			// check if user has entered a valid address
			else if(breakAddress(address) === false) {
				showErrMessage("You must enter your adress");
			}
			// if everything passes...
			else {
				car.address = breakAddress(address);
					// load  estimate
				car.customer = {
					firstName: firstName,
					lastName: lastName,
					phone: phone,
					email: email,
					address: breakAddress(address)
				}
				$("#main").load('templates/estimate.html', function() {
					$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
					$('#oilType').text(car.info.oilType);
					$('#oilCapacity').text(car.info.quartsCapacity);
					$('#totalCost').text(response);
				});
			}
		});
	});

	$(document).on("click", "#btnBook", function() {
		// when user clicks schedule appointment load appointment template
		// add a save for later button
		$("#calculator").load("templates/appointment.html", function () {
			M.AutoInit();
		});
	});

	$(document).on("click", "#btnPay", function() {
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
			car.appointment = appointment;
			// send information to server
			// when response
			// $("#main").load("templates/workorder.html");
		}
	})

	$(document).on("click", "#registerBtn", function() {

		let newUser = {
			fName: $("#fName").val().trim(),
			lName: $("#lName").val().trim(),
			email: $("#email").val().trim(),
			phone: $("#phone").val().trim(),
			areaCode: $("#areaCode").val().trim(),
			password: $("#password").val().trim(),
			picture: $("#picture").src(),
		}

		$.post("/api/register", newUser).then(function(response) {
			console.log(response);
		});

		$("#fName").val("");
		$("#lName").val("");
		$("#email").val("");
		$("#phone").val("");
		$("#areaCode").val("");
		$("#password").val("");
		$("#pwConfirm").val("");
		$("#picture").src("");
		 
	});

});