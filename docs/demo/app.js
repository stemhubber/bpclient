const business = {
  name: 'Sweet n Lovely',
  location: 'Makhabeni Road, Khayelitsha, Cape Town, 7784',
  phone: '+27 71 793 9711',
  hours: 'Every day, 10:00–22:00',
  description: 'Sweet n Lovely Kitchen offers authentic home-cooked African meals made with love and tradition.'
};

// Product names, sizes, prices, descriptions and availability mirror the current Sweet n Lovely catalog.
const menu = window.SWEET_LOVELY_MENU;

const orders = [
  { id: 'BP-1048', name: 'Lihle M.', phone: '••• 2871', time: '12:42', elapsed: '2 min', status: 'pending', method: 'Pay in store', note: 'Please pack the sauce on the side', items: [{ qty: 1, name: 'Cape Town Pizza · Large', price: 160 }, { qty: 1, name: 'Garlic Pita · Small', price: 30 }] },
  { id: 'BP-1047', name: 'Siyabonga K.', phone: '••• 6304', time: '12:36', elapsed: '8 min', status: 'preparing', method: 'Cash', note: '', items: [{ qty: 1, name: 'Khayelitsha Pizza · Large', price: 120 }] },
  { id: 'BP-1046', name: 'Aphiwe N.', phone: '••• 1159', time: '12:31', elapsed: '13 min', status: 'preparing', method: 'Pay in store', note: 'No tomato, please', items: [{ qty: 1, name: 'Chicken Mayo Pizza · Large', price: 115 }, { qty: 1, name: 'Garlic Pita · Small', price: 30 }] },
  { id: 'BP-1045', name: 'Lwazi P.', phone: '••• 5028', time: '12:25', elapsed: '19 min', status: 'ready', method: 'Cash', note: '', items: [{ qty: 1, name: 'Meatlovers Pizza · Small', price: 75 }] },
  { id: 'BP-1044', name: 'Zoleka T.', phone: '••• 4830', time: '12:18', elapsed: '26 min', status: 'ready', method: 'Pay in store', note: 'Extra olives, please', items: [{ qty: 1, name: 'Vegetarian Pizza · Large', price: 115 }] },
  { id: 'BP-1043', name: 'Noluthando B.', phone: '••• 7220', time: '12:02', elapsed: '42 min', status: 'completed', method: 'Cash', note: '', items: [{ qty: 1, name: 'Hawaiian Pizza · Large', price: 115 }] },
  { id: 'BP-1042', name: 'Thando J.', phone: '••• 0192', time: '11:48', elapsed: '56 min', status: 'completed', method: 'Pay in store', note: '', items: [{ qty: 2, name: 'Margherita Pizza · Small', price: 60 }] }
];

const state = { view: 'overview', filter: 'all', query: '', menuCategory: 'All items', menuQuery: '', acceptingOrders: true };
const root = document.querySelector('#page-content');
const currency = value => `R${Number(value).toLocaleString('en-ZA')}`;
const safeText = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
let receiptTrigger = null;
const total = order => order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
const activeOrders = () => orders.filter(order => order.status !== 'completed');
const statusLabel = status => ({ pending: 'New', preparing: 'Preparing', ready: 'Ready', completed: 'Completed' }[status] || status);
const statusPill = status => `<span class="status-chip status-${status}">${statusLabel(status)}</span>`;
const countPending = () => orders.filter(order => order.status === 'pending').length;

function setDate() {
  document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
}
function orderRow(order) {
  const itemText = order.items.map(item => `${item.qty > 1 ? `${item.qty}× ` : ''}${item.name}`).join(', ');
  return `<div class="order-row"><div><div class="order-ref">${order.id}</div><div class="order-meta">Today · ${order.time}</div></div><div><div class="order-customer">${order.name}</div><div class="order-items">${itemText}</div></div><div><div class="order-amount">${currency(total(order))}</div><div style="margin-top:6px;text-align:right">${statusPill(order.status)}</div></div></div>`;
}
function mostOrdered() {
  const tally = {};
  orders.forEach(order => order.items.forEach(item => { tally[item.name] = (tally[item.name] || 0) + item.qty; }));
  return Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
}
function dashboard() {
  const value = orders.reduce((sum, order) => sum + total(order), 0), top = mostOrdered();
  const completed = orders.filter(order => order.status === 'completed').length;
  const available = menu.filter(item => item.available).length;
  return `<section class="page-heading"><div><div class="eyebrow">${business.name} · Today</div><h1>Service overview</h1><p>Pickup orders and menu activity for the main kitchen.</p></div><div class="heading-actions"><span class="sample-data-label"><i></i> Example data</span><button class="primary-button" data-go="kitchen">Review ${countPending()} new order${countPending() === 1 ? '' : 's'}</button></div></section>
    <section class="metric-grid" aria-label="Today’s service summary"><article class="metric-card"><div class="metric-top">Orders received</div><div class="metric-value">${orders.length}</div><div class="metric-note">Example orders for today</div></article><article class="metric-card"><div class="metric-top">Order value</div><div class="metric-value">${currency(value)}</div><div class="metric-note">Example data · not sales</div></article><article class="metric-card"><div class="metric-top">In progress</div><div class="metric-value">${activeOrders().length}</div><div class="metric-note">${orders.filter(order => order.status === 'ready').length} ready for pickup</div></article><article class="metric-card"><div class="metric-top">Menu availability</div><div class="metric-value">${available}<small> / ${menu.length}</small></div><div class="metric-note">Items currently available</div></article></section>
    <section class="dashboard-grid"><article class="panel"><div class="panel-heading"><div><h2>Recent orders</h2><p>Example tickets · newest first</p></div><button class="text-button" data-go="orders">View all orders</button></div><div class="order-list">${orders.slice(0, 5).map(orderRow).join('')}</div></article><article class="panel service-summary"><div class="panel-heading"><div><h2>Kitchen status</h2><p>Current example order queue</p></div></div><div class="queue-summary"><div><span class="queue-dot pending"></span><span>New</span><strong>${countPending()}</strong></div><div><span class="queue-dot preparing"></span><span>Preparing</span><strong>${orders.filter(order => order.status === 'preparing').length}</strong></div><div><span class="queue-dot ready"></span><span>Ready for pickup</span><strong>${orders.filter(order => order.status === 'ready').length}</strong></div></div><div class="summary-note"><strong>Most ordered in this sample</strong><span>${top[0]} · ${top[1]} servings</span></div><button class="secondary-button full-button" data-go="menu">Manage menu availability</button></article></section>
    <p class="data-disclosure">All customer names, order activity and totals on this screen are example data for the product demo.</p>`;
}
function kitchen() {
  const columns = [{ key: 'pending', title: 'New orders', action: 'Start preparing', next: 'preparing' }, { key: 'preparing', title: 'Preparing', action: 'Mark ready', next: 'ready' }, { key: 'ready', title: 'Ready for pickup', action: 'Complete order', next: 'completed' }];
  return `<section class="page-heading"><div><div class="eyebrow">${business.name} · Example orders</div><h1>Kitchen queue</h1><p>Move each pickup order through preparation and handoff.</p></div><span class="sample-data-label"><i></i> Example data</span></section><div class="kitchen-intro"><div class="kitchen-status"><strong>${activeOrders().length} orders in progress</strong> · ${countPending()} need attention</div></div><section class="kitchen-columns">${columns.map(column => { const items = orders.filter(order => order.status === column.key); return `<div class="kitchen-column"><div class="column-heading"><span>${column.title}</span><span>${items.length} ${items.length === 1 ? 'order' : 'orders'}</span></div>${items.length ? items.map(order => `<article class="ticket"><div class="ticket-top"><span class="ticket-number">${order.id}</span><span class="ticket-time">${order.elapsed} ago</span></div><div class="ticket-customer">${order.name} · ${order.time} · ${order.method}</div><div class="ticket-lines">${order.items.map(item => `<div class="ticket-line"><b>${item.qty}×</b><span>${item.name}</span></div>`).join('')}</div>${order.note ? `<div class="ticket-note">Kitchen note · ${order.note}</div>` : ''}<div class="ticket-footer"><span class="ticket-total">${currency(total(order))}</span><button class="ticket-action ${column.next === 'completed' ? 'ready-action' : ''}" data-order="${order.id}" data-next="${column.next}">${column.action}</button></div></article>`).join('') : '<div class="empty-state">No orders in this stage.</div>'}</div>`; }).join('')}</section>`;
}
function ordersPage() {
  const statuses = ['all', 'pending', 'preparing', 'ready', 'completed'];
  const filtered = orders.filter(order => (state.filter === 'all' || order.status === state.filter) && `${order.id} ${order.name} ${order.items.map(i => i.name).join(' ')}`.toLowerCase().includes(state.query.toLowerCase()));
  return `<section class="page-heading"><div><div class="eyebrow">${business.name} · Main kitchen</div><h1>Orders</h1><p>Search and update pickup orders from one list.</p></div><button class="secondary-button" id="export-button">Export CSV</button></section><section class="panel"><div class="order-toolbar"><div class="filter-row" aria-label="Filter orders">${statuses.map(status => `<button class="filter-button ${state.filter === status ? 'active' : ''}" data-filter="${status}" aria-pressed="${state.filter === status}">${status === 'all' ? 'All orders' : statusLabel(status)}<span> ${status === 'all' ? orders.length : orders.filter(order => order.status === status).length}</span></button>`).join('')}</div><label class="search-box"><span aria-hidden="true">⌕</span><input id="order-search" type="search" placeholder="Search by order, customer or item" value="${safeText(state.query)}" aria-label="Search orders" /></label></div><div class="table-wrap"><table class="orders-table"><thead><tr><th scope="col">ORDER</th><th scope="col">CUSTOMER</th><th scope="col">ITEMS</th><th scope="col">PAYMENT</th><th scope="col">STATUS</th><th scope="col">TOTAL</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>${filtered.length ? filtered.map(order => `<tr><td><span class="table-ref">${order.id}</span><span class="table-sub">Today, ${order.time}</span></td><td><span class="table-customer">${order.name}</span><span class="table-sub">${order.phone}</span></td><td>${order.items.map(item => `${item.qty}× ${item.name}`).join('<br>')}</td><td>${order.method}</td><td>${statusPill(order.status)}</td><td class="table-total">${currency(total(order))}</td><td><button class="table-action" data-receipt="${order.id}" aria-label="Preview receipt for ${order.id}">Receipt</button></td></tr>`).join('') : '<tr><td colspan="7" class="empty-state"><strong>No matching orders</strong><span>Clear the search or choose another status filter.</span></td></tr>'}</tbody></table></div></section><p class="data-disclosure">Example orders are shown for this product demo. No customer data is connected.</p>`;
}
function menuPage() {
  const categories = ['All items', ...new Set(menu.map(item => item.category))];
  const query = state.menuQuery.trim().toLowerCase();
  const filtered = menu.filter(item => (state.menuCategory === 'All items' || item.category === state.menuCategory) && (!query || `${item.name} ${item.desc}`.toLowerCase().includes(query)));
  const availableCount = menu.filter(item => item.available).length;
  return `<section class="page-heading"><div><div class="eyebrow">${business.name} · Customer menu</div><h1>Menu</h1><p>${menu.length} items · ${availableCount} available to customers</p></div><button class="secondary-button" id="add-menu-item">Add menu item</button></section><section class="panel"><div class="order-toolbar"><div class="menu-tools" aria-label="Filter menu by category">${categories.map(category => `<button class="menu-category ${state.menuCategory === category ? 'active' : ''}" data-category="${category}" aria-pressed="${state.menuCategory === category}">${category}</button>`).join('')}</div><label class="search-box"><span aria-hidden="true">⌕</span><input id="menu-search" type="search" placeholder="Search the menu" value="${safeText(state.menuQuery)}" aria-label="Search menu items" /></label></div><div class="menu-grid">${filtered.map(item => `<article class="menu-card"><div class="menu-card-top"><span class="menu-status ${item.available ? '' : 'off'}">${item.available ? 'Available' : 'Sold out'}</span><span class="menu-card-category">${item.category}</span></div><h3>${item.name}</h3><p class="menu-description">${item.desc}</p><div class="menu-card-bottom"><span class="menu-price"><span>Small</span> ${currency(item.small)} <span>· Large</span> ${currency(item.large)}</span><button class="availability-toggle ${item.available ? 'on' : ''}" role="switch" aria-checked="${item.available}" data-availability="${item.id}" aria-label="${item.name} availability"><i></i></button></div></article>`).join('') || '<div class="empty-state no-results"><strong>No matching menu items</strong><span>Try another search or category.</span></div>'}</div><p class="data-disclosure">Menu availability changes are temporary in this demo and reset when you reload.</p></section>`;
}
function settingsPage() {
  return `<section class="page-heading"><div><div class="eyebrow">${business.name}</div><h1>Business settings</h1><p>Review the details shown to customers and on receipts.</p></div></section><section class="panel settings-preview"><div class="settings-block"><div><strong>Business profile</strong><p>${business.name} · ${business.location} · ${business.phone}</p></div><span class="settings-note">View only in this demo</span></div><div class="settings-block"><div><strong>Order availability</strong><p>Customers can place pickup orders during ${business.hours}.</p></div><span class="service-pill"><i></i> Open</span></div><div class="settings-block"><div><strong>Receipt identity</strong><p>${business.name} · South African rand · Main kitchen</p></div><button class="secondary-button" data-receipt="BP-1048">Preview receipt</button></div><div class="settings-block"><div><strong>Team access</strong><p>Owner and kitchen staff</p></div><span class="settings-note">Team management is not included in this demo</span></div></section>`;
}
function pricingPage() {
  return `<section class="page-heading"><div><div class="eyebrow">A simple way to get started</div><h1>Pricing &amp; proposal</h1><p>A practical first offer for Sweet n Lovely, based on the ordering and kitchen workflow in this demo.</p></div><a class="secondary-button" style="text-decoration:none;color:var(--ink)" href="storefront.html" target="_blank" rel="noopener">View customer storefront ↗</a></section>
    <section class="proposal-banner"><div><span class="proposal-label"><i></i> CURRENT STATUS · NO PLAN SELECTED</span><h2>Suggested launch offer: Starter.</h2><p>A clear first price to test with a real pilot before making it your standard plan.</p></div><div class="proposal-stamp">A proposal<br>for discussion</div></section>
    <section class="pricing-layout"><article class="plan-card"><div class="plan-card-head"><div><span class="plan-eyebrow">RECOMMENDED STARTER PLAN</span><h2>Starter</h2><p>For one food business getting online orders organised.</p></div><span class="plan-mark">BP</span></div><div class="plan-price"><strong>R299</strong><span>/ month</span></div><p class="plan-qualifier">Proposed terms: 30 days free, then R299/month if accepted.</p><div class="plan-divider"></div><ul class="plan-features"><li><i>✓</i> Customer storefront with your menu and prices</li><li><i>✓</i> Pickup orders in one kitchen view</li><li><i>✓</i> Menu updates and item availability</li><li><i>✓</i> Order status tracking and receipt previews</li><li><i>✓</i> One business location and owner account</li></ul><button class="proposal-cta" data-toast="This is a proposal mockup. No subscription or pilot request is submitted.">Discuss this proposal <span>→</span></button><p class="plan-fineprint">Indicative terms only. Nothing is active or charged by this demo.</p></article>
    <div class="proposal-side"><article class="proposal-card"><span class="proposal-number">01</span><div><h3>Try it with real service</h3><p>Run a 30-day pilot with one location and your real menu. Check whether customers use the storefront and whether the kitchen view saves time.</p></div><span class="proposal-tag">Suggested pilot</span></article><article class="proposal-card"><span class="proposal-number">02</span><div><h3>Keep the first offer simple</h3><p>No setup fee during the pilot and no BitePilot commission on orders. If online card payments are added later, payment-provider fees would be quoted separately.</p></div><span class="proposal-tag">Clear costs</span></article><article class="proposal-card"><span class="proposal-number">03</span><div><h3>Review before committing</h3><p>At the end of the pilot, review order volume, customer feedback and staff experience, then confirm the plan and final price together.</p></div><span class="proposal-tag">No pressure</span></article></div></section>
    <section class="pricing-footnote"><span>WHAT THIS PRICE IS</span><p>A starting proposal to test willingness to pay. It is not a published BitePilot rate, contract or live subscription. Customer food prices stay with Sweet n Lovely; any future payment processing charges would be separate.</p><button class="text-button" data-go="menu">Review the menu setup →</button></section>`;
}
function render() {
  const labels = { overview: 'Overview', kitchen: 'Kitchen', orders: 'Orders', menu: 'Menu', pricing: 'Pricing & proposal', settings: 'Settings' };
  document.querySelector('#breadcrumb-current').textContent = labels[state.view] || 'Overview';
  root.innerHTML = ({ overview: dashboard, kitchen, orders: ordersPage, menu: menuPage, pricing: pricingPage, settings: settingsPage }[state.view] || dashboard)();
  if (state.view === 'menu') {
    root.querySelectorAll('.menu-card').forEach(card => {
      const item = menu.find(entry => entry.name === card.querySelector('h3')?.textContent);
      if (!item) return;
      const media = document.createElement('div');
      media.className = `menu-thumb${item.image ? '' : ' menu-thumb-fallback'}`;
      if (item.image) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.imageAlt || item.name;
        image.loading = 'lazy';
        image.addEventListener('error', () => { media.classList.add('image-unavailable'); image.remove(); media.textContent = 'Photo unavailable'; }, { once: true });
        media.append(image);
      } else {
        media.textContent = item.category;
      }
      card.prepend(media);
    });
  }
  if (state.view === 'settings') {
    const availability = root.querySelectorAll('.settings-block')[1];
    const description = availability?.querySelector('p');
    const status = availability?.querySelector('.service-pill');
    if (description) description.textContent = state.acceptingOrders ? `Customers can place pickup orders during ${business.hours}.` : 'New pickup orders are paused until the kitchen opens again.';
    if (status) { status.innerHTML = `<i></i> ${state.acceptingOrders ? 'Open' : 'Paused'}`; status.classList.toggle('is-closed', !state.acceptingOrders); }
  }
  document.querySelectorAll('.nav-item[data-view]').forEach(button => {
    const active = button.dataset.view === state.view;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  });
  document.querySelector('#nav-new-count').textContent = countPending();
  document.querySelector('#top-new-count').textContent = countPending();
  document.querySelector('#top-new-count').parentElement.innerHTML = `<span class="new-orders-count">${countPending()}</span> ${countPending() === 1 ? 'New order' : 'New orders'}`;
  const storefrontHref = `storefront.html?orders=${state.acceptingOrders ? 'open' : 'paused'}`;
  document.querySelector('#storefront-button').href = storefrontHref;
  root.querySelectorAll('a[href="storefront.html"]').forEach(link => { link.href = storefrontHref; });
  const openToggle = document.querySelector('#sidebar-open-toggle');
  const serviceToggle = document.querySelector('#service-toggle');
  [openToggle, serviceToggle].forEach(toggle => {
    if (!toggle) return;
    toggle.setAttribute('aria-checked', String(state.acceptingOrders));
    toggle.classList.toggle('is-closed', !state.acceptingOrders);
    const label = toggle.querySelector('b') || toggle.querySelector('span');
    if (label) label.textContent = state.acceptingOrders ? 'Taking orders' : 'Orders paused';
  });
  const sideDetail = openToggle?.querySelector('small');
  if (sideDetail) sideDetail.textContent = state.acceptingOrders ? 'Customers can order now' : 'Customers cannot order';
  document.querySelector('#storefront-button').innerHTML = '<span aria-hidden="true">↗</span> Preview storefront'; bindPageEvents();
}
function bindPageEvents() {
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { state.filter = button.dataset.filter; render(); document.querySelector(`[data-filter="${state.filter}"]`)?.focus(); }));
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { state.menuCategory = button.dataset.category; render(); document.querySelector(`[data-category="${state.menuCategory}"]`)?.focus(); }));
  document.querySelectorAll('[data-order][data-next]').forEach(button => button.addEventListener('click', () => changeStatus(button.dataset.order, button.dataset.next)));
  document.querySelectorAll('[data-receipt]').forEach(button => button.addEventListener('click', () => showReceipt(button.dataset.receipt)));
  document.querySelectorAll('[data-availability]').forEach(button => button.addEventListener('click', () => toggleAvailability(button.dataset.availability)));
  document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => toast(button.dataset.toast)));
  const search = document.querySelector('#order-search');
  if (search) search.addEventListener('input', event => { state.query = event.target.value; const cursor = event.target.selectionStart; render(); const next = document.querySelector('#order-search'); next.focus(); next.setSelectionRange(cursor, cursor); });
  const menuSearch = document.querySelector('#menu-search');
  if (menuSearch) menuSearch.addEventListener('input', event => { state.menuQuery = event.target.value; const cursor = event.target.selectionStart; render(); const next = document.querySelector('#menu-search'); next.focus(); next.setSelectionRange(cursor, cursor); });
  const exportButton = document.querySelector('#export-button'); if (exportButton) exportButton.addEventListener('click', exportOrders);
  const addItem = document.querySelector('#add-menu-item'); if (addItem) addItem.addEventListener('click', showAddMenuItemModal);
}
function go(view) { state.view = view; render(); root.focus({ preventScroll: true }); }
function changeStatus(id, status) { const order = orders.find(entry => entry.id === id); if (!order) return; order.status = status; toast(status === 'ready' ? `${id} is ready for pickup` : status === 'completed' ? `${id} marked as completed` : `${id} moved to preparation`); render(); document.querySelector(`[data-order="${id}"]`)?.focus(); }
function toggleAvailability(id) { const item = menu.find(entry => entry.id === id); if (!item) return; item.available = !item.available; toast(`${item.name} marked ${item.available ? 'available' : 'sold out'} for this demo`); render(); document.querySelector(`[data-availability="${id}"]`)?.focus(); }
function toggleOrderAvailability() { state.acceptingOrders = !state.acceptingOrders; render(); toast(state.acceptingOrders ? 'The storefront is open for pickup orders.' : 'New pickup orders are paused.'); }
function toast(message, type = 'success') { const region = document.querySelector('#toast-region'); const element = document.createElement('div'); element.className = `toast toast-${type}`; element.setAttribute('role', type === 'error' ? 'alert' : 'status'); element.textContent = message; region.appendChild(element); window.setTimeout(() => element.remove(), 3200); }
function showAddMenuItemModal() {
  receiptTrigger = document.activeElement;
  const categories = [...new Set(menu.map(item => item.category))];
  document.querySelector('#modal-root').innerHTML = `<div class="modal-backdrop" id="menu-modal-backdrop"><section class="receipt-modal menu-dialog" role="dialog" aria-modal="true" aria-labelledby="menu-dialog-title"><div class="modal-top"><div><h2 id="menu-dialog-title">Add a menu item</h2><p>It will be added for this demo session only.</p></div><button class="close-modal" id="close-menu-dialog" aria-label="Close form">×</button></div><form id="menu-item-form" novalidate><div class="form-field"><label for="new-item-name">Item name</label><input id="new-item-name" name="name" required maxlength="48" autocomplete="off" placeholder="For example: Garden Special Pizza"><span class="field-help">Use the name customers will see on the menu.</span></div><div class="form-field"><label for="new-item-description">Description</label><textarea id="new-item-description" name="description" required maxlength="120" rows="3" placeholder="List the main toppings or ingredients"></textarea></div><div class="form-grid"><div class="form-field"><label for="new-item-small">Small price (R)</label><input id="new-item-small" name="small" type="number" min="1" step="1" inputmode="numeric" required></div><div class="form-field"><label for="new-item-large">Large price (R)</label><input id="new-item-large" name="large" type="number" min="1" step="1" inputmode="numeric" required></div></div><div class="form-field"><label for="new-item-category">Category</label><select id="new-item-category" name="category" required>${categories.map(category => `<option value="${category}">${category}</option>`).join('')}</select></div><div class="dialog-actions"><button type="button" class="secondary-button" id="cancel-menu-dialog">Cancel</button><button type="submit" class="primary-button">Add to menu</button></div></form></section></div>`;
  const form = document.querySelector('#menu-item-form');
  document.querySelector('#new-item-name').focus();
  document.querySelector('#close-menu-dialog').addEventListener('click', closeReceipt);
  document.querySelector('#cancel-menu-dialog').addEventListener('click', closeReceipt);
  document.querySelector('#menu-modal-backdrop').addEventListener('click', event => { if (event.target.id === 'menu-modal-backdrop') closeReceipt(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form), small = Number(fields.get('small')), large = Number(fields.get('large'));
    const nameField = document.querySelector('#new-item-name'), descriptionField = document.querySelector('#new-item-description');
    const name = String(fields.get('name')).trim(), description = String(fields.get('description')).trim();
    nameField.setCustomValidity(name ? '' : 'Enter an item name.');
    descriptionField.setCustomValidity(description ? '' : 'Enter a short description.');
    const largeField = document.querySelector('#new-item-large');
    largeField.setCustomValidity(large <= small ? 'Large size price must be higher than the small size price.' : '');
    if (!form.reportValidity()) return;
    if (menu.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      nameField.setCustomValidity('An item with this name is already on the menu.'); nameField.reportValidity(); nameField.addEventListener('input', () => nameField.setCustomValidity(''), { once: true }); return;
    }
    const itemId = `p-new-${Date.now()}`;
    menu.push({ id: itemId, name, desc: description, small, large, available: true, wait: 15, category: String(fields.get('category')), icon: '' });
    state.menuCategory = 'All items'; state.menuQuery = ''; closeReceipt(); render(); document.querySelector(`[data-availability="${itemId}"]`)?.focus(); toast(`${name} added to the menu for this demo session.`);
  });
}
function showReceipt(id) {
  const order = orders.find(entry => entry.id === id); if (!order) return;
  receiptTrigger = document.activeElement;
  document.querySelector('#modal-root').innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><section class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-heading"><div class="modal-top"><h2 id="receipt-heading">Receipt preview</h2><button class="close-modal" id="close-receipt" aria-label="Close receipt">×</button></div><div class="receipt-paper"><div class="receipt-brand"><span>Bite</span>Pilot</div><div class="receipt-sub">A customer order receipt · demo</div><hr class="receipt-rule"><div class="receipt-title">${business.name}</div><div class="receipt-sub">Khayelitsha · Thank you for supporting local</div><hr class="receipt-rule"><div class="receipt-meta"><span>Order</span><strong>${order.id}</strong></div><div class="receipt-meta"><span>Placed today at</span><strong>${order.time}</strong></div><div class="receipt-meta"><span>Customer</span><strong>${order.name}</strong></div><hr class="receipt-rule">${order.items.map(item => `<div class="receipt-line"><span>${item.qty} × ${item.name}</span><span>${currency(item.price * item.qty)}</span></div>`).join('')}<hr class="receipt-rule"><div class="receipt-meta"><span>Payment</span><span>${order.method} · not processed</span></div><div class="receipt-total"><span>Order total</span><span>${currency(total(order))}</span></div><p class="receipt-thanks">Keep this receipt for your order details.</p></div><div class="receipt-actions"><button id="print-receipt">Print receipt</button></div></section></div>`;
  document.querySelector('#close-receipt').addEventListener('click', closeReceipt); document.querySelector('#modal-backdrop').addEventListener('click', event => { if (event.target.id === 'modal-backdrop') closeReceipt(); }); document.querySelector('#print-receipt').addEventListener('click', () => window.print()); document.querySelector('#close-receipt').focus(); document.addEventListener('keydown', escapeReceipt, { once: true });
}
function escapeReceipt(event) { if (event.key === 'Escape') closeReceipt(); }
function closeReceipt() { document.querySelector('#modal-root').innerHTML = ''; receiptTrigger?.focus(); receiptTrigger = null; }
function exportOrders() {
  try {
    const rows = [['Order', 'Customer', 'Time', 'Items', 'Payment method', 'Status', 'Order total'], ...orders.map(order => [order.id, order.name, order.time, order.items.map(item => `${item.qty}x ${item.name}`).join('; '), order.method, statusLabel(order.status), total(order)])];
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a'); link.href = url; link.download = 'bitepilot-sweet-n-lovely-demo-orders.csv'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Example orders exported as a CSV.');
  } catch (error) {
    toast('Could not export the example orders. Please try again.', 'error');
  }
}

document.querySelector('#main-nav').addEventListener('click', event => { const button = event.target.closest('[data-view]'); if (button) go(button.dataset.view); });
document.querySelector('#sidebar-open-toggle').addEventListener('click', toggleOrderAvailability);
document.querySelector('#service-toggle').addEventListener('click', toggleOrderAvailability);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && document.querySelector('#modal-root').innerHTML) closeReceipt(); });
setDate(); render();
