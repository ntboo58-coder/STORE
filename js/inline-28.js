
(function(){
  function keepNav(){
    try{
      var nav=document.querySelector('.bottom-nav');
      if(!nav) return;
      nav.style.setProperty('display','flex','important');
      nav.style.setProperty('visibility','visible','important');
      nav.style.setProperty('opacity','1','important');
      nav.style.setProperty('z-index','2147483000','important');
      nav.style.setProperty('position','fixed','important');
    }catch(e){}
  }
  function after(fnName){
    try{
      var fn=window[fnName];
      if(typeof fn!=='function' || fn.__navSafe) return;
      var w=function(){
        var r=fn.apply(this, arguments);
        setTimeout(keepNav,0);
        setTimeout(keepNav,100);
        return r;
      };
      w.__navSafe=true;
      if(fn.__premium) w.__premium=true;
      window[fnName]=w;
    }catch(e){}
  }
  function boot(){
    keepNav();
    ['switchTab','openFundsPaymentPage','closeFundsPaymentPage'].forEach(after);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);
  setTimeout(boot, 800);
  setTimeout(boot, 2000);
})();
