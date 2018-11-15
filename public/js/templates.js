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

$(document).on("click", "#btnQuoteMe", function() {
	// before loading the estimate template validate user input
	// variables store user address information
	let address = $('#txtAddress').val().trim();
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
			car.adress = breakAddress(address);
			// load  estimate
			$("#main").load('templates/estimate.html', function() {
				$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
				$('#oilType').text(car.info.oilType);
				$('#oilCapacity').text(car.info.quartsCapacity);
				$('#totalCost').text(response);
			});
		}
	});
});