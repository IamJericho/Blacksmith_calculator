(()=>{
 window.blacksmithNavigateTab=value=>{
  const hash='#'+String(value).replace(/^#/,'');if(location.hash===hash)return;
  const oldURL=location.href;history.pushState(null,'',hash);
  window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL,newURL:location.href}));
 };
 document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const link=event.target.closest('nav a[href^="#"]');if(!link||link.target||link.hasAttribute('download'))return;
  event.preventDefault();window.blacksmithNavigateTab(link.getAttribute('href'));
 });
})();
