(()=>{
 const KEY='blacksmith-ready-orders-v1';
 const eligible=o=>o.workStatus==='processing'&&!o.fulfilled;
 const labels={regular:'Saddles',platform:'Platform saddles',teksaddles:'Tek saddles',tier1:'Equipment',tier2:'Tier 2',cursed1:'Cursed Tier 1',cursed2:'Cursed Tier 2'};
 const count=(value,max)=>Number.isSafeInteger(value)?Math.max(0,Math.min(max,value)):0;
 function collect(orders,entries,parse){
  const rows=new Map(),sources=[];
  for(const order of orders.filter(eligible).sort((a,b)=>String(a.createdAt||'').localeCompare(String(b.createdAt||''))||a.id.localeCompare(b.id))){
   const parsed=parse(order.items||'',entries);if(parsed.errors.length||!parsed.totals.size)throw Error('Check the items for '+(order.orderName||order.name||'an order')+'. No partial packing list is shown.');
   const parts=[];
   for(const [index,needed]of parsed.totals){const entry=entries[index];if(!entry||!Number.isSafeInteger(needed)||needed<1)throw Error('Invalid packing quantity.');
    const have=count(order.packedItems?.[entry.id],needed);parts.push([entry.id,needed]);
    if(!rows.has(entry.id))rows.set(entry.id,{key:entry.id,name:entry.name,category:entry.category,needed:0,have:0,allocations:[]});
    const row=rows.get(entry.id);row.needed+=needed;row.have+=have;if(!Number.isSafeInteger(row.needed))throw Error('Packing quantity is too large.');row.allocations.push({orderId:order.id,needed});
   }
   sources.push([order.id,parts]);
  }
  return {rows:[...rows.values()].sort((a,b)=>a.name.localeCompare(b.name)||a.category.localeCompare(b.category)),signature:JSON.stringify(sources),orderCount:sources.length};
 }
 function adjust(orders,snapshot,key,quantity){
  const row=snapshot.rows.find(row=>row.key===key);if(!row||!Number.isSafeInteger(quantity)||quantity<0||quantity>row.needed)throw Error('Enter a whole number from 0 to '+(row?.needed||0)+'.');
  // Keep already-packed quantities assigned to their original orders where possible.
  let remaining=quantity;const targets=new Map();
  for(const part of row.allocations){const order=orders.find(o=>o.id===part.orderId);if(!order||!eligible(order))throw Error('Processing orders changed. Review the updated list.');const kept=Math.min(remaining,count(order.packedItems?.[key],part.needed));targets.set(part.orderId,kept);remaining-=kept;}
  for(const part of row.allocations){const extra=Math.min(remaining,part.needed-targets.get(part.orderId));targets.set(part.orderId,targets.get(part.orderId)+extra);remaining-=extra;}
  return orders.map(order=>{if(!targets.has(order.id))return order;const packedItems={...order.packedItems},value=targets.get(order.id);if(value)packedItems[key]=value;else delete packedItems[key];return {...order,packedItems};});
 }
 window.BLACKSMITH_PROCESSING_PACKING={collect,adjust};
 let panel,layout,list,summary,message,search,missingOnly,reset,copy,snapshot,active=false;
 const read=()=>{const value=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(value))throw Error('Saved orders could not be read.');return value;};
 function entries(){return [...document.querySelectorAll('select[data-group]')].map((select,key)=>{const group=select.dataset.group,name=select.dataset.name;const norm=s=>s.toLowerCase().replace(/[–—|:_]/g,' ').replace(/\s+/g,' ').trim();return {key,group,id:group+'|'+name,name:name.replace('|',' – '),category:labels[group]||group,aliases:[norm(name),norm(name.split('|').pop())]};});}
 function latest(){return collect(read(),entries(),window.parsePastedBlacksmithOrders);}
 function fail(error){message.textContent=error.message;window.blacksmithNotify?.(error.message,'error');}
 function save(key,quantity){try{const orders=read(),fresh=collect(orders,entries(),window.parsePastedBlacksmithOrders);if(fresh.signature!==snapshot.signature){window.renderBlacksmithProcessingPacking('processing');throw Error('Processing orders changed. Review the updated quantities and try again.');}if(fresh.rows.find(row=>row.key===key)?.have!==snapshot.rows.find(row=>row.key===key)?.have){window.renderBlacksmithProcessingPacking('processing');throw Error('Packing progress changed. Review the updated count and try again.');}const next=adjust(orders,fresh,key,quantity);localStorage.setItem(KEY,JSON.stringify(next));window.dispatchEvent(new Event('blacksmith-processing-packing-updated'));message.textContent='Packing progress saved.';}catch(error){fail(error);}}
 function setup(){
  const cards=document.getElementById('readyOrderCards');if(!cards)return false;
  layout=document.createElement('div');layout.className='processing-packing-layout';cards.before(layout);layout.append(cards);
  panel=document.createElement('aside');panel.className='processing-packing-panel output';panel.setAttribute('aria-label','Combined processing packing list');panel.hidden=true;
  panel.innerHTML='<h3>Packing List</h3><p class="note">Combined across all processing orders, including orders hidden by the order search. Progress is saved on each order and shared through cloud sync.</p><p class="processing-packing-summary" aria-live="polite"></p><label>Find an item<input type="search" class="form-control" placeholder="Search packing list…"></label><label class="processing-packing-filter"><input type="checkbox"> Show missing only</label><div class="processing-packing-items"></div><p class="processing-packing-status note" role="status"></p><div class="processing-packing-actions"><button type="button" class="btn btn-secondary" data-action="copy">Copy packing list</button><button type="button" class="btn btn-secondary" data-action="reset">Reset packing list</button></div>';
  layout.append(panel);list=panel.querySelector('.processing-packing-items');summary=panel.querySelector('.processing-packing-summary');message=panel.querySelector('[role=status]');search=panel.querySelector('input[type=search]');missingOnly=panel.querySelector('input[type=checkbox]');reset=panel.querySelector('[data-action=reset]');copy=panel.querySelector('[data-action=copy]');
  search.addEventListener('input',renderRows);missingOnly.addEventListener('change',renderRows);
  copy.addEventListener('click',async()=>{try{const fresh=latest(),text=['Processing orders — Packing List',fresh.orderCount+' processing orders','',...fresh.rows.map(row=>row.name+' ('+row.category+') · Have '+row.have+' / Needed '+row.needed+' / Missing '+(row.needed-row.have))].join('\n');if(window.blacksmithCopy){if(await window.blacksmithCopy(text,copy,'Packing list copied.'))message.textContent='Full packing list copied.';}else{await navigator.clipboard.writeText(text);message.textContent='Full packing list copied.';}}catch(error){fail(error);}});
  reset.addEventListener('click',()=>{if(!window.confirm('Reset all packing progress for processing orders? This will be shared with other signed-in users. Waiting orders and history will keep their packing progress.'))return;try{const orders=read(),fresh=collect(orders,entries(),window.parsePastedBlacksmithOrders);if(fresh.signature!==snapshot.signature){window.renderBlacksmithProcessingPacking('processing');throw Error('Processing orders changed. Review the list before resetting.');}localStorage.setItem(KEY,JSON.stringify(orders.map(order=>eligible(order)?{...order,packedItems:{}}:order)));window.dispatchEvent(new Event('blacksmith-processing-packing-updated'));message.textContent='Processing packing progress reset.';}catch(error){fail(error);}});
  return true;
 }
 function renderRows(){
  const focused=document.activeElement?.closest('[data-packing-key]'),focus=focused&&{key:focused.dataset.packingKey,control:document.activeElement.dataset.control};
  list.replaceChildren();const query=search.value.trim().toLowerCase();let shown=0;
  for(const row of snapshot?.rows||[]){const missing=row.needed-row.have;if((missingOnly.checked&&!missing)||!(row.name+' '+row.category).toLowerCase().includes(query))continue;shown++;
   const element=document.createElement('section');element.className='processing-packing-item'+(!missing?' is-complete':'');element.dataset.packingKey=row.key;
   const title=document.createElement('h4');title.textContent=row.name;const category=document.createElement('p');category.className='note';category.textContent=row.category;
   const counts=document.createElement('p');counts.className='processing-packing-counts';counts.textContent='Needed: '+row.needed+' · Missing: '+missing+(!missing?' · Complete':'');
   const control=document.createElement('div');control.className='processing-packing-quantity';const label=document.createElement('label');label.textContent='Have';const input=document.createElement('input');input.type='number';input.min='0';input.max=String(row.needed);input.step='1';input.inputMode='numeric';input.value=String(row.have);input.className='form-control';input.dataset.control='input';input.setAttribute('aria-label','Have quantity of '+row.category+' '+row.name);label.append(input);
   const minus=document.createElement('button'),plus=document.createElement('button');for(const button of [minus,plus]){button.type='button';button.className='btn btn-secondary';}minus.textContent='−';plus.textContent='+';minus.dataset.control='minus';plus.dataset.control='plus';minus.setAttribute('aria-label','Decrease '+row.category+' '+row.name);plus.setAttribute('aria-label','Increase '+row.category+' '+row.name);minus.disabled=row.have===0;plus.disabled=!missing;
   minus.addEventListener('click',()=>save(row.key,row.have-1));plus.addEventListener('click',()=>save(row.key,row.have+1));input.addEventListener('input',()=>{const value=input.valueAsNumber;if(!Number.isSafeInteger(value)||value<0||value>row.needed){input.setCustomValidity('Enter a whole number from 0 to '+row.needed+'.');input.setAttribute('aria-invalid','true');message.textContent='Enter a whole number from 0 to '+row.needed+'.';return;}input.setCustomValidity('');input.removeAttribute('aria-invalid');save(row.key,value);});input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.reportValidity();}});
   control.append(minus,label,plus);element.append(title,category,counts,control);list.append(element);
  }
  if(!shown){const empty=document.createElement('p');empty.className='note';empty.textContent=!snapshot?.rows.length?'No processing orders to pack.':missingOnly.checked&&!query?'All processing items are packed.':'No items match these filters.';list.append(empty);}
  if(focus)for(const element of list.children)if(element.dataset.packingKey===focus.key)element.querySelector('[data-control="'+focus.control+'"]')?.focus({preventScroll:true});
 }
 window.renderBlacksmithProcessingPacking=function(filter){active=filter==='processing';if(!panel&&!setup())return;panel.hidden=!active;layout.classList.toggle('has-processing-packing',active);if(!active)return;
  try{snapshot=latest();const needed=snapshot.rows.reduce((n,row)=>n+row.needed,0),have=snapshot.rows.reduce((n,row)=>n+row.have,0);summary.textContent=have+' / '+needed+' packed · '+(needed-have)+' missing · '+snapshot.orderCount+' processing order'+(snapshot.orderCount===1?'':'s');reset.disabled=!have;copy.disabled=!snapshot.rows.length;renderRows();}catch(error){snapshot=null;list.replaceChildren();summary.textContent='Packing list unavailable.';reset.disabled=copy.disabled=true;fail(error);}
 };
})();
