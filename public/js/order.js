$(document).ready(function() {
  const orderCreate = obj => {
    $.ajax('/api/orders', {
      method: 'POST',
      // url: 'api/orders',
      data: {
        "firstName": obj.customer.firstName,
        "lastName": obj.customer.lastName,
        "address": obj.customer.address.street_name + obj.customer.address.city + 
          obj.customer.address.state + obj.customer.address.zipcode + obj.customer.address.country,
        "jobDescription": obj.services[0],
        "laborCost": obj.laborCost,
        "customer_id": obj.customerId,
        "technician_id": obj.technicianId,
        "date": obj.appointment.date,
        "time": obj.appointment.time,
        "vehicle": obj.make + ' ' + obj.model + ' ' + obj.year
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
});