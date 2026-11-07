(()=>{
 const KEY='blacksmith-ready-orders-v1';
 const eligible=o=>o.workStatus==='processing'&&!o.fulfilled;
 const labels={regular:'Saddles',platform:'Platform saddles',teksaddles:'Tek saddles',tier1:'Equipment',tier2:'Tier 2',cursed1:'Cursed Tier 1',cursed2:'Cursed Tier 2'};
 const section=row=>/^cursed/.test(row.key)?'Cursed Gear':/^(tier1|tier2)\|/.test(row.key)?'Equipment':/^teksaddles\|Skiff$/.test(row.key)?'Skiff':'Saddles';
 const sections=['Saddles','Equipment','Cursed Gear','Skiff'];
 const grouped=rows=>[false,true].flatMap(complete=>{const matching=rows.filter(row=>(row.have===row.needed)===complete);return [...(complete&&matching.length?[{heading:'Packed items'}]:[]),...sections.flatMap(name=>{const items=matching.filter(row=>section(row)===name);return items.length?[{heading:name},...items]:[];})];});
 const count=(value,max)=>Number.isSafeInteger(value)?Math.max(0,Math.min(max,value)):0;
 const linked=(order,key)=>Object.prototype.hasOwnProperty.call(order.craftedItems||{},key);
 const progress=(order,key,needed)=>linked(order,key)?(order.craftedItems[key]===true?needed:count(order.craftedItems[key],needed)):count(order.packedItems?.[key],needed);
 function collect(orders,entries,parse){
  const rows=new Map(),sources=[];
  for(const order of orders.filter(eligible).sort((a,b)=>String(a.createdAt||'').localeCompare(String(b.createdAt||''))||a.id.localeCompare(b.id))){
   const parsed=parse(order.items||'',entries);if(parsed.errors.length||!parsed.totals.size)throw Error('Check the items for '+(order.orderName||order.name||'an order')+'. No partial packing list is shown.');
   const parts=[];
   for(const [index,needed]of parsed.totals){const entry=entries[index];if(!entry||!Number.isSafeInteger(needed)||needed<1)throw Error('Invalid packing quantity.');
    const have=progress(order,entry.id,needed);parts.push([entry.id,needed]);
    if(!rows.has(entry.id))rows.set(entry.id,{key:entry.id,name:entry.name,category:entry.category,needed:0,have:0,allocations:[]});
    const row=rows.get(entry.id);row.needed+=needed;row.have+=have;if(!Number.isSafeInteger(row.needed))throw Error('Packing quantity is too large.');row.allocations.push({orderId:order.id,needed,have,linked:linked(order,entry.id),label:[order.orderName,order.name].filter(Boolean).join(" · ")||"Order "+order.id.slice(0,8)});row.craftingLinked=row.craftingLinked||linked(order,entry.id);
   }
   sources.push([order.id,parts]);
  }

  return {rows:[...rows.values()].sort((a,b)=>a.name.localeCompare(b.name)||a.category.localeCompare(b.category)),signature:JSON.stringify(sources),orderCount:sources.length};
 }
 function adjust(orders,snapshot,key,quantity,orderId){
  const row=snapshot.rows.find(row=>row.key===key);if(!row||!Number.isSafeInteger(quantity)||quantity<0||quantity>row.needed)throw Error('Enter a whole number from 0 to '+(row?.needed||0)+'.');
  if(row.allocations.length>1&&!orderId)throw Error('Choose the customer order to update this shared item.');
  const part=orderId?row.allocations.find(p=>p.orderId===orderId):row.allocations[0];
  if(!part||quantity>part.needed)throw Error('Enter a quantity from 0 to '+(part?.needed||0)+'.');
  return orders.map(order=>{if(order.id!==part.orderId)return order;if(!eligible(order))throw Error('Processing orders changed. Review the updated list.');const packedItems={...order.packedItems,[key]:quantity},result={...order,packedItems};if(linked(order,key))result.craftedItems={...order.craftedItems,[key]:quantity===part.needed?true:quantity};return result;});
 }
 window.BLACKSMITH_PROCESSING_PACKING={collect,adjust};
 let panel,layout,list,summary,message,search,missingOnly,reset,copy,snapshot,active=false;
 const read=()=>{const value=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(value))throw Error('Saved orders could not be read.');return value;};
 function entries(){return [...document.querySelectorAll('select[data-group]')].map((select,key)=>{const group=select.dataset.group,name=select.dataset.name;const norm=s=>s.toLowerCase().replace(/[–—|:_]/g,' ').replace(/\s+/g,' ').trim();return {key,group,id:group+'|'+name,name:name.replace('|',' – '),category:labels[group]||group,aliases:[norm(name),norm(name.split('|').pop())]};});}
 function latest(){return collect(read(),entries(),window.parsePastedBlacksmithOrders);}
 function fail(error){message.textContent=error.message;window.blacksmithNotify?.(error.message,'error');}
 function save(key,quantity,orderId){try{const orders=read(),fresh=collect(orders,entries(),window.parsePastedBlacksmithOrders);if(fresh.signature!==snapshot.signature){window.renderBlacksmithProcessingPacking('processing');throw Error('Processing orders changed. Review the updated quantities and try again.');}if(fresh.rows.find(row=>row.key===key)?.have!==snapshot.rows.find(row=>row.key===key)?.have){window.renderBlacksmithProcessingPacking('processing');throw Error('Packing progress changed. Review the updated count and try again.');}const next=adjust(orders,fresh,key,quantity,orderId);localStorage.setItem(KEY,JSON.stringify(next));window.dispatchEvent(new Event('blacksmith-processing-packing-updated'));window.renderBlacksmithProcessingPacking('processing');message.textContent='Packing progress saved.';}catch(error){fail(error);}}
 function setup(){
  const cards=document.getElementById('readyOrderCards');if(!cards)return false;
  layout=document.createElement('div');layout.className='processing-packing-layout';cards.before(layout);layout.append(cards);
  panel=document.createElement('aside');panel.className='processing-packing-panel output';panel.setAttribute('aria-label','Combined processing packing list');panel.hidden=true;
  panel.innerHTML='<h3>Processing Packing List</h3><p class="note">Combined across all processing orders, including orders hidden by the order search. Recorded crafting progress is included for every order. Shared items are totaled across orders; adjust them under the correct customer below. Counts without a crafting entry use saved packing progress. Progress is saved through cloud sync.</p><p class="processing-packing-summary" aria-live="polite"></p><label>Find an item<input type="search" class="form-control" placeholder="Search packing list…"></label><label class="processing-packing-filter" hidden><input type="checkbox"> Show missing only</label><div class="processing-packing-items"></div><p class="processing-packing-status note" role="status"></p><div class="processing-packing-actions"><button type="button" class="btn btn-secondary" data-action="copy">Copy packing list</button><button type="button" class="btn btn-secondary" data-action="reset">Reset packing list</button></div>';
  layout.append(panel);list=panel.querySelector('.processing-packing-items');summary=panel.querySelector('.processing-packing-summary');message=panel.querySelector('[role=status]');search=panel.querySelector('input[type=search]');missingOnly=panel.querySelector('input[type=checkbox]');reset=panel.querySelector('[data-action=reset]');copy=panel.querySelector('[data-action=copy]');
  search.addEventListener('input',renderRows);missingOnly.addEventListener('change',renderRows);
  copy.addEventListener('click',async()=>{try{const fresh=latest(),text=['Processing orders — Packing List',fresh.orderCount+' processing orders','',...grouped(fresh.rows).map(row=>row.heading?'\n'+row.heading:row.name+' ('+row.category+') · Packed '+row.have+' / Required '+row.needed+' / To pack '+(row.needed-row.have))].join('\n');if(window.blacksmithCopy){if(await window.blacksmithCopy(text,copy,'Packing list copied.'))message.textContent='Full packing list copied.';}else{await navigator.clipboard.writeText(text);message.textContent='Full packing list copied.';}}catch(error){fail(error);}});
  reset.addEventListener('click',()=>{if(!window.confirm('Reset all processing packing progress and linked crafting progress? This will be shared with other signed-in users. Waiting orders and history will keep their packing progress.'))return;try{const orders=read(),fresh=collect(orders,entries(),window.parsePastedBlacksmithOrders);if(fresh.signature!==snapshot.signature){window.renderBlacksmithProcessingPacking('processing');throw Error('Processing orders changed. Review the list before resetting.');}localStorage.setItem(KEY,JSON.stringify(orders.map(order=>eligible(order)?{...order,packedItems:{},craftedItems:Object.fromEntries(Object.keys(order.craftedItems||{}).map(key=>[key,0]))}:order)));window.dispatchEvent(new Event('blacksmith-processing-packing-updated'));window.renderBlacksmithProcessingPacking('processing');message.textContent='Processing packing progress reset.';}catch(error){fail(error);}});
  return true;
 }
 function renderRows(){
  const scrollX=window.scrollX,scrollY=window.scrollY,panelScroll=panel.scrollTop;
  const focused=document.activeElement?.closest('[data-packing-key]'),focus=focused&&{key:focused.dataset.packingKey,control:document.activeElement.dataset.control};
  list.replaceChildren();const query=search.value.trim().toLowerCase();let shown=0;
  for(const row of grouped((snapshot?.rows||[]).filter(row=>(!missingOnly.checked||row.have<row.needed)&&(row.name+' '+row.category+' '+section(row)).toLowerCase().includes(query)))){if(row.heading){const heading=document.createElement('h4');heading.className='processing-packing-group';heading.textContent=row.heading;list.append(heading);continue;}const missing=row.needed-row.have;shown++;
   const element=document.createElement('section');element.className='processing-packing-item'+(!missing?' is-complete':'');element.dataset.packingKey=row.key;
   const title=document.createElement('h4');title.textContent=row.name;const category=document.createElement('p');category.className='note';category.textContent=row.category+(row.craftingLinked?' · Linked to crafting checklist':row.allocations.length>1?' · Multiple orders':'');
   const counts=document.createElement('p');counts.className='processing-packing-counts';counts.textContent='Required: '+row.needed+' · To pack: '+missing+(!missing?' · Packed':'');
   const control=document.createElement('div');control.className='processing-packing-quantity';const label=document.createElement('label');label.textContent='Packed';const input=document.createElement('input');input.type='number';input.min='0';input.max=String(row.needed);input.step='1';input.inputMode='numeric';input.value=String(row.have);input.className='form-control';input.dataset.control='input';input.setAttribute('aria-label','Packed quantity of '+row.category+' '+row.name);label.append(input);
   const minus=document.createElement('button'),plus=document.createElement('button');for(const button of [minus,plus]){button.type='button';button.className='btn btn-secondary';}minus.textContent='−';plus.textContent='+';minus.dataset.control='minus';plus.dataset.control='plus';minus.setAttribute('aria-label','Decrease '+row.category+' '+row.name);plus.setAttribute('aria-label','Increase '+row.category+' '+row.name);minus.disabled=row.have===0;plus.disabled=!missing;
   minus.addEventListener('click',()=>save(row.key,row.have-1));plus.addEventListener('click',()=>save(row.key,row.have+1));input.addEventListener('input',()=>{const value=input.valueAsNumber;if(!Number.isSafeInteger(value)||value<0||value>row.needed){input.setCustomValidity('Enter a whole number from 0 to '+row.needed+'.');input.setAttribute('aria-invalid','true');message.textContent='Enter a whole number from 0 to '+row.needed+'.';return;}input.setCustomValidity('');input.removeAttribute('aria-invalid');save(row.key,value);});input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.reportValidity();}});
   control.append(minus,label,plus);element.append(title,category,counts);
   if(row.allocations.length===1)element.append(control);
   else for(const part of row.allocations){const group=document.createElement('div'),customer=document.createElement('p'),controls=document.createElement('div'),fieldLabel=document.createElement('label'),field=document.createElement('input'),decrease=document.createElement('button'),increase=document.createElement('button');group.dataset.packingKey=row.key;customer.textContent=part.label+' · '+part.have+' / '+part.needed+(part.linked?' crafted':' packed');controls.className='processing-packing-quantity';fieldLabel.textContent=part.linked?'Crafted':'Packed';field.type='number';field.min='0';field.max=String(part.needed);field.step='1';field.value=String(part.have);field.className='form-control';field.dataset.control=part.orderId;field.setAttribute('aria-label',fieldLabel.textContent+' '+row.name+' for '+part.label);fieldLabel.append(field);for(const button of [decrease,increase]){button.type='button';button.className='btn btn-secondary';}decrease.textContent='−';increase.textContent='+';decrease.dataset.control=part.orderId+'-minus';increase.dataset.control=part.orderId+'-plus';decrease.setAttribute('aria-label','Decrease '+row.name+' for '+part.label);increase.setAttribute('aria-label','Increase '+row.name+' for '+part.label);decrease.disabled=!part.have;increase.disabled=part.have===part.needed;decrease.addEventListener('click',()=>save(row.key,part.have-1,part.orderId));increase.addEventListener('click',()=>save(row.key,part.have+1,part.orderId));field.addEventListener('change',()=>save(row.key,field.valueAsNumber,part.orderId));controls.append(decrease,fieldLabel,increase);group.append(customer,controls);element.append(group);}
   list.append(element);
  }
  if(!shown){const empty=document.createElement('p');empty.className='note';empty.textContent=!snapshot?.rows.length?'No processing orders to pack.':missingOnly.checked&&!query?'All processing items are packed.':'No items match these filters.';list.append(empty);}
  if(focus)for(const element of list.children)if(element.dataset.packingKey===focus.key)element.querySelector('[data-control="'+focus.control+'"]')?.focus({preventScroll:true});
  panel.scrollTop=panelScroll;window.scrollTo({left:scrollX,top:scrollY,behavior:'instant'});
 }
 window.renderBlacksmithProcessingPacking=function(filter){active=filter==='processing';if(!panel&&!setup())return;panel.hidden=!active;layout.classList.toggle('has-processing-packing',active);if(!active)return;
  try{snapshot=latest();const needed=snapshot.rows.reduce((n,row)=>n+row.needed,0),have=snapshot.rows.reduce((n,row)=>n+row.have,0);summary.textContent=have+' / '+needed+' packed · '+(needed-have)+' to pack · '+snapshot.orderCount+' processing order'+(snapshot.orderCount===1?'':'s');reset.disabled=!have;copy.disabled=!snapshot.rows.length;renderRows();}catch(error){snapshot=null;list.replaceChildren();summary.textContent='Packing list unavailable.';reset.disabled=copy.disabled=true;fail(error);}
 };
 window.addEventListener('blacksmith-crafting-progress-updated',()=>{if(active)window.renderBlacksmithProcessingPacking('processing');});
})();
