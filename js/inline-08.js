
(function(){
  function getNoticeText(){
    var t=document.querySelector('#NEAMOTTopNotice .NEAMOT-top-notice-title');
    var b=document.getElementById('NEAMOTNoticeBody');
    return {
      title:t ? t.textContent.trim() : '📢 NEAMOT 2.0 STORE — গুরুত্বপূর্ণ নোটিশ 🛒',
      body:b ? b.innerHTML : 'কোনো নতুন Notice নেই।'
    };
  }
  window.openNEAMOTNoticePopup=function(){
    var old=document.getElementById('NEAMOTV7NoticePopup');
    if(!old){
      old=document.createElement('div');
      old.id='NEAMOTV7NoticePopup';
      old.className='NEAMOT-v7-notice-overlay';
      old.innerHTML='<div class="NEAMOT-v7-notice-box" role="dialog" aria-modal="true">' +
        '<div class="NEAMOT-v7-notice-head"><div class="icon"><i class="fas fa-bullhorn"></i></div>' +
        '<h3>Notice Board</h3><button class="NEAMOT-v7-notice-close" type="button" aria-label="Close">✕</button></div>' +
        '<div class="NEAMOT-v7-notice-title"></div><div class="NEAMOT-v7-notice-body"></div></div>';
      document.body.appendChild(old);
      old.addEventListener('click',function(e){if(e.target===old) window.closeNEAMOTNoticePopup();});
      old.querySelector('.NEAMOT-v7-notice-close').addEventListener('click',window.closeNEAMOTNoticePopup);
    }
    var n=getNoticeText();
    old.querySelector('.NEAMOT-v7-notice-title').textContent=n.title;
    old.querySelector('.NEAMOT-v7-notice-body').innerHTML=n.body;
    old.classList.add('show');
    document.body.style.overflow='hidden';
  };
  window.closeNEAMOTNoticePopup=function(){
    var p=document.getElementById('NEAMOTV7NoticePopup');
    if(p)p.classList.remove('show');
    document.body.style.overflow='';
  };

  function normalToast(message,type){
    var el=document.getElementById('custom-toast');
    if(!el){
      if(typeof window.kr2ShowToast==='function') return window.kr2ShowToast(message,type||'error');
      return;
    }
    var icon=document.getElementById('toast-icon');
    var text=document.getElementById('toast-text');
    var isError=type==='error';
    var color=isError?'#20c8f5':(type==='success'?'#22c55e':'#ffffff');
    var iconHtml=isError?'✕':(type==='success'?'✓':'i');
    el.style.borderColor=color;
    if(icon){icon.style.borderColor=color;icon.style.color=color;icon.textContent=iconHtml;}
    if(text)text.textContent=message||'Notification';
    el.classList.add('show');
    clearTimeout(window.__NEAMOTV7ToastTimer);
    window.__NEAMOTV7ToastTimer=setTimeout(function(){el.classList.remove('show');},3000);
  }

  window.showToast=function(message,borderColor,icon){
    var type='info';
    if(String(borderColor||'').toLowerCase().includes('red') || String(icon||'').includes('❌') || String(icon||'').includes('✕')) type='error';
    else if(String(icon||'').includes('✓') || String(icon||'').includes('✅')) type='success';
    normalToast(message,type);
  };

  window.kr2ShowToast=function(message,type){
    normalToast(message,type||'error');
  };

  /* Replace the old large notification popup with the normal icon toast. */
  window.showNotification=function(icon,title,desc,btnText,isGreen){
    var msg=title || desc || 'Notification';
    normalToast(msg,isGreen?'success':'error');
  };
  window.closeNotification=function(){
    var p=document.getElementById('notificationPopup');
    if(p)p.classList.remove('active');
  };
})();
