
(function () {
  'use strict';
  var menuId = 'langDropdownContent';
  var buttonId = 'langToggleBtn';
  var initialized = false;

  function getMenu() { return document.getElementById(menuId); }
  function getButton() { return document.getElementById(buttonId) || document.querySelector('.lang-btn'); }

  function placeMenu() {
    var button = getButton(), menu = getMenu();
    if (!button || !menu || !menu.classList.contains('show')) return;
    var r = button.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var menuWidth = Math.min(Math.max(menu.offsetWidth || 190, 190), vw - 24);
    var left = Math.max(12, Math.min(r.right - menuWidth, vw - menuWidth - 12));
    var top = r.bottom + 8;
    var menuHeight = menu.offsetHeight || 180;
    if (top + menuHeight > window.innerHeight - 12 && r.top > menuHeight + 12) {
      top = r.top - menuHeight - 8;
    }
    menu.style.setProperty('left', left + 'px', 'important');
    menu.style.setProperty('top', Math.max(12, top) + 'px', 'important');
    menu.style.setProperty('right', 'auto', 'important');
  }

  function closeMenu() {
    var menu = getMenu(), button = getButton();
    if (menu) menu.classList.remove('show');
    if (button) button.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
    var menu = getMenu(), button = getButton();
    if (!menu || !button) return;
    /* Use the actual visible class as the single source of truth. */
    var wasOpen = menu.classList.contains('show');
    if (wasOpen) {
      closeMenu();
      return;
    }
    if (menu.parentElement !== document.body) document.body.appendChild(menu);
    menu.classList.add('NEAMOT-lang-menu-v46');
    menu.classList.add('show');
    button.setAttribute('aria-expanded', 'true');
    placeMenu();
  }

  function onDocumentClick(event) {
    var target = event.target;
    var trigger = target && target.closest ? target.closest('#' + buttonId + ', .lang-btn') : null;
    var menu = getMenu();
    if (trigger) {
      toggleMenu(event);
      return;
    }
    if (menu && (target === menu || menu.contains(target))) return;
    closeMenu();
  }

  function init() {
    if (initialized) return;
    var menu = getMenu(), button = getButton();
    if (!menu || !button) return;
    initialized = true;
    menu.classList.add('NEAMOT-lang-menu-v46');
    /* Avoid the original inline toggle firing in addition to the new handler. */
    button.removeAttribute('onclick');
    document.addEventListener('click', onDocumentClick, true);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', placeMenu);
    window.addEventListener('scroll', placeMenu, true);
    menu.addEventListener('click', function (event) { event.stopPropagation(); });
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  /* Re-init if another script replaces the header control/menu. */
  var observer = new MutationObserver(function () {
    var button = getButton(), menu = getMenu();
    if (!button || !menu) return;
    if (!initialized) { init(); return; }
    button.removeAttribute('onclick');
    menu.classList.add('NEAMOT-lang-menu-v46');
  });
  if (document.documentElement) observer.observe(document.documentElement, { childList: true, subtree: true });
})();
