from pathlib import Path
import re,hashlib,base64,json
pages=['index.html','internal.html','profile.html','activity.html','client.html','courier.html','shared.html','auction.html','staff.html','staff-activity.html']
for name in pages:
 p=Path(name);s=p.read_text();s=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>','',s);s=re.sub(r'<meta name="referrer" content="no-referrer">','',s)
 # Convert legacy attribute handlers to ordinary event listeners, including generated controls.
 actions={}
 def replace(m):
  code=m.group(2);key='action'+str(len(actions));actions[key]=code;return 'data-security-action="'+key+'"'
 s=re.sub(r'\bonclick=([\"\'])(.*?)\1',replace,s)
 if actions:
  handlers=','.join(json.dumps(k)+':function(event){'+v+';}' for k,v in actions.items())
  s=s.replace('</body>','<script>document.addEventListener("click",function(event){const target=event.target.closest("[data-security-action]");if(!target)return;const handlers={'+handlers+'};handlers[target.dataset.securityAction]?.call(target,event);});</script></body>')
 hashes=[]
 for attrs,body in re.findall(r'<script\b([^>]*)>([\s\S]*?)</script>',s,re.I):
  if not re.search(r'\bsrc\s*=',attrs,re.I):hashes.append("'sha256-"+base64.b64encode(hashlib.sha256(body.encode()).digest()).decode()+"'")
 policy="default-src 'self'; script-src 'self' "+' '.join(hashes)+"; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' https://blacksmith-sync.h255y626rp.workers.dev; font-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'self'; frame-src 'none'"
 meta='<meta http-equiv="Content-Security-Policy" content="'+policy+'"><meta name="referrer" content="no-referrer">'
 s=s.replace('<head>','<head>'+meta,1)
 p.write_text(s)
 print(name,len(hashes),'trusted inline scripts;',len(actions),'legacy actions converted')
