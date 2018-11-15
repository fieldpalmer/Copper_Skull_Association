window.car = {};
// function takes an obj
const getOilInfo = obj => {
	// send a post request to server with make/year/model link
	$.ajax('/api/car/', {
		method: "POST",
		data: {
			url: obj.url
		}
	}).then(info => {
		// when server returns a response
		car.info = info;
		$('#services').formSelect(); // initiate materialize styles
		// when user select a service
		$("select#services").change(function(){
			let services = $(this).val(); // store user services choice in array
			car.services = services;
		})
	})
}

// function takes an object and DOM location
const displayModel = (car, loc) => {
	// each time function is called set model options to none
	loc.html('<option value="" disabled selected>Model</option>');

	// send a post request to server with car make/year link
	$.ajax('/api/model/', {
		method: 'POST',
		data: {
			url: car.yearLink
		}
	}).then(models => {
		// when server returns a response loop through each response
		// and display each model for selected make/year
		for(let i = 0; i < models.model.length; i++) {
			loc.append(`<option value='${models.link[i]}'>${models.model[i]}</option>`)
		}

		loc.formSelect(); // initiane materialize styles

		// when user selects a model
		$('select#model').change(function(e){
			$('#errMessage').hide(); // hide err message
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val(); // store make/year/model link
			window.car.model = $(this).find(":selected").text();
			getOilInfo({url: link}); // call getOilInfo function
		})
	})
}

// this function takes in an object and a DOM location
const displayYear = (car, loc) => {
	// each time function is called set the year options to none
	loc.html('<option value="" disabled selected>Year</option>');

	// send a post request with car make url to server
	$.ajax('/api/year/', {
		method: "POST",
		data: {
			url: car.makeLink
		}
	}).then(car => {
		// once the server returns a response
		// loop through each response and display year options for selected make
		for(let i = 0; i < car.year.length; i++){
			loc.append(`<option value='${car.link[i]}'>${car.year[i]}</option>`)
		}

		loc.formSelect(); // initiate materialize styles

		// when user selects a year
		$('select#year').change(function(e){
			$('#errMessage').hide(); // hide err message
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val(); // store car make & year link
			window.car.year = $(this).find(":selected").text();
			displayModel({yearLink: link}, $("select#model")); // call displayModel function
		})
	});
}

// this is the first function that should run when quote.html template loads
// function takes in a DOM location
const displayMake = loc => {
	// make a get request to server
	$.get('/api/make').then(makes => {
		// after recieving response from server with car makes
		// loop through each result and append it to the make options
		makes.forEach(car => {
			loc.append(`<option value='${car.link}'>${car.make}</option>`);
		})

		loc.formSelect(); // initiate materialize styles

		// when a user selects a make
		$('select#make').change(function(e){
			$('#errMessage').hide(); // hide err message
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val(); // store the link
			car.make = $(this).find(":selected").text();
			displayYear({makeLink: link}, $("select#year")); // call displayYear function
		})
	});
}



