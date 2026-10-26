(()=>{
 const A=window.BAuth,key='blacksmith-profile-created';
 A?.ready?.then(({account})=>{
  if(A.native.get(sessionStorage,key)!==account.id)return;
  const banner=document.createElement('div');banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');
  Object.assign(banner.style,{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px',margin:'20px',padding:'16px 20px',border:'2px solid #28753c',borderRadius:'12px',background:'#edf8ef',color:'#174d28'});
  const message=document.createElement('strong');message.textContent='Profile created successfully. You’re signed in.';banner.append(message);
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent='Dismiss';dismiss.setAttribute('aria-label','Dismiss profile creation confirmation');dismiss.onclick=()=>{A.native.remove(sessionStorage,key);banner.remove();};banner.append(dismiss);document.body.prepend(banner);
 }).catch(()=>{});
})();
