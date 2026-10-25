
(function(){
  const QR='https://i.ibb.co.com/BdsdNPp/IMG-20260908-WA0070.jpg';
  const TG='https://t.me/NEAMOTsupport2';
  const gateway={
    bkash:{name:'bKash',sub:'Personal Payment',logo:'https://i.ibb.co.com/Rm4yRwN/bKash.png',color:'#e2136e'},
    nagad:{name:'Nagad',sub:'Personal Payment',logo:'https://i.ibb.co.com/YzGzdFx/Nagad.png',color:'#e31b23'},
    rocket:{name:'Rocket',sub:'Personal Payment',logo:'https://i.ibb.co/nMHz4zx2/file-0000000013e4820b9a2f8057bb61ddc3.png',color:'#8b5cf6'},
    binance:{name:'Binance Pay',sub:'Crypto / Binance Pay',logo:'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg',color:'#ffffff'}
  };
  function methodName(m){return (gateway[m]||gateway.bkash).name;}
  function amountText(amount){
    try{return typeof money==='function'?money(amount)+' '+(typeof cfg==='function'?cfg().currency:'BDT'):Number(amount).toFixed(0)+' BDT';}
    catch(e){return Number(amount).toFixed(0)+' BDT';}
  }
  function ensureBrandbar(page,m){
    let bar=page.querySelector('.NEAMOT-gateway-brandbar');
    if(!bar){bar=document.createElement('div');bar.className='NEAMOT-gateway-brandbar';
      const title=document.querySelector('#fundsPayMethodLogo')?.alt||methodName(m);
      bar.innerHTML='<span class="NEAMOT-gateway-brand-dot"></span><div><b></b><span></span></div>';
      const anchor=page.querySelector('.funds-payment-amount'); if(anchor) anchor.after(bar);
    }
    bar.querySelector('b').textContent=methodName(m)+' Secure Payment';
    bar.querySelector('span:last-child').textContent=(gateway[m]||gateway.bkash).sub+' • NEAMOT 2.0';
    bar.querySelector('.NEAMOT-gateway-brand-dot').style.color=(gateway[m]||gateway.bkash).color;
  }
  function setPageClass(page,m){
    page.classList.add('NEAMOT-gateway-page');
    ['method-bkash','method-nagad','method-rocket','method-binance','NEAMOT-ind-upi-page'].forEach(c=>page.classList.remove(c));
    page.classList.add(m==='ind_upi'?'NEAMOT-ind-upi-page':'method-'+m);
  }
  function submitIndUpiRequest(){
    if(!window.auth || !auth.currentUser){if(typeof openLogin==='function')openLogin();return;}
    const amount=Number((typeof fundsAmount!=='undefined'?fundsAmount:0)||0);
    if(!(amount>0)){if(typeof showToast==='function')showToast('Please enter a valid amount!','#ff4444');return;}
    const uid=auth.currentUser.uid;
    const fundData={amount:amount,method:'IND UPI PAY',transactionId:'',status:'Pending',userEmail:auth.currentUser.email||'',timestamp:firebase.database.ServerValue.TIMESTAMP,note:'Screenshot submitted via Telegram'};
    const ref=database.ref('funds/'+uid).push();
    ref.set(fundData).then(function(){
      try{notifyAdminNewFund(fundData,uid,ref.key);}catch(e){}
      const success=document.querySelector('.NEAMOT-upi-success'); if(success) success.style.display='block';
      const btn=document.querySelector('.NEAMOT-upi-submit'); if(btn){btn.disabled=true;btn.textContent='✓ ADD FUNDS REQUEST SUBMITTED';}
      if(typeof showNotification==='function')showNotification('✓','Success','Add Funds request submitted. Admin will review your payment screenshot.','OK',true);
    }).catch(function(){if(typeof showToast==='function')showToast('Request failed. Please try again.','#ff4444');});
  }
  window.NEAMOTOpenTelegram=function(){window.open(TG,'_blank','noopener');};
  window.NEAMOTDownloadUPIQR=function(){
    const a=document.createElement('a');a.href=QR;a.target='_blank';a.rel='noopener';a.download='NEAMOT-IND-UPI-QR.jpg';document.body.appendChild(a);a.click();a.remove();
  };
  window.submitIndUpiFundsRequest=submitIndUpiRequest;

  const prevOpen=window.openFundsPaymentPage;
  window.openFundsPaymentPage=function(amount){
    const m=(typeof fundsMethod!=='undefined'&&fundsMethod)?fundsMethod:'bkash';
    if(m!=='ind_upi'){
      const page=document.getElementById('funds-payment-page');
      if(page){setPageClass(page,m);ensureBrandbar(page,m);}
      return prevOpen(amount);
    }
    const page=document.getElementById('funds-payment-page');if(!page)return;
    setPageClass(page,'ind_upi');
    page.querySelectorAll('.NEAMOT-gateway-brandbar').forEach(x=>x.remove());
    const header=page.querySelector('.funds-payment-header');
    if(header){const title=header.querySelector('.pay-title');if(title)title.textContent='IND UPI PAYMENT';}
    const oldChildren=page.querySelectorAll('.NEAMOT-upi-white-card');oldChildren.forEach(x=>x.remove());
    const amountLabel=(function(a){const r=0.74;return '₹'+(Number(a||0)*r).toFixed(2)+' INR';})(amount);
    const card=document.createElement('div');card.className='NEAMOT-upi-white-card';
    card.innerHTML='<div class="NEAMOT-upi-brand"><div class="NEAMOT-upi-brand-logo">UPI</div><div><b>IND UPI PAY</b><small>Secure Indian UPI QR Payment</small></div></div>'+
      '<div class="NEAMOT-upi-amount"><span>PAYMENT AMOUNT</span><b>'+amountLabel+'</b></div>'+
      '<div class="NEAMOT-upi-qr-wrap"><img src="'+QR+'" alt="IND UPI QR Code"></div>'+
      '<button type="button" class="NEAMOT-upi-download" onclick="NEAMOTDownloadUPIQR()"><i class="fas fa-download"></i> Download QR Code</button>'+
      '<div class="NEAMOT-upi-note"><b>How to pay</b><br>1. Open any supported Indian UPI app.<br>2. Scan the QR code and pay the exact amount.<br>3. Take a successful-payment screenshot.</div>'+
      '<div class="NEAMOT-upi-hindi">भुगतान करने के बाद पेमेंट का स्क्रीनशॉट लें और नीचे दिए गए Telegram ID पर भेजें। Screenshot भेजने के बाद <b>Add Funds Request</b> submit करें।</div>'+
      '<a href="#" id="NEAMOT-upi-tg-send" target="_blank" rel="noopener" class="NEAMOT-upi-telegram" onclick="return window.NEAMOTSendUpiDetails && window.NEAMOTSendUpiDetails('+Number(amount||0)+')"><i class="fab fa-telegram-plane"></i> Telegram @NEAMOTsupport2 — Send Details</a>'+
      '<button type="button" class="NEAMOT-upi-submit" onclick="submitIndUpiFundsRequest()">✓ I SENT THE SCREENSHOT — ADD FUNDS</button>'+
      '<div class="NEAMOT-upi-success">✓ Add Funds request submitted successfully.<br><small>Payment screenshot sent to Telegram. Wallet credit will be handled by admin.</small></div>';
    page.appendChild(card);
    const amt=document.getElementById('fundsPaymentAmountDisplay');if(amt)amt.style.display='none';
    const usd=document.getElementById('fundsPaymentUsdDisplay');if(usd)usd.style.display='none';
    const icon=page.querySelector('.pay-method-icon-top');if(icon)icon.style.display='none';
    const notice=page.querySelector('.notice-bar-top');if(notice)notice.style.display='none';
    const oldCard=document.getElementById('fundsPaymentCard');if(oldCard)oldCard.style.display='none';
    const verify=document.getElementById('funds-pay-verify-btn');if(verify)verify.style.display='none';
    const txn=document.getElementById('funds-txn-input');if(txn)txn.value='';
    page.classList.add('active');
    if(typeof pushAppHistory==='function')pushAppHistory('funds-payment');
    document.body.style.overflow='hidden';
    if(typeof updateMobileBackButton==='function')updateMobileBackButton();
  };

  const prevClose=window.closeFundsPaymentPage;
  window.closeFundsPaymentPage=function(){
    const page=document.getElementById('funds-payment-page');
    if(page){page.classList.remove('NEAMOT-ind-upi-page','NEAMOT-gateway-page','method-bkash','method-nagad','method-rocket','method-binance');
      page.querySelectorAll('.NEAMOT-upi-white-card').forEach(x=>x.remove());
      const oldCard=document.getElementById('fundsPaymentCard');if(oldCard)oldCard.style.display='';
      const verify=document.getElementById('funds-pay-verify-btn');if(verify)verify.style.display='';
      const amt=document.getElementById('fundsPaymentAmountDisplay');if(amt)amt.style.display='';
      const icon=page.querySelector('.pay-method-icon-top');if(icon)icon.style.display='';
      const notice=page.querySelector('.notice-bar-top');if(notice)notice.style.display='';
    }
    return prevClose();
  };

  /* Wallet selection: selecting Wallet Pay must NOT purchase automatically. */
  window.selectPanelPaymentMethod=function(method){
    if(method==='other')method='addfunds';
    selectedPanelPaymentMethod=method;
    const wallet=document.getElementById('wallet-tab'),other=document.getElementById('other-pay-tab'),ind=document.getElementById('ind-upi-tab');
    if(wallet)wallet.classList.toggle('selected',method==='wallet');
    if(other)other.classList.toggle('selected',method==='addfunds');
    if(ind)ind.classList.remove('selected');
    const buy=document.getElementById('panel-payment-buy-btn');
    if(buy)buy.innerHTML=method==='wallet'?'🛒 PURCHASE NOW':'💰 ADD FUNDS';
    if(method==='addfunds' && typeof switchTab==='function')switchTab('addfunds');
  };
  window.confirmPanelPaymentMethod=function(){
    if(selectedPanelPaymentMethod==='wallet')return buyWithWallet();
    if(selectedPanelPaymentMethod==='addfunds'&&typeof switchTab==='function')return switchTab('addfunds');
    if(typeof showToast==='function')showToast('Select WALLET PAY first','#ff4444');
  };

  /* Make Add Funds card a direct navigation button. */
  function fixAddFundsCard(){
    const b=document.getElementById('other-pay-tab');if(!b)return;
    b.classList.add('NEAMOT-addfunds-pay-btn');
    b.innerHTML='<div class="NEAMOT-addfunds-static-icon"><i class="fas fa-wallet"></i></div><span>𝐀𝐃𝐃 𝐅𝐔𝐍𝐃𝐒</span>';
    b.onclick=function(){if(typeof switchTab==='function')switchTab('addfunds');};
  }
  function init(){fixAddFundsCard();setTimeout(fixAddFundsCard,400);setTimeout(fixAddFundsCard,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
