// top nav loading functions

$(document).on("click", "#top-nav-work", () => {
    $("#main").load('./templates/workorder.html');
});

$(document).on("click", "#top-nav-about", () => {
    $("#main").load('./templates/about.html');
});

$(document).on("click", "#top-nav-contact", () => {
    $("#main").load('./templates/contact.html');
});

// $(document).on("click", "#top-nav-work", () => {
//     $("#main").load('./templates/auth.html');
// });

// 