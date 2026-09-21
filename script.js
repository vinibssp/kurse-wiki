// Mobile sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// Search box: filters table rows / dl entries marked with data-search on this page
const search = document.getElementById('search');
if (search) {
  const rows = Array.from(document.querySelectorAll('[data-search]'));
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    rows.forEach(el => {
      const text = el.getAttribute('data-search');
      const hit = !q || text.includes(q);
      el.style.display = hit ? '' : 'none';
      // dt/dd pairs travel together
      if (hit === false && el.tagName === 'DT' && el.nextElementSibling && el.nextElementSibling.tagName === 'DD') {
        el.nextElementSibling.style.display = 'none';
      } else if (el.tagName === 'DT' && el.nextElementSibling && el.nextElementSibling.tagName === 'DD') {
        el.nextElementSibling.style.display = '';
      }
    });
  });
}

// Tier filter pills (used on the item/curse tables)
const filterRow = document.querySelector('.filter-row');
if (filterRow) {
  const buttons = Array.from(filterRow.querySelectorAll('button'));
  const targetRows = Array.from(document.querySelectorAll('tr[data-tier]'));
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tier = btn.getAttribute('data-filter');
      targetRows.forEach(row => {
        row.style.display = (tier === 'all' || row.getAttribute('data-tier') === tier) ? '' : 'none';
      });
    });
  });
}
