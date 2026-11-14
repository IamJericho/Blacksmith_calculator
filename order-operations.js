(function(){
  const itemKey='blacksmith-internal-items-v1',orderKey='blacksmith-ready-orders-v1';
  const read=(key,fallback)=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
  window.blacksmithOrderHistory=function(){return [...(read(itemKey,{}).orderHistory||[])].sort((a,b)=>{const date=o=>{const value=Date.parse(o.importedOrderAt||o.completedAt||'');return Number.isNaN(value)?-Infinity:value;};const first=date(a),second=date(b);return first===second?0:second-first;});};
  window.blacksmithArchiveOrder=function(order){const data=read(itemKey,{}),history=data.orderHistory||[];const archived={...order,completedAt:new Date().toISOString(),room:'',vault:'',previousRoom:order.room||order.previousRoom||'',previousVault:order.vault||order.previousVault||''};data.orderHistory=[archived,...history.filter(o=>o.id!==order.id)];localStorage.setItem(itemKey,JSON.stringify(data));return archived;};
  window.blacksmithRestoreOrder = function(id, slots, external){
    const data = read(itemKey, {});
    const history = data.orderHistory || [];
    const order = history.find(entry => entry.id === id);
    if (!order) return null;
    const previousActive = localStorage.getItem(orderKey);
    const active = JSON.parse(previousActive || '[]');
    if (active.some(entry => entry.id === id)) throw Error('This order is already active.');

    const room = order.delivery ? '' : order.previousRoom || order.room || '';
    const vault = order.delivery ? '' : order.previousVault || order.vault || '';
    const hasLocation = Boolean(room && vault);
    const restored = {
      ...order,
      fulfilled: false,
      fulfilledAt: null,
      room: hasLocation ? room : '',
      vault: hasLocation ? vault : '',
      manualLocation: hasLocation && order.manualLocation === true,
      pendingRoom: !order.delivery && !hasLocation
    };
    delete restored.completedAt;
    if (order.paymentBeforeCompletion) {
      restored.paid = order.paymentBeforeCompletion.paid;
      restored.paidAt = order.paymentBeforeCompletion.paidAt;
      delete restored.paymentBeforeCompletion;
    }
    if (hasLocation) {
      if (!slots.some(slot => slot.room === room && slot.vault === vault)) {
        throw Error('Bring the original pickup location online before reopening this order.');
      }
      if (external.has(room + '|' + vault)) {
        throw Error('Clear the original pickup location under Locations occupied outside Orders before reopening.');
      }
      for (const other of active) {
        if (other.delivery || other.room !== room || other.vault !== vault) continue;
        if (window.blacksmithHasPickupPrepayment(other)) {
          throw Error('The original pickup location is reserved for a prepayment order. Move that reservation before reopening.');
        }
        other.room = '';
        other.vault = '';
        other.pendingRoom = true;
        other.manualLocation = false;
      }
    }
    active.push(restored);
    localStorage.setItem(orderKey, JSON.stringify(active));
    data.orderHistory = history.filter(entry => entry.id !== id);
    try {
      localStorage.setItem(itemKey, JSON.stringify(data));
    } catch (error) {
      if (previousActive === null) localStorage.removeItem(orderKey);
      else localStorage.setItem(orderKey, previousActive);
      throw error;
    }
    return restored;
  };
  window.blacksmithOrderMaterials=function(order){
    const selects=[...document.querySelectorAll('select[data-group]')],norm=v=>v.toLowerCase().replace(/[–—|:_]/g,' ').replace(/\s+/g,' ').trim();
    const entries=selects.map((s,key)=>({key,group:s.dataset.group,aliases:[norm(s.dataset.name),norm(s.dataset.name.split('|').pop())]}));const parsed=window.parsePastedBlacksmithOrders(order.items,entries);if(parsed.errors.length||!parsed.totals.size)throw Error('Cannot read the materials for this order.');const materials={},eligible={},missing=[];
    for(const [key,quantity]of parsed.totals){const s=selects[key],[category,name]=s.dataset.name.split('|'),g=s.dataset.group;const saddle=['regular','platform','teksaddles'].includes(g),collection=g.startsWith('cursed')?BLACKSMITH.cursed:BLACKSMITH.equipment,item=saddle?BLACKSMITH.saddles[g][category]:collection[g.endsWith('2')?'tier2':'tier1'][category][name];if(!item.materials||!Object.keys(item.materials).length){missing.push(name||category);continue;}for(const [code,qty]of Object.entries(item.materials)){if(['D','J','Q'].includes(code))continue;materials[code]=(materials[code]||0)+qty*quantity;if(!saddle&&['weapons','tools','armor','tek'].includes(category))eligible[code]=(eligible[code]||0)+qty*quantity;}}
    if(order.reinforced)for(const [code,qty]of Object.entries(eligible))materials[code]+=Math.ceil(qty*.285);return {materials,missing};
  };
  window.blacksmithMaterialAvailability=function(materials,currentId){const stock=read('blacksmith-material-inventory-v1',{}),rules=read('blacksmith-restock-total-minimums-v2',{}),active=read(orderKey,[]),reserved={};
    // Processing jobs reserve stock in acceptance order, for planning only.
    for(const order of active){if(order.id===currentId)break;if(order.workStatus!=='processing')continue;try{for(const [code,qty]of Object.entries(window.blacksmithOrderMaterials(order).materials))reserved[code]=(reserved[code]||0)+qty;}catch(_){}}
    return Object.entries(materials).map(([code,needed])=>{const s=stock[code],capacity=rules[code]?.capacity||0,partial=typeof s==='number'?s:s?.partial||0,dedis=typeof s==='object'?s?.dedis||0:0;const known=s!==undefined&&(!dedis||capacity>0);const total=known?partial+dedis*capacity:null,held=reserved[code]||0,available=known?Math.max(0,total-held):null;return {code,needed,total,reserved:held,available,short:known?Math.max(0,needed-available):null};});
  };
  window.blacksmithAvailabilityTable=function(materials,currentId){const wrap=document.createElement('div');wrap.className='availability-table';const table=document.createElement('table');table.className='table';const head=document.createElement('thead'),tr=document.createElement('tr');for(const text of ['Material','Needed','Available*','Short']){const th=document.createElement('th');th.textContent=text;tr.append(th);}head.append(tr);table.append(head);const body=document.createElement('tbody');for(const row of window.blacksmithMaterialAvailability(materials,currentId)){const tr=document.createElement('tr');if(row.short>0)tr.className='material-short';for(const value of [BLACKSMITH.materialsKey[row.code]||row.code,row.needed,row.available===null?'Unknown':row.available,row.short===null?'Unknown':row.short]){const td=document.createElement('td');td.textContent=typeof value==='number'?value.toLocaleString():value;tr.append(td);}body.append(tr);}table.append(body);wrap.append(table);const note=document.createElement('p');note.className='note';note.textContent='* Available excludes materials reserved by earlier processing orders. Planning only: inventory is not deducted. Unknown means stock or units per dedi need to be entered.';wrap.append(note);return wrap;};
})();
