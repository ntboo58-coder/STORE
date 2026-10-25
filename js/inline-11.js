
(function(){
  const errPopup=document.getElementById('NEAMOT-red-error-popup');
  const errText=document.getElementById('NEAMOT-red-error-text');

  window.closeNEAMOTRedErrorPopup=function(){
    if(errPopup){errPopup.classList.remove('show');errPopup.setAttribute('aria-hidden','true');}
    if(document.getElementById('funds-payment-page')?.classList.contains('active')===false &&
       document.getElementById('add-funds-view')?.classList.contains('NEAMOT-addfunds-popup-active')===false){
      document.body.style.overflow='';
    }
  };
  window.showNEAMOTRedError=function(message,title){
    if(!errPopup)return;
    const card=errPopup.querySelector('.NEAMOT-red-error-card');
    const h=card?card.querySelector('h3'):null;
    if(h)h.textContent=title||'Payment Error';
    if(errText){
      const formatError = (value) => {
        if (value == null || value === '') return 'Something went wrong. Please try again.';
        if (typeof value === 'string') return value;
        if (value instanceof Error) return value.message || value.name || 'Unknown error';
        if (typeof value === 'object') {
          const nested = value.error;
          if (typeof nested === 'string' && nested.trim()) return nested;
          if (nested && typeof nested === 'object') {
            const nestedMessage = nested.message || nested.description || nested.error_description;
            if (nestedMessage) return String(nestedMessage);
          }
          const direct = value.message || value.description || value.error_description || value.details || value.reason;
          if (direct) return String(direct);
          try { return JSON.stringify(value, null, 2); } catch (_) { return 'An unknown error object was returned.'; }
        }
        return String(value);
      };
      errText.textContent=formatError(message);
    }
    errPopup.classList.add('show');errPopup.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  };

  /* Convert all red/error to the new centered red popup. */
  const previousShowToast=window.showToast;
  window.showToast=function(message,borderColor,icon){
    const s=String(borderColor||'').toLowerCase();
    const i=String(icon||'');
    const isError=s.includes('red')||s.includes('#20c8f5')||s.includes('#ff4444')||s.includes('#20c8f5')||
                  i.includes('❌')||i.includes('✕')||i.includes('⚠');
    if(isError){window.showNEAMOTRedError(message,'Payment Error');return;}
    if(typeof previousShowToast==='function')return previousShowToast(message,borderColor,icon);
  };

  /* Add Funds popup — clicking the green ADD FUNDS card opens this modal. */
  const oldSwitch=window.switchTab;
  window.switchTab=function(tab,fromRoute){
    if(tab==='addfunds'){
      if(!window.auth || !auth.currentUser){
        window.showNEAMOTRedError('Please login first to add funds.','Login Required');
        return;
      }
      const v=document.getElementById('add-funds-view');
      if(v)v.classList.remove('NEAMOT-addfunds-popup-active');
      document.body.style.overflow='';
      return typeof oldSwitch==='function'?oldSwitch(tab,fromRoute):undefined;
    }
    if(tab==='home'){
      const v=document.getElementById('add-funds-view');
      if(v)v.classList.remove('NEAMOT-addfunds-popup-active');
      document.body.style.overflow='';
    }
    return typeof oldSwitch==='function'?oldSwitch(tab,fromRoute):undefined;
  };

  /* Existing inline card handler may call switchTab directly; rebind the ADD FUNDS card. */
  function bindAddFunds(){
    const b=document.getElementById('other-pay-tab');
    if(!b)return;
    b.onclick=function(){
      window.switchTab('addfunds');
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAddFunds);else bindAddFunds();
  setTimeout(bindAddFunds,500);setTimeout(bindAddFunds,1200);

  /* Never send IND UPI users to Login from the screenshot button. */
  window.submitIndUpiFundsRequest=function(){
    const amount=Number((typeof fundsAmount!=='undefined'?fundsAmount:0)||0);
    if(!(amount>0)){window.showNEAMOTRedError('Please enter a valid amount before sending the Add Funds request.','Invalid Amount');return;}
    if(!window.auth || !auth.currentUser){
      /* No redirect/login: keep the user on the payment page. */
      return;
    }
    const uid=auth.currentUser.uid;
    const fundData={
      amount:amount,method:'IND UPI PAY',transactionId:'',
      status:'Pending',userEmail:auth.currentUser.email||'',
      timestamp:firebase.database.ServerValue.TIMESTAMP,
      note:'Payment screenshot sent to Telegram'
    };
    const ref=database.ref('funds/'+uid).push();
    ref.set(fundData).then(function(){
      const btn=document.querySelector('.NEAMOT-upi-submit');
      if(btn){btn.disabled=true;btn.textContent='✓ ADD FUNDS REQUEST SUBMITTED';}
      const success=document.querySelector('.NEAMOT-upi-success');
      if(success)success.style.display='block';
      if(typeof notifyAdminNewFund==='function'){try{notifyAdminNewFund(fundData,uid,ref.key);}catch(e){}}
    }).catch(function(e){window.showNEAMOTRedError('Add Funds request failed. Please try again.','Request Failed');});
  };


  /* Price panel ADD FUNDS confirmation popup */
  function showPlanAddFundsPopup(){
    let m=document.getElementById('NEAMOTPlanAddFundsPopup');
    if(!m){
      m=document.createElement('div');m.id='NEAMOTPlanAddFundsPopup';m.className='NEAMOT-plan-addfunds-popup';
      m.innerHTML='<div class="NEAMOT-plan-addfunds-card"><button type="button" class="NEAMOT-plan-addfunds-close">×</button><div class="NEAMOT-plan-addfunds-icon">💳</div><h3>ADD FUNDS</h3><p id="NEAMOTPlanAddFundsInfo">Add balance to continue with this plan.</p><div class="NEAMOT-plan-addfunds-verify">✓ AUTO PAYMENT VERIFY</div><button type="button" class="NEAMOT-plan-addfunds-continue">CONTINUE TO ADD FUNDS</button></div>';
      document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show');});
      m.querySelector('.NEAMOT-plan-addfunds-close').onclick=()=>m.classList.remove('show');
      m.querySelector('.NEAMOT-plan-addfunds-continue').onclick=()=>{m.classList.remove('show'); if(typeof oldSwitch==='function')oldSwitch('addfunds');};
    }
    const info=m.querySelector('#NEAMOTPlanAddFundsInfo');
    if(info) info.textContent='Selected plan: '+(selectedPlanGlobal||'Plan')+' • Please add wallet balance to continue.';
    m.classList.add('show');
  }
  function bindPlanAddFundsPopup(){
    const b=document.getElementById('other-pay-tab'); if(!b || b.dataset.NEAMOTPlanPopup==='1')return;
    b.dataset.NEAMOTPlanPopup='1';
    b.onclick=function(e){e.preventDefault();e.stopPropagation();showPlanAddFundsPopup();};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindPlanAddFundsPopup);else bindPlanAddFundsPopup();
  setTimeout(bindPlanAddFundsPopup,400);setTimeout(bindPlanAddFundsPopup,1000);

  /* Add a small close X to the payment gateway pages and keep deep-gray styling. */
  function ensureGatewayClose(){
    const page=document.getElementById('funds-payment-page');
    if(!page)return;
    const header=page.querySelector('.funds-payment-header');
    if(header && !header.querySelector('.NEAMOT-gateway-close')){
      const b=document.createElement('button');
      b.className='NEAMOT-gateway-close';b.type='button';b.textContent='×';
      b.style.cssText='margin-left:auto;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:#17181b;color:#fff;font-size:20px;';
      b.onclick=function(){if(typeof closeFundsPaymentPage==='function')closeFundsPaymentPage();};
      header.appendChild(b);
    }
  }
  setInterval(ensureGatewayClose,1200);
})();
