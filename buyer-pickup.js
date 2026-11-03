(()=>{
 const id=value=>String(value||'').match(/<@!?(\d+)>/)?.[1]||null;
 const normalize=value=>String(value||'').normalize('NFKC').trim().toLowerCase().replace(/^@/,'').replace(/\s+/g,' ');
 const savedName=o=>{const value=normalize(o.orderName);return value&&!['your name','unassigned order','unknown'].includes(value)&&!id(value)?value:'';};
 function returning(order,history){const currentId=id(order.name),aliases=[savedName(order),!currentId?normalize(order.name):''].filter(Boolean);return history.some(previous=>{if(previous.id===order.id)return false;const previousId=id(previous.name);if(currentId&&previousId)return currentId===previousId;const oldAliases=[savedName(previous),!previousId?normalize(previous.name):''].filter(Boolean);return aliases.some(value=>oldAliases.includes(value));});}
 function apply(order,history){if(order.delivery||order.workStatus!=='complete')return;const known=returning(order,history);if(!known||!savedName(order))order.faceToFace=true;}
 window.BLACKSMITH_BUYER_PICKUP={returning,apply,missingName:order=>!order.delivery&&order.workStatus==='complete'&&!savedName(order)};
})();
