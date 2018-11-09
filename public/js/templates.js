$(document).ready(function(){
	M.AutoInit(); // initiates any materialize module
	loadEventHandlers();
});

const loadEventHandlers = () => {
	// handle get a quote button click
	$(document).on("click", "#btnQuote", e => {
		// when user clicks on get quote button, load quote template
		$('#main').load('templates/quote.html');

		// remove button
		$("#btnQuote").remove();
	});

	$(document).on("click", "#btnQuoteMe", e => {
		// before loading the estimate template validate user input
		// send information to database
		// calculate cost
		// insert information to template
		$('#main').load('templates/estimate.html');
	})
}