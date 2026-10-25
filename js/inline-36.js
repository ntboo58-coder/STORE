
(function(){
  'use strict';
  if (window.__GXP_NAV_OVERLAY_RESET_FIX__) return;
  window.__GXP_NAV_OVERLAY_RESET_FIX__ = true;

  // Keep Latest Orders neutral; only flash a green ring while the user taps a card.
  document.addEventListener('click', function(e){
    var card = e.target && e.target.closest ? e.target.closest('#home-latest-orders-list .home-order-card, .home-orders-section .home-order-card') : null;
    if (!card) return;
    card.classList.remove('gxp-order-tap');
    void card.offsetWidth;
    card.classList.add('gxp-order-tap');
    window.setTimeout(function(){ if (card.isConnected) card.classList.remove('gxp-order-tap'); }, 760);
  }, true);

  // Wrap the existing tab router: leaving Account/Login must dismiss its overlay,
  // and changing tabs from a product detail must first close that detail layer.
  function installRouterFix(){
    if (typeof window.switchTab !== 'function' || window.switchTab.__gxpWrapped) return false;
    var original = window.switchTab;
    function wrappedSwitchTab(tab, fromRoute){
      if (tab !== 'account') {
        try { if (typeof window.closeLogin === 'function') window.closeLogin(); } catch(e) {}
        var loginView = document.getElementById('login-view');
        if (loginView) { loginView.classList.remove('active'); loginView.setAttribute('aria-hidden','true'); }
        document.body.style.overflow = '';
      }
      if (tab && tab !== 'product') {
        var productPanel = document.getElementById('price-panel');
        if (productPanel && productPanel.classList.contains('active')) productPanel.classList.remove('active');
        try { window.isPanelOpen = false; } catch(e) {}
      }
      var result = original.call(this, tab, fromRoute);
      // Ensure tab changes always bring the normal app layer back to the front.
      if (tab !== 'account') {
        var accountView = document.getElementById('account-view');
        if (accountView) { accountView.classList.remove('active-view'); accountView.style.display = 'none'; }
      }
      var bottomNav = document.querySelector('.bottom-nav');
      if (bottomNav) { bottomNav.style.pointerEvents = 'auto'; bottomNav.style.zIndex = '9999'; }
      return result;
    }
    wrappedSwitchTab.__gxpWrapped = true;
    window.switchTab = wrappedSwitchTab;
    return true;
  }
  if (!installRouterFix()) {
    var tries = 0;
    var timer = window.setInterval(function(){ if (installRouterFix() || ++tries > 40) window.clearInterval(timer); }, 100);
  }
})();
