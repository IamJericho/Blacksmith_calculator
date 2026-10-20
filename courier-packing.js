(()=>{
  const normalize=value=>value.toLowerCase().replace(/[–—|:_]/g,' ').replace(/\s+/g,' ').trim();
  function parseOrders(text,items){
    const cleaned=text.replace(/\*\*|`/g,'');
    const orders=[...cleaned.matchAll(/\bOrder\s*:\s*([\s\S]*?)(?=\b(?:Payment|Total Items|Trader|Name|Reinforc(?:ed?|ement)(?:\s+Gear)?|Delivery)\s*(?::|(?=\s))|$)/gi)];
    const bodies=orders.length?orders.map(match=>match[1]):[cleaned];
    const totals=new Map(),errors=[];
    const headings=/^(Saddles?|Equipment|Tier\s*1|Tier\s*2|Curs(?:e|ed)\s*(?:Tier\s*)?1|Curs(?:e|ed)\s*(?:Tier\s*)?2)\s*:?\s*/i;
    for(const body of bodies){
      let group=null;
      const chunks=body.replace(/\b(Saddles?|Equipment|Tier\s*[12]|Cursed\s*Tier\s*[12])\s*:/gi,'\n$1:\n').split(/\n|,(?!\d{3}\b)|;/);
      for(let chunk of chunks){
        chunk=chunk.trim();if(!chunk)continue;
        if(/^(?:Name|Trader|Payment|Total Items|Reinforc(?:ed?|ement)(?:\s+Gear)?|Delivery)\b/i.test(chunk))continue;
        chunk=chunk.replace(/^(\d[\d,]*)\s+saddles?\s+(?:\d+(?:\.\d+)?\s+)?(.+)$/i,(_,quantity,name)=>{group='saddle';return quantity+' '+name;});
        const heading=chunk.match(headings);
        if(heading){const label=normalize(heading[1]);group=label.startsWith('saddle')?'saddle':label==='equipment'||label==='tier 1'?'tier1':label==='tier 2'?'tier2':/^curs(?:e|ed) (?:tier )?1$/.test(label)?'cursed1':'cursed2';chunk=chunk.slice(heading[0].length).trim();}
        if(!chunk)continue;
        const entries=[...chunk.matchAll(/(?:^|\s)(\d[\d,]*)\s+(.+?)(?=\s+\d[\d,]*\s+|$)/g)];
        if(!entries.length){errors.push(chunk);continue;}
        for(const entry of entries){
          const quantity=Number(entry[1].replace(/,/g,'')),name=normalize(entry[2]);
          let matches=items.filter(item=>(!group||(group==='saddle'?['regular','platform','teksaddles'].includes(item.group):item.group===group))&&item.aliases.some(alias=>alias===name||({ 'cross bows':'cross bow','crossbow':'cross bow','crossbows':'cross bow','longneck':'longneck rifle','pump':'pump shotgun' }[name]===alias)));
          if(matches.length!==1||!Number.isSafeInteger(quantity)||quantity<1){errors.push(entry[0].trim());continue;}
          const item=matches[0];totals.set(item.key,(totals.get(item.key)||0)+quantity);
        }
      }
    }
    return {totals,errors};
  }

window.appendCourierPacking=function(parent,order){
 const entries=[],B=window.BLACKSMITH;
 for(const [group,items]of Object.entries(B?.saddles||{}))for(const name of Object.keys(items))entries.push({key:group+'|'+name,group,aliases:[normalize(name)],label:name});
 for(const [family,tiers]of [['tier',B?.equipment],['cursed',B?.cursed]])for(const [tier,categories]of Object.entries(tiers||{}))for(const [category,items]of Object.entries(categories))for(const name of Object.keys(items)){const group=family+tier.slice(-1);entries.push({key:group+'|'+category+'|'+name,group,aliases:[normalize(category+'|'+name),normalize(name)],label:category+' – '+name});}
 const parsed=parseOrders(order.items||'',entries);const details=document.createElement('details');details.className='courier-packing';const summary=document.createElement('summary');summary.textContent='Packing checklist';details.append(summary);parent.append(details);
 if(parsed.errors.length||!parsed.totals.size){const note=document.createElement('p');note.textContent='Packing checklist unavailable. Refer to the ordered items.';details.append(note);return;}
 let total=0,packed=0;const list=document.createElement('ul');list.className='courier-packing-list';
 for(const [key,quantity]of parsed.totals){const entry=entries.find(e=>e.key===key),value=order.packedItems?.[key],count=Number.isSafeInteger(value)?Math.max(0,Math.min(quantity,value)):0;total+=quantity;packed+=count;const row=document.createElement('li'),name=document.createElement('span'),status=document.createElement('strong');name.textContent=quantity+' '+entry.label;status.textContent=count===quantity?'✓ Packed':count+' / '+quantity+' packed';row.classList.toggle('is-packed',count===quantity);row.append(name,status);list.append(row);}
 const progress=document.createElement('p');progress.textContent=packed+' / '+total+' items packed';details.append(progress,list);
};})();
