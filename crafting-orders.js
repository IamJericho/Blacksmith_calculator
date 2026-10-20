(function(){
  const selects=[...document.querySelectorAll('select[data-group]')],normalize=value=>value.toLowerCase().replace(/[–—|:_]/g,' ').replace(/\s+/g,' ').trim();
  const entries=selects.map((select,key)=>({key,group:select.dataset.group,aliases:[normalize(select.dataset.name),normalize(select.dataset.name.split('|').pop())]}));
  const prefsKey='blacksmith-internal-items-v1',ordersKey='blacksmith-ready-orders-v1';
  const summary=document.getElementById('orderSummaryInternal'),materialsOutput=document.getElementById('materialSummary');
  const note=document.createElement('p');note.className='note';note.id='craftingOrderScope';summary.before(note);
  window.refreshBlacksmithCraftingOrders=function(){
    try{
      const orders=JSON.parse(localStorage.getItem(ordersKey)||'[]');if(!Array.isArray(orders))throw Error('Saved orders could not be read.');
      const active=orders.filter(order=>!order.fulfilled&&(order.workStatus==='processing'||((!order.workStatus||order.workStatus==='new')&&!order.craftingCompletedAt&&!order.processingStartedAt)));
      const totals=new Map(),materials={},errors=[];
      for(const order of active){
        const parsed=window.parsePastedBlacksmithOrders(order.items||'',entries);if(parsed.errors.length||!parsed.totals.size){errors.push(order.name||'Unnamed order');continue;}
        const eligible={};
        for(const [key,quantity]of parsed.totals){
          if(!Number.isSafeInteger(quantity)||quantity<1)throw Error('Invalid order quantity.');totals.set(key,(totals.get(key)||0)+quantity);const select=selects[key],group=select.dataset.group,[category,name]=select.dataset.name.split('|');
          const item=['regular','platform','teksaddles'].includes(group)?BLACKSMITH.saddles[group]?.[category]:(group.startsWith('cursed')?BLACKSMITH.cursed:BLACKSMITH.equipment)?.[group.endsWith('2')?'tier2':'tier1']?.[category]?.[name];
          if(!item?.materials){errors.push(order.name||'Unnamed order');continue;}
          for(const [code,amount]of Object.entries(item.materials)){if(['D','J','Q'].includes(code))continue;materials[code]=(materials[code]||0)+amount*quantity;if(name&&['weapons','tools','armor','tek'].includes(category))eligible[code]=(eligible[code]||0)+amount*quantity;}
        }
        if(order.reinforced)for(const [code,amount]of Object.entries(eligible))materials[code]=(materials[code]||0)+Math.ceil(amount*.285);
      }
      if(errors.length)throw Error('Check items in: '+[...new Set(errors)].join(', ')+'. No partial totals were saved.');
      const count=[...totals.values()].reduce((a,b)=>a+b,0),list=window.formatBlacksmithItemList([...totals].map(([key,quantity])=>({select:selects[key],quantity})));
      summary.textContent=(list?list+'\n\n':'')+'Total Items: '+count;
      materialsOutput.textContent=Object.entries(materials).sort(([a],[b])=>a.localeCompare(b)).map(([code,amount])=>(BLACKSMITH.materialsKey[code]||code)+': '+amount.toLocaleString()).join('\n')||'No materials needed.';
      note.textContent=active.length+' active crafting order'+(active.length===1?'':'s')+' · Not Processing and Processing only. Complete orders and History are excluded.';
      const items=Object.fromEntries([...totals].map(([key,quantity])=>[selects[key].dataset.group+'|'+selects[key].dataset.name,quantity]));
      const prefs=JSON.parse(localStorage.getItem(prefsKey)||'{}');if(JSON.stringify(prefs.items||{})!==JSON.stringify(items)||prefs.craftingOrdersProjectionVersion!==1){if(prefs.craftingOrdersProjectionVersion!==1&&Object.keys(prefs.items||{}).length)prefs.previousCraftingItems={...prefs.items};prefs.items=items;prefs.craftingOrdersProjectionVersion=1;localStorage.setItem(prefsKey,JSON.stringify(prefs));}
    }catch(error){note.textContent='Crafting totals could not be updated: '+error.message;summary.textContent='Crafting totals unavailable. Check the order items above.';materialsOutput.textContent='Material totals unavailable.';}
  };
  window.addEventListener('blacksmith-order-updated',window.refreshBlacksmithCraftingOrders);
  window.addEventListener('storage',event=>{if(event.key===ordersKey)window.refreshBlacksmithCraftingOrders();});
  window.refreshBlacksmithCraftingOrders();
})();
