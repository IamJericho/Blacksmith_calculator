(() => {
  const panel = document.getElementById('revenueAnalyticsPanel');
  if (!panel) return;

  panel.innerHTML = `
    <h2>Tek Revenue</h2>
    <p class="note">Totals recorded Tek payments from Orders and Order History. Older orders can use the completion or original order date when a payment date is unavailable. Undated payments appear in All time.</p>
    <div class="row">
      <label for="revenuePeriod">Period
        <select id="revenuePeriod" class="form-select">
          <option value="all">All time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="q1">1st Qtr</option>
          <option value="q2">2nd Qtr</option>
          <option value="q3">3rd Qtr</option>
          <option value="q4">4th Qtr</option>
          <option value="year1">1 year</option>
          <option value="year3">3 year</option>
        </select>
      </label>
      <label for="revenueDate" hidden>Date in the report period
        <input id="revenueDate" class="form-control" type="date">
      </label>
    </div>
    <h3 id="revenueHeading">All time</h3>
    <p id="revenueTotal" role="status"></p>
  `;

  const period = panel.querySelector('#revenuePeriod');
  const date = panel.querySelector('#revenueDate');
  const heading = panel.querySelector('#revenueHeading');
  const result = panel.querySelector('#revenueTotal');
  const usageDate = window.blacksmithUsageDate;
  const today = () => usageDate(new Date().toISOString());
  date.value = today();

  function render() {
    if (location.hash !== '#tek-revenue') return;
    const mode = period.value;
    const range = mode === 'all' ? null : window.blacksmithUsagePeriod(mode, date.value || today());
    date.parentElement.hidden = !range;
    heading.textContent = range ? window.blacksmithUsageHeading(mode, range) : 'All time';

    try {
      const history = JSON.parse(localStorage.getItem('blacksmith-internal-items-v1') || '{}').orderHistory || [];
      const active = JSON.parse(localStorage.getItem('blacksmith-ready-orders-v1') || '[]');
      const seen = new Set();
      let total = 0;
      let count = 0;
      for (const order of [...history, ...active]) {
        if (order.id && seen.has(order.id)) continue;
        if (order.id) seen.add(order.id);
        if (order.paid !== true) continue;
        const match = String(order.payment || '').trim().match(/^([\d,]+(?:\.\d+)?)\s+Tek(?:\s+Ceilings?)?$/i);
        if (!match) continue;
        const amount = Number(match[1].replaceAll(',', ''));
        if (!Number.isFinite(amount)) continue;

        const day = [order.paidAt, order.importedOrderAt, order.completedAt]
          .map(usageDate).find(Boolean);
        if (range && (!day || day < range.start || day >= range.end)) continue;
        total += amount;
        count++;
      }
      result.textContent = total.toLocaleString() + ' Tek Ceilings received · ' + count.toLocaleString() + (count === 1 ? ' paid order' : ' paid orders');
    } catch {
      result.textContent = 'Could not read recorded payments.';
    }
  }

  period.addEventListener('change', render);
  date.addEventListener('change', render);
  for (const event of ['hashchange', 'blacksmith-order-updated', 'blacksmith-order-management-updated', 'blacksmith-courier-delivery-updated', 'storage']) {
    window.addEventListener(event, render);
  }
  render();
})();
