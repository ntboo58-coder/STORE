
(function(){
  var el=document.getElementById('NEAMOT-net-status');
  var home=document.getElementById('home-view')||document.getElementById('main-content')||document.body;
  if(el && home && el.parentNode!==home){
    try{ home.insertBefore(el, home.firstChild); }catch(e){ document.body.prepend(el); }
  }
  function show(){ if(el) el.classList.add('show'); }
  function hide(){ if(el) el.classList.remove('show'); }
  // show if panels not ready in 1.2s
  var ready=false;
  var t=setTimeout(function(){ if(!ready) show(); }, 1200);
  function markReady(){
    ready=true; hide(); clearTimeout(t);
  }
  // hook finishHomeLoading
  var prev=window.finishHomeLoading;
  // also watch firebaseDataLoaded
  var iv=setInterval(function(){
    try{
      if(window.firebaseDataLoaded || (window.panelDatabase && Object.keys(window.panelDatabase||{}).length>0)){
        markReady(); clearInterval(iv);
      }
    }catch(e){}
  }, 300);
  setTimeout(function(){ clearInterval(iv); hide(); }, 15000);
  // when grid gets cards, hide
  try{
    new MutationObserver(function(){
      var cards=document.querySelectorAll('.panel-card, .product-card, [class*="panel"] img');
      if(cards.length>2) markReady();
    }).observe(document.documentElement,{childList:true,subtree:true});
  }catch(e){}
  // default broken images
  document.addEventListener('error', function(e){
    var t=e.target;
    if(t && t.tagName==='IMG' && !t.dataset.NEAMOTFallback){
      t.dataset.NEAMOTFallback='1';
      t.src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23111827'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' rx='24' fill='url(%23g)'/%3E%3Ccircle cx='200' cy='160' r='48' fill='%23334155'/%3E%3Cpath d='M200 130v60M170 160h60' stroke='%2394a3b8' stroke-width='8' stroke-linecap='round'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='%23e2e8f0' font-family='Arial' font-size='22' font-weight='700'%3ENEAMOT 2.0%3C/text%3E%3Ctext x='200' y='280' text-anchor='middle' fill='%2364748b' font-family='Arial' font-size='14'%3EPanel Logo%3C/text%3E%3C/svg%3E";
    }
  }, true);
})();
