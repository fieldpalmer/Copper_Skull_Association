$(document).ready(function(){
  M.AutoInit();
	// handle get a quote button click
	$(document).on("click", "#btnQuote", function() {
		// when user clicks on get quote button, load quote template
		$("#main").load('templates/quote.html', function(){
			// remove button
			$("#btnQuote").remove();
			$("#services").html('');
		});
	});

	$(document).on("click", "#btnQuoteMe", function() {
		// before loading the estimate template validate user input
		// send information to database
		// calculate cost
		// insert information to template
		$("#main").load('templates/estimate.html');
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