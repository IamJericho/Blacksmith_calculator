(()=>{
 window.parseBlacksmithPastOrders=text=>{
  const clean=String(text).replace(/\[Role icon[^\]]*\]\([^)]*\)/gi,'').replace(/^\s*(?:\d+\.|-)\s*$/gm,'').replace(/\*|`/g,'').replace(/\\([_\[\]()*~])/g,'$1').replace(/\r\n?/g,'\n').replace(/^\s*(@[^\n]+)\n(?=\s*Order\s*[-:])/gim,'Name: $1\n').replace(/\b(Payment)\s+(?=\d)/gi,'$1: ').replace(/\bDeliver\s*:/gi,'Delivery:').replace(/^([ \t]*Name)[ \t]+(?=@)/gim,'$1: ').replace(/^([ \t]*)Order[ \t]+(?=Saddle)/gim,'$1Order: ').replace(/\b(Name|Order|Payment|Trader|Trade)\s*[-:;]\s*/gi,'$1: ');
  const starts=[...clean.matchAll(/\bName\s*:/gi)];
  const dates=starts.map((match,index)=>{const prefix=clean.slice(index?starts[index-1].index:0,match.index),all=[...prefix.matchAll(/\b(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4}),?\s+(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi)],m=all[all.length-1];if(!m)return null;const month=+m[1],day=+m[2],year=+m[3]+(m[3].length===2?2000:0),hour=+m[4],minute=+m[5];const check=new Date(Date.UTC(year,month-1,day));if(month<1||month>12||check.getUTCDate()!==day||hour<1||hour>12||minute>59)return null;const pad=n=>String(n).padStart(2,'0');return year+'-'+pad(month)+'-'+pad(day)+'T'+pad(hour%12+(m[6].toUpperCase()==='PM'?12:0))+':'+pad(minute)+':00';});
  const blocks=clean.split(/(?=\bName\s*:)/i).filter(s=>/^\s*Name\s*:/i.test(s));
  if(!blocks.length)throw Error('Include a Name: line for each order.');
  return blocks.map((body,index)=>{
   const fail=message=>{throw Error('Order '+(index+1)+': '+message);};
   const normalizedBody=body.replace(/^(\s*Name\s*:[^\n]+\n)(?=\s*Saddles?\s*:)/i,'$1Order: ');body=normalizedBody;
   const name=body.match(/^\s*Name\s*:\s*([\s\S]*?)(?=\bOrder\s*:|$)/i)?.[1].trim();
   let raw=body.match(/\bOrder\s*:\s*([\s\S]*?)(?=\b(?:Payment|Total Items|Trader|Trade|Name|Reinforced|Delivery|Face[- ]to[- ]face)\s*:|$)/i)?.[1].trim();
   if(!raw)raw=body.replace(/^\s*Name\s*:[^\n]*\n?/i,'').split(/\b(?:Payment|Total Items?|Trader|Delivery|Reinforced)\s*:/i)[0].trim()||'Items not recorded';if((body.match(/\bOrder\s*:/gi)||[]).length!==1)fail('Another order is missing its customer label. Add Name: before that customer so both orders can be imported separately.');
   let quantityUnconfirmed=false;let formatted=raw.replace(/^(\d+)\s*\n\s*Saddles?\s*:\s*/i,'$1 ').split('\n').map(line=>{const tail=line.trim().match(/^(.+?)\s*x\s*(\d+)\s*$/i);if(!tail)return line;if(/^\d+\s/.test(tail[1])){quantityUnconfirmed=true;return line;}return tail[2]+' '+tail[1].trim();}).join('\n').replace(/\bx\s*(\d+)/gi,'$1 ').replace(/\((\d+)\)\s*/g,'$1 ').replace(/\s*\/\s*(?=\d+\s)/g,'\n').replace(/^(saddles?|armor|weapons|tools)\s*:?\s*(?=\d+\s)/i,'').replace(/^(\d+)\s+each\s+/i,(_,q)=>q+' each ').replace(/\b(\d+)\s*x\s*/gi,'$1 ').replace(/\s*\+\s*(?=\d+\s)/g,'\n').replace(/,\s*(?=\d+\s)/g,'\n');
   if(/^\d+ each /i.test(formatted)){const m=formatted.match(/^(\d+) each (.*)$/is),tier=m[2].match(/^Tier\s*([12])\s*/i),list=m[2].replace(/^Tier\s*[12]\s*/i,'').split(/,\s*(?:and\s+)?|\s+and\s+/i).map(s=>s.trim()).filter(Boolean);const scuba=/^scuba\s/i.test(list[0]);formatted=(tier?'Cursed Tier '+tier[1]+'\n':'')+list.map(item=>m[1]+' '+(scuba&&!/^scuba\s/i.test(item)?'Scuba ':'')+item).join('\n');}
   const groupedSets=/\d+\s*\+\s*Tier/i.test(formatted);if(groupedSets){
    formatted=formatted.replace(/\s+(?=\d+\s*\+\s*Tier)/gi,'\n').split(/\n/).map(group=>{const m=group.trim().match(/^(\d+)\s*\+\s*Tier\s*([12])\s*\+\s*(hazmat|ghillie)\s+(.+?)\.?$/i);if(!m)fail('This grouped equipment format needs one quantity per item.');const pieces=m[4].split(/,\s*(?:and\s+)?|\s+and\s+/i).map(s=>s.trim().replace(/\.$/,'')).filter(Boolean);if(pieces.some(piece=>!/^(?:boots|chest|gloves|helm(?:et)?|legs|leggings)$/i.test(piece)))fail('Unrecognized equipment piece in grouped order.');return m[1]+' Tier '+m[2]+' '+m[3]+' sets ('+pieces.join(', ')+')';}).join('\n');
   }
   const items=(groupedSets?formatted:formatted.replace(/\b(Saddles?|Equipment|Cursed\s*(?:Tier\s*)?[12]|Tier\s*[12])\s*:\s*/gi,'$1\n').replace(/^(Tier\s*[12])\s+(?=\d+\s)/i,'$1\n').replace(/(?<!Tier)\s+(?=\d+\s+(?!each\b)[^\d\s])/gi,'\n')).split('\n').map(s=>s.trim()).filter(Boolean);
   let count=0;
   for(const line of items){if(/^(?:Saddles?|Equipment|Tier\s*[12]|Cursed\s*(?:Tier\s*)?[12])\s*:?$/i.test(line))continue;const match=line.match(/^(\d+)\s+\S/);if(!match){quantityUnconfirmed=true;continue;}const q=Number(match[1]);if(!Number.isSafeInteger(q)||q<1){quantityUnconfirmed=true;continue;}const set=line.match(/^\d+ Tier [12] (?:hazmat|ghillie) sets \(([^)]+)\)$/i);count+=q*(set?set[1].split(',').length:1);}
   if(!Number.isSafeInteger(count)||count<1)quantityUnconfirmed=true;if(quantityUnconfirmed)count=null;
   const paymentBody=body.replace(/(\bPayment\s*:\s*)(Tek\s+ceilings?)\s+(\d[\d,.]*\s*k?)/gi,'$1$3 Tek Ceilings');const paymentMatch=paymentBody.match(/\bPayment\s*:\s*([\d,.]+)\s*(k)?\s*(?:Tek(?:\s+ceilings?)?|ceilings?\s+tek)/i);
   const amount=paymentMatch?Number(paymentMatch[1].replaceAll(',',''))*(paymentMatch[2]?1000:1):null;if(amount!==null&&(!Number.isSafeInteger(amount)||amount<0))fail('Payment must be a whole Tek amount.');const payment=amount===null?'Not recorded':amount+' Tek Ceilings';
   return {name,quantityUnconfirmed,importedOrderAt:dates[index],body:'Name: '+name+'\nOrder:\n'+raw+'\nPayment: '+payment,items:quantityUnconfirmed?raw:items.join('\n'),count,payment,delivery:/\bDelivery\s*:\s*Yes\b/i.test(body),faceToFace:/\bFace[- ]to[- ]face\s*:\s*Yes\b/i.test(body),reinforced:/\bReinforced\s*:\s*Yes\b/i.test(body)};
  });
 };
})();
