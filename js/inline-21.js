(function(){
  function ensurePanel36(){
    try{
      const all=[...document.querySelectorAll('[data-panel-id], [data-id], .panel-card')];
      const has=all.some(e=>(e.dataset.panelId||e.dataset.id||'').toString()==='panel-36' || e.textContent.includes('panel-36'));
      if(!has){
        const other=document.querySelector('[data-section="other"]');
        if(other) other.setAttribute('data-panel36-required','true');
      }
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ensurePanel36); else ensurePanel36();
})();