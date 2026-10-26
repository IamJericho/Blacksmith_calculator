(()=>{
 window.blacksmithStaffMode=true;
 // Separate staff data from the owner's browser data on the same origin.
 const get=Storage.prototype.getItem,set=Storage.prototype.setItem,remove=Storage.prototype.removeItem;
 window.blacksmithStaffCredentials={get:k=>get.call(localStorage,'blacksmith-staff-auth-'+k),set:(k,v)=>set.call(localStorage,'blacksmith-staff-auth-'+k,v),remove:k=>remove.call(localStorage,'blacksmith-staff-auth-'+k)};
 Storage.prototype.getItem=function(k){return get.call(this,'staff-workspace:'+k);};
 Storage.prototype.setItem=function(k,v){return set.call(this,'staff-workspace:'+k,v);};
 Storage.prototype.removeItem=function(k){return remove.call(this,'staff-workspace:'+k);};
 document.documentElement.classList.add('staff-locked');
})();
