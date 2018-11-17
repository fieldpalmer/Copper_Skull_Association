var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_fHJB9fIE30QMwnuL4WQAT8jG",
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "Sample Store",
    description: "Example Purchase",
    token: handleToken
  });
});


function handleToken(token) {
  fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(token)
  })
  .then(output => {
    if (output.status === "succeeded")
      document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
  })
}