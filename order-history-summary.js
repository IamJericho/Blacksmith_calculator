(()=>{
 window.blacksmithHistorySummary=order=>{
  const lines=[],parts=[];
  if(typeof order.payment==='string'&&order.payment.trim())parts.push((order.paid===true?'Paid: ':'Payment due: ')+order.payment);
  if(!order.historicalImport&&order.workStatus==='complete'&&Number.isSafeInteger(order.count)&&order.count>0)parts.push(order.count+' / '+order.count+' crafted');
  if(parts.length)lines.push(parts.join(' · '));
  const room=order.previousRoom||order.room,vault=order.previousVault||order.vault;
  if(!order.delivery&&room&&vault){const location='Room: '+room+' · Vault: '+(String(vault).startsWith(room)?vault:room+vault);lines.push(location+(order.pin?' · '+(order.faceToFace?'Dedi PIN: ':'PIN: ')+order.pin:''));}
  return lines;
 };
})();
