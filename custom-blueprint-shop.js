(function(){
  function refresh() {
    const active = new Set();
    for (const entry of window.blacksmithCustomShopItems || []) {
      const dataName = entry.category ? entry.category + '|' + entry.name : entry.name;
      const table = document.getElementById(entry.group);
      if (!table) continue;
      active.add(entry.id);
      let row = [...table.querySelectorAll('tr')].find(row => row.querySelector('select')?.dataset.name === dataName);
      if (!row) {
        row = document.createElement('tr');
        const label = document.createElement('td');
        const quantity = document.createElement('td');
        const select = document.createElement('select');
        select.className = 'form-select form-select-sm';
        select.dataset.group = entry.group;
        select.dataset.name = dataName;
        select.setAttribute('aria-label', 'Quantity for ' + entry.name);
        for (let i = 0; i <= 100; i++) select.add(new Option(String(i), String(i)));
        select.addEventListener('change', () => { if (typeof window.calc === 'function') window.calc(); });
        quantity.append(select);
        row.append(label, quantity);
        table.append(row);
      }
      row.dataset.customBlueprintId = entry.id;
      const cell = row.cells[0];
      cell.replaceChildren(document.createTextNode(entry.name + (entry.category ? ' · ' + entry.category : '') + ' — '));
      const price = document.createElement('span');
      price.dataset.blueprintShopPrice = '';
      price.textContent = String(entry.items[entry.name].tek);
      const alternative = document.createElement('span');
      alternative.className = 'item-alternative';
      alternative.dataset.itemCc = price.textContent;
      alternative.hidden = true;
      cell.append(price, document.createTextNode(' TEK'), alternative);
    }
    for (const row of document.querySelectorAll('tr[data-custom-blueprint-id]')) if (!active.has(row.dataset.customBlueprintId)) row.remove();
    window.dispatchEvent(new Event('blacksmith-blueprint-pricing-change'));
  }
  window.addEventListener('blacksmith-custom-shop-change', refresh);
  refresh();
})();
