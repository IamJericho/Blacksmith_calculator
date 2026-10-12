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
    RM: 100,
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

function calculateCC(tc) {

    const lowRaw = tc + 10;
    const highRaw = tc + 15;

    const lowRounded = Math.round(lowRaw / 5) * 5;
    const highRounded = Math.round(highRaw / 5) * 5;

    const ideal = Math.round(((lowRounded + highRounded) / 2) / 5) * 5;

    return {
        low: lowRounded,
        high: highRounded,
        ideal
    };
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
    resources: {
        H: { unitsPerTek: null },
        M: { unitsPerTek: null },
        F: { unitsPerTek: null },
        W: { unitsPerTek: null },
        OL: { unitsPerTek: null, label: "Oil" },
        C: { unitsPerTek: null },
        V: { unitsPerTek: null }
    },
    preferredResource: { enabled: true, resource: "V", discountPercent: 10 }
};

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
    if (unitsPerTek === null) {
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
    const discountedTek = cc * (1 - discountPercent / 100);
    const conversionTek = discountedTek + reinforcementTek + deliveryTek;
    const rawQuantity = conversionTek * unitsPerTek;
    const resourceQuantity = Math.ceil(rawQuantity);
    if (!Number.isSafeInteger(resourceQuantity)) throw new Error("Resource payment exceeds the supported quantity.");
    return { originalTek: cc + reinforcementTek + deliveryTek, itemTek: cc,
        reinforcementTek, deliveryTek, resource, unitsPerTek, discountPercent,
        discountedTek, conversionTek, resourceQuantity };
}

function paymentResourceName(resource) {
    return ALTERNATIVE_PAYMENTS.resources[resource]?.label ||
        window.BLACKSMITH?.materialsKey[resource] || resource;
}

function formatAlternativePayment(result) {
    const name = paymentResourceName(result.resource);
    const lines = [
        `Original Price: ${result.originalTek} Tek Ceilings`,
        "Payment Method: Resources",
        `Selected Resource: ${name}`,
        `Exchange Rate: 1 Tek = ${result.unitsPerTek.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${name}`
    ];
    if (result.discountPercent > 0) {
        lines.push(`Preferred Resource Discount: ${result.discountPercent}% on items only`);
        lines.push(`Item Subtotal: ${result.itemTek} Tek; discounted to ${result.discountedTek} Tek`);
    }
    if (result.reinforcementTek > 0) lines.push(`Reinforcement (no discount): ${result.reinforcementTek} Tek`);
    if (result.deliveryTek > 0) lines.push(`Delivery (no discount): ${result.deliveryTek} Tek`);
    lines.push(`Payment: ${result.resourceQuantity.toLocaleString()} ${name}`);
    return lines.join("\n");
}

// Shared controls and rendering for both pages; item and order CC remain in TEK.
function initializePaymentUI(onChange) {
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
                (preferred?.enabled && preferred.resource === key ? " (Preferred)" : "");
            resource.add(new Option(label, key));
        }
        if (Object.prototype.hasOwnProperty.call(ALTERNATIVE_PAYMENTS.resources, selection)) resource.value = selection;
    }

    function update(itemTek, charges = {}) {
        lastItemTek = itemTek;
        lastCharges = charges;
        const totalTek = itemTek + (charges.reinforcementTek ?? 0) + (charges.deliveryTek ?? 0);
        populateResources();
        method.querySelector('option[value="alternative"]').disabled = !ALTERNATIVE_PAYMENTS.enabled;
        const alternative = method.value === "alternative";
        resourceBox.hidden = !alternative;
        details.hidden = !alternative;
        let result = null;
        let error = null;
        let paymentText = `Payment: ${totalTek} Tek Ceilings`;
        if (alternative) {
            try {
                result = calculateAlternativePayment(itemTek, resource.value, charges);
                paymentText = formatAlternativePayment(result);
                details.textContent = paymentText;
            } catch (err) {
                error = err.message;
                paymentText = `Original Price: ${totalTek} Tek Ceilings\nPayment unavailable: ${error}`;
                details.textContent = paymentText;
            }
        }
        details.classList.toggle("payment-error", Boolean(error));
        for (const button of copyButtons) button.disabled = Boolean(error);
        for (const el of document.querySelectorAll("[data-item-cc]")) {
            el.hidden = !alternative;
            if (!alternative) continue;
            if (error) { el.textContent = "Resource payment unavailable"; continue; }
            try {
                const item = calculateAlternativePayment(Number(el.dataset.itemCc), resource.value);
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
    alternativePayments: ALTERNATIVE_PAYMENTS,
    getPaymentResourceRate,
    calculateAlternativePayment,
    formatAlternativePayment,
    initializePaymentUI
});
