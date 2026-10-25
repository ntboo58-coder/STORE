
(function(){
  'use strict';
  const LOGO='https://i.ibb.co.com/7dmyV5bV/Chat-GPT-Image-Sep-30-2026-06-39-30-AM.png';
  const QR='https://i.ibb.co.com/BdsdNPp/IMG-20260908-WA0070.jpg';
  const countryCfg={
    original:{label:'🌐 Original',short:'Original',lang:'en',currency:'BDT',symbol:'৳',rate:1},
    bd:{label:'🇧🇩 Bangladesh',short:'বাংলাদেশ',lang:'bn',currency:'BDT',symbol:'৳',rate:1},
    in:{label:'🇮🇳 India',short:'India',lang:'hi',currency:'INR',symbol:'₹',rate:0.74},
    us:{label:'🇺🇸 USA',short:'USA',lang:'us',currency:'USD',symbol:'$',rate:0.00815},
    ht:{label:'🇭🇹 Haiti',short:'Haiti',lang:'ht',currency:'HTG',symbol:'G',rate:1.08}
  };
  let selectedCountry=localStorage.getItem('NEAMOTCountry')||'original';
  if(!countryCfg[selectedCountry]) selectedCountry='original';
  window.NEAMOT_COUNTRY=selectedCountry;
  window.NEAMOT_CURRENCY_RATES=Object.fromEntries(Object.entries(countryCfg).map(([k,v])=>[v.currency,v.rate]));
  function cfg(){return countryCfg[selectedCountry]||countryCfg.original}
  function money(v){const n=Number(v)||0; const c=cfg(); const x=n*c.rate; const digits=c.currency==='USD'?2:(c.currency==='INR'||c.currency==='HTG'?2:0); return c.symbol+(digits?x.toFixed(digits):Math.round(x));}
  function base(v){const n=Number(v)||0; return n/(cfg().rate||1)}
  window.NEAMOTMoney=money; window.NEAMOTToBase=base;
  window.NEAMOTCurrencyLabel=function(){return cfg().currency};
  window.NEAMOTCountryConfig=countryCfg;

  // Haiti translations; other countries reuse the site's existing EN/BN/HI/USA dictionaries.
  try{ if(typeof translations==='object') translations.ht={
    home:'Akèy',myKeys:'Kle mwen',myOrders:'Lòd mwen',account:'Kont',addFunds:'Ajoute lajan',login:'Konekte',register:'Enskri',logout:'Dekonekte',balance:'Balans',totalSpent:'Total depanse',premiumPanels:'PANÈL PREMIUM',latestOrders:'Dènye lòd',buyNow:'ACHTE KOUNYE A',stockOut:'EPUIZE',selectPlan:'Chwazi validite plan',quantity:'Kantite',totalAmount:'Montan total',paymentMethod:'Metòd peman',instantPay:'PEMAN IMEDYA',confirmOrder:'Konfime lòd',cancel:'Anile',availableBalance:'Balans disponib',total:'Total',orderPlaced:'Lòd pase',success:'Siksè',error:'Erè',loading:'Chajman...',noOrders:'Pa gen lòd.',noKeys:'Pa gen kle. Tanpri achte yon panèl anvan.',insufficientBalance:'Balans ensifizan! Tanpri ajoute lajan.',pleaseLogin:'Tanpri konekte anvan!',selectPlanFirst:'Tanpri chwazi yon plan anvan!',transactionId:'ID tranzaksyon',verify:'VERIFYE',back:'Retounen',support:'Sipò',addFundsTitle:'Ajoute lajan',customAmount:'Montan pèsonalize',proceedPayment:'Kontinye ak peman',fundHistory:'Istwa lajan',noFundHistory:'Pa gen istwa lajan.',privacy:'Règleman sou vi prive',about:'Sou nou',official:'Detay ofisyèl',profile:'Pwofil',editProfile:'Modifye pwofil',username:'Non itilizatè',email:'Imèl',phone:'Telefòn',totalOrders:'Total lòd',wallet:'Bous',password:'Modpas',confirmPassword:'Konfime modpas',forgotPassword:'Ou bliye modpas?',resetPassword:'Reyajiste modpas',sendResetLink:'Voye lyen reset',loginNow:'Konekte kounye a',registerNow:'Enskri kounye a',or:'OSWA',welcomeBack:'Byenveni nan NEAMOT 2.0',createAccount:'Kreye kont ou',enterCredentials:'Antre enfòmasyon kont ou',fullName:'Non konplè',alreadyMember:'Ou deja manm?',dontHaveAccount:'Ou pa gen kont?',panelRules:'RÈG AK KONDISYON PANÈL',stockOutMsg:'Plan sa a epui!',txnAlreadyUsed:'ID tranzaksyon sa a deja itilize!',verifyTransaction:'Tanpri antre ID tranzaksyon ou!',insufficientBalanceMsg:'Balans ensifizan! Tanpri ajoute lajan.',orderSuccess:'Lòd ou pase avèk siksè.',fundRequestSubmitted:'Demann lajan ou soumèt. Tann apwobasyon admin.',myKeysTitle:'Kle mwen',myOrdersTitle:'Lòd mwen',approved:'Apwouve',pending:'An atant',rejected:'Rejte',messageFromAdmin:'NEAMOT PANEL STORE',copy:'Kopye',joinGroup:'Antre nan gwoup itilizatè yo',clickToJoin:'Klike pou sipò ak mizajou',orderDate:'Dat lòd',plan:'Plan',price:'Pri',qty:'Kantite',payment:'Peman',txnId:'ID tranzaksyon',all:'Tout',nonRoot:'Non-Root',root:'Root',ios:'iOS',pc:'PC',welcome:'Byenveni nan NEAMOT 2.0',getBestPanels:'Jwenn pi bon panèl gaming pou iOS, PC ak Android',safeTrusted:'100% Safe & Trusted',verified:'Verifye',verifiedBadge:'Verifye'
  };}catch(e){}

  function installCountrySelector(){
    const old=document.querySelector('.lang-dropdown'); if(!old) return;
    if(document.querySelector('.NEAMOT-country-wrap')) return;
    const wrap=document.createElement('div'); wrap.className='NEAMOT-country-wrap';
    wrap.innerHTML='<button class="NEAMOT-country-btn" id="NEAMOTCountryBtn" type="button" onclick="window.toggleNEAMOTCountry()">'+cfg().label+' ▾</button><div class="NEAMOT-country-menu" id="NEAMOTCountryMenu">'+Object.entries(countryCfg).map(([id,c])=>'<div class="NEAMOT-country-option '+(id===selectedCountry?'active':'')+'" data-country="'+id+'" onclick="window.setNEAMOTCountry(\''+id+'\')">'+c.label+'<small>'+c.currency+' • '+(id==='original'?'Original site values':'Converted prices & balance')+'</small></div>').join('')+'</div>';
    old.replaceWith(wrap);
  }
  window.toggleNEAMOTCountry=function(){const m=document.getElementById('NEAMOTCountryMenu'); if(m)m.classList.toggle('show')};
  document.addEventListener('click',function(e){if(!e.target.closest('.NEAMOT-country-wrap')){const m=document.getElementById('NEAMOTCountryMenu');if(m)m.classList.remove('show')}});

  function refreshMoneyDisplays(){
    const c=cfg();
    // Home cards
    document.querySelectorAll('.logo-card').forEach(card=>{
      const onclick=card.getAttribute('onclick')||''; const mm=onclick.match(/selectPanelAndOpen\(['"](\d+)['"]\)/); if(!mm)return;
      const item=(typeof getPanelById==='function')?getPanelById(Number(mm[1])):null; if(!item||!item.data)return;
      const prices=item.data.prices||{}; const keys=Object.keys(prices); if(!keys.length)return;
      const w=(x)=>{const r=String(x).toLowerCase(),n=parseInt(r.match(/\d+/)?.[0]||'0');if(/hour|hours|hr|hrs|h\b/.test(r))return n;if(/day|days|d\b/.test(r))return 100+n;if(/week|weeks|wk|w\b/.test(r))return 200+n*7;if(/month|months|mo\b/.test(r))return 300+n*30;if(/life|lifetime|forever/.test(r))return 999999;return 500+n};
      keys.sort((a,b)=>w(a)-w(b)); const el=card.querySelector('.panel-first-price'); if(el){el.textContent=money(parseFloat(String(prices[keys[0]]).replace(/[^0-9.]/g,''))||0)}
    });
    // Open price panel plans
    if(typeof selectedId!=='undefined' && selectedId){const item=(typeof getPanelById==='function')?getPanelById(selectedId):null;if(item&&item.data&&item.data.prices){document.querySelectorAll('#flat-plan-container .flat-price-item').forEach(el=>{const name=el.querySelector('.flat-plan-name')?.childNodes[0]?.textContent?.trim();if(name&&item.data.prices[name]!=null){const p=parseFloat(String(item.data.prices[name]).replace(/[^0-9.]/g,''))||0;const pe=el.querySelector('.flat-plan-price');if(pe)pe.textContent=money(p)}})}}
    const p=document.getElementById('panel-price-text'); if(p&&selectedId&&selectedPlanGlobal&&typeof updatePriceTextOnly==='function') updatePriceTextOnly();
    // Generic balance text elements; raw BDT value is preserved in data-base-balance.
    document.querySelectorAll('[data-base-balance]').forEach(el=>{el.textContent=money(Number(el.dataset.baseBalance)||0)+' '+c.currency});
    const hint=document.getElementById('NEAMOTCurrencyHint'); if(hint)hint.textContent='Prices & wallet balance: '+c.currency;
  }

  // Convert panel price display only; purchase logic continues to use the original BDT value internally.
  window.formatPriceLabel=function(price){const raw=parseFloat(String(price??0).replace(/[^0-9.]/g,''))||0;return money(raw)};
  window.updatePriceTextOnly=async function(){
    if(!selectedId||!selectedPlanGlobal) return;
    const item=typeof getPanelById==='function'?getPanelById(selectedId):null;if(!item||!item.data)return;
    const unit=parseFloat(String((item.data.prices||{})[selectedPlanGlobal]??0).replace(/[^0-9.]/g,''))||0;
    let total=unit*(Number(selectedQuantity)||1), discount=0;
    try{const r=await getDiscountedTotal(selectedId,selectedPlanGlobal,Number(selectedQuantity)||1,total);total=Number(r.total)||total;discount=Number(r.discount)||0}catch(e){}
    let html=money(total)+' '+cfg().currency;
    if(discount>0)html+=' <span style="font-size:11px;color:#16a34a;font-weight:900;margin-left:5px;">-'+discount+'% REFERRAL</span>';
    const el=document.getElementById('panel-price-text');if(el)el.innerHTML=html;
    const need=document.getElementById('panel-need-amount-text');if(need)need.textContent=money(total)+' '+cfg().currency;
  };

  // Country selection
  window.setNEAMOTCountry=async function(id){
    if(!countryCfg[id])id='original'; selectedCountry=id; window.NEAMOT_COUNTRY=id; localStorage.setItem('NEAMOTCountry',id);
    const c=cfg(); currentLanguage=c.lang;
    const btn=document.getElementById('NEAMOTCountryBtn');if(btn)btn.textContent=c.label+' ▾';
    document.querySelectorAll('.NEAMOT-country-option').forEach(x=>x.classList.toggle('active',x.dataset.country===id));
    const menu=document.getElementById('NEAMOTCountryMenu');if(menu)menu.classList.remove('show');
    document.documentElement.lang=c.lang==='bn'?'bn':c.lang==='hi'?'hi':c.lang==='ht'?'ht':'en';
    try{applyTranslations(c.lang);updateUITexts(c.lang)}catch(e){}
    try{generateCategorizedGrid()}catch(e){}
    setTimeout(refreshMoneyDisplays,40);
    try{refreshHeaderBalanceForCountry()}catch(e){}
  };

  // Wallet balance is stored as BDT in Firebase; display it in the selected country currency.
  window.refreshHeaderBalanceForCountry=function(){
    try{if(!auth||!auth.currentUser||!database)return;database.ref('User/'+auth.currentUser.uid+'/balance').once('value').then(s=>{const b=Number(s.val()||0);document.querySelectorAll('#headerBalanceAmount,#profile-balance,#panelHeaderBalance,#panel-user-balance-text').forEach(el=>{el.dataset.baseBalance=b;if(el.id==='profile-balance'||el.id==='panelHeaderBalance'||el.id==='panel-user-balance-text')el.textContent=money(b)+' '+cfg().currency;else el.textContent=money(b);});});}catch(e){}
  };

  // Add Funds amount is entered in the selected country currency, then converted back to BDT for Firebase.
  window.fundsEnteredAmount=0;
  window.updateFundsAmountFromInput=function(){const val=Number(document.getElementById('fundsCustomAmount')?.value||0);window.fundsEnteredAmount=val;fundsAmount=base(val);const d=document.getElementById('fundsAmountDisplay');if(d)d.innerHTML=money(base(val))+' <span>'+cfg().currency+'</span><div class="NEAMOT-money-hint">≈ '+val.toFixed(cfg().currency==='USD'?2:0)+' '+cfg().currency+'</div>';};

  // Replace the Add Funds payment method selector and add IND UPI PAY.
  const oldSelectFunds=window.selectFundsMethod;
  window.selectFundsMethod=function(method){
    if(method==='ind_upi'){fundsMethod='ind_upi';const logo=document.getElementById('fundsSelectedMethodLogo'),name=document.getElementById('fundsSelectedMethodName'),sub=document.getElementById('fundsSelectedMethodSub');if(logo){logo.src=QR;logo.alt='IND UPI PAY'}if(name)name.textContent='IND UPI PAY';if(sub)sub.textContent='India UPI • QR Payment';document.querySelectorAll('.funds-method-option').forEach(b=>b.classList.toggle('selected',b.dataset.method==='ind_upi'));return;}
    return oldSelectFunds(method);
  };

  function addIndUpiOption(){
    const list=document.querySelector('.funds-method-options');if(!list||list.querySelector('[data-method="ind_upi"]'))return;
    const b=document.createElement('button');b.type='button';b.className='funds-method-option';b.dataset.method='ind_upi';b.innerHTML='<span class="funds-method-option-left"><img class="funds-method-option-logo" src="'+QR+'" alt="IND UPI PAY"><span><span class="funds-method-option-name">IND UPI PAY</span><span class="funds-method-option-sub">India UPI • QR Payment</span></span></span><span class="funds-method-radio"></span>';b.onclick=function(){selectFundsMethod('ind_upi');closeFundsMethodModal()};list.appendChild(b);
  }

  // Payment page display: selected currency + IND UPI QR when needed.
  const originalOpenFundsPayment=window.openFundsPaymentPage;
  window.openFundsPaymentPage=function(amountBase){
    if(fundsMethod!=='ind_upi')return originalOpenFundsPayment(amountBase);
    const page=document.getElementById('funds-payment-page');if(!page)return;
    const display=document.getElementById('fundsPaymentAmountDisplay');if(display)display.textContent=money(amountBase)+' '+cfg().currency;
    const logo=document.getElementById('fundsPayMethodLogo');if(logo)logo.src=QR;
    let wrap=document.getElementById('fundsPaymentQrWrap');if(!wrap){wrap=document.createElement('div');wrap.id='fundsPaymentQrWrap';wrap.innerHTML='<img class="NEAMOT-funds-qr" src="'+QR+'" alt="IND UPI QR Code">';page.querySelector('.pay-method-icon-top')?.after(wrap)}wrap.style.display='block';
    updateFundsPayInstructions(amountBase,'ind_upi');page.classList.add('active');pushAppHistory('funds-payment');document.body.style.overflow='hidden';document.getElementById('funds-txn-input').value='';updateMobileBackButton();
  };
  const oldInstr=window.updateFundsPayInstructions;
  window.updateFundsPayInstructions=function(price,method){
    if(method==='ind_upi'){const list=document.getElementById('funds-pay-instruction-list');if(list)list.innerHTML='<li>Open your Indian UPI app and scan the <span class="highlight-yellow">IND UPI QR CODE</span>.</li><li>Pay exactly <span class="highlight-yellow">'+money(price)+' '+cfg().currency+'</span>.</li><li>After payment, keep the successful payment screenshot.</li><li>Send the screenshot to our Telegram for manual approval.</li><li>Transaction ID দিয়ে VERIFY করুন।</li>';return;}
    const wrap=document.getElementById('fundsPaymentQrWrap');if(wrap)wrap.style.display='none';return oldInstr(price,method);
  };
  const oldProceed=window.proceedFundsPayment;
  window.proceedFundsPayment=function(){if(!(window.fundsEnteredAmount>0)){showToast('Please enter a valid amount!','#ff4444');return;}var methodNow=String(window.fundsMethod||'bkash').toLowerCase();var isIndUpi=methodNow==='ind_upi'||methodNow==='upi';if(Number(window.fundsEnteredAmount)<10){showToast(isIndUpi?'IND UPI Minimum 10 Rs':'ADD FUNDS Minimum 10 Tk','#ff4444');return;}if(!auth.currentUser){showToast(t('pleaseLogin'),'#ff4444');return;}openFundsPaymentPage(fundsAmount)};

  // Ensure IND UPI is only an Add Funds method; panel checkout uses Wallet Pay + Add Funds.
  window.selectPanelPaymentMethod=function(method){
    if(method==='other')method='addfunds';
    selectedPanelPaymentMethod=method;
    const wallet=document.getElementById('wallet-tab'), other=document.getElementById('other-pay-tab'), ind=document.getElementById('ind-upi-tab');
    if(wallet)wallet.classList.toggle('selected',method==='wallet');if(other)other.classList.remove('selected');if(ind)ind.classList.remove('selected');
    const buy=document.getElementById('panel-payment-buy-btn');if(buy)buy.innerHTML=method==='wallet'?'🛒 Purchase Now':'🛒 '+(typeof t==='function'?t('buyNow'):'BUY NOW');
    if(method==='wallet'){if(selectedId&&selectedPlanGlobal)setTimeout(()=>buyWithWallet(),80);else showToast(t('selectPlanFirst'),'#ff4444')}
    if(method==='addfunds'){switchTab('addfunds')}
  };
  window.confirmPanelPaymentMethod=function(){if(selectedPanelPaymentMethod==='wallet')buyWithWallet();else if(selectedPanelPaymentMethod==='addfunds')switchTab('addfunds');else showToast('Please select Wallet Pay or Add Funds','#ff4444')};

  // Convert wallet balance display without changing the underlying BDT balance used for purchase checks.
  setInterval(refreshHeaderBalanceForCountry,7000);

  // Replace OTHER PAY with Add Funds and initialize everything.
  function patchPaymentButton(){
    const other=document.getElementById('other-pay-tab');if(other&&!other.dataset.patched){other.dataset.patched='1';other.classList.add('NEAMOT-addfunds-pay-btn');other.onclick=function(){selectPanelPaymentMethod('addfunds')};other.innerHTML='<div class="NEAMOT-addfunds-icon"><i class="fas fa-wallet"></i></div><span>𝐀𝐃𝐃 𝐅𝐔𝐍𝐃𝐒</span>'}
    const ind=document.getElementById('ind-upi-tab');if(ind)ind.style.display='none';
    const otherPage=document.getElementById('other-payment-page');if(otherPage)otherPage.style.display='none';
    addIndUpiOption();
  }

  function addLogoBeforeDomain(){
    const candidates=document.querySelectorAll('a,span,div,p');candidates.forEach(el=>{if(el.children.length===0&&String(el.textContent||'').trim()==='NEAMOTpanel.store'&&!el.dataset.NEAMOTDomain){el.dataset.NEAMOTDomain='1';el.classList.add('NEAMOT-domain-brand');el.innerHTML='<img src="'+LOGO+'" alt="GHOST X PANEL Logo">'+el.textContent}});
    document.querySelectorAll('link[rel="icon"]').forEach(x=>x.href=LOGO);
  }

  function boot(){/* Keep the original language dropdown visible and functional. Do not replace it with the country selector. */patchPaymentButton();addLogoBeforeDomain();window.setNEAMOTCountry(selectedCountry);setTimeout(()=>{patchPaymentButton();addIndUpiOption();addLogoBeforeDomain();refreshHeaderBalanceForCountry();refreshMoneyDisplays()},500);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(patchPaymentButton,1200);setTimeout(addIndUpiOption,1600);setTimeout(addLogoBeforeDomain,1600);
})();
