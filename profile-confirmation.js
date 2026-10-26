(()=>{
 const A=window.BAuth,key='blacksmith-profile-created';
 A?.ready?.then(({account})=>{
  if(A.native.get(sessionStorage,key)!==account.id)return;
  const timeKey=key+'-shown-at',shownAt=Number(A.native.get(sessionStorage,timeKey))||Date.now(),remaining=5000-(Date.now()-shownAt);
  const clear=()=>{A.native.remove(sessionStorage,key);A.native.remove(sessionStorage,timeKey);};
  if(remaining<=0){clear();return;}A.native.set(sessionStorage,timeKey,String(shownAt));
  const banner=document.createElement('div');banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');
  Object.assign(banner.style,{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px',margin:'20px',padding:'16px 20px',border:'2px solid #28753c',borderRadius:'12px',background:'#edf8ef',color:'#174d28'});
  const message=document.createElement('strong');message.textContent='Profile created successfully.';banner.append(message);
  document.body.prepend(banner);setTimeout(()=>{clear();banner.remove();},remaining);
 }).catch(()=>{});
})();
