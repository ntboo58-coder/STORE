
(function(){
  const INR_RATE=0.74; // BDT -> INR display rate used by the store's existing country conversion.
  const TG='https://t.me/NEAMOTsupport2';
  window.NEAMOTSendUpiDetails=function(bdtAmount){
    try{
      const inrAmt=(Number(bdtAmount||0)*INR_RATE).toFixed(2);
      let email='Guest', uid='N/A', username='N/A', photo='';
      try{
        if(window.auth && auth.currentUser){
          email=auth.currentUser.email||email;
          uid=auth.currentUser.uid||uid;
          photo=auth.currentUser.photoURL||'';
        }
      }catch(e){}
      try{
        const u=document.getElementById('drawerUserEmail')||document.getElementById('headerUserEmail');
        if(u && (u.textContent||'').trim()) email=(u.textContent||'').trim();
        const n=document.getElementById('drawerUserName')||document.getElementById('headerUserName');
        if(n && (n.textContent||'').trim()) username=(n.textContent||'').trim();
      }catch(e){}
      try{
        if(!photo){
          const av=document.querySelector('.header-avatar, .drawer-avatar, .user-avatar, [style*="photoURL"]');
          if(av){
            const bg=av.style&&av.style.backgroundImage||'';
            const mm=bg.match(/url\(["']?([^"')]+)/);
            if(mm) photo=mm[1];
          }
        }
      }catch(e){}
      const msg=[
        'IND UPI ADD FUNDS — PAYMENT DETAILS',
        '--------------------------------',
        'Amount (INR): ₹'+inrAmt,
        'Amount (BDT): '+(Number(bdtAmount||0).toFixed(0))+' ৳',
        'Email: '+email,
        'Username: '+username,
        'UID: '+uid,
        (photo?('Profile Logo: '+photo):'Profile Logo: N/A'),
        'Method: IND UPI PAY',
        '--------------------------------',
        'I have paid via UPI. Screenshot will be sent next. Please verify and add funds.'
      ].join('\n');
      const url='https://t.me/NEAMOTsupport2?text='+encodeURIComponent(msg);
      window.open(url,'_blank','noopener');
      return false;
    }catch(err){
      window.open(TG,'_blank','noopener');
      return false;
    }
  };
  const $=id=>document.getElementById(id);
  const safe=(v)=>String(v??'').replace(/[<>&"]/g,m=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[m]));
  const inr=(bdt)=>'₹'+(Number(bdt||0)*INR_RATE).toFixed(2);

  /* 1) ADD FUNDS card always opens Add Funds directly. */
  function forceAddFundsDirect(){
    const b=$('other-pay-tab'); if(!b) return;
    b.onclick=function(e){e.preventDefault();e.stopPropagation(); if(typeof switchTab==='function')switchTab('addfunds');};
  }

  /* 2) Auto Payment Verify preference (UI toggle). Actual credit remains controlled by the existing admin approval listener. */
  function addAutoVerifyText(){
    const btn=document.querySelector('.funds-submit-btn'); if(!btn || document.getElementById('NEAMOTAutoVerifyText')) return;
    const wrap=document.createElement('div'); wrap.id='NEAMOTAutoVerifyText'; wrap.className='NEAMOT-auto-verify';
    wrap.innerHTML='<span class="NEAMOT-auto-verify-left"><span>✓</span><span>Auto Payment Verify<small>Payment status will sync automatically after successful verification.</small></span></span>';
    btn.parentNode.insertBefore(wrap,btn);
  }

  /* 3) IND UPI: no login redirect from the screenshot-send button. */
  function patchIndUpiSubmit(){
    window.submitIndUpiFundsRequest=function(){
      // Never open the Login page from this button. If the user is already logged in, save a Pending request.
      const b=document.querySelector('.NEAMOT-upi-submit');
      const success=document.querySelector('.NEAMOT-upi-success');
      if(!window.auth || !auth.currentUser){
        if(success){success.style.display='block';success.innerHTML='✓ Screenshot noted. No login page will be opened.<br><small>Telegram: @NEAMOTsupport2 — Admin review is required before wallet credit.</small>';}
        if(b){b.disabled=true;b.textContent='✓ SCREENSHOT SENT — WAITING FOR ADMIN';}
        return;
      }
      const amount=Number((typeof fundsAmount!=='undefined'?fundsAmount:0)||0);
      if(!(amount>0)) return;
      const uid=auth.currentUser.uid;
      const fundData={amount:amount,method:'IND UPI PAY',transactionId:'',status:'Pending',userEmail:auth.currentUser.email||'',timestamp:firebase.database.ServerValue.TIMESTAMP,note:'Screenshot sent to Telegram @NEAMOTsupport2'};
      const ref=database.ref('funds/'+uid).push();
      ref.set(fundData).then(function(){
        try{notifyAdminNewFund(fundData,uid,ref.key);}catch(e){}
        if(success){success.style.display='block';success.innerHTML='✓ ADD FUNDS REQUEST SUBMITTED<br><small>Admin is checking your payment screenshot. Balance will be added after approval.</small>';}
        if(b){b.disabled=true;b.textContent='✓ ADD FUNDS REQUEST SENT';}
        try{loadFundsHistory(uid);}catch(e){}
      }).catch(function(){if(success){success.style.display='block';success.textContent='Request could not be submitted. Please try again.';}});
    };
  }

  /* 4) IND UPI always shows INR, regardless of selected site country. */
  const oldOpen=window.openFundsPaymentPage;
  window.openFundsPaymentPage=function(amount){
    const method=(typeof fundsMethod!=='undefined'&&fundsMethod)||'bkash';
    if(method!=='ind_upi') return oldOpen(amount);
    const page=$('funds-payment-page'); if(!page) return;
    // Let the existing IND UPI renderer build the white page first.
    try{oldOpen(amount);}catch(e){}
    setTimeout(()=>{
      const amt=$('fundsPaymentAmountDisplay'); if(amt)amt.textContent=inr(amount);
      const card=document.querySelector('.NEAMOT-upi-white-card');
      if(card){
        let note=card.querySelector('.NEAMOT-upi-inr-note');
        if(!note){note=document.createElement('div');note.className='NEAMOT-upi-inr-note';card.querySelector('.NEAMOT-upi-amount')?.after(note);}
        note.textContent='IND UPI PAYMENT • Pay exactly: '+inr(amount)+' (from BDT '+Number(amount||0).toFixed(0)+')';
        const amtBold=card.querySelector('.NEAMOT-upi-amount b');
        if(amtBold) amtBold.textContent=inr(amount)+' INR';
        const tgA=card.querySelector('#NEAMOT-upi-tg-send')||card.querySelector('.NEAMOT-upi-telegram');
        if(tgA){
          tgA.onclick=function(e){e.preventDefault();return window.NEAMOTSendUpiDetails(amount);};
          tgA.href='#';
          if(!/Send Details/i.test(tgA.textContent)) tgA.innerHTML='<i class="fab fa-telegram-plane"></i> Telegram @NEAMOTsupport2 — Send Details';
        }
      }
      // The screenshot-send button must never call the login page.
      const send=card?.querySelector('.NEAMOT-upi-submit'); if(send)send.onclick=window.submitIndUpiFundsRequest;
    },40);
  };

  /* 5) Realistic full-screen gateway styling + Binance English/USA copy. */
  const oldInstr=window.updateFundsPayInstructions;
  window.updateFundsPayInstructions=function(price,method){
    if(method==='binance'){
      const list=$('funds-pay-instruction-list');
      if(list){
        const usd=(Number(price)/Number(window.NEAMOT_USD_RATE||120)).toFixed(2);
        list.innerHTML='<li><b>BINANCE PAY</b> — Open Binance Pay.</li><li>Send exactly <span class="highlight-yellow">$'+usd+' USD</span>.</li><li>Binance Pay ID: <span class="highlight-yellow">'+safe(typeof binanceId!=='undefined'?binanceId:'')+'</span> <button class="copy-btn-exact" onclick="copyText(\''+safe(typeof binanceId!=='undefined'?binanceId:'')+'\')">Copy</button></li><li>After payment, keep your successful payment screenshot.</li><li>Submit the Transaction ID and tap VERIFY PAYMENT.</li>';
      }
      document.title='Binance Pay — NEAMOT 2.0';
      return;
    }
    return oldInstr(price,method);
  };

  /* 6) VERIFY PAYMENT: show Redirecting for 3 seconds, then continue the existing verification flow. */
  const originalVerify=window.fundsPayTriggerVerify;
  window.fundsPayTriggerVerify=function(){
    const btn=$('funds-pay-verify-btn'); if(!btn)return;
    if(btn.dataset.redirecting==='1')return;
    btn.dataset.redirecting='1'; btn.disabled=true;
    let sec=3;
    const oldText=btn.textContent;
    btn.textContent='↻ Redirecting... 3';
    const timer=setInterval(()=>{
      sec--; btn.textContent='↻ Redirecting... '+sec;
      if(sec<=0){clearInterval(timer);btn.dataset.redirecting='';btn.textContent=oldText;btn.disabled=false;try{originalVerify();}catch(e){console.error(e);}}
    },1000);
  };

  /* 7) Fund history clickable details popup. */
  function ensureFundModal(){
    if($('NEAMOTFundModal'))return;
    const m=document.createElement('div');m.id='NEAMOTFundModal';m.className='NEAMOT-fund-modal';m.innerHTML='<div class="NEAMOT-fund-modal-card"><div class="NEAMOT-fund-modal-head"><b>💳 Fund Payment Details</b><button class="NEAMOT-fund-close" type="button">×</button></div><div id="NEAMOTFundModalBody"></div></div>';
    m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show');});m.querySelector('.NEAMOT-fund-close').onclick=()=>m.classList.remove('show');document.body.appendChild(m);
  }
  window.openNEAMOTFundHistory=function(item){
    ensureFundModal(); const m=$('NEAMOTFundModal'),body=$('NEAMOTFundModalBody');
    const paid=item.status==='Approved'||item.status==='Paid';
    const date=item.timestamp?new Date(item.timestamp).toLocaleString('bn-BD'):'N/A';
    const amount=Number(item.amount||0).toFixed(0);
    body.innerHTML='<span class="NEAMOT-fund-status '+(paid?'paid':'')+'">'+(paid?'PAID ✓':'PENDING ⏳')+'</span><div class="NEAMOT-fund-detail"><div><small>Amount</small><strong>৳'+safe(amount)+'</strong></div><div><small>Method</small><strong>'+safe(item.method||'N/A')+'</strong></div><div><small>Trx ID</small><strong>'+safe(item.transactionId||'N/A')+'</strong></div><div><small>Date</small><strong>'+safe(date)+'</strong></div></div><div class="NEAMOT-fund-bangla">'+(paid?'আপনার পেমেন্ট সফলভাবে যাচাই করা হয়েছে। নির্ধারিত টাকা আপনার অ্যাকাউন্ট ব্যালেন্সে যোগ হয়েছে।':'আপনার পেমেন্টটি বর্তমানে Pending আছে। Admin আপনার Trx ID / পেমেন্টের তথ্য চেক করছেন। পেমেন্ট সফলভাবে যাচাই হলে আপনার অ্যাকাউন্টে ব্যালেন্স যোগ হয়ে যাবে।')+'</div>';
    m.classList.add('show');
  };
  const oldHistory=window.loadFundsHistory;
  window.loadFundsHistory=function(uid){
    if(!uid || !database)return;
    const c=$('fundsHistoryContainer'); if(!c)return;
    database.ref('funds/'+uid).orderByChild('timestamp').limitToLast(20).on('value',snap=>{
      const data=snap.val(); if(!data){c.innerHTML='<div class="funds-history-empty">No fund history yet.</div>';return;}
      let html=''; Object.keys(data).reverse().forEach(key=>{const item=data[key]||{};const paid=item.status==='Approved'||item.status==='Paid';const date=item.timestamp?new Date(item.timestamp).toLocaleDateString('bn-BD'):'N/A';html+='<div class="funds-history-item" data-fund-key="'+safe(key)+'" data-fund-json="'+safe(JSON.stringify(item))+'"><div class="left"><div class="amount">'+safe(item.amount||0)+' <span class="currency-symbol">BDT</span></div><div class="date">'+safe(date)+'</div></div><div class="right"><span class="status '+(paid?'paid':'pending')+'">'+(paid?'PAID ✓':'PENDING ⏳')+'</span></div></div>';});
      c.innerHTML=html||'<div class="funds-history-empty">No fund history yet.</div>';
      c.querySelectorAll('.funds-history-item').forEach(el=>el.onclick=()=>{try{openNEAMOTFundHistory(JSON.parse(el.getAttribute('data-fund-json')||'{}'));}catch(e){}});
    });
  };

  /* 8) Latest Orders: idempotent DOM updates; keep the same UI and animations. */
  function polishLatestOrders(){
    document.querySelectorAll('.home-order-desc .order-price').forEach(x=>{
      if(x.style.display!=='none') x.style.display='none';
    });
    document.querySelectorAll('.home-order-status').forEach(x=>{
      if(x.textContent!=='ORDER PAID ✓') x.textContent='ORDER PAID ✓';
      if(!x.classList.contains('NEAMOT-order-paid')) x.classList.add('NEAMOT-order-paid');
    });
  }
  function observeOrders(){
    polishLatestOrders();
    const c=$('home-orders-container')||document.querySelector('.home-orders-container')||$('latest-orders-container');
    if(c && !c.dataset.neamotOrdersObserver){
      c.dataset.neamotOrdersObserver='1';
      let queued=false;
      new MutationObserver(function(){
        if(queued) return;
        queued=true;
        (window.requestAnimationFrame||function(fn){return setTimeout(fn,16)})(function(){queued=false;polishLatestOrders();});
      }).observe(c,{childList:true,subtree:true});
    }
  }

  /* Fix Add Funds direct navigation even if the original code rebinds the card. */
  function boot(){
    forceAddFundsDirect();addAutoVerifyText();patchIndUpiSubmit();ensureFundModal();observeOrders();
    setTimeout(forceAddFundsDirect,400);setTimeout(addAutoVerifyText,700);setTimeout(patchIndUpiSubmit,700);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
