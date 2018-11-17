$(document).ready(function() {
  const orderCreate = obj => {
    $.ajax('/api/orders', {
      method: 'POST',
      data: {
        firstName: obj.customer.firstName,
        lastName: obj.customer.lastName,
        address: obj.customer.address.street_name + obj.customer.address.city + 
          obj.customer.address.state + obj.customer.address.zipcode + obj.customer.address.country,
        jobDescription: obj.services.join(', '),
        laborCost: obj.laborCost,
        customer_id: obj.customerId,
        date: obj.appointment.date,
        time: obj.appointment.time,
        vehicle: obj.make + ' ' + obj.model + ' ' + obj.year,
        phone: obj.customer.phone
      }
    }).then(orderInfo => {
      console.log(orderInfo);
    });
  }

  const orderUpdate = obj => {
    $.ajax('/api/orders', {
      method: 'POST',
      data: JSON.stringify(obj)
    }).then(orderInfo => {
      console.log(orderInfo);
    });
  }

  // $(document).on("click", "#btnPay", function() {
  //   let order = {
  //     appointment: {date: "Nov 20, 2018", time: "04:16 PM"},
  //     customer: {
  //       address: {
  //         street_name: "1234 S Highway 1223",
  //         city: " Corbin",
  //         state: " Kentucky",
  //         zipcode: " 40701",
  //         country: " US"
  //       },
  //       email: "asdf",
  //       firstName: "asf",
  //       lastName: "asdf",
  //       phone: "1234"
  //     },
  //     info: {
  //       oilType: "Pennzoil Ultra Platinum 5W-30",
  //       galCapacity: "1.51 (g)",
  //       quartsCapacity: "6.04 (q)"
  //     },
  //     laborCost: "56.24",
  //     customerId: 1,
  //     make: "BUICK (US)",
  //     model: "Enclave 3.6 Leather AWD",
  //     services: ["oil"],
  //     year: "2014"
  //   }
  //   orderCreate(order);
  // });

  //testing using the quote button saying Update Info
  $(document).on('click', '#btnQuote', function() {
    //create input field to enter order id

    $('#order-id').toggle();
    $('#order-edit-submit').toggle();

  });

  $(document).on('click', '#order-edit-submit', function() {

    let orderId = $('#order-id-input').val().trim();

    $.ajax('/api/orders/' + orderId, {
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json'
    }).then(orderReturn => {
      console.log(orderReturn);
      $('#order-form').toggle();
      // $('#tech-assign-button').toggle();
      $('#order-form-id').text('Order ID#: ' + orderReturn.id);
      $('#order-form-jobdesc').text('Job: ' + orderReturn.jobDescription);
      $('#order-form-laborcost').text('Cost: ' + orderReturn.laborCost);
      $('#order-form-vehicle').text('Vehicle: ' + orderReturn.vehicle);
      $('#order-form-techassigned').prepend(orderReturn.technicianAssigned);
    });
  });

  $(document).on('click', '#tech-assign-button', function() {
    
  });
});