(()=>{
 const menus=()=>document.querySelectorAll('details.order-summary-more');
 document.addEventListener('pointerdown',event=>{for(const menu of menus())if(menu.open&&!menu.contains(event.target))menu.open=false;});
 document.addEventListener('click',event=>{const action=event.target.closest('details.order-summary-more button');if(action)action.closest('details.order-summary-more').open=false;});
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;for(const menu of menus())if(menu.open){menu.open=false;if(menu.contains(document.activeElement))menu.querySelector('summary')?.focus({preventScroll:true});event.preventDefault();}});
 document.addEventListener('focusin',event=>{for(const menu of menus())if(menu.open&&!menu.contains(event.target))menu.open=false;});
})();
