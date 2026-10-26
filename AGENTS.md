# Blacksmith site maintenance

- This is a static GitHub Pages site with a Cloudflare Worker backend. Keep changes compatible with the existing free services.
- Published HTML pages have a hash-based Content Security Policy. After changing inline JavaScript in any HTML file, run `python3 build_security_headers.py` from the site directory and include the updated HTML in the change. Otherwise the browser will block changed scripts.
- Use `addEventListener` or function event properties instead of inline HTML event attributes. Do not weaken `script-src` with `unsafe-inline` or `unsafe-eval` to fix compatibility.
- Bump the relevant asset query version when modifying shared JavaScript used by a cached HTML page.
- Never publish operational backups, account records, keys, recovery codes, local archives, or credentials in this public repository. Private server/account source and data remain in the existing private repository.
- Verify relevant owner, internal, courier, and public flows using fake data. Do not use production data for attack tests.
