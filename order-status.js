(()=>{
 const states=new WeakMap();
 function status(order){
  const fulfilled=order.fulfilled===true||order.delivered===true;
  if(fulfilled)return {text:(order.delivery?'Delivered':'Picked up')+(order.paid?' · Paid':' · Awaiting payment'),state:'fulfilled'};
  if(order.workStatus==='processing')return {text:'Processing order',state:'processing'};
  if(order.workStatus!=='complete')return {text:'Not started',state:'new'};
  if(order.delivery&&!window.blacksmithHasDeliveryInstructions(order))return {text:'Complete · Awaiting delivery instructions',state:'instructions'};
  const text='Complete · Awaiting '+(order.delivery?'Delivery':'Pickup')+(order.paid?'':'/Payment');
  return {text,state:!order.delivery&&order.faceToFace?(order.paid?'f2f-paid':'f2f-unpaid'):'ready'};
 }
 function apply(element,order){
  states.set(element,order);const result=status(order),dark=document.documentElement.dataset.theme==='dark';
  const colors=dark?{new:['transparent','#eee','#eee'],processing:['transparent','#96e6af','#96e6af'],ready:['transparent','#a4ccff','#a4ccff'],instructions:['#f5d995','#473000','#f5d995'],'f2f-paid':['#347849','#fff','#61ad78'],'f2f-unpaid':['#315f91','#fff','#5890ca'],fulfilled:['#304333','#c5ddbf','#91ad8e']}:{new:['transparent','#242424','#242424'],processing:['transparent','#16632f','#16632f'],ready:['transparent','#174f8a','#174f8a'],instructions:['#f1dda7','#59400b','#b79b5d'],'f2f-paid':['#347849','#fff','#347849'],'f2f-unpaid':['#315f91','#fff','#315f91'],fulfilled:['#e6eee3','#426044','#5f7d61']};
  const [background,color,border]=colors[result.state];element.textContent=result.text;element.dataset.orderStatus=result.state;element.classList.add('blacksmith-order-status');element.style.backgroundColor=background;element.style.color=color;element.style.borderColor=border;element.style.fontWeight='600';element.style.fontSize='13px';element.style.padding='8px 12px';element.style.borderRadius='8px';element.style.borderStyle='solid';element.style.borderWidth='1px';
 }
 window.BLACKSMITH_ORDER_STATUS={status,apply};window.addEventListener('blacksmith-theme-change',()=>{for(const element of document.querySelectorAll('.blacksmith-order-status')){const order=states.get(element);if(order)apply(element,order);}});
})();
