(() => {
  const panel = document.getElementById('revenueAnalyticsPanel');
  if (!panel) return;

  panel.innerHTML = `
    <h2>Tek Revenue</h2>
    <p class="note">Totals recorded Tek payments from Orders and Order History. Older orders can use the completion or original order date when a payment date is unavailable. Undated payments appear in All time.</p>
    <div class="catalog-tabs" role="group" aria-label="Tek revenue period">
      <button class="catalog-tab" type="button" data-period="weekly" aria-pressed="false">Weekly</button>
      <button class="catalog-tab" type="button" data-period="monthly" aria-pressed="false">Monthly</button>
      <button class="catalog-tab" type="button" data-period="q1" aria-pressed="false">1st Qtr</button>
      <button class="catalog-tab" type="button" data-period="q2" aria-pressed="false">2nd Qtr</button>
      <button class="catalog-tab" type="button" data-period="q3" aria-pressed="false">3rd Qtr</button>
      <button class="catalog-tab" type="button" data-period="q4" aria-pressed="false">4th Qtr</button>
      <button class="catalog-tab" type="button" data-period="year1" aria-pressed="false">1 year</button>
      <button class="catalog-tab" type="button" data-period="year3" aria-pressed="false">3 year</button>
      <button class="catalog-tab" type="button" data-period="all" aria-pressed="true">All time</button>
    </div>
    <div class="row" id="revenuePeriodControls" hidden>
      <button class="btn btn-secondary" type="button" id="revenuePrevious">Previous period</button>
      <label for="revenueDate">Report ending date (quarters use its year)
        <input id="revenueDate" class="form-control" type="date">
      </label>
      <label id="revenueYearLabel" hidden>Quarter year
        <input id="revenueYear" class="form-control" type="number" min="1900" max="9998" step="1">
      </label>
      <button class="btn btn-secondary" type="button" id="revenueNext">Next period</button>
      <button class="btn btn-secondary" type="button" id="revenueToday">Current period</button>
    </div>
    <h3 id="revenueHeading">All time</h3>
    <p id="revenueTotal" role="status"></p>
  `;

  const periodButtons = panel.querySelectorAll('button[data-period]');
  const controls = panel.querySelector('#revenuePeriodControls');
  const yearLabel = panel.querySelector('#revenueYearLabel');
  const year = panel.querySelector('#revenueYear');
  let mode = 'all';
  const date = panel.querySelector('#revenueDate');
  const heading = panel.querySelector('#revenueHeading');
  const result = panel.querySelector('#revenueTotal');
  const usageDate = window.blacksmithUsageDate;
  const today = () => usageDate(new Date().toISOString());
  date.value = today();

  function render() {
    if (location.hash !== '#tek-revenue') return;
    const range = mode === 'all' ? null : window.blacksmithUsagePeriod(mode, date.value || today());
    controls.hidden = !range;
    yearLabel.hidden = !/^q[1-4]$/.test(mode);
    year.value = (date.value || today()).slice(0, 4);
    for (const button of periodButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.period === mode));
    }
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

  for (const button of periodButtons) {
    button.addEventListener('click', () => {
      mode = button.dataset.period;
      render();
    });
  }
  for (const [id, step] of [['#revenuePrevious', -1], ['#revenueNext', 1]]) {
    panel.querySelector(id).addEventListener('click', () => {
      date.value = window.blacksmithShiftUsagePeriod(mode, date.value || today(), step);
      render();
    });
  }
  panel.querySelector('#revenueToday').addEventListener('click', () => {
    date.value = today();
    render();
  });
  year.addEventListener('change', () => {
    const selectedYear = year.valueAsNumber;
    if (!Number.isInteger(selectedYear) || selectedYear < 1900 || selectedYear > 9998) return;
    date.value = selectedYear + '-01-01';
    render();
  });
  date.addEventListener('change', render);
  for (const event of ['hashchange', 'blacksmith-order-updated', 'blacksmith-order-management-updated', 'blacksmith-courier-delivery-updated', 'storage']) {
    window.addEventListener(event, render);
  }
  render();
})();
