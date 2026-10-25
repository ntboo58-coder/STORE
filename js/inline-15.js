
(function(){
  /* Preserve every existing animation. Prioritize only images that can be seen now;
     defer off-screen product images and avoid duplicate Image() downloads. */
  var firstScreenCount=0;
  function isNearViewport(img){
    try{var r=img.getBoundingClientRect();return r.bottom>-240 && r.top<(window.innerHeight||800)+240;}catch(e){return false;}
  }
  function tune(img){
    if(!img||img.tagName!=='IMG'||img.dataset.neamotPerfTuned==='1') return;
    img.dataset.neamotPerfTuned='1';
    try{
      img.decoding='async';
      var visible=isNearViewport(img);
      if(visible && firstScreenCount<4){
        img.loading='eager';
        if(!img.getAttribute('fetchpriority')) img.setAttribute('fetchpriority',firstScreenCount<2?'high':'auto');
        firstScreenCount++;
      }else{
        img.loading='lazy';
        if(!img.getAttribute('fetchpriority')) img.setAttribute('fetchpriority','low');
      }
    }catch(e){}
  }
  function scan(root){
    if(!root) return;
    if(root.tagName==='IMG') tune(root);
    if(root.querySelectorAll) root.querySelectorAll('img').forEach(tune);
  }
  function boot(){
    scan(document);
    try{
      new MutationObserver(function(muts){
        muts.forEach(function(m){m.addedNodes&&m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n);});});
      }).observe(document.documentElement,{childList:true,subtree:true});
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
