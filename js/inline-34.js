
(function(){
  'use strict';
  function getMainAuth(){
    try { if (typeof auth !== 'undefined' && auth && typeof auth.onAuthStateChanged === 'function') return auth; } catch(e) {}
    try { if (window.auth && typeof window.auth.onAuthStateChanged === 'function') return window.auth; } catch(e) {}
    return null;
  }
  function firstLetter(user){
    var name = user && (user.displayName || user.email || 'U');
    return String(name || 'U').trim().charAt(0).toUpperCase() || 'U';
  }
  function applyAuthState(user){
    var guest = !user;
    document.body.classList.toggle('guest-session', guest);
    ['nav-funds-btn','nav-orders-btn','nav-verify-btn'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.style.setProperty('display', guest ? 'none' : 'flex', 'important');
    });
    ['nav-home-btn','nav-acc-btn'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.style.setProperty('display','flex','important');
    });
    var balance=document.getElementById('headerBalanceDisplay');
    if(balance){
      if(guest){ balance.classList.remove('show'); balance.style.setProperty('display','none','important'); }
      else { balance.style.removeProperty('display'); }
    }
    var avatar=document.getElementById('profileAvatarBtn');
    var avatarText=document.getElementById('headerAvatarText');
    var initial=firstLetter(user);
    if(avatar && avatarText){
      if(user && user.photoURL){
        avatar.style.backgroundImage='url("'+String(user.photoURL).replace(/"/g,'%22')+'")';
        avatar.style.backgroundSize='cover'; avatar.style.backgroundPosition='center'; avatarText.textContent='';
      } else {
        avatar.style.backgroundImage='none'; avatar.style.backgroundColor='#e8f5ec';
        avatar.style.backgroundSize=''; avatar.style.backgroundPosition=''; avatarText.textContent=guest?'':initial;
      }
      avatar.classList.toggle('show', !!user);
    }
    var profileInitials=document.getElementById('profile-initials');
    if(profileInitials && (!user || !user.photoURL)){
      profileInitials.style.backgroundImage='none'; profileInitials.textContent=user?initial:'';
    }
    var drawer=document.getElementById('drawerAvatar');
    if(drawer && (!user || !user.photoURL)){
      drawer.style.backgroundImage='none'; drawer.textContent=user?initial:'';
    }
  }
  function boot(){
    var a=getMainAuth();
    if(!a){
      // Do not assume a logged-in session if Firebase auth is not available yet.
      applyAuthState(null);
      setTimeout(function(){ var retry=getMainAuth(); if(retry) boot(); }, 500);
      return;
    }
    if(!a.__guestNavFixV2Bound){
      a.__guestNavFixV2Bound=true;
      a.onAuthStateChanged(function(user){ applyAuthState(user || null); });
    }
    // onAuthStateChanged is authoritative; this immediate pass avoids stale nav.
    applyAuthState(a.currentUser || null);
  }
  document.addEventListener('click', function(e){
    var nav=e.target && e.target.closest ? e.target.closest('#nav-funds-btn,#nav-orders-btn,#nav-verify-btn,#nav-acc-btn') : null;
    if(!nav) return;
    var a=getMainAuth();
    if(a && a.currentUser) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    if(nav.id==='nav-acc-btn'){
      try { if(typeof switchTab==='function') switchTab('account'); } catch(err) {}
      setTimeout(function(){
        var login=document.getElementById('auth-form-box');
        var profile=document.getElementById('profile-view-box');
        if(login) login.style.display='block';
        if(profile) profile.style.display='none';
        try { if(typeof openLogin==='function') openLogin(); } catch(err) {}
      },50);
    } else {
      try { if(typeof showToast==='function') showToast('এই সুবিধাটি ব্যবহার করতে আগে লগইন করুন।','#ff4444'); } catch(err) {}
      try { if(typeof openLogin==='function') openLogin(); else if(typeof switchTab==='function') switchTab('account'); } catch(err) {}
    }
  }, true);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.addEventListener('load',boot);
  setTimeout(boot,700);
})();
