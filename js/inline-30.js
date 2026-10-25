
(function () {
  'use strict';
  if (window.__NEAMOT_V65_BANNER_HOME_ONLY__) return;
  window.__NEAMOT_V65_BANNER_HOME_ONLY__ = true;

  function setHomeBanner(tab) {
    var isHome = !tab || tab === 'home';
    try {
      document.body.classList.toggle('NEAMOT-tab-home', isHome);
    } catch (e) {}
    var slider = document.getElementById('home-slider-container');
    if (!slider) return;
    if (isHome) {
      slider.style.setProperty('display', 'flex', 'important');
      slider.style.setProperty('visibility', 'visible', 'important');
      slider.style.removeProperty('height');
      slider.style.removeProperty('margin');
    } else {
      slider.style.setProperty('display', 'none', 'important');
      slider.style.setProperty('visibility', 'hidden', 'important');
    }
  }

  function wrapSwitchTab() {
    var prev = window.switchTab;
    if (typeof prev !== 'function' || prev.__v65HomeBanner) return;
    var wrapped = function (tab) {
      var r = prev.apply(this, arguments);
      try { setHomeBanner(tab); } catch (e) {}
      return r;
    };
    wrapped.__v65HomeBanner = true;
    if (prev.__premium) wrapped.__premium = true;
    if (prev.__navSafe) wrapped.__navSafe = true;
    window.switchTab = wrapped;
  }

  function boot() {
    wrapSwitchTab();
    // Default: home until user navigates away
    var tab = (typeof currentTab !== 'undefined' && currentTab) ? currentTab : 'home';
    // If another view is already visible, respect it
    try {
      var acc = document.getElementById('account-view');
      var ver = document.getElementById('verify-view');
      var ord = document.getElementById('orders-view');
      var add = document.getElementById('add-funds-view');
      if (acc && (acc.classList.contains('active-view') || acc.style.display === 'flex' || acc.style.display === 'block')) tab = 'account';
      else if (ver && ver.style.display === 'block') tab = 'verify';
      else if (ord && ord.style.display === 'block') tab = 'orders';
      else if (add && (add.classList.contains('active-view') || add.style.display === 'flex')) tab = 'addfunds';
    } catch (e) {}
    setHomeBanner(tab);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', function () { wrapSwitchTab(); setHomeBanner(typeof currentTab !== 'undefined' ? currentTab : 'home'); });
  setTimeout(function () { wrapSwitchTab(); }, 500);
  setTimeout(function () { wrapSwitchTab(); }, 2000);
})();
