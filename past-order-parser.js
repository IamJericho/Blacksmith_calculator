(()=>{
 window.parseBlacksmithPastOrders=text=>{
  const clean=String(text).replace(/\*\*|`/g,'').replace(/\\([_\[\]()*~])/g,'$1').replace(/\r\n?/g,'\n');
  const blocks=clean.split(/(?=\bName\s*:)/i).filter(s=>/^\s*Name\s*:/i.test(s));
  if(!blocks.length)throw Error('Include a Name: line for each order.');
  return blocks.map((body,index)=>{
   const fail=message=>{throw Error('Order '+(index+1)+': '+message);};
   const name=body.match(/^\s*Name\s*:\s*([\s\S]*?)(?=\bOrder\s*:|$)/i)?.[1].trim();
   const raw=body.match(/\bOrder\s*:\s*([\s\S]*?)(?=\b(?:Payment|Total Items|Trader|Name|Reinforced|Delivery|Face[- ]to[- ]face)\s*:|$)/i)?.[1].trim();
   if(!name||!raw)fail('Include the customer and ordered items.');
   const items=raw.replace(/\b(Saddles?|Equipment|Cursed\s*(?:Tier\s*)?[12]|Tier\s*[12])\s*:\s*/gi,'$1\n').replace(/\s+(?=\d+\s+[^\d\s])/g,'\n').split('\n').map(s=>s.trim()).filter(Boolean);
   let count=0;
   for(const line of items){if(/^(?:Saddles?|Equipment|Tier\s*[12]|Cursed\s*(?:Tier\s*)?[12])\s*:?$/i.test(line))continue;const match=line.match(/^(\d+)\s+\S/);if(!match)fail('Each item needs a quantity, for example 20 Rock Drake Saddles.');const q=Number(match[1]);if(!Number.isSafeInteger(q)||q<1)fail('Use positive whole item quantities.');count+=q;}
   if(!Number.isSafeInteger(count)||count<1)fail('No valid item quantities found.');
   const payment=body.match(/\bPayment\s*:\s*([^\n]*?)(?=\b(?:Total Items|Trader|Name|Delivery|Reinforced)\s*:|$)/im)?.[1].trim()||'';
   if(!payment)fail('Include the original Payment: amount. Prices will not be recalculated.');
   return {name,body,items:items.join('\n'),count,payment,delivery:/\bDelivery\s*:\s*Yes\b/i.test(body),faceToFace:/\bFace[- ]to[- ]face\s*:\s*Yes\b/i.test(body),reinforced:/\bReinforced\s*:\s*Yes\b/i.test(body)};
  });
 };
})();
