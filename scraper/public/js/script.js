$(() => {
	displayMake();
	setEventHandler();
})

const setEventHandler = () => {
	$(document).on('click', 'a', function(){
		let makeLink = $(this).data('make');
		let makeName = $(this).text();
		displayYear({makeName: makeName, makeLink: makeLink});
	});

	$(document).on('click', 'a', function(){
		let carYear = $(this).data('year');
		// displayModel(carYear);
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
		let years = car.year; // year array
		$('#app').load('/templates/year.html', function() {
			let row = $('<div>').addClass('row');
			years.forEach(year => {
				let div = $('<div>').addClass('col-md-2');
				let y = $('<a>').attr('data-year', year);

				y.text(year);
				y.attr('href', '#');

				div.append(y);
				row.append(div);
			});
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