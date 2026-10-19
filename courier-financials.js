(function(){
  window.blacksmithCourierAmounts=function(order){
    const quote=typeof order.payment==='string'?order.payment.trim():'';
    const match=quote.match(/^([\d,]+)(?:\.0+)?\s*(?:Tek(?:\s+Ceilings?)?|TC)$/i);
    const total=match?Number(match[1].replace(/,/g,'')):NaN;
    let fee=null,source='missing';
    if(Number.isSafeInteger(order.courierPayout)&&order.courierPayout>=0){fee=order.courierPayout;source='recorded';}
    else if(order.delivery&&Number.isSafeInteger(total)&&total>=100){
      // Recover the standard included fee from the locked total, never current catalog prices.
      const candidate=total<=500?total-100:Math.floor(total/1.25);
      for(let base=Math.max(0,candidate-2);base<=candidate+2;base++){const delivery=Math.max(100,Math.ceil(base*.25));if(base+delivery===total){fee=delivery;source='quote-estimate';break;}}
    }
    return {fee,source,quoteText:quote||'Not recorded — confirm with the owner',collectText:order.paid?'0 — payment already received':quote||'Not recorded — confirm with the owner'};
  };
})();
