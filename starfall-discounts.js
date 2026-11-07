(()=>{
 const rates=Object.freeze({Staff:20,'Young Guard':10,Supporter:5});
 function parse(text){const values=[...String(text||'').matchAll(/\bStarfall\s*:\s*([^\r\n]+)/gi)].map(m=>m[1].trim());if(values.length>1)throw Error('Only one Starfall discount may be selected.');if(!values.length)return '';const value=Object.keys(rates).find(key=>key.toLowerCase()===values[0].toLowerCase());if(!value)throw Error('Unknown Starfall discount. Choose Staff, Young Guard, or Supporter.');return value;}
 function apply(total,group){if(!Number.isFinite(total)||total<0)throw Error('Invalid order total.');if(group&&!Object.hasOwn(rates,group))throw Error('Unknown Starfall discount.');return group?Math.ceil(Math.round(total*(100-rates[group])*1e8)/1e10):total;}
 function charges(items,reinforcement,delivery,group){const total=apply(items+reinforcement+delivery,group);if(!group)return {items,reinforcement,delivery,total};const factor=(100-rates[group])/100;return {items:total-(reinforcement+delivery)*factor,reinforcement:reinforcement*factor,delivery:delivery*factor,total};}
 window.BLACKSMITH_STARFALL={rates,parse,apply,charges};
 function init(){const field=document.getElementById('starfallDiscount');if(!field)return;const inputs=[...document.querySelectorAll('[data-starfall-discount]')];for(const input of inputs)input.addEventListener('change',()=>{field.value=input.checked?input.value:'';for(const other of inputs)other.checked=other.value===field.value;window.calc?.();});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
