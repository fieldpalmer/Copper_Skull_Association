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
			let customer = {
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				email: email,
				address: breakAddress(address)
			}

			car.customer = customer;

			// get a quote from the server by sending quarts capacity
			$.post("/api/quote", {
				name: `${customer.firstName} ${customer.lastName}`,
				phone: customer.phone,
				email: customer.email,
				address: address,
				year: car.year,
				make: car.make,
				model: car.model,
				services: car.services.join(', '),
				quartsCapacity: car.info.quartsCapacity
			}).then(function(response) {
				console.log(response);
				car.uid = response.id;
				car.laborCost = response.cost;
				// load  estimate
				$("#calculator").load('templates/estimate.html', function() {
					$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
					$('#oilType').text(car.info.oilType);
					$('#oilCapacity').text(car.info.quartsCapacity);
<<<<<<< HEAD
					$('#totalCost').text(`$${response}`);
=======
					$('#totalCost').text(`$${response.cost}`);
>>>>>>> master
				});
			});
		}
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

			if(!isAvailable(date, time)) {
				showErrMessage("You must select an upcoming date and a time between 9 - 5");
			} else {
				console.log("Booked!!")
				// send information to server for work order
				/*
				send the following information to server:
					- user id
					- services
					- tech selected
					- labor cost (should send the qts again)
				*/
				$.post("/api/orders", {
					jobDescription: car.services.join(', '),
					laborCost: car.laborCost,
					customer_id: car.uid
				}).then(data => {
					let confirmNum = data.id;
					let job = data.jobDescription;
					let cost = data.laborCost;
					let status = data.jobComplete;
					appointment = date + ' at ' + time

					$('#calculator').load('templates/workorder.html', function() {
						$('#confirmation').text(confirmNum);
						$('#description').text(job);
						$('#cost').text(`$${cost}`);
						$('#tech').text('Not Chosen');
						$('#appointment').text(appointment);
					})
				});
				// when response
				// $("#main").load("templates/workorder.html");
			}
		}
	})
});