
(function(){
  function repairNav(){
    var nav=document.querySelector('body > .bottom-nav') || document.querySelector('.bottom-nav');
    if(!nav) return;
    /* Move it out of product/page stacking contexts so it remains clickable. */
    if(nav.parentElement !== document.body) document.body.appendChild(nav);
    nav.style.setProperty('position','fixed','important');
    nav.style.setProperty('z-index','2147483000','important');
    nav.style.setProperty('pointer-events','auto','important');
    nav.style.setProperty('bottom','10px','important');
    nav.style.setProperty('left','10px','important');
    nav.style.setProperty('right','10px','important');
    nav.style.setProperty('width','auto','important');
  }
  function closeProductIfOpen(){
    var panel=document.getElementById('price-panel');
    if(panel && panel.classList.contains('active')){
      try { if(typeof window.closePanel==='function') window.closePanel(); else panel.classList.remove('active'); } catch(e){ panel.classList.remove('active'); }
    }
  }
  function boot(){
    repairNav();
    var nav=document.querySelector('.bottom-nav');
    if(nav && !nav.dataset.ghostxNavRecovery){
      nav.dataset.ghostxNavRecovery='1';
      nav.addEventListener('click',function(e){
        var item=e.target && e.target.closest ? e.target.closest('.nav-item') : null;
        if(!item) return;
        closeProductIfOpen();
        /* Let the existing inline switchTab handler run normally after closing product details. */
        setTimeout(repairNav,0);
      },true);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.addEventListener('load',boot);
  setTimeout(boot,300); setTimeout(boot,1200); setTimeout(boot,2500);
})();
