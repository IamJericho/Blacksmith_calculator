(()=>{
 const visible=el=>!!el?.isConnected&&!el.closest('[hidden]')&&el.getClientRects().length>0;
 const statusIds=['loginStatus','profileStatus','readyOrdersStatus','courierActionStatus','manualResult','previewManualResult'];
 function enhance(root=document){
  for(const table of root.querySelectorAll('table')){for(const th of table.querySelectorAll('thead th'))if(!th.hasAttribute('scope'))th.scope='col';}
  for(const region of document.querySelectorAll('.table-wrap,.availability-table,.sequence-values')){if(!region.hasAttribute('tabindex'))region.tabIndex=0;if(!region.hasAttribute('role')){region.setAttribute('role','region');region.setAttribute('aria-label','Scrollable table or results');}}
  for(const id of statusIds){const el=document.getElementById(id);if(el){el.setAttribute('role','status');el.setAttribute('aria-live','polite');el.setAttribute('aria-atomic','true');}}
 }
 function init(){
  let main=document.querySelector('main,[role=main]');if(!main){main=document.getElementById('calculatorWorkspace')||document.querySelector('.workspace');if(main)main.setAttribute('role','main');}
  if(main){if(!main.id)main.id='mainContent';if(!main.hasAttribute('tabindex'))main.tabIndex=-1;let skip=document.querySelector('.skip-link,.skip,.a11y-skip');if(!skip){skip=document.createElement('a');skip.className='a11y-skip';skip.textContent='Skip to main content';document.body.prepend(skip);}skip.href='#'+main.id;skip.addEventListener('click',event=>{event.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({block:'start'});});}
  enhance();let pending=false;const observer=new MutationObserver(records=>{if(pending||!records.some(r=>r.addedNodes.length))return;pending=true;requestAnimationFrame(()=>{pending=false;enhance();});});observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('invalid',event=>{const field=event.target;if(!field.matches('input,select,textarea'))return;window.blacksmithFieldError(field,field.validationMessage||'Check this field.');},true);
  document.addEventListener('input',event=>{if(event.target.matches('input,select,textarea'))window.blacksmithClearFieldError(event.target);});
  document.addEventListener('change',event=>{if(event.target.matches('input,select,textarea'))window.blacksmithClearFieldError(event.target);});
  document.addEventListener('click',event=>{const action=event.target.closest('.order-summary-menu button');if(!action)return;const name=action.textContent.trim();action.setAttribute('aria-label',name+' for '+(action.closest('.ready-order-card')?.querySelector('h3')?.textContent||'this order'));});
 }
 window.blacksmithFieldError=(field,message)=>{if(typeof field==='string')field=document.getElementById(field);if(!field)return;let id=field.dataset.a11yError;if(!id){id='field-error-'+(field.id||crypto.randomUUID());field.dataset.a11yError=id;}let error=document.getElementById(id);if(!error){error=document.createElement('p');error.id=id;error.className='a11y-field-error';error.setAttribute('aria-live','polite');const wrapper=field.closest('.password-field');(wrapper||field).after(error);}error.textContent=message;field.setAttribute('aria-invalid','true');const refs=new Set((field.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean));refs.add(id);field.setAttribute('aria-describedby',[...refs].join(' '));};
 window.blacksmithClearFieldError=field=>{const id=field.dataset.a11yError;if(!id)return;document.getElementById(id)?.remove();field.removeAttribute('aria-invalid');const refs=(field.getAttribute('aria-describedby')||'').split(/\s+/).filter(x=>x&&x!==id);if(refs.length)field.setAttribute('aria-describedby',refs.join(' '));else field.removeAttribute('aria-describedby');};
 window.blacksmithRestoreVisibleFocus=(trigger,orderId)=>{const card=[...document.querySelectorAll('.ready-order-card')].find(c=>c.dataset.orderId===orderId);const target=[trigger,card?.querySelector('.order-summary-more>summary'),card?.querySelector('.waiting-order-toggle'),document.getElementById('orderSearch')].find(visible);target?.focus({preventScroll:true});};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
