
(function () {
  'use strict';
  if (window.__NEAMOT_V70_HEADER_NOTICE__) return;
  window.__NEAMOT_V70_HEADER_NOTICE__ = true;

  function ensureBell() {
    var right = document.querySelector('.top-header .header-right');
    if (!right) return;
    var existing = document.getElementById('headerNoticeBtn');
    if (existing) return;
    var bal = document.getElementById('headerBalanceDisplay');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'header-notice-btn';
    btn.id = 'headerNoticeBtn';
    btn.setAttribute('aria-label', 'Notice Board');
    btn.title = 'Notice Board';
    btn.innerHTML = '<i class="fas fa-bell"></i><span class="header-notice-dot" id="headerNoticeDot" aria-hidden="true"></span>';
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.openNEAMOTNoticePopup === 'function') window.openNEAMOTNoticePopup();
    };
    if (bal && bal.parentNode === right) {
      if (bal.nextSibling) right.insertBefore(btn, bal.nextSibling);
      else right.appendChild(btn);
    } else {
      right.insertBefore(btn, right.firstChild);
    }
  }

  function hideLegacyNoticeTriggers() {
    ['NEAMOTTopNoticeBoard', 'NEAMOTNoticeShowChip'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.setProperty('display', 'none', 'important');
      el.setAttribute('aria-hidden', 'true');
    });
  }

  function boot() {
    ensureBell();
    hideLegacyNoticeTriggers();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);
  setTimeout(boot, 500);
  setTimeout(boot, 1500);
})();
