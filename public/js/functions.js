
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