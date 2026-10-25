
(function(){
  function openOnStoreStart(){
    try{
      if(typeof window.showOfficialNotice==='function'){
        setTimeout(function(){ window.showOfficialNotice(); },700);
      }
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',openOnStoreStart);
  else openOnStoreStart();
})();
