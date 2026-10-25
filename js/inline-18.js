
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────── 1) Product cards: reveal once, one by one ───────── */
  var seen = {};            /* cards already revealed once → never replay on re-render */
  if (!reduce && 'IntersectionObserver' in window) {
    var pending = [], timer = null;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { pending.push(e.target); io.unobserve(e.target); }
      });
      if (pending.length && !timer) timer = setTimeout(flush, 30);
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    function flush(){
      timer = null;
      var batch = pending.splice(0);
      batch.sort(function(a,b){ return (a.compareDocumentPosition(b) & 4) ? -1 : 1; });
      batch.forEach(function(card, i){
        if (!card.isConnected) return;
        card.style.setProperty('--pc-delay', Math.min(i, 8) * 95 + 'ms');
        card.classList.add('pc-in');
        var finished = false;
        var done = function(ev){
          if (finished || (ev && ev.target !== card)) return;
          finished = true;
          card.classList.remove('pc-reveal','pc-in');
          card.style.removeProperty('--pc-delay');
          card.removeEventListener('animationend', done);
        };
        card.addEventListener('animationend', done);
        setTimeout(done, 1600 + Math.min(i,8) * 95);
      });
    }

    function keyOf(card){
      var grid = card.parentElement ? (card.parentElement.id || 'grid') : 'grid';
      var m = (card.getAttribute('onclick') || '').match(/selectPanelAndOpen\('([^']+)'\)/);
      var t = card.querySelector('.product-card-title');
      return grid + '|' + (m ? m[1] : (t ? t.textContent.trim() : ''));
    }
    function prime(card){
      if (card.__pcSeen) return;
      card.__pcSeen = true;
      var k = keyOf(card);
      if (seen[k]) return;          /* re-rendered card: show instantly, no flicker */
      seen[k] = 1;
      card.classList.add('pc-reveal');
      io.observe(card);
    }
    function scan(root){ (root || document).querySelectorAll('.unique-product-card').forEach(prime); }

    scan();
    new MutationObserver(function(muts){
      muts.forEach(function(m){
        m.addedNodes.forEach(function(n){
          if (n.nodeType !== 1) return;
          if (n.classList && n.classList.contains('unique-product-card')) prime(n);
          else if (n.querySelectorAll) scan(n);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ───────── 2) Page switch: soft fade ───────── */
  var VIEW_ID = { home:'home-view', addfunds:'add-funds-view', orders:'orders-view', verify:'verify-view', account:'account-view' };
  var lastTab = 'home';
  function hook(){
    if (typeof window.switchTab !== 'function' || window.switchTab.__premium) return;
    var orig = window.switchTab;
    var wrapped = function(tab){
      var prev = lastTab;
      var ret = orig.apply(this, arguments);
      try {
        if (!reduce && VIEW_ID[tab] && tab !== prev) {
          var els = [document.getElementById(VIEW_ID[tab])];
          if (tab === 'home') els.push(document.getElementById('home-slider-container'));
          els.forEach(function(el){
            if (!el || el.style.display === 'none') return;
            el.classList.remove('tab-soft-in'); void el.offsetWidth;
            el.classList.add('tab-soft-in');
            var clean = function(){ el.classList.remove('tab-soft-in'); el.removeEventListener('animationend', clean); };
            el.addEventListener('animationend', clean);
            setTimeout(clean, 600);
          });
        }
      } catch(err){}
      if (VIEW_ID[tab]) lastTab = tab;
      return ret;
    };
    wrapped.__premium = true;
    window.switchTab = wrapped;
  }
  hook(); window.addEventListener('load', hook); setTimeout(hook, 1500);

  /* ───────── 3) Bottom nav: green glow glides to selected tab ───────── */
  function initGlider(){
    var nav = document.querySelector('.bottom-nav');
    if (!nav || nav.__glider) return;
    nav.__glider = true;
    var g = document.createElement('div');
    g.className = 'nav-glider no-anim';
    nav.insertBefore(g, nav.firstChild);

    var first = true;
    function sync(){
      var a = nav.querySelector('.nav-item.active');
      if (!a || !a.offsetWidth) return;
      g.style.width  = a.offsetWidth + 'px';
      g.style.height = a.offsetHeight + 'px';
      g.style.transform = 'translate3d(' + a.offsetLeft + 'px,' + a.offsetTop + 'px,0)';
      if (!g.classList.contains('ready')) g.classList.add('ready');
      if (first) {
        first = false;
        void g.offsetWidth;
        requestAnimationFrame(function(){ g.classList.remove('no-anim'); });
      }
    }
    function syncInstant(){
      g.classList.add('no-anim'); sync(); void g.offsetWidth;
      requestAnimationFrame(function(){ g.classList.remove('no-anim'); });
    }
    /* watch ONLY the nav items' class (never the glider itself → no loop) */
    var mo = new MutationObserver(function(){ sync(); });
    nav.querySelectorAll('.nav-item').forEach(function(it){
      mo.observe(it, { attributes:true, attributeFilter:['class'] });
    });
    window.addEventListener('resize', syncInstant);
    sync();
    [300, 900, 2600].forEach(function(ms){ setTimeout(syncInstant, ms); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGlider);
  else initGlider();
  window.addEventListener('load', initGlider);
})();
