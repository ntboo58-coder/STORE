
(function(){
  'use strict';
  if (window.__NEAMOT_V60_ADDFUNDS_NAV_FIX__) return;
  window.__NEAMOT_V60_ADDFUNDS_NAV_FIX__ = true;

  var previousSwitchTab = window.switchTab;
  if (typeof previousSwitchTab !== 'function') return;

  function clearAddFundsOverlay(){
    var view = document.getElementById('add-funds-view');
    if (view) {
      view.classList.remove('NEAMOT-addfunds-popup-active');
      view.classList.remove('active-view');
      view.style.display = 'none';
    }
    var paymentPage = document.getElementById('funds-payment-page');
    if (!(paymentPage && paymentPage.classList.contains('active'))) {
      document.body.style.overflow = '';
    }
  }

  window.switchTab = function(tab, fromRoute){
    /* Any normal destination must dismiss the Add Funds popup first. */
    if (tab !== 'addfunds') clearAddFundsOverlay();

    var result = previousSwitchTab.apply(this, arguments);

    /* Keep the overlay dismissed even if an older navigation wrapper left it active. */
    if (tab !== 'addfunds') clearAddFundsOverlay();
    return result;
  };
})();
