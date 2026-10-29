(()=>{
 let unlimited=false,generation=0;const controls=[];
 const maximum=control=>unlimited?Number.MAX_SAFE_INTEGER:control.publicMaximum;
 function setQuantity(control,value,emit=true){
  const safe=Number.isFinite(value)?Math.min(maximum(control),Math.max(0,Math.floor(value))):0;
  const text=String(safe);
  if(![...control.select.options].some(o=>o.value===text))control.select.add(new Option(text,text));
  control.select.value=text;sync(control);
  if(emit)control.select.dispatchEvent(new Event('change',{bubbles:true}));
 }
 function sync(control){control.input.value=control.select.value;control.minus.disabled=Number(control.select.value)<=0;control.plus.disabled=Number(control.select.value)>=maximum(control);if(unlimited)control.input.removeAttribute('max');else control.input.max=String(control.publicMaximum);}
 for(const select of document.querySelectorAll('select[data-group]')){
  const name=select.dataset.name.split('|').pop(),wrapper=document.createElement('div'),minus=document.createElement('button'),input=document.createElement('input'),plus=document.createElement('button');
  wrapper.className='quantity-control';minus.type=plus.type='button';minus.textContent='−';plus.textContent='+';minus.setAttribute('aria-label','Decrease quantity for '+name);plus.setAttribute('aria-label','Increase quantity for '+name);
  input.type='number';input.min='0';input.step='1';input.inputMode='numeric';input.className='quantity-input';input.setAttribute('aria-label','Quantity for '+name);
  const control={select,minus,input,plus,publicMaximum:Math.max(...[...select.options].map(o=>Number(o.value)))};select.dataset.publicMaximum=String(control.publicMaximum);
  select.hidden=true;select.tabIndex=-1;select.setAttribute('aria-hidden','true');select.after(wrapper);wrapper.append(minus,input,plus);controls.push(control);
  minus.addEventListener('click',()=>setQuantity(control,Number(select.value)-1));plus.addEventListener('click',()=>setQuantity(control,Number(select.value)+1));input.addEventListener('input',()=>setQuantity(control,input.valueAsNumber));select.addEventListener('change',()=>sync(control));sync(control);
 }
 window.blacksmithClientQuantity={set(select,value){const control=controls.find(c=>c.select===select);if(control)setQuantity(control,value,false);}};
 async function refresh(initial=false){
  const current=++generation,A=window.BAuth,token=A?.state?.token;unlimited=false;for(const c of controls)sync(c);
  let account;try{if(token)account=(await A.request('/auth/me')).account;}catch{}
  if(current!==generation)return;
  unlimited=!!(token&&A.state?.token===token&&['owner','member'].includes(account?.role)&&!account.needsSetup&&!account.mustChangePassword);
  for(const c of controls)setQuantity(c,Number(c.select.value),false);
  if(!initial&&controls.length)controls[0].select.dispatchEvent(new Event('change',{bubbles:true}));
 }
 window.clientQuantityReady=refresh(true);window.addEventListener('blacksmith-auth-change',()=>{window.clientQuantityReady=refresh();});
 const originalReset=window.resetAll;window.resetAll=function(){originalReset();for(const c of controls)sync(c);};
})();
