const scraper = require('../public/js/scraper.js');

$("#carYear").on("change", () => {
  
  let ucYear = $("#carYear").val().trim();
  
  $.get("urlForCarMakes" + ucYear, (data) => {

    if (!data) {

      $("#quote-reveal").text("Sorry! No cars match this year.");

    } else {

      console.log(data)

      let userMakeSelect = $("#carMake").html(
        "<select id='carMake' type='select' placeholder='Make'>" + options[i] + "</select>"
      )

      return userMakeSelect;
    }

  })

})

$("#carMake").on("change", () => {
  
  let ucMake = $("#carMake").val().trim().replace(/\s+/g, "").toLowerCase();;
  
  $.get("urlForCarModels" + ucMake, (data) => {

    if (!data) {

      $("#quote-reveal").text("Sorry! No cars match this Make.");

    } else {

      console.log(data)

      let userModelSelect = $("#carModel").html(
        "<select id='carModel' type='select' placeholder='Model'>" + options[i] + "</select>"
      )

      return userModelSelect;
      
    }

  })

})

$("#carModel").on("change", () => {
  
  let ucModel = $("carModel").val().trim().replace(/\s+/g, "").toLowerCase();;
  
  $.get("urlForEngines" + ucModel, (data) => {

    if (!data) {

      $("#quote-reveal").text("Sorry! No cars match this Model.");

    } else {

      console.log(data)

      let userEngineSelect = $("#engineSize").html(
        "<select id='engineSize' type='select' placeholder='Model'>" + options[i] + "</select>"
      )

      return userEngineSelect;
      
    }

  }).then(OilChangeCalc())

})

const OilChangeCalc = () => {
  
  let url = 'https://oil.pennzoil.com/us/en_US/equipment/chevrolet_(us)/2010/colorado_2_9_2wd_colorado_EFt8PikDB';

  scraper.getOilInfo(url, info => {
    console.log(info);
    let galCap = info.galCapacity;
    console.log(galCap);
  });

}




const getYear = () => {

  $.ajax({
    method: "GET",
    url:"",
    data: carMakes
  }).then(getMakes);
}

const getMakes = (data) => {
  $.ajax({
    method: "GET",
    url:"",
    data: carMakes
  }).then(getModels);
}

const getModels = (carModels) => {
  $.ajax({
    method: "GET",
    url:"",
    data: carModels
  }).then(getEngines);
}

const getEngines = (carEngines) => {
  $.ajax({
    method: "GET",
    url:"",
    data: carEngines
  }).then(displayQuote());
}



