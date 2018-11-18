const displayQuoteTemplate = (location) => {
	$(location).load('/templates/quote.html', function() {
		// initiate mapquest search
		placeSearch({
	    key: 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24',
	    container: document.querySelector('#txtAddress'),
	    collection: [
	      'address'
	    ]
	  });
	 // M.AutoInit()
		displayMake($("select#make"));
	})
}
// function displays error message on quotes.html
const showErrMessage = msg => {
	$("#errMessage").text(msg);
	$("#errMessage").show();
}

// function breaks down an address to an object
const breakAddress = address => {
	address = address.split(',');
	if(address.length < 5) {
		return false;
	} else {
		return {
			street_name: address[0],
			city: address[1],
			state: address[2],
			zipcode: address[3],
			country: address[4]
		}
	}
}

// function checks if user has entered a valid time and date
// returns true or false
const isAvailable = (date, time) => {
	let today = moment().format('MMM D, Y'); // stores today's date
	let isBeforeToday = moment(date).isBefore(today); // boolean (if date is before today)
	// checks if user enter time betwee 9:00 AM - 5:00 PM
	let isTime = moment(time, 'hh:mm A').isBetween(moment('09:00 AM', 'hh:mm A'), moment('05:00 PM', 'hh:mm A'));
	// If user selects an invalid data or time
	if(isBeforeToday || !isTime){
		return false;
	}
	else {
		return true; // return true
	}
}

const isLogin = () => {
	if(sessionStorage.length === 0)
		return false;
	else
		return true;
}