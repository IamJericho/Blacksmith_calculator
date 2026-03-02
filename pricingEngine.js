// =============================
// DTJ Pricing Engine (Corrected)
// =============================

// -----------------------------
// Locked Economic Rules
// -----------------------------

const DEDI_PRICE = {
    A: 400, B: 400, C: 500, E: 800, F: 400, FW: 500,
    G: 500, H: 500, I: 1000, K: 500, L: 500, M: 500,
    N: 400, O: 400, OP: 500, P: 800, R: 500, RM: 400,
    S: 400, T: 500, U: 500, V: 500, W: 500,
    X: 500, Y: 500, Z: 500, BP: 500, GB: 500
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
    I: 100,
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
    GB: 100
};

// -----------------------------
// Red Element Conversion
// -----------------------------

// 1 Dust Dedi = 1000 Tek
// 1 Dedi = 1800 stacks
// 1 RE = 2 dust stacks
const TEK_PER_RE = (1000 / 1800) * 2; // 1.111111...

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

        if (key === "D") continue; // Ignore durability

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

        if (!tekPerStack) continue;

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