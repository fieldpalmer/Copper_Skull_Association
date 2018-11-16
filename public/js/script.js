
$(document).ready(()=>{

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
})
