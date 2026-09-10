/* MASTER 3.3.3 — GO OUT PHOTO UI
   Visual-only patch on top of MASTER 3.3.2.
   Keeps all existing routing/gameplay and upgrades Go Out cards to crisp photographic covers.
*/
(() => {
  const PHOTO_BASE = {
    fluffed: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    brew_bloom: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    lakeview_cafe: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065',
    moonlight_cafe: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    sunday_roast: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    little_corner: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0',
    snow_blossom: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    sweet_bean: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
    gelato_garden: 'https://images.unsplash.com/photo-1488900128323-21503983a07e',
    berry_cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    honey_toast: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    mochi_matcha: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    supermarket: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    park: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    amusement: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    ski: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
    mall: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    convenience: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a'
  };

  const PLACE_NAME = {
    fluffed: 'Fluffed',
    brew_bloom: 'Brew & Bloom Café',
    lakeview_cafe: 'Lakeview Café',
    moonlight_cafe: 'Moonlight Café',
    sunday_roast: 'Sunday Roast Café',
    little_corner: 'Little Corner Café',
    snow_blossom: 'Snow Blossom Bingsu',
    sweet_bean: 'Sweet Bean Bingsu House',
    gelato_garden: 'Gelato Garden',
    berry_cake: 'Berry Cake Studio',
    honey_toast: 'Honey Toast House',
    mochi_matcha: 'Mochi & Matcha',
    restaurant: 'Riverside Bistro',
    supermarket: 'Little World Market',
    cinema: 'Cinema',
    park: 'Park',
    gym: 'Gym',
    amusement: 'Amusement Park',
    ski: 'Ski Resort',
    mall: 'Shopping Mall',
    convenience: 'Convenience Store'
  };

  const photoUrl = (id, width = 1100) => {
    const base = PHOTO_BASE[id];
    return base ? `${base}?auto=format&fit=crop&w=${width}&q=92` : '';
  };

  function installPhoto(img, id, width) {
    if (!img || !PHOTO_BASE[id]) return;
    if (img.dataset.goOut333 === id) return;

    const fallback = img.currentSrc || img.getAttribute('src') || '';
    img.dataset.goOut333 = id;
    img.dataset.goOut333Fallback = fallback;
    img.loading = width <= 1000 ? 'lazy' : 'eager';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.style.filter = 'none';
    img.style.opacity = '1';

    img.onerror = () => {
      const backup = img.dataset.goOut333Fallback;
      img.onerror = null;
      if (backup) img.src = backup;
    };
    img.src = photoUrl(id, width);
  }

  function currentDetailId(overlay) {
    const active = overlay.querySelector('.outing331-card.active[data-out331-place]');
    if (active) return active.dataset.out331Place;

    const title = overlay.querySelector('#out331Detail h2')?.textContent?.trim();
    if (!title) return null;
    return Object.keys(PLACE_NAME).find(id => PLACE_NAME[id] === title) || null;
  }

  function decorateFeature(overlay) {
    const feature = overlay.querySelector('.outing331-feature-banner');
    if (!feature) return;

    let img = feature.querySelector('.outing333-feature-photo');
    if (!img) {
      img = document.createElement('img');
      img.className = 'outing333-feature-photo';
      img.alt = 'Fluffed café date';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => feature.classList.add('outing333-photo-ready');
      img.onerror = () => {
        img.remove();
        feature.classList.remove('outing333-photo-ready');
      };
      feature.prepend(img);

      const shade = document.createElement('div');
      shade.className = 'outing333-feature-shade';
      feature.insertBefore(shade, img.nextSibling);

      const copy = [...feature.children].find(node => node.tagName === 'DIV' && !node.classList.contains('outing333-feature-shade') && !node.classList.contains('outing331-feature-dessert'));
      if (copy) copy.classList.add('outing333-feature-copy');
    }
    if (!img.src) img.src = photoUrl('fluffed', 1600);
  }

  function enhanceGoOut() {
    const overlay = document.querySelector('.outing331-overlay');
    if (!overlay) return;

    overlay.classList.add('outing333-photo-ui');

    const version = overlay.querySelector('.outing331-version');
    if (version) version.textContent = 'GO OUT 3.3.3';

    decorateFeature(overlay);

    overlay.querySelectorAll('.outing331-card[data-out331-place]').forEach(card => {
      const id = card.dataset.out331Place;
      const img = card.querySelector('.outing331-cover img');
      installPhoto(img, id, 1000);
    });

    const detailId = currentDetailId(overlay);
    if (detailId) {
      const detailImg = overlay.querySelector('#out331Detail .outing331-detail-cover img');
      installPhoto(detailImg, detailId, 1500);
    }
  }

  let queued = false;
  const queueEnhance = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      enhanceGoOut();
    });
  };

  const observer = new MutationObserver(queueEnhance);
  const start = () => {
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('click', event => {
      if (event.target.closest('#outingBtn, .outing331-overlay')) {
        setTimeout(queueEnhance, 0);
        setTimeout(queueEnhance, 80);
      }
    }, true);
    queueEnhance();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
