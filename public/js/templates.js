$(document).ready(function(){
	M.AutoInit(); // initiates any materialize module
	loadEventHandlers();
});

const loadEventHandlers = () => {
	// handle get a quote button click
	$(document).on("click", "#btnQuote", e => {
		$('#main').load('../public/templates/quote.html');
	})
}