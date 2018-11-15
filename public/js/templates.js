$(document).ready(function(){
  M.AutoInit();

	// handle get a quote button click
	$(document).on("click", "#btnQuote", function() {
		// when user clicks on get quote button, load quote template
		// remove button
		$("#btnQuote").remove();
		$("#services").hide();
		$("#hideThis").hide();
		$("#contactSection").hide();

		$("#main").load('templates/quote.html', function(){
			// initiate mapquest search
			placeSearch({
		    key: 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24',
		    container: document.querySelector('#txtAddress'),
		    collection: [
		      'address'
		    ]
		  });

			displayMake($("select#make"));
		});
	});

	$(document).on("click", "#btnQuoteMe", function() {
		// before loading the estimate template validate user input
		// variables store user information
		let address = $('#txtAddress').val().trim();
		let firstName = $('#txtFirstName').val().trim();
		let lastName = $('#txtLastName').val().trim();
		let phone = $('#txtPhone').val().trim();
		let email = $('#txtEmail').val().trim();

		// check if user has entered their vehicle's information
		if(!car.make || !car.year || !car.model) {
			showErrMessage("You must select your car make/year/model");
		}
		// check if user has selected a service
		else if (!car.services) {
			showErrMessage("You must select a service")
		}
		// check if user has entered a valid address
		else if(!firstName || !lastName || !phone) {
			showErrMessage("You must enter your contact information");
		} else if (breakAddress(address) === false) {
			showErrMessage("You must enter your address")
		}
		// if everything passes...
		else {
			car.customer = {
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				email: email,
				address: breakAddress(address)
			}
			// load  estimate
			$("#main").load('templates/estimate.html', function() {
				$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
				$('#oilType').text(car.info.oilType);
				$('#oilCapacity').text(car.info.quartsCapacity);
				$('#totalCost').text(parseFloat(`$ car.info.quartsCapacity.replace(/[^\d\.]*/g, '')) * 5.0`);
			});
		}
	});

	$(document).on("click", "#btnBook", function() {
		// when user clicks schedule appointment load appointment template
		// add a save for later button
		$("#main").load("templates/appointment.html", function () {
			M.AutoInit();
		});
	});

	$(document).on("click", "#btnPay", function() {
		// when user clicks the appointment verify every field and payment information
		// when the user has verified their dates
		// send the car information to server
		// make work order on server and let them enter pay information
		$("#main").load("templates/workorder.html");
	})
});