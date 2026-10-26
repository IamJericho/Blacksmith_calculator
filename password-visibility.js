(()=>{
 document.querySelectorAll('input[type="password"]').forEach(input=>{
  const row=document.createElement('div');row.className='password-field';input.before(row);row.append(input);
  const toggle=document.createElement('button');toggle.type='button';toggle.textContent='Show';toggle.setAttribute('aria-controls',input.id);toggle.setAttribute('aria-pressed','false');
  const name=document.querySelector('label[for="'+input.id+'"]')?.textContent.trim()||'password';
  const update=visible=>{input.type=visible?'text':'password';toggle.textContent=visible?'Hide':'Show';toggle.setAttribute('aria-pressed',String(visible));toggle.setAttribute('aria-label',(visible?'Hide ':'Show ')+name.toLowerCase());};
  toggle.addEventListener('click',()=>update(input.type==='password'));update(false);row.append(toggle);
 });
})();
