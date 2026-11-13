# Blacksmith update log

Dated, readable records for ChatGPT, Codex and the owner. This log begins with November 7, 2026; earlier repository commits remain the source for older changes. Current source may supersede a dated snapshot.

## November 13, 2026 — Blueprint Library editing

Added an Edit button to blueprint cards, with recipe pricing and editable surcharges. [Update details](docs/updates/2026-11-13.md)

## November 11, 2026 — Tek Revenue

Added a report for recorded Tek payments under Analytics with the same period controls as Item Analytics. [Update details](docs/updates/2026-11-11.md)

## November 11, 2026 — individual packing checklists

Fully packed items appear below items still to pack on individual order checklists. The Processing page also places fully crafted items last in each order’s crafting checklist and checks the box only once the full quantity is crafted. [Update details](docs/updates/2026-11-11.md)

## November 10, 2026 — Enigmasaur listing

Hid the Enigmasaur saddle’s durability on the customer order page. [Update details](docs/updates/2026-11-10.md)

## November 9, 2026 — analytics search

Added search to Material Analytics and Item Analytics. [Update details](docs/updates/2026-11-09.md)

## November 8, 2026 — material pricing

Removed the Umbra saddle surcharge after confirming the 124 armor blueprint. Base price went from 45 to 25 Tek. Added the Mastercraft Enigmasaur saddle at 45 Tek, including a 20 Tek surcharge.

Removed the 1,000 Tek per-dedi surcharge from standard material rates and recalculated shop prices. Deployment pending verification. [Rates and selling-price examples](docs/updates/2026-11-08.md)

## November 7, 2026 — confirmed published

[Full change details, material recipes and selling-price comparison](docs/updates/2026-11-07.md)

- #446: saddle Blueprint Library stats; seven saddle recipe updates and five Hazmat recipe reviews. Customer price changes documented in the full entry.
- #447: mutually exclusive Starfall discounts, applied to the overall order total.
- #448: 26 equipment blueprint stat records and Gas Mask recipe; Gas Mask selling price remains 15 Tek.
- #449: additional Material and Item Analytics time filters.
- #450: processing checklist / overall packing correlation with customer-specific shared-item controls.
- #451: account management shortcuts, Activity / Access filters and grouped order edits.
- #452: access history grouped by account.

These deployment numbers refer to GitHub Pages workflows in this repository. Backend changes require separate verification; a Pages build alone does not prove a server change is live.

## Reference maintenance

The current readable catalog snapshot is [docs/CATALOG-REFERENCE.md](docs/CATALOG-REFERENCE.md). Consult [BLACKSMITH-CONTEXT.md](BLACKSMITH-CONTEXT.md) before answering pricing or update questions.

## November 7, 2026 — obsolete crafting snapshot cleanup

Stopped creating `previousCraftingItems`; remove this unused legacy snapshot from active settings when crafting totals refresh successfully, then persist through normal cloud sync. Historical backups remain intact. Shared context now explicitly distinguishes obsolete snapshots and derived crafting totals from actual inventory. Cleanup of a particular device/cloud copy requires that updated client to refresh and save successfully.

## November 9, 2026 — order prepayment

Added pickup room reservations and pickup or delivery prepayment messages in Edit order. [Prepayment details](docs/updates/2026-11-09.md)

Added an Outside Orders filter with copyable pickup instructions for occupied locations. [Pickup instructions](docs/updates/2026-11-09.md#pickup-locations-outside-orders)

Edit order shows fulfillment PIN and Instructions only at Complete.

Moved prepayment into the order options and show one PIN at a time.

Pickup prepayment fills the payment dedi label and suggested PIN when a room is chosen, then shows the message.
