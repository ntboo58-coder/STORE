
(function () {
  'use strict';
  if (window.__NEAMOT_V67_BALANCE_CLIP__) return;
  window.__NEAMOT_V67_BALANCE_CLIP__ = true;

  function ensureHeaderBalanceFull() {
    var chip = document.getElementById('headerBalanceDisplay');
    var amount = document.getElementById('headerBalanceAmount');
    if (!chip) return;
    /* Keep a dedicated currency node so "৳ / TK" is never lost to overflow */
    var cur = chip.querySelector('.bal-currency');
    if (!cur) {
      cur = document.createElement('span');
      cur.className = 'bal-currency';
      cur.style.cssText = 'white-space:nowrap;flex-shrink:0;font-weight:800;';
      /* Move trailing text nodes (e.g. " TK") into the span */
      var nodes = Array.prototype.slice.call(chip.childNodes);
      var trailing = '';
      nodes.forEach(function (n) {
        if (n.nodeType === 3) {
          trailing += n.textContent;
          chip.removeChild(n);
        }
      });
      trailing = (trailing || ' TK').replace(/\s+/g, ' ');
      if (!trailing.trim()) trailing = ' TK';
      cur.textContent = trailing.indexOf('TK') >= 0 || trailing.indexOf('৳') >= 0
        ? trailing
        : (' ' + trailing.trim());
      chip.appendChild(cur);
    }
    chip.style.setProperty('overflow', 'visible', 'important');
    chip.style.setProperty('white-space', 'nowrap', 'important');
    chip.style.setProperty('max-width', 'none', 'important');
    chip.style.setProperty('flex-shrink', '0', 'important');
    if (amount) {
      amount.style.setProperty('overflow', 'visible', 'important');
      amount.style.setProperty('white-space', 'nowrap', 'important');
    }
  }

  function fixProfileValues() {
    ['profile-balance', 'profile-total-spent', 'panelHeaderBalance'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.setProperty('overflow', 'visible', 'important');
      el.style.setProperty('white-space', 'nowrap', 'important');
      el.style.setProperty('text-overflow', 'clip', 'important');
    });
  }

  function boot() {
    ensureHeaderBalanceFull();
    fixProfileValues();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);
  setTimeout(boot, 600);
  setTimeout(boot, 2000);

  /* Re-apply after balance updates */
  try {
    var obs = new MutationObserver(function () {
      ensureHeaderBalanceFull();
      fixProfileValues();
    });
    var chip = document.getElementById('headerBalanceDisplay');
    if (chip) obs.observe(chip, { childList: true, characterData: true, subtree: true });
    var pb = document.getElementById('profile-balance');
    if (pb) obs.observe(pb, { childList: true, characterData: true, subtree: true });
  } catch (e) {}
})();
