
/* GHOST XPANEL client-side protection deterrent.
   Important: HTML/JS delivered to a browser can never be made mathematically
   impossible to inspect or decode. This only blocks common casual actions. */
(function(){
  try{
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); }, {passive:false});
    document.addEventListener('selectstart', function(e){ e.preventDefault(); }, {passive:false});
    document.addEventListener('dragstart', function(e){ e.preventDefault(); }, {passive:false});
    document.addEventListener('keydown', function(e){
      const k=String(e.key||'').toLowerCase();
      if(e.key==='F12' || (e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(k)) || (e.ctrlKey&&k==='u')){
        e.preventDefault(); e.stopPropagation(); return false;
      }
    }, true);
  }catch(_){}
})();
