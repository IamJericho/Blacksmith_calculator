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
