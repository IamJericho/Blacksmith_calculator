(()=>{
 const key='blacksmith-theme',get=Storage.prototype.getItem,set=Storage.prototype.setItem,remove=Storage.prototype.removeItem,system=matchMedia('(prefers-color-scheme: dark)');let preference=null;
 function read(){try{const value=get.call(localStorage,key);preference=['light','dark'].includes(value)?value:null;}catch{preference=null;}}
 function apply(){document.documentElement.dataset.theme=preference||(system.matches?'dark':'light');window.dispatchEvent(new Event('blacksmith-theme-change'));}
 window.BLACKSMITH_THEME={set(value){preference=['light','dark'].includes(value)?value:null;try{if(preference)set.call(localStorage,key,preference);else remove.call(localStorage,key);}catch{}apply();},get preference(){return preference;}};
 window.addEventListener('storage',event=>{if(event.key===key){read();apply();}});system.addEventListener('change',()=>{if(!preference)apply();});read();apply();
})();
