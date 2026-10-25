
(function(){
  function fixNavLabels(){
    try{
      var home = document.getElementById('nav-home-btn');
      var funds = document.getElementById('nav-funds-btn');
      var orders = document.getElementById('nav-orders-btn');
      var keys = document.getElementById('nav-verify-btn');
      var acc = document.getElementById('nav-acc-btn');
      function setLabel(el, text){
        if(!el) return;
        // Keep first SVG, replace remaining text nodes
        var nodes = Array.prototype.slice.call(el.childNodes);
        nodes.forEach(function(n){
          if(n.nodeType === 3) el.removeChild(n);
        });
        // remove leftover text-only spans that are not icons
        el.querySelectorAll('span.nav-label').forEach(function(s){ s.remove(); });
        var lab = document.createElement('span');
        lab.className = 'nav-label';
        lab.textContent = text;
        el.appendChild(lab);
      }
      setLabel(home, 'Home');
      setLabel(funds, 'Add Fund');
      setLabel(orders, 'Order');
      setLabel(keys, 'My Key');
      setLabel(acc, 'Account');
    }catch(e){}
  }

  function hideMore(){
    try{
      var row = document.getElementById('moreToggleRow');
      if(row) row.style.display = 'none';
      var btn = document.getElementById('sectionMoreToggle');
      if(btn) btn.style.display = 'none';
      var extra = document.getElementById('sectionExtraTabs');
      if(extra){ extra.hidden = true; extra.style.display = 'none'; }
    }catch(e){}
  }

  function applyCover(url){
    var cover = document.getElementById('profileCover');
    if(!cover) return;
    if(url){
      cover.style.backgroundImage = 'url("'+String(url).replace(/"/g,'')+'")';
      cover.style.backgroundSize = 'cover';
      cover.style.backgroundPosition = 'center';
      cover.classList.add('has-photo');
    }
  }

  function loadCoverFromUser(user){
    try{
      if(!user || typeof database === 'undefined') return;
      database.ref('User/' + user.uid + '/coverURL').once('value').then(function(snap){
        var url = snap.val();
        if(url) applyCover(url);
      }).catch(function(){});
    }catch(e){}
  }

  function setupCoverUpload(){
    var btn = document.getElementById('profileCoverBtn');
    var input = document.getElementById('profileCoverInput');
    if(!btn || !input || btn.dataset.ready) return;
    btn.dataset.ready = '1';
    btn.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      try{
        if(typeof auth !== 'undefined' && auth.currentUser) input.click();
        else if(typeof showToast === 'function') showToast('Login required to change cover', '#ef4444');
        else alert('Login required to change cover');
      }catch(err){ input.click(); }
    });
    input.addEventListener('change', function(){
      var file = input.files && input.files[0];
      if(!file) return;
      if(file.size > 4 * 1024 * 1024){
        if(typeof showToast==='function') showToast('Image max 4MB', '#ef4444');
        return;
      }
      var reader = new FileReader();
      reader.onload = function(ev){
        var dataUrl = ev.target.result;
        // preview immediately
        applyCover(dataUrl);
        // upload via ImgBB if key exists, else save dataURL to firebase (may be large)
        var key = (typeof IMGBB_API_KEY !== 'undefined') ? IMGBB_API_KEY : '';
        var user = (typeof auth !== 'undefined') ? auth.currentUser : null;
        if(!user){ return; }
        function saveUrl(url){
          applyCover(url);
          try{ database.ref('User/' + user.uid + '/coverURL').set(url); }catch(e){}
          if(typeof showToast==='function') showToast('Cover updated', '#0b8f3c');
        }
        if(key){
          var base64 = String(dataUrl).split(',')[1] || '';
          var body = new FormData();
          body.append('image', base64);
          fetch('https://api.imgbb.com/1/upload?key=' + encodeURIComponent(key), { method:'POST', body: body })
            .then(function(r){ return r.json(); })
            .then(function(j){
              var url = j && j.data && (j.data.url || j.data.display_url);
              if(url) saveUrl(url);
              else saveUrl(dataUrl);
            })
            .catch(function(){ saveUrl(dataUrl); });
        } else {
          saveUrl(dataUrl);
        }
      };
      reader.readAsDataURL(file);
      input.value = '';
    });
  }

  function boot(){
    fixNavLabels();
    hideMore();
    setupCoverUpload();
    try{
      if(typeof auth !== 'undefined' && auth.currentUser) loadCoverFromUser(auth.currentUser);
      if(typeof auth !== 'undefined' && auth.onAuthStateChanged){
        auth.onAuthStateChanged(function(u){ if(u) loadCoverFromUser(u); });
      }
    }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // re-apply labels in case other scripts rewrite nav
  setTimeout(fixNavLabels, 800);
  setTimeout(fixNavLabels, 2500);
})();
