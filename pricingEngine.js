// =============================
// DTJ Pricing Engine
// =============================

// -----------------------------
// Locked Economic Rules
// -----------------------------

const DEDI_PRICE = {
    A: 1800, B: 2500, C: 1000, E: 8000, F: 500, FW: 1000,
    G: 2000, H: 400, I: 1800, K: 250, L: 3000, M: 3000,
    N: 500, O: 3000, OP: 1000, P: 5000, R: 2000, RM: 1500,
    S: 500, T: 500, U: 2500, V: 2000, W: 500,
    X: 0, Y: 2000, Z: 500, BP: 4500, GB: 4000, SP: 0, SF: 2000, PM: 1, MB: 400, OL: 2000, ST: 1700
};

// Correct stack sizes (add any missing ones here)
const STACK_SIZE = {
    H: 200,
    M: 300,
    W: 100,
    F: 300,
    A: 100,
    P: 100,
    E: 100,
    OP: 100,
    B: 100,
    C: 100,
    FW: 100,
    G: 100,
    I: 1,
    K: 100,
    L: 100,
    N: 100,
    O: 100,
    R: 100,
    RM: 300,
    S: 100,
    T: 100,
    U: 100,
    V: 100,
    X: 100,
    Y: 100,
    Z: 100,
    BP: 100,
    GB: 100,
    SP: 100,
    SF: 100,
    PM: 1,
    MB: 100,
    OL: 100,
    ST: 30
};

// Recipe-derived prices, expressed per full dedi of the crafted material.
// 1 Absorbent Substrate = 2 Sap + 2 Oil + 2 Black Pearls.
DEDI_PRICE.X = 2 * (
    DEDI_PRICE.ST / STACK_SIZE.ST +
    DEDI_PRICE.OL / STACK_SIZE.OL +
    DEDI_PRICE.BP / STACK_SIZE.BP
) * STACK_SIZE.X;

// 1 Spark Powder = 1 Stone + 2 Flint.
DEDI_PRICE.SP = (
    DEDI_PRICE.S / STACK_SIZE.S +
    2 * DEDI_PRICE.N / STACK_SIZE.N
) * STACK_SIZE.SP;

// -----------------------------
// Red Element Conversion
// -----------------------------

// 1 Dust Dedi = 1800 Tek
// 1 Dedi = 1800 stacks
// 1 Element = 1 Dust stack
// 1 RE = 2 Dust stacks
const TEK_PER_RE = (1800 / 1800) * 2; // 2 TEK

// -----------------------------
// Helpers
// -----------------------------

function getTekPerStack(materialKey) {
    const dediPrice = DEDI_PRICE[materialKey];
    if (!dediPrice) return 0;
    return dediPrice / 1800;
}

function getStackSize(materialKey) {
    return STACK_SIZE[materialKey] || 100;
}

// -----------------------------
// TC Calculation
// -----------------------------

function calculateTC(materials) {

    let totalTC = 0;
    let totalStacks = 0;
    let totalDediFraction = 0;

    for (const [key, qty] of Object.entries(materials)) {

        if (["D", "J", "Q"].includes(key)) continue; // Stats are not crafting materials

        // Handle Red Element
        if (key === "RE") {
            const reTC = qty * TEK_PER_RE;
            const reStacks = qty * 2; // 1 RE = 2 dust stacks
            const reDediFraction = reStacks / 1800;

            totalTC += reTC;
            totalStacks += reStacks;
            totalDediFraction += reDediFraction;

            continue;
        }

        const stackSize = getStackSize(key);
        const tekPerStack = getTekPerStack(key);

        if (!tekPerStack) throw new Error(`Missing DEDI price for material: ${key}`);

        const stacks = qty / stackSize;
        const tc = stacks * tekPerStack;
        const dediFraction = stacks / 1800;

        totalTC += tc;
        totalStacks += stacks;
        totalDediFraction += dediFraction;
    }

    return {
        TC: totalTC,                  // never rounded internally
        totalStacks,
        totalDediFraction
    };
}

// -----------------------------
// CC Calculation (Correct Rule)
// -----------------------------

const CLIENT_PRICING = { markupPercent: 30, minimumMarkupTek: 10, roundingIncrement: 5 };

function calculateCC(tc) {
    if (!Number.isFinite(tc) || tc < 0) throw new Error("Invalid material cost.");
    const markup = Math.max(tc * CLIENT_PRICING.markupPercent / 100, CLIENT_PRICING.minimumMarkupTek);
    const ideal = Math.ceil((tc + markup) / CLIENT_PRICING.roundingIncrement) * CLIENT_PRICING.roundingIncrement;
    // Preserve the existing API shape; flat percentage pricing has one selling price.
    return { low: ideal, high: ideal, ideal };
}

// -----------------------------
// Public API
// -----------------------------

function priceItem(materials) {

    const result = calculateTC(materials);
    const cc = calculateCC(result.TC);

    return {
        TC: Number(result.TC.toFixed(2)),
        totalStacks: Number(result.totalStacks.toFixed(2)),
        totalDediFraction: Number(result.totalDediFraction.toFixed(4)),
        CC: {
            low: cc.low,
            high: cc.high,
            ideal: cc.ideal
        }
    };
}

// Expose globally
window.DTJ_PRICING = {
    calculateTC,
    calculateCC,
    priceItem
};


// Alternative payments are separate from TC, CC, reinforcement, and revenue splits.
// A null override uses the supplier valuation; set unitsPerTek to an independent rate.
const ALTERNATIVE_PAYMENTS = {
    enabled: true,
    // Every material priced by PE is eligible; newly priced materials appear automatically.
    resources: Object.fromEntries([...Object.keys(DEDI_PRICE), "RE"].map(key => [
        key, { unitsPerTek: null, ...({ OL: { label: "Oil" }, ST: { label: "Sap" } }[key] || {}) }
    ])),
    preferredResource: { enabled: true, resource: "V", discountPercent: 10 },
    protectMinimumMargin: true,
    minimumProfitPercent: 0 // Never discount below the recorded material cost.
};

// Hexagon costs are actual shop purchase costs per material unit.
// Hard Polymer is valued using interchangeable Organic Polymer for crafting.
const HEXAGON_PAYMENTS = {
    enabled: true,
    // Unlisted materials use the Hexagon-store crafting cost of one Tek Ceiling.
    fallbackHexPerTek: 50 * (195 / 5) + 25 * (125 / 5) + 20 * (115 / 10) + 2000,
    marginHexPerTek: 1000,
    deliveryHexPerTek: 1000,
    materials: {
        F: 12 / 50, T: 20 / 50, W: 25 / 50, H: 60 / 50,
        N: 18 / 50, S: 40 / 50, K: 60 / 25,
        RM: 150 / 10, M: 195 / 5, C: 115 / 10,
        O: 180 / 5, OL: 120 / 20, Z: 65 / 25,
        A: 75 / 25, OP: 125 / 5, P: 125 / 5,
        ST: 150 / 5, B: 125 / 5, BP: 300,
        FW: 46 / 50, G: 55 / 25, V: 95 / 20, R: 175 / 20,
        L: 50 / 50, U: 48 / 50, Y: 45 / 50, E: 700 / 5,
        I: 2000, RE: 2 * 5 * 2000,
        MB: 20 * (10 / 50) + 5 * (80 / 20) + (25 / 20)
    },
    recipes: { X: { ST: 2, OL: 2, BP: 2 }, SP: { S: 1, N: 2 } }
};

function getHexagonMaterialCost(key, visited = new Set()) {
    const config = HEXAGON_PAYMENTS;
    if (Object.prototype.hasOwnProperty.call(config.recipes, key)) {
        if (visited.has(key)) throw new Error("Circular Hexagon material recipe.");
        const next = new Set(visited); next.add(key);
        return Object.entries(config.recipes[key]).reduce((sum, [ingredient, qty]) =>
            sum + qty * getHexagonMaterialCost(ingredient, next), 0);
    }
    if (!Object.prototype.hasOwnProperty.call(config.materials, key)) {
        const price = DEDI_PRICE[key], stackSize = STACK_SIZE[key];
        if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(stackSize) || stackSize <= 0 ||
            !Number.isFinite(config.fallbackHexPerTek) || config.fallbackHexPerTek <= 0) {
            throw new Error(`Material valuation unavailable for ${window.BLACKSMITH?.materialsKey[key] || key}.`);
        }
        return price / (1800 * stackSize) * config.fallbackHexPerTek;
    }
    const cost = config.materials[key];
    if (!Number.isFinite(cost) || cost <= 0) throw new Error(`Invalid Hexagon cost for ${key}.`);
    return cost;
}

function calculateHexagonMaterialCost(materials) {
    if (!materials || typeof materials !== "object") throw new Error("Missing crafting recipe.");
    let total = 0, hasMaterials = false;
    for (const [key, qty] of Object.entries(materials)) {
        if (["D", "J", "Q"].includes(key)) continue;
        if (!Number.isFinite(qty) || qty < 0) throw new Error("Invalid crafting quantity.");
        if (!qty) continue;
        hasMaterials = true;
        total += qty * getHexagonMaterialCost(key);
    }
    return { cost: total, hasMaterials };
}

function priceHexagonItem(item) {
    if (!item || !Number.isFinite(item.tek) || item.tek < 0) throw new Error("Invalid item price.");
    const recipe = calculateHexagonMaterialCost(item.materials);
    if (!recipe.hasMaterials) {
        const isTekSaddle = Object.values(window.BLACKSMITH?.saddles?.teksaddles || {}).includes(item);
        if (!isTekSaddle) throw new Error("Hexagon payment unavailable: this item has no crafting recipe.");
        const rate = HEXAGON_PAYMENTS.fallbackHexPerTek;
        const markup = CLIENT_PRICING.markupPercent;
        if (!Number.isFinite(rate) || rate <= 0 || !Number.isFinite(markup) || markup < 0) throw new Error("Invalid fixed saddle conversion or markup.");
        // Fixed saddle price converted at Tek crafting cost, plus the configured profit markup.
        const materialCost = item.tek * rate;
        const marginHex = materialCost * markup / 100;
        return { materialCost, marginHex, price: materialCost + marginHex };
    }
    const tc = calculateTC(item.materials).TC;
    const marginTek = Math.max(0, item.tek - tc);
    if (!Number.isFinite(HEXAGON_PAYMENTS.marginHexPerTek) || HEXAGON_PAYMENTS.marginHexPerTek < 0) {
        throw new Error("Invalid Hexagon margin conversion.");
    }
    const marginHex = marginTek * HEXAGON_PAYMENTS.marginHexPerTek;
    return { materialCost: recipe.cost, marginHex, price: recipe.cost + marginHex };
}

function calculateHexagonPayment(cc, charges = {}) {
    if (!HEXAGON_PAYMENTS.enabled) throw new Error("Hexagon payments are disabled.");
    const reinforcementTek = charges.reinforcementTek ?? 0;
    const deliveryTek = charges.deliveryTek ?? 0;
    if (![cc, reinforcementTek, deliveryTek].every(value => Number.isFinite(value) && value >= 0)) {
        throw new Error("Invalid Tek price or charges.");
    }
    if (!Array.isArray(charges.items)) throw new Error("Select items with crafting recipes for Hexagon payments.");
    let baseHex = 0, materialCost = 0, marginHex = 0, eligibleHex = 0, expectedCC = 0;
    const reinforceMaterials = {};
    for (const { item, quantity, reinforceEligible } of charges.items) {
        if (!Number.isSafeInteger(quantity) || quantity <= 0) throw new Error("Invalid item quantity.");
        const priced = priceHexagonItem(item);
        expectedCC += item.tek * quantity;
        baseHex += priced.price * quantity;
        materialCost += priced.materialCost * quantity;
        marginHex += priced.marginHex * quantity;
        if (reinforceEligible) {
            eligibleHex += priced.price * quantity;
            for (const [key, qty] of Object.entries(item.materials)) {
                if (!["D", "J", "Q"].includes(key)) reinforceMaterials[key] = (reinforceMaterials[key] || 0) + qty * quantity;
            }
        }
    }
    if (Math.abs(expectedCC - cc) > 1e-7) throw new Error("Order prices do not match the selected recipes.");
    let reinforcementHex = 0;
    if (charges.reinforce && eligibleHex > 0) {
        const extraMaterials = Object.fromEntries(Object.entries(reinforceMaterials).map(([key, qty]) => [key, Math.ceil(qty * 0.285)]));
        const extraCost = calculateHexagonMaterialCost(extraMaterials).cost;
        reinforcementHex = Math.max(eligibleHex * 0.30, extraCost);
    }
    if (!Number.isFinite(HEXAGON_PAYMENTS.deliveryHexPerTek) || HEXAGON_PAYMENTS.deliveryHexPerTek <= 0) {
        throw new Error("Invalid Hexagon delivery conversion.");
    }
    const deliveryHex = deliveryTek * HEXAGON_PAYMENTS.deliveryHexPerTek;
    const resourceQuantity = Math.ceil(baseHex + reinforcementHex + deliveryHex);
    if (!Number.isSafeInteger(resourceQuantity)) throw new Error("Hexagon payment exceeds the supported quantity.");
    return { originalTek: cc + reinforcementTek + deliveryTek, itemTek: cc,
        reinforcementTek, deliveryTek, resource: "HEX", discountPercent: 0,
        resourceQuantity, materialCost, marginHex, reinforcementHex, deliveryHex };
}

function selectedHexagonItems() {
    const items = [];
    for (const select of document.querySelectorAll("select[data-group]")) {
        const quantity = Number(select.value);
        if (!quantity) continue;
        const group = select.dataset.group;
        const [category, name] = select.dataset.name.split("|");
        const saddle = ["regular", "platform", "teksaddles"].includes(group);
        const item = saddle ? window.BLACKSMITH.saddles[group][select.dataset.name] :
            group.startsWith("cursed") ? window.BLACKSMITH.cursed[group === "cursed1" ? "tier1" : "tier2"][category][name] :
                window.BLACKSMITH.equipment[group][category][name];
        items.push({ item, quantity, reinforceEligible: !saddle && ["weapons", "tools", "armor", "tek"].includes(category) });
    }
    return items;
}


function getPaymentResourceRate(resource) {
    const config = ALTERNATIVE_PAYMENTS;
    if (!config.enabled) throw new Error("Resource payments are disabled.");
    if (!resource) throw new Error("Select a payment resource.");
    if (!Object.prototype.hasOwnProperty.call(config.resources, resource)) {
        throw new Error("This payment resource is not available.");
    }
    const entry = config.resources[resource];
    if (!entry || typeof entry !== "object") throw new Error("Missing resource exchange rate.");
    let unitsPerTek = entry.unitsPerTek;
    if (unitsPerTek === null && resource === "RE") {
        if (!Number.isFinite(TEK_PER_RE) || TEK_PER_RE <= 0) throw new Error("Invalid Red Element valuation.");
        unitsPerTek = 1 / TEK_PER_RE;
    } else if (unitsPerTek === null) {
        const dediPrice = DEDI_PRICE[resource];
        const stackSize = STACK_SIZE[resource];
        if (!Number.isFinite(dediPrice) || dediPrice <= 0 ||
            !Number.isFinite(stackSize) || stackSize <= 0) {
            throw new Error("Missing or invalid supplier price or stack size.");
        }
        unitsPerTek = 1800 * stackSize / dediPrice;
    }
    if (!Number.isFinite(unitsPerTek) || unitsPerTek <= 0) {
        throw new Error("Missing or invalid resource exchange rate.");
    }
    return unitsPerTek;
}

// Accept the existing priced catalog item's .tek (or an unchanged order total).
// Never recalculate a fixed price, surcharge, reinforcement charge, or delivery fee.
function calculateAlternativePayment(cc, resource, charges = {}) {
    if (!Number.isFinite(cc) || cc < 0) throw new Error("Invalid Tek price.");
    const reinforcementTek = charges.reinforcementTek ?? 0;
    const deliveryTek = charges.deliveryTek ?? 0;
    if (![reinforcementTek, deliveryTek].every(value => Number.isFinite(value) && value >= 0)) {
        throw new Error("Invalid reinforcement or delivery charge.");
    }
    const unitsPerTek = getPaymentResourceRate(resource);
    const preferred = ALTERNATIVE_PAYMENTS.preferredResource;
    let discountPercent = 0;
    if (preferred && preferred.enabled) {
        if (!Object.prototype.hasOwnProperty.call(ALTERNATIVE_PAYMENTS.resources, preferred.resource)) {
            throw new Error("The preferred payment resource is no longer available.");
        }
        if (!Number.isFinite(preferred.discountPercent) ||
            preferred.discountPercent < 0 || preferred.discountPercent > 100) {
            throw new Error("Preferred resource discount must be between 0 and 100%.");
        }
        if (resource === preferred.resource) discountPercent = preferred.discountPercent;
    }
    const requestedDiscountPercent = discountPercent;
    const requestedTek = cc * (1 - requestedDiscountPercent / 100);
    let minimumItemTek = 0;
    if (ALTERNATIVE_PAYMENTS.protectMinimumMargin) {
        if (Array.isArray(charges.items)) {
            for (const { item, quantity } of charges.items) {
                if (!item || !Number.isFinite(item.tek) || item.tek < 0 || !Number.isSafeInteger(quantity) || quantity <= 0) throw new Error("Invalid order item.");
                const materialCost = calculateTC(item.materials).TC;
                const minProfit = ALTERNATIVE_PAYMENTS.minimumProfitPercent;
                if (!Number.isFinite(minProfit) || minProfit < 0) throw new Error("Invalid minimum profit percentage.");
                const hasRecipe = Object.keys(item.materials).some(key => !["D", "J", "Q"].includes(key));
                minimumItemTek += (hasRecipe ? materialCost * (1 + minProfit / 100) + (item.additionalTek || 0) * (1 - requestedDiscountPercent / 100) : item.tek) * quantity;
            }
            if (Math.abs(charges.items.reduce((sum, entry) => sum + entry.item.tek * entry.quantity, 0) - cc) > 1e-7) throw new Error("Order prices do not match selected items.");
        } else {
            // Without a recipe, preserve the whole stored CC rather than guess its cost.
            minimumItemTek = cc;
        }
    }
    const discountedTek = Math.max(requestedTek, minimumItemTek);
    discountPercent = cc > 0 ? Math.round(Math.max(0, (cc - discountedTek) / cc * 100) * 1e6) / 1e6 : 0;
    const conversionTek = discountedTek + reinforcementTek + deliveryTek;
    const rawQuantity = conversionTek * unitsPerTek;
    const resourceQuantity = Math.ceil(rawQuantity);
    if (!Number.isSafeInteger(resourceQuantity)) throw new Error("Resource payment exceeds the supported quantity.");
    return { originalTek: cc + reinforcementTek + deliveryTek, itemTek: cc,
        reinforcementTek, deliveryTek, resource, unitsPerTek, discountPercent,
        discountedTek, conversionTek, resourceQuantity, requestedDiscountPercent,
        discountLimited: discountedTek > requestedTek, minimumItemTek };
}

function paymentResourceName(resource) {
    if (resource === "HEX") return "Hexagons";
    return ALTERNATIVE_PAYMENTS.resources[resource]?.label ||
        window.BLACKSMITH?.materialsKey[resource] || resource;
}

function formatAlternativePayment(result, audience = "internal") {
    const name = paymentResourceName(result.resource);
    const lines = [];
    if (audience !== "client") lines.push(`Original Price: ${result.originalTek} Tek Ceilings`);
    lines.push("Payment Method: " + (result.resource === "HEX" ? "Hexagons" : "Resources"));
    if (audience === "client") lines.push(`Selected Resource: ${name}`);
    if (audience !== "client" && result.discountLimited) lines.push("Preferred discount limited to protect crafting cost and margin.");

    if (result.reinforcementTek > 0) lines.push(`Reinforcement (no discount): ${result.reinforcementTek} Tek`);
    if (result.deliveryTek > 0) lines.push(`Delivery (no discount): ${result.deliveryTek} Tek`);
    lines.push(`Payment: ${result.resourceQuantity.toLocaleString()} ${name}` +
        (result.discountPercent > 0 ? ` (${result.discountPercent}% off items)` : ""));
    return lines.join("\n");
}

// Shared controls and rendering for both pages; item and order CC remain in TEK.
function initializePaymentUI(onChange, audience = "internal") {
    const method = document.getElementById("paymentMethod");
    const resource = document.getElementById("paymentResource");
    const resourceBox = document.getElementById("paymentResourceBox");
    const details = document.getElementById("paymentDetails");
    const copyButtons = document.querySelectorAll("[data-payment-copy]");
    let lastItemTek = 0;
    let lastCharges = {};

    function populateResources() {
        const selection = resource.value;
        resource.replaceChildren(new Option("Select a resource", ""));
        const preferred = ALTERNATIVE_PAYMENTS.preferredResource;
        const keys = Object.keys(ALTERNATIVE_PAYMENTS.resources);
        if (preferred?.enabled && keys.includes(preferred.resource)) {
            keys.splice(keys.indexOf(preferred.resource), 1);
            keys.unshift(preferred.resource);
        }
        for (const key of keys) {
            const label = paymentResourceName(key) +
                (preferred?.enabled && preferred.resource === key ? ` — Preferred · ${preferred.discountPercent}% off` : "");
            resource.add(new Option(label, key));
        }
        if (Object.prototype.hasOwnProperty.call(ALTERNATIVE_PAYMENTS.resources, selection)) resource.value = selection;
    }

    function update(itemTek, charges = {}) {
        lastItemTek = itemTek;
        lastCharges = charges;
        const totalTek = itemTek + (charges.reinforcementTek ?? 0) + (charges.deliveryTek ?? 0);
        const hexCharges = { ...charges, items: selectedHexagonItems() };
        populateResources();
        method.querySelector('option[value="alternative"]').disabled = !ALTERNATIVE_PAYMENTS.enabled;
        const hexagonOption = method.querySelector('option[value="hexagons"]');
        hexagonOption.disabled = !HEXAGON_PAYMENTS.enabled;
        hexagonOption.textContent = HEXAGON_PAYMENTS.enabled ? "Hexagons" : "Hexagons (not available yet)";
        const alternative = method.value === "alternative";
        const hexagons = method.value === "hexagons";
        resourceBox.hidden = !alternative;
        // Successful payment details already appear in the order total and message.
        details.hidden = true;
        let result = null;
        let error = null;
        let paymentText = `Payment: ${totalTek} Tek Ceilings`;
        if (alternative || hexagons) {
            try {
                result = hexagons ? calculateHexagonPayment(itemTek, hexCharges) : calculateAlternativePayment(itemTek, resource.value, hexCharges);
                paymentText = formatAlternativePayment(result, audience);
                details.textContent = paymentText;
            } catch (err) {
                error = err.message;
                paymentText = (audience === "client" ? "" : `Original Price: ${totalTek} Tek Ceilings\n`) + `Payment unavailable: ${error}`;
                details.textContent = paymentText;
            }
        }
        details.hidden = !error;
        details.classList.toggle("payment-error", Boolean(error));
        for (const button of copyButtons) button.disabled = Boolean(error);
        for (const el of document.querySelectorAll("[data-item-cc]")) {
            el.hidden = !alternative && !hexagons;
            if (!alternative && !hexagons) continue;
            if (error) { el.textContent = "Resource payment unavailable"; continue; }
            try {
                const select = el.closest("tr").querySelector("select[data-group]");
                let item;
                {
                    const group = select.dataset.group;
                    const [category, name] = select.dataset.name.split("|");
                    const saddle = ["regular", "platform", "teksaddles"].includes(group);
                    const catalogItem = saddle ? window.BLACKSMITH.saddles[group][select.dataset.name] :
                        group.startsWith("cursed") ? window.BLACKSMITH.cursed[group === "cursed1" ? "tier1" : "tier2"][category][name] :
                            window.BLACKSMITH.equipment[group][category][name];
                    item = hexagons ? { resourceQuantity: Math.ceil(priceHexagonItem(catalogItem).price), resource: "HEX", discountPercent: 0 } :
                        calculateAlternativePayment(Number(el.dataset.itemCc), resource.value, { items: [{ item: catalogItem, quantity: 1 }] });
                }
                el.textContent = `${item.resourceQuantity.toLocaleString()} ${paymentResourceName(item.resource)}` +
                    (item.discountPercent > 0 ? ` (${item.discountPercent}% discount)` : "");
            } catch (err) { el.textContent = `Payment unavailable: ${err.message}`; }
        }
        return { valid: !error, paymentText, result };
    }

    method.addEventListener("change", onChange);
    resource.addEventListener("change", onChange);
    function reset() { method.value = "tek"; resource.value = ""; update(0); }
    populateResources();
    update(0);
    return { update, reset, refresh() { update(lastItemTek, lastCharges); onChange(); } };
}

Object.assign(window.DTJ_PRICING, {
    clientPricing: CLIENT_PRICING,
    alternativePayments: ALTERNATIVE_PAYMENTS,
    hexagonPayments: HEXAGON_PAYMENTS,
    calculateHexagonPayment,
    calculateHexagonMaterialCost,
    getHexagonMaterialCost,
    priceHexagonItem,
    getPaymentResourceRate,
    calculateAlternativePayment,
    formatAlternativePayment,
    initializePaymentUI
});
