# Blacksmith site maintenance

- This is a static GitHub Pages site with a Cloudflare Worker backend. Keep changes compatible with the existing free services.
- Published HTML pages have a hash-based Content Security Policy. After changing inline JavaScript in any HTML file, run `python3 build_security_headers.py` from the site directory and include the updated HTML in the change. Otherwise the browser will block changed scripts.
- Use `addEventListener` or function event properties instead of inline HTML event attributes. Do not weaken `script-src` with `unsafe-inline` or `unsafe-eval` to fix compatibility.
- Bump the relevant asset query version when modifying shared JavaScript used by a cached HTML page.
- Never publish operational backups, account records, keys, recovery codes, local archives, or credentials in this public repository. Private server/account source and data remain in the existing private repository.
- Verify relevant owner, internal, courier, and public flows using fake data. Do not use production data for attack tests.

- All pages use `theme.js` and `theme.css`. Keep the shared theme script ahead of authentication scripts so it can read the browser-wide preference before account storage namespacing. Put account appearance controls in Profile. Use `:root[data-theme=dark]` for dark styling rather than OS-only media rules, so explicit Light overrides a dark device setting.
- Theme preferences are browser-local and shared across pages; changing appearance must not add cloud polling or backend writes.

- Customer/public pages load optional authentication only for signed-in navigation; never add auth-gate.js or force a login on client.html, auction.html or shared.html. Keep public pages usable when a saved session expires or is revoked.
- Client drafts stay in browser-local storage under blacksmith-client-draft-v1. Reset clears the draft; do not send anonymous drafts to the backend.

## Accessibility requirement (owner instruction, 2026-11-02)

- Target WCAG 2.1 Level A and AA for every user-facing change across all pages and roles. Check applicable accessible names/labels, keyboard operation and focus, hover/focus disclosure behavior, text and non-text contrast in light/dark states, reflow/text resizing, errors and status announcements.
- Flag any requested behavior that conflicts with applicable criteria and ask the owner before implementing that conflicting design. Propose an accessible alternative.
- Do not claim full conformance from source inspection or an automated scan alone. Record checks performed, unresolved findings and manual/assistive-technology coverage.

- New full application pages must load accessibility.css and accessibility.js after their page/shared styles; preserve these assets on existing pages. Re-test the accessible hover/focus, skip-link, form-error and scroll-region behavior when editing those components.

## Shared reference for other chats

- Read BLACKSMITH-CONTEXT.md and CHANGELOG.md for cross-chat project context. Verify answers against current source and applicable live settings.
- When changing recipes, pricing, blueprint stats or user-facing behavior, update the dated record in docs/updates/ and CHANGELOG.md in the same change. Describe what changed, old/new customer prices when relevant, and whether it is pending or confirmed published. Do not claim a deployment succeeded before checking it.
- Refresh docs/CATALOG-REFERENCE.md when catalog recipes, base prices or blueprint stats change. It is a dated snapshot, not an alternate pricing engine. Use full material names. Separate blueprint-only records from Shop Items and identify cloud-configured prices.
- Keep keys, usernames of customers, orders, IP/device access logs, passwords, account records, private backups and credentials out of public reference files.
