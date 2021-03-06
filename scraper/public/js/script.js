$(() => {
	displayMake();
	setEventHandler();
})

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

const displayModel = car => {
	$.ajax('/api/model/', {
		method: 'POST',
		data: {
			carYear: car.carYear,
			url: car.carYearLink
		}
	}).then(models => {
		$("#app").load('/templates/model.html', function(){
			let row = $('<div>').addClass('row');
			for(let i = 0; i < models.model.length; i++){
				let col = $('<div>').addClass('col-md-2');
				let model = $('<a>').attr('data-model', models.link[i]);

				model.text(models.model[i]);
				model.attr('href', '#');

				col.append(model);
				row.append(col);
			}
			$('#model').append(row);
		});
	})
}

const displayYear = car => {
	$.ajax('/api/year/', {
		method: "POST",
		data: {
			makeName: car.makeName,
			url: car.makeLink
		}
	}).then(car => {
		$('#app').load('/templates/year.html', function() {
			let row = $('<div>').addClass('row');
			for(let i = 0; i < car.year.length; i++) {
				let div = $('<div>').addClass('col-md-2');
				let y = $('<a>').attr('data-year', car.link[i]);

				y.text(car.year[i]);
				y.attr('href', '#');

				div.append(y);
				row.append(div);
			}
			$('#year').append(row);
		});
	});
}

const displayMake = () => {
	$.get('/api/make').then(makes => {
		$("#app").load('/templates/make.html', function() {
			let row = $('<div>').addClass('row');
			makes.forEach(car => {
				let div = $("<div>").addClass('col-md-2 ');
				let make = $('<a>').attr('data-make', car.link);

				make.text(car.make);
				make.attr('href', '#')

				div.append(make);
				row.append(div);
			});
			$('#make').append(row);
		});
	});

}