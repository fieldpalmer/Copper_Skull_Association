$(() => {
	displayMake();
	setEventHandler();
})

const setEventHandler = () => {
	$(document).on('click', 'a', function(){
		let makeLink = $(this).data('make');
		let makeName = $(this).text();
	})
}

const displayMake = () => {
	$.get('/api/make').then(makes => {
		$("#app").load('/templates/make.html', function() {
			console.log("Loaded");
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