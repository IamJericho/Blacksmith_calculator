(()=>{
 const menus=()=>document.querySelectorAll('details.order-summary-more'),timers=new WeakMap(),dismissed=new WeakSet();let keyboard=false,skipFocus=null;
 function cancel(menu){clearTimeout(timers.get(menu));timers.delete(menu);}
 function open(menu){if(dismissed.has(menu))return;cancel(menu);for(const other of menus())if(other!==menu){cancel(other);other.open=false;}menu.open=true;}
 function leave(menu){cancel(menu);timers.set(menu,setTimeout(()=>{if(!menu.contains(document.activeElement)&&!menu.matches(':hover'))menu.open=false;},180));}
 document.addEventListener('pointerdown',event=>{keyboard=false;for(const menu of menus())if(menu.open&&!menu.contains(event.target)){cancel(menu);menu.open=false;}});
 document.addEventListener('pointerover',event=>{if(event.pointerType!=='mouse'||!window.matchMedia('(hover: hover)').matches)return;const menu=event.target.closest('details.order-summary-more');if(menu&&!menu.contains(event.relatedTarget))open(menu);});
 document.addEventListener('pointerout',event=>{if(event.pointerType!=='mouse')return;const menu=event.target.closest('details.order-summary-more');if(menu&&!menu.contains(event.relatedTarget)){dismissed.delete(menu);leave(menu);}});
 document.addEventListener('click',event=>{const summary=event.target.closest('details.order-summary-more>summary');if(summary)dismissed.delete(summary.parentElement);const action=event.target.closest('details.order-summary-more button');if(action){const menu=action.closest('details.order-summary-more');cancel(menu);menu.open=false;}});
 document.addEventListener('keydown',event=>{if(event.key==='Tab')keyboard=true;if(event.key!=='Escape')return;for(const menu of menus())if(menu.open){cancel(menu);dismissed.add(menu);menu.open=false;if(menu.contains(document.activeElement)){skipFocus=menu;menu.querySelector('summary')?.focus({preventScroll:true});skipFocus=null;}event.preventDefault();}});
 document.addEventListener('focusin',event=>{const current=event.target.closest('details.order-summary-more');for(const menu of menus())if(menu!==current&&menu.open){cancel(menu);menu.open=false;}if(current){cancel(current);if(!current.contains(event.relatedTarget)&&current!==skipFocus)dismissed.delete(current);if(keyboard&&current!==skipFocus)open(current);}});
 document.addEventListener('focusout',event=>{const menu=event.target.closest('details.order-summary-more');if(menu&&!menu.contains(event.relatedTarget)){dismissed.delete(menu);leave(menu);}});
})();
