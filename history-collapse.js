(()=>{
 const KEY='blacksmith-expanded-history-v1';
 function read(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(value)?value.filter(id=>typeof id==='string'):[]);}catch(_){return new Set();}}
 window.setupBlacksmithHistoryCollapse=(card,order)=>{
  const title=card.querySelector('h3');if(!title)return;
  const header=document.createElement('div'),identity=document.createElement('div'),body=document.createElement('div'),toggle=document.createElement('button');header.className='history-card-header';identity.className='history-card-identity';body.className='history-card-body';body.id='history-details-'+order.id;identity.append(title);
  for(const line of [...card.querySelectorAll(':scope > .history-order-summary')])identity.append(line);
  if(order.completedAt){const date=new Date(order.completedAt);if(!Number.isNaN(date.getTime())){const completed=document.createElement('p');completed.className='note';completed.textContent='Completed: '+date.toLocaleString();identity.append(completed);}}
  for(const child of [...card.children])body.append(child);
  toggle.type='button';toggle.className='btn btn-secondary';toggle.setAttribute('aria-controls',body.id);let expanded=read().has(order.id);
  function update(){body.hidden=!expanded;toggle.textContent=expanded?'Minimize order':'Expand order';toggle.setAttribute('aria-expanded',String(expanded));toggle.setAttribute('aria-label',toggle.textContent+' history for '+(order.orderName||order.name||'customer'));card.classList.toggle('history-card-minimized',!expanded);}
  toggle.addEventListener('click',()=>{expanded=!expanded;update();try{const ids=read();if(expanded)ids.add(order.id);else ids.delete(order.id);localStorage.setItem(KEY,JSON.stringify([...ids]));}catch(_){window.blacksmithNotify?.('Could not remember expanded history in this browser.','error');}});
  header.append(identity,toggle);card.classList.add('history-collapsible');card.append(header,body);update();
 };
})();
