		$(() => {
			displayMake();
			setEventHandler();
		})

		const setEventHandler = () => {
			$(document).on('change', '#make', e => {
				let link = $('#make').val();

				let make = "";
				$('#make option:selected').each(function(){
					make = $(this).text();
				})


				console.log(make)
				// console.log(link)
				$.ajax('api/year', {
					type: "POST",
					data: {
						url: link
					}
				}).then(years => {
					displayMake();
					console.log(make);
					renderTemplate({years: years});
				});
			})
		}


		const displayMake = () => {
			$.get('/api/make').then(makes => {

				makes.forEach(car => {
					console.log({make: car.make, link: car.link});
				})

				$('#app').append($('<p>').text(makes[0].make))
			});

		}