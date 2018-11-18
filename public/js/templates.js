$(document).ready(function(){
  M.AutoInit();

   //template loading functions
   const loadQuote = () => { $("#main").load("./templates/quote.html") }
   const loadAbout = () => { $("#main").load("./templates/about.html") }
   const loadContact = () => { $("#main").load("./templates/contact.html") }
   const loadAuth = () => { $("#main").load("./templates/auth.html") }

   // top nav loading functions
   $(document).on("click", "#top-nav-work", () => {loadQuote()});
   $(document).on("click", "#top-nav-about", () => {loadAbout()});
   $(document).on("click", "#top-nav-contact", () => {loadContact()});
   $(document).on("click", "#top-nav-work", () => {loadAuth()});

   // bottom nav loading functions
   $(document).on("click", "#bottom-nav-work", () => {loadQuote()});
   $(document).on("click", "#bottom-nav-about", () => {loadAbout()});
   $(document).on("click", "#bottom-nav-contact", () => {loadContact()});
   $(document).on("click", "#bottom-nav-work", () => {loadAuth()});

	$(document).on("click", "#btnQuoteMe", function() {
			if(!car.make || !car.year || !car.model) {
				showErrMessage("You must select your car make/year/model");
			}
			// check if user has selected a service
			else if (!car.services) {
				showErrMessage("You must select a service")
			}
			// if everything passes...
			else {
				$.post('/api/quote/', {
					carMake: car.make,
					carModel: car.model,
					carYear: car.year,
					oilType: car.info.oilType,
					oilAmount: car.info.quartsCapacity
				}).then(response => {
					//pull quoteId from response to be used later
					car.quoteId = response.id;
					//add quoteAmt to car object
					car.quoteAmt = response.quoteAmt;
					$("#calculator").load('/templates/estimate.html', function() {
						$('#carInfo').text(`${car.year} ${car.make} ${car.model}`);
						$('#oilType').text(car.info.oilType);
						$('#oilCapacity').text(car.info.quartsCapacity);
						$('#totalCost').text(response.quoteAmt);

						if(isLogin()){
							$('#btnBook').text('Schedule Appointment');
						}
					});
				});
			}
	});

	$(document).on("click", "#btnBook", function() {
		// check if user is logged in
		if(isLogin()) {
			$("#appt").load("appointment.html", function () {
				M.AutoInit();
			});
		} else {
			window.location = '/templates/auth.html';
		}
	});

	
	$(document).on('click', '#btnPrint', function(){
		window.print();
	})

	$(document).on("click", "#registerBtn", function(event) {
		event.preventDefault();
		let newUser = {
			fName: $("#fName").val().trim(),
			lName: $("#lName").val().trim(),
			email: $("#emailReg").val().trim(),
			phone: $("#phone").val().trim(),
			password: $("#passwordReg").val().trim()
		}
	

		$.post("/api/register", newUser).then(function(response) {
			window.location.replace(response);
		});

		$("#fName").val("");
		$("#lName").val("");
		$("#emailReg").val("");
		$("#phone").val("");
		$("#txtAddress").val("");
		$("#areaCode").val("");
		$("#passwordReg").val("");
		$("#pwConfirm").val("");
		// $("#picture").src("");

	});

	$(document).on("click", "#techRegisterBtn", function(event) {
		event.preventDefault();
		let newUser = {
			// name: $("#fName").val().trim() + $("#lName").val().trim(),
			fName: $("#fName").val().trim(),
			lName: $("#lName").val().trim(),
			email: $("#emailReg").val().trim(),
			phone: $("#phone").val().trim(),
			// areaCode: $("#areaCode").val().trim(),
			password: $("#passwordReg").val().trim(),
			role: "technician"
			// picture: $("#picture").src()
		}
		console.log(newUser);

		$.post("/api/technician", newUser).then(function(response) {
			window.location.replace(response);
		});

		$("#fName").val("");
		$("#lName").val("");
		$("#emailReg").val("");
		$("#phone").val("");
		$("#txtAddress").val("");
		$("#areaCode").val("");
		$("#passwordReg").val("");
		$("#pwConfirm").val("");
		// $("#picture").src("");

	});

});