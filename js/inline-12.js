
/* NEAMOT 2.0 — AUTH/PURCHASE + SUPPORT FIX V4 */
(function(){
  /* ---------- Add Funds: never falsely report Login Required ---------- */
  function NEAMOTHasUser(){
    try{
      if(window.auth && window.auth.currentUser) return true;
      if(window.firebase && firebase.auth && firebase.auth().currentUser) return true;
      const p=document.getElementById('profile-view-box');
      return !!(p && getComputedStyle(p).display !== 'none');
    }catch(e){ return false; }
  }
  window.NEAMOTHasUser=NEAMOTHasUser;

  /* Replace the previous switchTab wrapper: Add Funds opens directly.
     The payment submission itself still requires a real Firebase account. */
  const previousSwitch = window.switchTab;
  window.switchTab = function(tab, fromRoute){
    if(tab==='addfunds'){
      /* Render Add Funds directly so a stale auth guard can never block a logged-in user. */
      try{
        currentTab='addfunds';
        const ids=['home-view','verify-view','orders-view','account-view','home-slider-container'];
        ids.forEach(id=>{const el=document.getElementById(id);if(el){el.style.display='none';el.classList.remove('active-view');}});
        const add=document.getElementById('add-funds-view');
        if(add){add.style.display='flex';add.classList.add('active-view');}
        ['nav-home-btn','nav-verify-btn','nav-orders-btn','nav-acc-btn'].forEach(id=>document.getElementById(id)?.classList.remove('active'));
        document.getElementById('nav-funds-btn')?.classList.add('active');
        if(Array.isArray(pageHistory)&&pageHistory[pageHistory.length-1]!=='addfunds')pageHistory.push('addfunds');
        if(window.auth?.currentUser && typeof loadFundsHistory==='function')loadFundsHistory(window.auth.currentUser.uid);
        if(typeof updateUITexts==='function')updateUITexts(currentLanguage);
        if(!fromRoute && typeof setRouteHash==='function')setRouteHash('addfunds',false);
        if(typeof closeDrawer==='function')closeDrawer();
      }catch(e){ console.warn('Direct Add Funds render:',e); }
      const v=document.getElementById('add-funds-view');
      if(v){
        v.classList.add('NEAMOT-addfunds-popup-active');
        v.style.display='flex';
        let close=v.querySelector('.NEAMOT-addfunds-popup-close');
        if(!close){
          close=document.createElement('button');
          close.type='button';
          close.className='NEAMOT-addfunds-popup-close';
          close.innerHTML='×';
          close.setAttribute('aria-label','Close Add Funds');
          close.onclick=function(){
            v.classList.remove('NEAMOT-addfunds-popup-active');
            if(typeof previousSwitch==='function'){
              try{previousSwitch('home',false);}catch(e){}
            }
            document.body.style.overflow='';
          };
          const card=v.querySelector('.funds-card');
          if(card) card.appendChild(close); else v.appendChild(close);
        }
        document.body.style.overflow='hidden';
      }
      return;
    }
    if(tab==='home'){
      const v=document.getElementById('add-funds-view');
      if(v)v.classList.remove('NEAMOT-addfunds-popup-active');
      document.body.style.overflow='';
    }
    return typeof previousSwitch==='function' ? previousSwitch(tab,fromRoute) : undefined;
  };

  function bindAddFundsCard(){
    const b=document.getElementById('other-pay-tab');
    if(!b)return;
    b.onclick=function(e){
      try{e.preventDefault();e.stopPropagation();}catch(x){}
      window.switchTab('addfunds');
    };
  }
  bindAddFundsCard();
  setTimeout(bindAddFundsCard,400);
  setTimeout(bindAddFundsCard,1200);

  /* ---------- Login state + plan selection button ---------- */
  function selectedPlanIsValid(){
    try{
      if(!window.selectedId || !window.selectedPlanGlobal) return false;
      const item=typeof getPanelById==='function'?getPanelById(window.selectedId):null;
      const prices=item && item.data && item.data.prices;
      if(!prices) return false;
      const raw=prices[window.selectedPlanGlobal];
      const unit=parseFloat(String(raw??0).replace(/[^0-9.]/g,''))||0;
      return unit*(Number(window.selectedQuantity)||1)>0;
    }catch(e){return false;}
  }

  function updatePurchaseButton(){
    const btn=document.getElementById('panel-payment-buy-btn');
    if(!btn)return;
    const logged=NEAMOTHasUser();
    if(!logged){
      btn.innerHTML='🔐 LOGIN NOW';
      btn.dataset.NEAMOTState='login';
      return;
    }
    btn.innerHTML='🛒 PURCHASE NOW';
    btn.dataset.NEAMOTState='purchase';
  }
  window.updatePurchaseButton=updatePurchaseButton;

  /* Do not auto-purchase when Wallet Pay is selected. */
  window.selectPanelPaymentMethod=function(method){
    if(method==='other')method='addfunds';
    window.selectedPanelPaymentMethod=method;
    try{selectedPanelPaymentMethod=method;}catch(e){}
    const wallet=document.getElementById('wallet-tab');
    const other=document.getElementById('other-pay-tab');
    const ind=document.getElementById('ind-upi-tab');
    if(wallet)wallet.classList.toggle('selected',method==='wallet');
    if(other)other.classList.toggle('selected',method==='addfunds');
    if(ind)ind.classList.remove('selected');
    if(method==='addfunds'){
      window.switchTab('addfunds');
      return;
    }
    updatePurchaseButton();
  };

  window.confirmPanelPaymentMethod=function(){
    if(!NEAMOTHasUser()){
      updatePurchaseButton();
      if(typeof openLogin==='function') openLogin();
      else if(typeof navigateToAuth==='function'){navigateToAuth('login');if(typeof previousSwitch==='function')previousSwitch('account');}
      return;
    }
    if(!selectedId || !selectedPlanGlobal){
      if(typeof showToast==='function')showToast('Please select a plan first.','#ff4444','⚠️');
      return;
    }
    if(!selectedPanelPaymentMethod){
      if(typeof showToast==='function')showToast('Please select WALLET PAY first.','#ff4444','⚠️');
      return;
    }
    if(selectedPanelPaymentMethod==='wallet') return buyWithWallet();
    if(selectedPanelPaymentMethod==='addfunds') return window.switchTab('addfunds');
  };

  /* Keep button correct whenever a plan/quantity is changed. */
  const oldUpdatePrice=window.updatePriceTextOnly;
  window.updatePriceTextOnly=async function(){
    const r=oldUpdatePrice ? oldUpdatePrice.apply(this,arguments) : undefined;
    setTimeout(updatePurchaseButton,0);
    return r;
  };

  const oldOpenPanel=window.openPricePanel;
  window.openPricePanel=function(){
    const r=oldOpenPanel ? oldOpenPanel.apply(this,arguments) : undefined;
    setTimeout(updatePurchaseButton,80);
    return r;
  };

  /* Auth state refreshes the button immediately after login/logout. */
  if(window.auth && typeof auth.onAuthStateChanged==='function'){
    auth.onAuthStateChanged(function(){setTimeout(updatePurchaseButton,60);});
  }
  document.addEventListener('click',function(e){
    if(e.target.closest && e.target.closest('#panel-payment-buy-btn')){
      setTimeout(updatePurchaseButton,0);
    }
  },true);

  /* ---------- Floating Support popup ---------- */
  const style=document.createElement('style');
  style.id='NEAMOT-support-popup-v4-style';
  style.textContent=`
    #NEAMOTSupportOverlayV4{position:fixed;inset:0;z-index:100000000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);}
    #NEAMOTSupportOverlayV4.show{display:flex;animation:NEAMOTSupFade .18s ease-out;}
    @keyframes NEAMOTSupFade{from{opacity:0}to{opacity:1}}
    .NEAMOT-support-card-v4{width:min(360px,94vw);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:20px;background:linear-gradient(145deg,#171827,#0e1019);box-shadow:0 24px 70px rgba(0,0,0,.65);position:relative;color:#fff;}
    .NEAMOT-support-close-v4{position:absolute;right:12px;top:12px;width:36px;height:36px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#232635;color:#fff;font-size:22px;cursor:pointer;}
    .NEAMOT-support-head-v4{display:flex;gap:12px;align-items:center;margin-bottom:18px;}
    .NEAMOT-support-head-icon-v4{width:48px;height:48px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#159eea,#1265d8);box-shadow:0 0 24px rgba(21,158,234,.35);font-size:24px;}
    .NEAMOT-support-head-v4 b{display:block;font-size:19px;font-weight:1000}.NEAMOT-support-head-v4 span{display:block;color:#9da4b8;font-size:11px;margin-top:3px;}
    .NEAMOT-support-option-v4{display:flex;align-items:center;gap:13px;width:100%;padding:15px;margin-top:10px;border-radius:17px;border:1px solid rgba(255,255,255,.1);background:#111521;color:#fff;text-decoration:none;cursor:pointer;text-align:left;transition:.18s;}
    .NEAMOT-support-option-v4:hover{transform:translateY(-1px);border-color:#3b82f6;background:#151b2a;}
    .NEAMOT-support-option-v4 i{width:43px;height:43px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:21px;flex:none;}
    .NEAMOT-support-option-v4.telegram i{background:#159eea}.NEAMOT-support-option-v4.ai i{background:linear-gradient(135deg,#a855f7,#8bdff8)}
    .NEAMOT-support-option-v4 b{font-size:14px}.NEAMOT-support-option-v4 small{display:block;color:#9299ac;font-size:11px;margin-top:3px;}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.id='NEAMOTSupportOverlayV4';
  overlay.innerHTML=`<div class="NEAMOT-support-card-v4" role="dialog" aria-modal="true">
    <button class="NEAMOT-support-close-v4" type="button" aria-label="Close">×</button>
    <div class="NEAMOT-support-head-v4"><div class="NEAMOT-support-head-icon-v4"><i class="fas fa-headset"></i></div><div><b>NEAMOT 2.0 SUPPORT</b><span>Choose how you want help</span></div></div>
    <a class="NEAMOT-support-option-v4 telegram" href="https://t.me/NEAMOTsupport2" target="_blank" rel="noopener"><i class="fab fa-telegram-plane"></i><div><b>Telegram Support</b><small>Chat with NEAMOT 2.0 Support Team</small></div></a>
    <a class="NEAMOT-support-option-v4 ai" href="https://NEAMOTpanel.store" target="_blank" rel="noopener"><i class="fas fa-robot"></i><div><b>NEAMOT 2.0 AI Assistant</b><small>AI Help Site • Open Assistant</small></div></a>
  </div>`;
  document.body.appendChild(overlay);
  const closeSup=()=>{overlay.classList.remove('show');document.body.style.overflow='';};
  overlay.querySelector('.NEAMOT-support-close-v4').onclick=closeSup;
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeSup();});
  window.openNEAMOTSupportV4=function(){overlay.classList.add('show');document.body.style.overflow='hidden';};

  function bindSupport(){
    const btn=document.getElementById('tg-btn');
    const wrap=document.getElementById('tg-btn-wrap');
    if(!btn)return;
    btn.removeAttribute('href');btn.removeAttribute('target');
    btn.onclick=function(e){e.preventDefault();e.stopPropagation();window.openNEAMOTSupportV4();return false;};
    if(wrap)wrap.style.cursor='pointer';
  }
  bindSupport();setTimeout(bindSupport,500);setTimeout(bindSupport,1200);

  setTimeout(updatePurchaseButton,300);
})();

