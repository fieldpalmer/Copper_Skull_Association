$(document).ready( () => {
  
  getOrders();

  const getOrders = (orderData) => {
    $.get("/api/orders", orderData).then(showOrders)
  }

  const saveOrder = (orderId) => {
    $.put("/api/orders/:id", data).then(showOrders)
  }

  const showOrders = () => {
      
    // GET route to the work order table to display all jobs limit to 12
    $.get("/api/orders", (orderData) => {
    
    
    });

    $.put("api/orders/:id", (data) => {

    })

  };

});