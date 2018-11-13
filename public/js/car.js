// $(() => {
// 	displayMake();
// 	setEventHandler();
// })

const setEventHandler = () => {
	$(document).on('click', '#make a', function(){
		let makeLink = $(this).data('make');
		let makeName = $(this).text();
		displayYear({makeName: makeName, makeLink: makeLink});
	});

	$(document).on('click', '#year a', function(){
		let carYear = $(this).text();
		let carYearLink = $(this).data('year');

		displayModel({carYear: carYear, carYearLink: carYearLink});
	});

	$(document).on('click', '#model a', function(){
		let modelLink = $(this).data('model');
		let modelName = $(this).text();
		displayCar({modelLink: modelLink, modelName: modelName});
	})
}

const displayCar = car => {
	$.ajax('/api/car/', {
		method: "POST",
		data: {
			url: car.modelLink,
			modelName: car.modelName
		}
	}).then(info => {
		$('#app').load('/templates/car.html', function() {
			let html = $('<div>').addClass('card');
			let body = $('<div>').addClass('card-body');
			let title = $('<h5>').addClass('card-title');
			let content = $('<p>').addClass('card-text');

			title.text(`${info.car.year} ${info.car.make} ${info.car.model}`);
			content.text(`Your car takes ${info.info.quartsCapacity} of ${info.info.oilType}`);

			body.append(title);
			body.append(content);
			html.append(body);

			$('#car').append(html);
			console.log(info)
		})
	})
}

const displayModel = (car, loc) => {
	$.ajax('/api/model/', {
		method: 'POST',
		data: {
			url: car.yearLink
		}
	}).then(models => {
		console.log(models);
		loc.html('<option value="" disabled selected>Model</option>');
		for(let i = 0; i < models.model.length; i++) {
			loc.append(`<option value='${models.link[i]}'>${models.model[i]}</option>`)
		}
		loc.formSelect();
		$('#model').change(function(e){
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val();
			console.log(link);
		})
	})
}

const displayYear = (car, loc) => {
	$.ajax('/api/year/', {
		method: "POST",
		data: {
			url: car.makeLink
		}
	}).then(car => {
		loc.html('<option value="" disabled selected>Year</option>');
		for(let i = 0; i < car.year.length; i++){
			loc.append(`<option value='${car.link[i]}'>${car.year[i]}</option>`)
		}
		loc.formSelect();
		$('#year').change(function(e){
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val();
			displayModel({yearLink: link}, $("select#model"))
		})
	});
}

const displayMake = loc => {
	$.get('/api/make').then(makes => {
		makes.forEach(car => {
			loc.append(`<option value='${car.link}'>${car.make}</option>`);
		})
		loc.formSelect();
		$('#make').change(function(e){
			e.stopImmediatePropagation(); // stops double execution
			let link = $(this).val();
			displayYear({makeLink: link}, $("select#year"));
		})
	});
}

