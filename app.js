/**
 * Project Link — app.js
 * Reads window.LINKS_DATA (from data.js), renders company cards, powers real-time search.
 * No fetch / no server required — works from file://, VPS, CDN, anywhere.
 */

// ─── Pastel avatar colors (for logo fallback) ─────────────────────────────────
const AVATAR_COLORS = [
  ['#e0e7ff', '#4338ca'], // indigo
  ['#fce7f3', '#be185d'], // pink
  ['#d1fae5', '#065f46'], // emerald
  ['#fef3c7', '#92400e'], // amber
  ['#ede9fe', '#5b21b6'], // violet
  ['#fee2e2', '#991b1b'], // red
  ['#cffafe', '#164e63'], // cyan
  ['#f0fdf4', '#14532d'], // green
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const LINK_ICON = `
  <svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
  </svg>`;

const EXTERNAL_ICON = `
  <svg class="w-3 h-3 opacity-30 ml-auto flex-shrink-0 transition-opacity duration-150 group-hover:opacity-60"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
  </svg>`;

const SEARCH_ICON = `
  <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none"
       style="width:1.125rem;height:1.125rem;"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
  </svg>`;

const EMPTY_ICON = `
  <svg class="w-16 h-16 mb-4 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
  </svg>`;

// ─── Render helpers ───────────────────────────────────────────────────────────

function renderLogo(company, logoUrl) {
  if (!logoUrl) return renderFallback(company);

  const [bg, fg] = avatarColor(company);
  const img = document.createElement('img');
  img.className = 'company-logo';
  img.alt = company + ' logo';
  img.src = logoUrl;
  img.onerror = () => {
    const fb = document.createElement('div');
    fb.className = 'logo-fallback';
    fb.style.background = bg;
    fb.style.color = fg;
    fb.textContent = initials(company);
    img.replaceWith(fb);
  };
  return img;
}

function renderFallback(company) {
  const [bg, fg] = avatarColor(company);
  const fb = document.createElement('div');
  fb.className = 'logo-fallback';
  fb.style.background = bg;
  fb.style.color = fg;
  fb.textContent = initials(company);
  return fb;
}

function renderCard(data) {
  const card = document.createElement('div');
  card.className = 'company-card';
  card.dataset.company = data.company.toLowerCase();
  card.dataset.links = data.links.map(l => l.title.toLowerCase()).join(' ');

  // ── Header
  const header = document.createElement('div');
  header.className = 'card-header';

  const logoEl = renderLogo(data.company, data.logo);
  header.appendChild(logoEl);

  const meta = document.createElement('div');
  meta.className = 'flex flex-col min-w-0';

  const companyName = document.createElement('h2');
  companyName.className = 'text-sm font-semibold text-slate-800 leading-snug truncate';
  companyName.textContent = data.company;

  const badge = document.createElement('span');
  badge.className = 'link-count-badge mt-1 self-start';
  badge.textContent = `${data.links.length} link${data.links.length !== 1 ? 's' : ''}`;

  meta.appendChild(companyName);
  meta.appendChild(badge);
  header.appendChild(meta);
  card.appendChild(header);

  // ── Link list
  const list = document.createElement('ul');
  list.className = 'flex flex-col gap-1 p-3 flex-1';
  list.setAttribute('role', 'list');

  data.links.forEach(link => {
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');

    const a = document.createElement('a');
    a.className = 'link-chip group';
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = LINK_ICON + `<span class="truncate">${escapeHtml(link.title)}</span>` + EXTERNAL_ICON;

    li.appendChild(a);
    list.appendChild(li);
  });

  card.appendChild(list);
  return card;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Search / filter ──────────────────────────────────────────────────────────

let debounceTimer = null;

function setupSearch(grid, emptyState) {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterCards(grid, emptyState, input.value), 150);
  });

  // Clear on Escape
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      filterCards(grid, emptyState, '');
    }
  });
}

function filterCards(grid, emptyState, query) {
  const q = query.trim().toLowerCase();
  let visibleCount = 0;

  const cards = grid.querySelectorAll('.company-card:not(.skeleton-card)');
  cards.forEach(card => {
    const company = (card.dataset.company || '').toLowerCase();
    const links = (card.dataset.links || '').toLowerCase();
    const matches = q === '' || company.includes(q) || links.includes(q);

    card.classList.toggle('hidden', !matches);
    if (matches) visibleCount++;
  });

  emptyState.classList.toggle('hidden', visibleCount > 0);
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function updateStats(data) {
  const totalLinks = data.reduce((sum, d) => sum + d.links.length, 0);
  const companyCount = document.getElementById('stat-companies');
  const linkCount = document.getElementById('stat-links');
  if (companyCount) companyCount.textContent = data.length;
  if (linkCount) linkCount.textContent = totalLinks;
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

async function loadData() {
  // 1. Direct memory / script tag load (works from file://, no server needed)
  if (Array.isArray(window.LINKS_DATA) && window.LINKS_DATA.length > 0) {
    return window.LINKS_DATA;
  }

  // 2. Fallback fetch from data/links.json (works on web servers / VPS)
  try {
    const res = await fetch('./data/links.json');
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) return json;
    }
  } catch (_) {
    // file:// protocol CORS block or file missing; fallback error shown below
  }

  return null;
}

async function init() {
  const grid = document.getElementById('grid');
  const emptyState = document.getElementById('empty-state');
  const errorBanner = document.getElementById('error-banner');

  if (!grid) return;

  const data = await loadData();

  if (!data) {
    if (errorBanner) {
      errorBanner.classList.remove('hidden');
      const msg = errorBanner.querySelector('[data-error-msg]');
      if (msg) {
        msg.textContent = 'Could not load links from data.js or data/links.json.';
      }
    }
    return;
  }

  updateStats(data);

  // Remove skeleton loaders once data is loaded
  grid.querySelectorAll('.skeleton-card').forEach(s => s.remove());

  // Render cards
  data.forEach(company => {
    const card = renderCard(company);
    grid.appendChild(card);
  });

  // Add empty state node at end
  grid.appendChild(emptyState);
  emptyState.classList.add('hidden');

  setupSearch(grid, emptyState);
}

document.addEventListener('DOMContentLoaded', init);

