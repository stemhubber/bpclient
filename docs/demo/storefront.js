const storeBusiness = { hours: 'Every day, 10:00–22:00', phone: '+27 71 793 9711' };
const storeMenu = window.SWEET_LOVELY_MENU;
storeBusiness.acceptingOrders = new URLSearchParams(window.location.search).get('orders') !== 'paused';
const storeState = { category: 'All items', query: '', cart: [], note: '' };
const storeRoot = document.querySelector('#standalone-storefront');
const money = value => `R${Number(value).toLocaleString('en-ZA')}`;
const cartCount = () => storeState.cart.reduce((sum, line) => sum + line.qty, 0);
const cartTotal = () => storeState.cart.reduce((sum, line) => sum + line.qty * line.price, 0);
const safeText = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function basket() {
  if (!storeState.cart.length) return '<div class="cart-empty"><strong>Your basket is empty</strong><p>Choose a size from the menu to add an item.</p></div>';
  return `<div class="cart-lines">${storeState.cart.map((line, index) => `<div class="cart-line"><div class="cart-line-copy"><strong>${line.name}</strong><span>${line.size} · ${money(line.price)} each</span></div><div class="quantity-control"><button data-qty="${index}" data-delta="-1" aria-label="Remove one ${line.name}">−</button><span aria-label="Quantity ${line.qty}">${line.qty}</span><button data-qty="${index}" data-delta="1" aria-label="Add one ${line.name}">+</button></div></div>`).join('')}</div><label class="order-note-label" for="basket-note">Note for the kitchen <span>Optional</span></label><textarea id="basket-note" maxlength="180" aria-describedby="basket-note-help" placeholder="For example: please pack the sauce separately">${safeText(storeState.note)}</textarea><p class="field-help" id="basket-note-help">Up to 180 characters. Keep notes relevant to preparing your order.</p><div class="cart-total-row"><span>Subtotal</span><strong>${money(cartTotal())}</strong></div><p class="cart-demo-note">Pickup payment · no payment is taken in this demo.</p><button class="checkout-button" id="review-order">Review basket <span>→</span></button>`;
}
function productCard(item) {
  return `<article class="store-product ${item.available ? '' : 'sold-out'}"><div class="product-topline"><span class="product-category">${item.category}</span>${item.available ? `<span class="prep-tag">About ${item.wait} min</span>` : '<span class="sold-out-tag">Sold out</span>'}</div><h3>${item.name}</h3><p class="product-description">${item.desc}</p><div class="size-prices"><span><small>SMALL</small><strong>${money(item.small)}</strong></span><span><small>LARGE</small><strong>${money(item.large)}</strong></span></div>${item.available ? `<div class="product-actions"><button data-add="${item.id}" data-size="Small" aria-label="Add small ${item.name} to basket">Add small</button><button data-add="${item.id}" data-size="Large" aria-label="Add large ${item.name} to basket">Add large</button></div>` : '<p class="unavailable-note">This item is temporarily unavailable.</p>'}</article>`;
}
function render() {
  const categories = ['All items', 'Classics', 'Meaty', 'Chicken', 'Veggie & more', 'Specials', 'Sides'];
  const query = storeState.query.trim().toLowerCase();
  const visible = storeMenu.filter(item => (storeState.category === 'All items' || item.category === storeState.category) && (!query || `${item.name} ${item.desc}`.toLowerCase().includes(query)));
  storeRoot.innerHTML = `<section class="storefront"><header class="store-hero"><div class="store-hero-copy"><div class="store-badge"><i></i> Open today · ${storeBusiness.hours}</div><p class="store-kicker">SWEET N LOVELY · KHAYELITSHA</p><h1>Good food for<br>good company.</h1><p class="store-intro">Choose a pizza size and add it to your pickup basket. We prepare each order fresh.</p><div class="store-meta"><span>Pickup: Makhabeni Road, Khayelitsha</span><span>Questions? <a href="tel:+27717939711">${storeBusiness.phone}</a></span></div></div><div class="store-service-note"><strong>Pickup orders</strong><span>Estimated preparation: 10–18 minutes</span><span>Pay at pickup</span></div></header>
    <div class="store-body">${cartCount() ? `<button class="mobile-basket-jump" id="jump-to-basket">Basket · ${cartCount()} item${cartCount() === 1 ? '' : 's'} · ${money(cartTotal())}<span>Review ↓</span></button>` : ''}<main class="store-catalog"><div class="catalog-heading"><div><span class="store-kicker">MENU</span><h2>Choose your order</h2><p>Small and large sizes are available on most items.</p></div><label class="store-search"><span aria-hidden="true">⌕</span><input type="search" id="menu-search" placeholder="Search pizzas and sides" value="${safeText(storeState.query)}" aria-label="Search menu"></label></div><div class="store-categories" aria-label="Filter menu by category">${categories.map(category => `<button class="store-category ${storeState.category === category ? 'active' : ''}" data-category="${category}" aria-pressed="${storeState.category === category}">${category}</button>`).join('')}</div><div class="store-product-grid">${visible.map(productCard).join('') || '<div class="store-no-results"><strong>No menu items match that search.</strong><p>Try another search or choose a different category.</p><button class="clear-search" id="clear-search">Clear search and filters</button></div>'}</div><p class="store-footnote">Prices in South African rand. Items marked sold out cannot be added.</p></main><aside class="store-cart-panel" id="cart-panel"><div class="cart-panel-heading"><div><span class="store-kicker">PICKUP ORDER</span><h2>Your basket <span>${cartCount()}</span></h2></div></div><div class="cart-panel-content">${basket()}</div><div class="cart-contact"><span>Need help with your order?</span><a href="tel:+27717939711">Call ${storeBusiness.phone}</a></div></aside></div></section>`;
  addStorePhotos();
  bind();
}
function addStorePhotos() {
  const openBadge = document.querySelector('.store-badge');
  if (!storeBusiness.acceptingOrders) {
    if (openBadge) { openBadge.innerHTML = '<i></i> Online orders are paused'; openBadge.classList.add('store-closed-badge'); }
    const pausedNotice = document.createElement('p');
    pausedNotice.className = 'store-paused-notice';
    pausedNotice.textContent = 'This kitchen is not taking pickup orders right now. Please check back later or call the shop.';
    document.querySelector('.store-catalog')?.prepend(pausedNotice);
    document.querySelectorAll('[data-add]').forEach(button => { button.disabled = true; button.textContent = 'Ordering paused'; button.setAttribute('aria-label', 'Ordering is paused'); });
  }
  const hero = document.querySelector('.store-hero');
  const feature = storeMenu.find(item => item.id === 'p2');
  if (hero && feature) {
    const media = document.createElement('div');
    media.className = 'store-hero-photo';
    const image = document.createElement('img');
    image.src = feature.image;
    image.alt = 'Pizza from the Sweet n Lovely photo gallery';
    image.loading = 'eager';
    image.addEventListener('error', () => media.remove(), { once: true });
    media.append(image);
    hero.append(media);
  }
  document.querySelectorAll('.store-product').forEach(card => {
    const item = storeMenu.find(entry => entry.name === card.querySelector('h3')?.textContent);
    if (!item) return;
    const media = document.createElement('div');
    media.className = `store-product-photo${card.classList.contains('sold-out') ? ' sold-out-photo' : ''}`;
    if (!item.image) {
      media.classList.add('photo-fallback');
      media.textContent = item.category;
    } else {
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.imageAlt || item.name;
      image.loading = 'lazy';
      image.addEventListener('error', () => { media.classList.add('photo-fallback'); image.remove(); media.textContent = item.category; }, { once: true });
      media.append(image);
    }
    card.prepend(media);
  });
}
function bind() {
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { storeState.category = button.dataset.category; render(); }));
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
    const item = storeMenu.find(entry => entry.id === button.dataset.add);
    if (!item || !item.available) { showToast('This item is unavailable. Choose another menu item.'); return; }
    const size = button.dataset.size, key = `${item.id}-${size}`, existing = storeState.cart.find(line => line.key === key);
    if (existing) existing.qty += 1; else storeState.cart.push({ key, name: item.name, size, price: size === 'Large' ? item.large : item.small, qty: 1 });
    render(); showToast(`${item.name} · ${size.toLowerCase()} added`);
  }));
  document.querySelectorAll('[data-qty]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.qty), line = storeState.cart[index]; if (!line) return;
    line.qty += Number(button.dataset.delta); if (line.qty < 1) storeState.cart.splice(index, 1); render();
  }));
  const search = document.querySelector('#menu-search');
  if (search) search.addEventListener('input', event => { storeState.query = event.target.value; const cursor = event.target.selectionStart; render(); const next = document.querySelector('#menu-search'); next.focus(); next.setSelectionRange(cursor, cursor); });
  const note = document.querySelector('#basket-note'); if (note) note.addEventListener('input', event => { storeState.note = event.target.value; });
  const review = document.querySelector('#review-order'); if (review) review.addEventListener('click', () => showToast('Demo only. Your basket is not submitted and no payment is taken.'));
  const clear = document.querySelector('#clear-search'); if (clear) clear.addEventListener('click', () => { storeState.query = ''; storeState.category = 'All items'; render(); document.querySelector('#menu-search').focus(); });
  const jump = document.querySelector('#jump-to-basket'); if (jump) jump.addEventListener('click', () => document.querySelector('#cart-panel').scrollIntoView({ behavior: 'smooth', block: 'center' }));
}
function showToast(message) { const region = document.querySelector('#toast-region'); const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.textContent = message; region.appendChild(toast); window.setTimeout(() => toast.remove(), 3000); }
render();
