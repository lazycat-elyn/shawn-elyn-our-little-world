/* MASTER 3.5.1 — ALPINE RUSH WORK INTEGRATION
   Additive patch only. Wires the existing Go Out > Activities > Ski Resort entry
   to Elyn's completed Alpine Rush Work site without touching app.js gameplay.
*/
(() => {
  'use strict';

  const SKI_URL = 'https://alpine-rush-snow.hongcaerra.chatgpt.site';
  const OVERLAY_ID = 'alpineRushEmbed';

  function currentPlace(outing) {
    if (!outing) return null;
    const active = outing.querySelector('.outing331-card.active[data-out331-place]');
    if (active) return active.dataset.out331Place;
    const title = outing.querySelector('#out331Detail h2')?.textContent?.trim()?.toLowerCase() || '';
    return title.includes('ski') || title.includes('alpine') || title.includes('滑雪') ? 'ski' : null;
  }

  function closeSki() {
    document.getElementById(OVERLAY_ID)?.remove();
    document.body.classList.remove('alpine-rush-open');
  }

  function openExternal() {
    window.open(SKI_URL, '_blank', 'noopener,noreferrer');
  }

  function openSki() {
    closeSki();
    const el = document.createElement('section');
    el.id = OVERLAY_ID;
    el.className = 'alpine-rush-embed';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Alpine Rush 滑雪游戏');
    el.innerHTML = `
      <div class="alpine-rush-shell">
        <header class="alpine-rush-head">
          <div class="alpine-rush-brand">
            <span class="alpine-rush-mark">🎿</span>
            <div><b>Alpine Rush</b><small>Shawn & Elyn · Ski Adventure</small></div>
          </div>
          <div class="alpine-rush-head-actions">
            <button type="button" data-alpine-external>↗ 新窗口打开</button>
            <button type="button" class="alpine-rush-close" data-alpine-close aria-label="返回 Go Out">✕</button>
          </div>
        </header>
        <div class="alpine-rush-stage">
          <iframe
            src="${SKI_URL}"
            title="Alpine Rush Snow"
            allow="fullscreen; autoplay; gamepad; clipboard-read; clipboard-write"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="alpine-rush-fallback">
            <b>雪场加载中…</b>
            <span>如果这里一直没有画面，网站可能不允许 iframe 嵌入。</span>
            <button type="button" data-alpine-external>直接打开 Alpine Rush</button>
          </div>
        </div>
        <footer class="alpine-rush-foot">
          <span>ESC / 返回按钮：回到 Shawn & Elyn 的 Go Out 页面</span>
          <button type="button" data-alpine-close>← 返回 Go Out</button>
        </footer>
      </div>`;

    document.body.appendChild(el);
    document.body.classList.add('alpine-rush-open');

    const frame = el.querySelector('iframe');
    frame?.addEventListener('load', () => el.classList.add('alpine-rush-loaded'), { once: true });
    el.querySelectorAll('[data-alpine-close]').forEach(btn => btn.addEventListener('click', closeSki));
    el.querySelectorAll('[data-alpine-external]').forEach(btn => btn.addEventListener('click', openExternal));
  }

  function decorateSki(outing) {
    if (!outing) return;
    const card = outing.querySelector('.outing331-card[data-out331-place="ski"]');
    if (card && !card.querySelector('.alpine-rush-badge')) {
      const cover = card.querySelector('.outing331-cover') || card;
      const badge = document.createElement('span');
      badge.className = 'alpine-rush-badge';
      badge.textContent = '🎿 ALPINE RUSH · FULL GAME';
      cover.appendChild(badge);
    }

    if (currentPlace(outing) === 'ski') {
      const detail = outing.querySelector('#out331Detail');
      const enter = detail?.querySelector('#out331Enter');
      if (enter) {
        enter.textContent = '🎿 Enter Alpine Rush';
        enter.classList.add('alpine-rush-enter');
      }
      const actions = detail?.querySelector('.outing331-detail-actions');
      if (actions && !detail.querySelector('.alpine-rush-note')) {
        const note = document.createElement('div');
        note.className = 'alpine-rush-note';
        note.innerHTML = '<b>Alpine Rush 已连接 ♡</b><span>进入你在 Work 完成的完整滑雪游戏；Drive Here 仍保留原本出行流程。</span>';
        actions.insertAdjacentElement('afterend', note);
      }
    }
  }

  function interceptSkiEnter(event) {
    const outing = event.target.closest?.('.outing331-overlay');
    if (!outing || currentPlace(outing) !== 'ski') return;
    const trigger = event.target.closest?.('#out331Enter, #out331MobileGo');
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openSki();
  }

  let queued = false;
  function queueDecorate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      decorateSki(document.querySelector('.outing331-overlay'));
    });
  }

  const observer = new MutationObserver(queueDecorate);
  function start() {
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('click', interceptSkiEnter, true);
    document.addEventListener('click', event => {
      if (event.target.closest?.('#outingBtn, .outing331-overlay')) {
        setTimeout(queueDecorate, 0);
        setTimeout(queueDecorate, 80);
      }
    }, true);
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && document.getElementById(OVERLAY_ID)) {
        event.preventDefault();
        closeSki();
      }
    }, true);
    queueDecorate();
  }

  window.AlpineRushIntegration = { open: openSki, close: closeSki, url: SKI_URL };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
