
(function(){
  function letterOf(n){ n=String(n||'').trim(); return n ? n.charAt(0).toUpperCase() : 'U'; }
  function paint(el, photo, name){
    if(!el) return;
    el.style.backgroundImage='none';
    el.textContent='';
    var letter=letterOf(name);
    if(photo){
      var img=document.createElement('img');
      img.referrerPolicy='no-referrer'; img.alt=''; img.src=photo;
      img.style.cssText='width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;';
      img.onerror=function(){ try{img.remove();}catch(e){} el.textContent=letter; };
      el.appendChild(img);
    } else { el.textContent=letter; }
  }
  function currentName(user){
    var n=(document.getElementById('profile-display-name')||{}).textContent||'';
    n=n.trim();
    if(!n || /^(loading|my profile)/i.test(n)){
      n=(user&&(user.displayName||(user.email||'').split('@')[0]))||'U';
    }
    return n;
  }
  function paintAll(user){
    try{
      user=user||(window.auth&&auth.currentUser); if(!user) return;
      var name=currentName(user);
      paint(document.getElementById('profile-initials'), user.photoURL||'', name);
      paint(document.getElementById('drawerAvatar'), user.photoURL||'', name);
    }catch(e){}
  }
  var orig=window.updateProfileUI;
  if(typeof orig==='function'){
    window.updateProfileUI=function(user){ var r=orig.apply(this,arguments); paintAll(user); return r; };
  }
  var nameEl=document.getElementById('profile-display-name');
  if(nameEl && window.MutationObserver){
    new MutationObserver(function(){ paintAll(); }).observe(nameEl,{childList:true,characterData:true,subtree:true});
  }
  /* store uid + photo on the owner's orders so Latest Orders can show it for everyone (non-fatal if rules block it) */
  try{
    auth.onAuthStateChanged(function(u){
      if(!u||!u.email) return;
      paintAll(u);
      database.ref('orders').orderByChild('userEmail').equalTo(u.email).once('value').then(function(snap){
        var d=snap.val()||{};
        Object.keys(d).forEach(function(k){
          var o=d[k]||{}, upd={};
          if(!o.userUid) upd.userUid=u.uid;
          if(u.photoURL && o.photoURL!==u.photoURL) upd.photoURL=u.photoURL;
          if(Object.keys(upd).length) database.ref('orders/'+k).update(upd).catch(function(){});
        });
      }).catch(function(){});
    });
  }catch(e){}
})();
