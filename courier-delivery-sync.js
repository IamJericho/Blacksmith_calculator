(function(){
  // Merge only authenticated courier delivery stamps; unrelated remote changes still require comparison.
  window.mergeBlacksmithCourierDeliveries=function(base,cloud,local){
    if(!base||!cloud||!local)return null;
    const key='blacksmith-ready-orders-v1',before=base[key]||[],after=cloud[key]||[];
    if(!Array.isArray(before)||!Array.isArray(after)||before.length!==after.length)return null;
    const canonical=value=>Array.isArray(value)?'['+value.map(canonical).join(',')+']':value&&typeof value==='object'?'{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}':JSON.stringify(value);
    const cleaned=structuredClone(cloud),changed=[];
    for(let i=0;i<after.length;i++){
      const a=before[i],b=after[i];if(a.id!==b.id)return null;if(canonical(a)===canonical(b))continue;
      if(b.delivery!==true||b.fulfilled!==true||!b.courierDeliveredAt||b.courierDeliveredAt===a.courierDeliveredAt||isNaN(Date.parse(b.courierDeliveredAt)))return null;
      for(const field of ['fulfilled','fulfilledAt','courierDeliveredAt']){if(Object.hasOwn(a,field))cleaned[key][i][field]=a[field];else delete cleaned[key][i][field];}
      changed.push(b);
    }
    if(!changed.length||canonical(cleaned)!==canonical(base))return null;
    const result=structuredClone(local);
    for(const incoming of changed){const order=(result[key]||[]).find(o=>o.id===incoming.id);if(!order)continue;if(order.delivery!==true)return null;const original=before.find(o=>o.id===order.id);if(order.fulfilled!==original.fulfilled&&order.fulfilled!==true)return null;order.fulfilled=true;order.fulfilledAt=incoming.fulfilledAt;order.courierDeliveredAt=incoming.courierDeliveredAt;}
    return result;
  };
})();
