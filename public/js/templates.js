$(document).ready(function(){
  M.AutoInit();

	// handle get a quote button click
	$(document).on("click", "#btnQuote", function() {
		// when user clicks on get quote button, load quote template
		$("#main").load('templates/quote.html', function(){
			// remove button
			$("#btnQuote").remove();
			$("#services").hide();
			$("#hideThis").hide();
			$("#contactSection").hide();

			displayMake($("select#make"));
		});
	});

	$(document).on("click", "#btnQuoteMe", function() {
		// before loading the estimate template validate user input
		// variables store user address information
		let street = $('#txtStreet').val().trim();
		let city = $('#txtCity').val().trim();
		let zipcode = $('#txtZipcode').val().trim();

		// check if user has entered their vehicle's information
		if(!car.make || !car.year || !car.model) {
			showErrMessage("You must select your car make/year/model");
		}
		// check if user has selected a service
		else if (!car.services) {
			showErrMessage("You must select a service")
		}
		// check if user has entered a valid address
		else if(street.length < 5 || city.length < 3 || zipcode < 5) {
			showErrMessage("You must enter your adress (street, city, zipcode)");
		}
		// if everything passes...
		else {
			// set global car.address
			car.address = {
				street: street,
				city: city,
				zipcode: zipcode
			}

			// load  estimate
			$("#main").load('templates/estimate.html', function() {
				$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
				$('#oilType').text(car.info.oilType);
				$('#oilCapacity').text(car.info.quartsCapacity);
			});
		}
	});

	$(document).on("click", "#btnBook", function() {
		// when user clicks schedule appointment load appointment template
		$("#main").load("templates/appointment.html", function () {
			console.log("Appointment loaded");
			M.AutoInit();
		});
	});

	$(document).on("click", "#btnPay", function() {
		// when user clicks the appointment verify every field and payment information
		// then load the workorder
		$("#main").load("templates/workorder.html");
	})
});

const showErrMessage = msg => {
	$("#errMessage").text(msg);
	$("#errMessage").show();
}