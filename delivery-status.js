(function(){
  window.blacksmithHasDeliveryInstructions=order=>[order.privateNotes,order.courierNotes,order.deliveryDetails].some(value=>typeof value==='string'&&value.trim().length>0);
})();
