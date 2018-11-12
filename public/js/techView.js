$(document).ready( () => {
  
  getOrders();

  const getOrders = (orderData) => {
    $.get("/api/orders", orderData).then(showOrders)
  }

  const showOrders = (OrderData) => {
      
    // GET route to the work order table to display all jobs limit to 12
    $.get("/api/orders", (orderData) => {
    
      for (let i = 0 ; i < orderData.length ; i++) {

        //this colWrap wraps around everything
        let colWrap = $("<div>");
        colWrap.addClass("col s12 m4 l3 flex");

        //this cardWrap wraps around 
        let cardWrap = $("<div>");
        cardWrap.addClass("card sticky-action");

        //this wraps our img
        let imgWrap = $("<div>");
        imgWrap.addClass("card-image waves-effect waves-block waves-light")

        //this is our img
        let cardImg = $("<img>");
        let imgSrc = orderData[i].imgSrc;
        cardImg.addClass("activator")
        cardImg.attr("src", imgSrc );

        //show cardReveal
        let plusBtn = $("<i>");
        plusBtn.addClass("material-icons small right");
        plusBtn.text(add);
        //close cardAction
        let closeBtn = $("<i>");
        closeBtn.addClass("material-icons small right");
        closeBtn.text(close);
        //save job link
        let saveJob = $("<p>");
        let saveJobLink = $("<a>");
        saveJobLink.attr("href", "#")
        saveJob.text("Save Job");

        //this actionWrap wraps our car information on display
        let actionWrap = $("<div>");
        actionWrap.addClass("card-action");
        //here's our car info
        let carYear = orderData[i].carYear;
        let carMake = orderData[i].carMake;
        let carModel = orderData[i].carModel;
        let carTitle = $("<span>");
        carTitle.addClass("card-title activator grey-text text-darken-4");
        carTitle.text(carYear + "<br>" + carMake + " " + carModel  + plusBtn);
        carTitle.append(saveJob);
        carTitle.wrap(actionWrap);
        
        //this revealWrap wraps our car information to be revealed
        let revealWrap = $("<div>");
        revealWrap.addClass("card-reveal");
        //here's our reveal info
        let jobDesc = orderData[i].jobDescription;
        let jobLoc = orderData[i].customer.location;
        let jobStatus = orderData[i].jobComplete;
        let jobInfo = $("<span>");
        jobInfo.addClass("card-title  grey-text text-darken-4");
        jobInfo.text(jobDesc + "<br>" + jobLoc + "<br>" + jobStatus  + closeBtn);
        jobInfo.wrap(revealWrap);
        
        //put it all together
        let jobDisplay = cardImg.append(carTitle, jobInfo).wrap(cardWrap, colWrap);

        $("#job-display").text(jobDisplay);
        
      }
    
    });

  };

});