(()=>{
 const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/\*|`/g,'').replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
 const customer=o=>normalize(o.name).replace(/^@/,'').replace(/^<@!?(\d+)>$/,'$1');
 const itemKey=o=>String(o.items||'').split('\n').map(normalize).filter(Boolean).sort().join('\n');
 const stamp=o=>{const value=o.importedOrderAt||o.createdAt||o.completedAt;if(!value)return null;const time=Date.parse(value);return Number.isNaN(time)?null:time;};
 const possible=(a,b)=>customer(a)===customer(b)&&itemKey(a)===itemKey(b);
 const exact=(a,b)=>stamp(a)!==null&&stamp(a)===stamp(b)&&possible(a,b);
 window.blacksmithHistoryDuplicates={possible,exact,groups(history){const groups=[];for(const order of history){const group=groups.find(g=>exact(g[0],order));if(group)group.push(order);else groups.push([order]);}return groups.filter(g=>g.length>1);},filterIncoming(incoming,history){const kept=[],skipped=[];for(const order of incoming){if([...history,...kept].some(saved=>exact(saved,order)))skipped.push(order);else kept.push(order);}return {kept,skipped};}};
})();
