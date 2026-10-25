
(function(){
  'use strict';

  function safeUrl(v){
    if(!v) return '';
    var s=String(v).trim();
    if(!/^https?:\/\//i.test(s) && !/^data:image\//i.test(s)) return '';
    return s;
  }

  var BRAND_CACHE_KEY='NEAMOT_firebase_brand_logo_v8';
  function setFirebaseBrandLogo(url, saveCache){
    var u=safeUrl(url);
    if(!u) return;
    // Preload first; only swap after the image is actually ready so the visible UI never waits on Firebase.
    var pre=new Image();
    pre.decoding='async';
    pre.onload=function(){
      document.querySelectorAll('img[data-firebase-brand-logo="1"]').forEach(function(img){
        img.onload=function(){ img.classList.add('firebase-logo-ready'); };
        img.onerror=function(){ img.classList.remove('firebase-logo-ready'); };
        img.src=u;
        if(img.complete && img.naturalWidth>0) img.classList.add('firebase-logo-ready');
      });
      try{ document.querySelectorAll('link[rel="icon"]').forEach(function(link){ link.href=u; }); }catch(e){}
      if(saveCache!==false){ try{ if(/^https?:\/\//i.test(u)) localStorage.setItem(BRAND_CACHE_KEY,u); }catch(e){} }
    };
    pre.onerror=function(){};
    pre.src=u;
  }

  function loadCachedBrandLogo(){
    try{
      var cached=localStorage.getItem(BRAND_CACHE_KEY);
      if(cached && safeUrl(cached)) setFirebaseBrandLogo(cached,false);
    }catch(e){}
  }

  function findLogoInObject(data){
    if(!data || typeof data!=='object') return '';
    var keys=['logo','logoUrl','logoURL','siteLogo','websiteLogo','brandLogo','headerLogo','adminLogo','favicon'];
    for(var i=0;i<keys.length;i++){
      if(typeof data[keys[i]]==='string' && safeUrl(data[keys[i]])) return data[keys[i]];
    }
    return '';
  }

  function listenFirebaseBranding(){
    loadCachedBrandLogo();
    if(typeof database==='undefined' || !database || !database.ref) return;
    // Keep Firebase in the background. Cached logo paints immediately; network only updates when needed.
    try{
      database.ref('storeData').on('value',function(snap){
        var data=snap.val()||{};
        var u=findLogoInObject(data);
        if(!u && data.settings) u=findLogoInObject(data.settings);
        if(u) setFirebaseBrandLogo(u,true);
      });
    }catch(e){}
  }

  
  window.showSecurityPayInfo=function(){
    var m=document.getElementById('securityPayInfoModal');
    if(!m) return;
    m.classList.add('active');
    m.setAttribute('aria-hidden','false');
  };
  window.closeSecurityPayInfo=function(){
    var m=document.getElementById('securityPayInfoModal');
    if(!m) return;
    m.classList.remove('active');
    m.setAttribute('aria-hidden','true');
  };

  window.openNEAMOTReferralModal=function(){
    var modal=document.getElementById('NEAMOTReferralModal');
    var body=document.getElementById('NEAMOTReferralModalBody');
    var card=document.getElementById('referralCard');
    if(!modal||!body||!card) return;
    if(card.parentElement!==body) body.appendChild(card);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
  };
  window.closeNEAMOTReferralModal=function(){
    var modal=document.getElementById('NEAMOTReferralModal');
    if(!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  };

  function moveReferralOutOfProfile(){
    var card=document.getElementById('referralCard');
    var body=document.getElementById('NEAMOTReferralModalBody');
    if(card && body && card.parentElement!==body) body.appendChild(card);
  }

  function boot(){
    // Paint the store first; Firebase logo sync starts in the background after first paint.
    if (navigator.onLine) setTimeout(listenFirebaseBranding, 1200);
    moveReferralOutOfProfile();

    // Remove any stale loading indicator that older code may have rendered.
    var ol=document.getElementById('ordersLoadingIndicator');
    if(ol) ol.remove();

    // Keep payment trust copy synchronized if the page is dynamically rebuilt.
    var rules=document.querySelector('.panel-rules-inside');
    if(rules && !document.querySelector('.secure-trust-strip')){
      rules.insertAdjacentHTML('afterend',
        '<div class="secure-trust-strip"><div><i class="fas fa-shield-halved"></i><span>Secure Pay</span></div><div><i class="fas fa-bolt"></i><span>Fast Delivery</span></div><div><i class="fas fa-circle-check"></i><span>Verified Store</span></div></div>');
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
