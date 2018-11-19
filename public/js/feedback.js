emailjs.init("user_bmxUz6P57Eec1WIQmdQhW");

// send email to copperskullassociation1@gmail.com
const sendFeedBack = (name, email, message) => {
    let template_params = {
        reply_to: email,
        from_name: name,
        to_name: "Mobile Mechanics",
        message_html: message
    };

    emailjs.send('copperskullassociation', 'copperskullassociation', template_params)
        .then(res => {
            console.log("You sent it!!", res.status, res.text);
        }, err => {
            console.log("Failed!", err);
        });
}

// when submit button is clicked
$('#btnFeedSubmit').click(function(e) {
    e.preventDefault();
    let name = $('#txtFeedName').val().trim(); // get name
    let email = $('#txtFeedEmail').val().trim(); // get email
    let message = $('#txtFeedMessage').val().trim(); // get feedback message

    // check if they aren't empty
    if (!name || !email || !message){
        // if they're empty display error message
        showErrMessage("Please enter your name, email and your feed back");
    }
    else { // otherwise send email
        sendFeedBack(name, email, message);
        $('#txtFeedName').val("");
        $('#txtFeedEmail').val("");
        $('#txtFeedMessage').val("");
        $("#errMessage").text("Message sent! Thank you for your feedback").removeClass('red-text').addClass('green-text');
    }
})


