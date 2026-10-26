(()=>{
  const B=window.BLACKSMITH;if(!B)return;
  for(const select of document.querySelectorAll('select[data-group]')){
    const group=select.dataset.group,[category,name]=select.dataset.name.split('|');
    const collection=group.startsWith('cursed')?B.cursed:B.equipment;
    const item=['regular','platform','teksaddles'].includes(group)?B.saddles[group]?.[category]:collection?.[group.endsWith('2')?'tier2':'tier1']?.[category]?.[name];
    const cell=select.closest('tr')?.querySelector('td');if(!cell||!item)continue;
    const details=document.createElement('details');details.className='shop-item-recipe';
    const summary=document.createElement('summary');summary.textContent='Recipe';summary.setAttribute('aria-label','Recipe for '+(name||category));details.append(summary);
    const materials=Object.entries(item.materials||{}).filter(([code])=>!['D','J','Q'].includes(code));
    if(materials.length){const list=document.createElement('ul');for(const [code,quantity]of materials){const li=document.createElement('li');li.textContent=(B.materialsKey[code]||code)+': '+quantity.toLocaleString();list.append(li);}details.append(list);}else{const p=document.createElement('p');p.textContent='No material recipe available.';details.append(p);}
    cell.append(details);
  }
})();
