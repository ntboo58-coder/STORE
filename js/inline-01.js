
(function(){
  function syncGlassBanner(){
    var header=document.querySelector('.top-header');
    if(!header) return;
    var imgs=document.querySelectorAll('.slider-slide img, .slider-container img, #slide-img-1, #slide-img-2');
    var chosen=null;
    for(var i=0;i<imgs.length;i++){
      var im=imgs[i];
      if(im && im.currentSrc){ chosen=im.currentSrc; break; }
      if(im && im.src){ chosen=im.src; break; }
    }
    if(chosen) header.style.setProperty('--neamot-glass-banner','url("'+chosen.replace(/"/g,'\\"')+'")');
  }
  function boot(){
    syncGlassBanner();
    var root=document.querySelector('.slider-container') || document.body;
    if(root && window.MutationObserver){
      new MutationObserver(function(){ syncGlassBanner(); }).observe(root,{subtree:true,attributes:true,attributeFilter:['src','class','style']});
    }
    document.querySelectorAll('.slider-slide img, #slide-img-1, #slide-img-2').forEach(function(img){
      img.addEventListener('load',syncGlassBanner,{passive:true});
    });
    setTimeout(syncGlassBanner,500);
    setTimeout(syncGlassBanner,1500);
    setTimeout(syncGlassBanner,3000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
