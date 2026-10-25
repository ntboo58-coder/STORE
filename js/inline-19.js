
(function(){
  function setGuestState(user){
    var guest = !user;
    document.body.classList.toggle('guest-session', guest);
    var balance = document.getElementById('headerBalanceDisplay');
    if(balance && guest){ balance.classList.remove('show'); balance.style.display='none'; }
    if(balance && !guest){ balance.style.display=''; }
  }
  function bindGuestNav(){
    if(!window.auth || typeof window.auth.onAuthStateChanged !== 'function') return;
    window.auth.onAuthStateChanged(function(user){ setGuestState(user); });
    setGuestState(window.auth.currentUser || null);
  }
  document.addEventListener('click', function(e){
    var nav = e.target && e.target.closest ? e.target.closest('#nav-funds-btn,#nav-orders-btn,#nav-verify-btn,#nav-acc-btn') : null;
    if(!nav || !window.auth || window.auth.currentUser) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if(nav.id === 'nav-acc-btn'){
      try { if(typeof switchTab === 'function') switchTab('account'); } catch(_){}
      setTimeout(function(){
        var login = document.getElementById('auth-form-box');
        var profile = document.getElementById('profile-view-box');
        if(login) login.style.display='block';
        if(profile) profile.style.display='none';
        try { if(typeof openLogin === 'function') openLogin(); } catch(_){}
      }, 50);
    } else {
      try { if(typeof showToast === 'function') showToast('এই সুবিধাটি ব্যবহার করতে আগে লগইন করুন।','#ff4444'); } catch(_){}
      try { if(typeof openLogin === 'function') openLogin(); } catch(_){}
    }
  }, true);
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindGuestNav);
  else bindGuestNav();
  // Auth callbacks can run after other UI scripts; re-assert guest visibility.
  setTimeout(function(){ setGuestState(window.auth ? window.auth.currentUser : null); }, 700);
})();
