# Shared Blacksmith context for ChatGPT and Codex

This file is an entry point for another chat. It does not synchronize conversations or grant file access. Ask ChatGPT to use its GitHub connection, or open the linked public source. A separate chat must actually retrieve the files before answering.

## How to answer Blacksmith questions

1. Read [CHANGELOG.md](CHANGELOG.md) and the dated update matching the question. Dates in the log use America/Chicago. Do not interpret “today” as November 7 forever.
2. For human-readable recipes, blueprint values and price snapshots, read [docs/CATALOG-REFERENCE.md](docs/CATALOG-REFERENCE.md).
3. Verify current recipes against [blacksmith.js](blacksmith.js), price calculations against [pricingEngine.js](pricingEngine.js), and blueprint metadata against [blueprint-library.js](blueprint-library.js). If the readable snapshot is stale, current code and applicable live settings take precedence; explain any discrepancy.
4. Distinguish customer selling price (CC) from material cost (TC). Item Rating, Armor, Damage and Durability are stats, not crafting materials. Blueprint metadata updates alone do not mean a price changed.
5. State whether numbers are base item prices or include reinforcement, delivery and Starfall discounts. Accepted orders may retain locked historical quotes. Cloud-configured prices, including Skiff, can differ from static defaults.
6. If a source cannot be opened, say which source is unavailable. Do not invent prices or claim to have inspected local files through a normal GitHub connection.

## Source map

| Topic | Files |
|---|---|
| Current catalog recipes | blacksmith.js |
| Pricing rules and CC/TC | pricingEngine.js |
| Blueprint stats and aliases | blueprint-library.js |
| Customer ordering options | client.html, starfall-discounts.js |
| Order parsing and management | order-management.js, past-order-parser.js, history-management.js |
| Processing progress | processing-packing.js, order-crafting-checklist.js |
| Material / item analytics | material-analytics.js, item-analytics.js |
| Profile management | profile.html, profile.js |
| Activity / access presentation | activity.html, staff-activity.js, activity-format.js |

This repository contains front-end code. It is not a live database of customer orders or access records. Server authorization and operational records are separate. Never request or publish account secrets to answer catalog questions.

## Cross-device workflow

- Continue the existing Codex chat on the connected Mac from your phone to retain its task context and host file access.
- For a separate ChatGPT chat, select the GitHub plugin/connection available to that chat and request this repository explicitly. Being signed in to the same account alone does not prove the chat has retrieved repository files.
- If that chat can browse public pages but cannot use GitHub tools, give it this public repository link and request the source guide and dated update. Public availability is not a guarantee that every chat's browser can fetch a file.
- Local-only, unpublished work is available through the connected Mac, not from GitHub. The update log must clearly distinguish pending work from confirmed publication.

## Reusable question

> Use GitHub repository IamJericho/Blacksmith_calculator. Read BLACKSMITH-CONTEXT.md, CHANGELOG.md, and docs/updates/2026-11-07.md. Summarize the saddle and Hazmat recipe changes published on November 7, 2026, including old and new customer selling prices. Cite the files you actually read. Do not confuse blueprint stat changes with price changes.

## Operational data interpretation

- `previousCraftingItems` is an obsolete, one-time pre-migration crafting-list backup. It is NOT inventory, current demand, completed goods, or evidence that any item is owned. Ignore it if encountered in older snapshots. The application no longer creates it and removes it from current settings on a successful crafting-totals refresh; the cleanup reaches cloud data through normal successful sync. Older backups are intentionally unchanged.
- `blacksmith-internal-items-v1.items` is a derived projection of active crafting orders, NOT owned stock. Determine customer demand from active order records, crafted/packed progress from each order, and material stock from `blacksmith-material-inventory-v1`.
- A `blacksmith-data.json` file is a saved operational snapshot; its saved timestamp and source matter. Do not assume a GitHub copy or local backup is the live cloud state.
