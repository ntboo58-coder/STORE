(function(){
  /* NEAMOT 2.0 V5 — auth gating, panel profile visibility, AI assistant */
  function hasUser(){
    try{
      if(typeof window.NEAMOTHasUser==='function' && window.NEAMOTHasUser()) return true;
      if(window.auth && window.auth.currentUser) return true;
      if(window.firebase && firebase.auth && firebase.auth().currentUser) return true;
    }catch(e){}
    return false;
  }

  /* ---------- Panel header balance/profile only when logged in ---------- */
  function syncPanelAccountHeader(){
    const logged=hasUser();
    document.querySelectorAll('.panel-user-actions').forEach(el=>{
      el.style.display=logged?'flex':'none';
    });
    const header=document.querySelector('#price-panel .payment-home-topbar');
    if(header) header.classList.toggle('NEAMOT-panel-logged-in',logged);
  }
  window.NEAMOTSyncPanelAccountHeader=syncPanelAccountHeader;

  /* ---------- Add Funds: logged out -> Login, logged in -> Add Funds ---------- */
  const oldSwitchV5=window.switchTab;
  window.switchTab=function(tab,fromRoute){
    if(tab==='addfunds' && !hasUser()){
      if(typeof openLogin==='function'){openLogin();return;}
      if(typeof navigateToAuth==='function'){navigateToAuth('login');return;}
    }
    return typeof oldSwitchV5==='function' ? oldSwitchV5(tab,fromRoute) : undefined;
  };

  function bindAddFundsV5(){
    const b=document.getElementById('other-pay-tab');
    if(!b)return;
    b.onclick=function(e){
      if(e){e.preventDefault();e.stopPropagation();}
      if(!hasUser()){
        if(typeof openLogin==='function')openLogin();
        else if(typeof navigateToAuth==='function')navigateToAuth('login');
        return false;
      }
      return window.switchTab('addfunds');
    };
  }

  /* ---------- Purchase Now: logged out -> Login directly ---------- */
  function syncPurchaseButtonV5(){
    const b=document.getElementById('panel-payment-buy-btn');
    if(!b)return;
    b.innerHTML=hasUser()?'🛒 PURCHASE NOW':'🔐 LOGIN NOW';
    b.dataset.NEAMOTState=hasUser()?'purchase':'login';
  }
  window.updatePurchaseButton=syncPurchaseButtonV5;
  window.confirmPanelPaymentMethod=function(){
    if(!hasUser()){
      if(typeof openLogin==='function')openLogin();
      else if(typeof navigateToAuth==='function')navigateToAuth('login');
      return;
    }
    selectedPanelPaymentMethod='wallet';
    window.selectedPanelPaymentMethod='wallet';
    const wallet=document.getElementById('wallet-tab');
    const other=document.getElementById('other-pay-tab');
    const ind=document.getElementById('ind-upi-tab');
    if(wallet)wallet.classList.add('selected');
    if(other)other.classList.remove('selected');
    if(ind)ind.classList.remove('selected');
    return typeof buyWithWallet==='function' ? buyWithWallet() : undefined;
  };

  /* ---------- NEAMOT AI Assistant ---------- */
  const aiStyle=document.createElement('style');
  aiStyle.id='NEAMOT-ai-assistant-v5-style';
  aiStyle.textContent=`
    #NEAMOTAIAssistantV5{position:fixed;inset:0;z-index:100000002;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(0,0,0,.78);backdrop-filter:blur(12px)}
    #NEAMOTAIAssistantV5.show{display:flex;animation:NEAMOTAIin .2s ease-out}
    @keyframes NEAMOTAIin{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}
    .NEAMOT-ai-card-v5{width:min(440px,96vw);height:min(700px,92vh);display:flex;flex-direction:column;overflow:hidden;border-radius:25px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#111522,#080a10);box-shadow:0 25px 90px rgba(0,0,0,.75);color:#fff}
    .NEAMOT-ai-head-v5{display:flex;align-items:center;gap:11px;padding:14px 15px;border-bottom:1px solid rgba(255,255,255,.09);background:linear-gradient(135deg,#171b2b,#0e111c)}
    .NEAMOT-ai-avatar-v5{width:45px;height:45px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,#20c8f5,#8bdff8);box-shadow:0 0 25px rgba(168,85,247,.35);font-size:21px}
    .NEAMOT-ai-head-v5 b{font-size:16px;font-weight:1000}.NEAMOT-ai-head-v5 small{display:block;color:#9ca3af;font-size:10px;margin-top:3px}
    .NEAMOT-ai-close-v5{margin-left:auto;width:35px;height:35px;border-radius:11px;border:1px solid rgba(255,255,255,.1);background:#222635;color:#fff;font-size:21px;cursor:pointer}
    .NEAMOT-ai-msgs-v5{flex:1;overflow:auto;padding:15px;display:flex;flex-direction:column;gap:10px}
    .NEAMOT-ai-msg-v5{max-width:86%;padding:11px 13px;border-radius:17px;font-size:13px;line-height:1.5;white-space:pre-wrap}
    .NEAMOT-ai-msg-v5.bot{align-self:flex-start;background:#171b28;border:1px solid rgba(255,255,255,.07);color:#e8ebf3;border-bottom-left-radius:5px}
    .NEAMOT-ai-msg-v5.user{align-self:flex-end;background:linear-gradient(135deg,#20c8f5,#8bdff8);color:#fff;border-bottom-right-radius:5px}
    .NEAMOT-ai-quick-v5{display:flex;gap:7px;overflow:auto;padding:0 12px 10px}.NEAMOT-ai-quick-v5 button{white-space:nowrap;border:1px solid rgba(168,85,247,.35);background:#121725;color:#d8c9ff;border-radius:999px;padding:8px 11px;font-size:10px;font-weight:800}
    .NEAMOT-ai-input-v5{display:flex;gap:8px;padding:11px;border-top:1px solid rgba(255,255,255,.09);background:#0c0f17}.NEAMOT-ai-input-v5 input{flex:1;min-width:0;border:1px solid #303646;background:#171b26;color:#fff;border-radius:14px;padding:12px;font-size:13px;outline:none}.NEAMOT-ai-input-v5 button{width:46px;border:0;border-radius:14px;background:linear-gradient(135deg,#20c8f5,#8bdff8);color:#fff;font-size:17px}
    .NEAMOT-ai-typing-v5{opacity:.65;font-style:italic}
  `;
  document.head.appendChild(aiStyle);

  const ai=document.createElement('div');
  ai.id='NEAMOTAIAssistantV5';
  ai.innerHTML=`<div class="NEAMOT-ai-card-v5" role="dialog" aria-modal="true">
    <div class="NEAMOT-ai-head-v5"><div class="NEAMOT-ai-avatar-v5">🤖</div><div><b>NEAMOT 2.0 AI Assistant</b><small>Store Help Assistant • Online</small></div><button class="NEAMOT-ai-close-v5" type="button">×</button></div>
    <div class="NEAMOT-ai-msgs-v5" id="NEAMOTAIMessagesV5"></div>
    <div class="NEAMOT-ai-quick-v5"><button data-q="How can I add funds?">ADD FUNDS</button><button data-q="How do I buy a panel?">BUY PANEL</button><button data-q="How does IND UPI work?">IND UPI</button><button data-q="I have a payment error">PAYMENT ERROR</button></div>
    <div class="NEAMOT-ai-input-v5"><input id="NEAMOTAIInputV5" placeholder="Ask NEAMOT Assistant..." autocomplete="off"><button id="NEAMOTAISendV5" type="button">➤</button></div>
  </div>`;
  document.body.appendChild(ai);

  const msgs=()=>document.getElementById('NEAMOTAIMessagesV5');
  function addMsg(text,who){const m=document.createElement('div');m.className='NEAMOT-ai-msg-v5 '+who;m.textContent=text;msgs().appendChild(m);msgs().scrollTop=msgs().scrollHeight;}
  const aiResponseIndex={};
  function pick(key,arr){const n=aiResponseIndex[key]||0;aiResponseIndex[key]=(n+1)%arr.length;return arr[n];}
  function answer(q){
    const s=String(q||'').trim().toLowerCase();
    if(!s)return 'আপনার প্রশ্নটি লিখুন—আমি NEAMOT 2.0 Store-এর flow অনুযায়ী সাহায্য করব।';
    const has=(...terms)=>terms.some(t=>s.includes(t));
    if(has('add funds','add fund','wallet balance','balance add','টাকা যোগ','ব্যালেন্স'))return pick('funds',[
      'ADD FUNDS: Login করুন → Home/Account থেকে Add Funds খুলুন → amount দিন → payment method select করুন → payment complete করে Transaction ID দিয়ে Verify করুন।',
      'Wallet balance বাড়াতে Add Funds খুলুন। Amount দেওয়ার পর bKash/Nagad/Rocket/Binance/IND UPI থেকে method বেছে payment করুন, তারপর payment page-এ Transaction ID submit করুন।',
      'Add Funds করতে প্রথমে account-এ login থাকতে হবে। এরপর amount + payment method select করে payment করুন এবং verification-এর জন্য সঠিক Transaction ID দিন।']);
    if(has('payment method','bkash','bkas','nagad','rocket','binance','upi'))return pick('methods',[
      'Payment methods: bKash, Nagad, Rocket, Binance Pay এবং IND UPI PAY। যে method select করবেন, payment page-এ সেই method-এর instruction দেখাবে।',
      'bKash/Nagad/Rocket ব্যবহার করলে displayed account-এ payment করুন। Binance Pay হলে Binance Pay ID/instruction follow করুন। IND UPI হলে INR amount ও QR instruction follow করুন।',
      'Method বদলাতে Add Funds-এর Select Payment Method option খুলুন এবং আপনার supported payment method বেছে নিন।']);
    if(has('payment error','error','failed','fail','problem','সমস্যা','ভুল'))return pick('error',[
      'Payment Error হলে প্রথমে amount, payment method এবং Transaction ID আবার check করুন। তারপর একই Transaction ID পুনরায় submit না করে নতুন/সঠিক তথ্য দিন।',
      'Payment সমস্যা হলে payment page-এ দেখানো instruction অনুযায়ী payment হয়েছে কি না দেখুন। Error popup এলে তার message পড়ুন এবং Transaction ID ঠিক আছে কি না verify করুন।',
      'Payment failed হলে screenshot ও Transaction ID সংরক্ষণ করুন। প্রয়োজন হলে Telegram Support @NEAMOTsupport2-এ সমস্যার details পাঠান।']);
    if(has('transaction id','trx','trxid','transaction'))return pick('trx',[
      'Transaction ID হলো payment সফল হওয়ার পর পাওয়া reference/Trx ID। Payment page-এর Enter Transaction ID ঘরে এটি exactভাবে লিখে VERIFY PAYMENT চাপুন।',
      'Trx ID-তে extra space বা ভুল character দেবেন না। যে payment করেছেন, সেই payment-এর Transaction ID ব্যবহার করুন।']);
    if(has('buy panel','buy','purchase','panel কিন','কিনব','product'))return pick('buy',[
      'Panel কিনতে panel select করুন → Plan Validity বেছে নিন → quantity ঠিক করুন → payment method select করুন → purchase flow complete করুন।',
      'BUY PANEL flow-তে আগে panel-এর validity ও price দেখুন। তারপর payment method/Wallet Pay অনুযায়ী order confirm করুন। Login না থাকলে আগে login করতে হবে।',
      'কোন panel-এর plan দরকার বললে আমি Store-এর available purchase flow অনুযায়ী ধাপগুলো বুঝিয়ে দিতে পারি।']);
    if(has('validity','plan','duration','days','hours','month','lifetime'))return pick('validity',[
      'Plan Validity মানে panel কতদিন/কতসময় ব্যবহার করা যাবে—যেমন hours, days, weeks, months বা lifetime, যদি সেই plan Store-এ available থাকে।',
      'Validity select করার সময় আপনার প্রয়োজনের duration বেছে নিন। Selected plan অনুযায়ী price/total amount update হয়।']);
    if(has('wallet pay','wallet'))return pick('wallet',[
      'WALLET PAY ব্যবহার করতে account balance যথেষ্ট আছে কি না দেখুন। তারপর selected panel/plan-এর purchase flow থেকে WALLET PAY select করে order confirm করুন।',
      'Wallet Pay আপনার Store wallet balance থেকে payment নেওয়ার flow। Balance কম হলে আগে Add Funds করে wallet balance বাড়াতে হবে।']);
    if(has('login','sign in','account','password','username','লগইন'))return pick('login',[
      'Login করতে Account/Profile থেকে Login খুলুন এবং সঠিক username/email ও password দিন। Login সফল হলে account-related features ব্যবহার করতে পারবেন।',
      'Login সমস্যা হলে username/password spelling, extra spaces এবং account status check করুন। Password মনে না থাকলে Store-এর reset option থাকলে সেটি ব্যবহার করুন।']);
    if(has('register','signup','sign up','account create','রেজিস্টার'))return pick('register',[
      'নতুন account করতে Register/Sign Up option খুলুন এবং required information পূরণ করুন। তারপর verification/registration flow complete করুন।',
      'Account না থাকলে Sign Up থেকে নতুন account তৈরি করুন। Registration শেষ হলে Login করে Add Funds বা purchase features ব্যবহার করতে পারবেন।']);
    if(has('country','currency','bdt','usd','inr','haiti','bangladesh','india','usa'))return pick('country',[
      'Country selector বদলালে Store-এর supported currency/display অনুযায়ী amount দেখাতে পারে। Payment method বাছাই করার সময় country-specific instruction follow করুন।',
      'India/IND UPI flow-তে INR display থাকতে পারে, আর অন্যান্য payment flow-তে BDT/USD instruction method অনুযায়ী দেখানো হয়।']);
    if(has('binance'))return pick('binance',[
      'Binance Pay select করলে payment page-এ Binance Pay instruction ও USD conversion দেখানো হয়। Displayed amount এবং Binance Pay ID দেখে exact payment করুন।',
      'Binance payment-এর পর successful payment screenshot ও Transaction ID সংরক্ষণ করুন এবং Store-এর verification step complete করুন।']);
    if(has('ind upi','upi','qr'))return pick('upi',[
      'IND UPI PAY: Add Funds → IND UPI PAY select → displayed INR amount দেখুন → QR/UPI instruction অনুযায়ী payment করুন → screenshot/verification step complete করুন।',
      'IND UPI flow India UPI payment-এর জন্য। Payment করার আগে page-এ দেখানো INR amount exactভাবে মিলিয়ে নিন।']);
    if(has('order','my orders','history','fund history'))return pick('orders',[
      'My Orders-এ আপনার order status ও related information দেখা যায়। Add Funds-এর Fund History-তে payment request-এর status দেখা যায়।',
      'Fund History-তে Pending/Approved/Paid status দেখা যেতে পারে। কোনো request-এর details দেখতে available history item-এ tap করুন।']);
    if(has('key','my keys','credential'))return pick('keys',[
      'My Keys section-এ purchase করা key/credential পাওয়া যায়, যদি আপনার account-এর জন্য delivery complete হয়ে থাকে।',
      'Key না দেখালে আগে My Keys refresh করুন এবং order status check করুন। প্রয়োজন হলে Support-এ order details পাঠান।']);
    if(has('support','telegram','help','contact','যোগাযোগ'))return pick('support',[
      'Support-এর জন্য Telegram @NEAMOTsupport2 ব্যবহার করতে পারেন। সমস্যা হলে screenshot, order/payment details এবং relevant Transaction ID পাঠালে context পরিষ্কার হবে।',
      'Store-related সাহায্যের জন্য Telegram Support-এ যোগাযোগ করুন। Payment issue হলে amount + method + Trx ID উল্লেখ করুন।']);
    if(has('notice','update','news'))return pick('notice',[
      'Store-এর Notice Board-এ গুরুত্বপূর্ণ notice/update দেখা যেতে পারে। নতুন information এলে Notice Board খুলে latest notice দেখুন।',
      'Update বা announcement দেখতে Store-এর Notice Board/official support channel check করুন।']);
    if(has('non root','non-root','root'))return pick('root',[
      'Panel-এর Non-Root/Root compatibility product অনুযায়ী আলাদা হতে পারে। কেনার আগে panel-এর details ও device requirement দেখুন।',
      'আপনার device যদি Non-Root হয়, product card-এর Non-Root compatibility label দেখুন; Root device হলে Root-supported plan/details মিলিয়ে নিন।']);
    if(has('price','cost','tk','bdt','দাম','কত টাকা'))return pick('price',[
      'Price plan ও validity অনুযায়ী পরিবর্তিত হয়। Panel select করলে available validity options এবং total price দেখুন।',
      'সঠিক current price জানতে Store-এর panel card খুলে selected plan/quantity অনুযায়ী displayed total দেখুন।']);
    if(has('how','what','why','where','when','can i','কি','কিভাবে','কেন','কোথায়','কখন'))return pick('general',[
      'আমি NEAMOT 2.0 Store-এর account, panel, plan, wallet, Add Funds ও payment flow নিয়ে সাহায্য করতে পারি। আপনার প্রশ্নের specific বিষয়টি লিখুন, যেমন “payment verify কীভাবে করব?”',
      'এই প্রশ্নের নির্দিষ্ট উত্তর দিতে কোন feature-এর কথা বলছেন সেটি একটু নির্দিষ্ট করুন—Login, Add Funds, Payment, Plan, Wallet Pay, Order বা My Keys।',
      'আমি Store-এর বিভিন্ন flow বুঝিয়ে দিতে পারি। আপনার সমস্যার screen/feature-এর নাম দিলে step-by-step উত্তর দেব।']);
    return pick('fallback',[
      'আপনার প্রশ্নটি বুঝতে পেরেছি, কিন্তু Store-এর তথ্যের মধ্যে এর নির্দিষ্ট উত্তর নেই। প্রশ্নটি একটু বিস্তারিত লিখুন—আমি relevant flow অনুযায়ী উত্তর দেব।',
      'এই বিষয়টি Store Help knowledge-এর বাইরে হতে পারে। আপনি কোন page বা feature-এ আছেন এবং কী দেখাচ্ছে সেটি লিখলে আমি পরবর্তী step সাজিয়ে দেব।',
      'আমি NEAMOT 2.0 Store-এর Login, Add Funds, Payment, Plan, Wallet Pay, Orders ও Keys বিষয়ে সাহায্য করতে পারি। আপনার সমস্যার exact text/screenshot দিলে আরও নির্দিষ্ট উত্তর দিতে পারব।']);
  }
  function sendAI(text){const q=String(text||'').trim();if(!q)return;addMsg(q,'user');const t=document.createElement('div');t.className='NEAMOT-ai-msg-v5 bot NEAMOT-ai-typing-v5';t.textContent='Typing…';msgs().appendChild(t);msgs().scrollTop=msgs().scrollHeight;setTimeout(()=>{t.remove();addMsg(answer(q),'bot');},350);}
  function openAI(){ai.classList.add('show');document.body.style.overflow='hidden';if(!msgs().children.length){addMsg('Hi! 👋 আমি NEAMOT 2.0 AI Assistant। Store ব্যবহার, Login, Add Funds, IND UPI, Wallet Pay বা Panel Purchase নিয়ে যেকোনো প্রশ্ন করুন।','bot');}setTimeout(()=>document.getElementById('NEAMOTAIInputV5')?.focus(),80);}
  function closeAI(){ai.classList.remove('show');document.body.style.overflow='';}
  window.openNEAMOTAIAssistantV5=openAI;
  ai.querySelector('.NEAMOT-ai-close-v5').onclick=closeAI;
  ai.addEventListener('click',e=>{if(e.target===ai)closeAI();});
  document.getElementById('NEAMOTAISendV5').onclick=()=>{const i=document.getElementById('NEAMOTAIInputV5');sendAI(i.value);i.value='';};
  document.getElementById('NEAMOTAIInputV5').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('NEAMOTAISendV5').click();}});
  ai.querySelectorAll('.NEAMOT-ai-quick-v5 button').forEach(b=>b.onclick=()=>sendAI(b.dataset.q));

  /* Replace the AI option in existing Support popup so it opens the built-in assistant. */
  function bindSupportAI(){
    document.querySelectorAll('.NEAMOT-support-option-v4.ai').forEach(a=>{
      a.removeAttribute('href');a.removeAttribute('target');a.onclick=function(e){e.preventDefault();e.stopPropagation();openAI();return false;};
    });
  }

  function boot(){
    bindAddFundsV5();syncPanelAccountHeader();syncPurchaseButtonV5();bindSupportAI();
    setTimeout(bindAddFundsV5,300);setTimeout(bindAddFundsV5,900);setTimeout(bindSupportAI,500);setTimeout(bindSupportAI,1200);
  }
  if(window.auth && typeof auth.onAuthStateChanged==='function')auth.onAuthStateChanged(function(){syncPanelAccountHeader();syncPurchaseButtonV5();bindAddFundsV5();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(syncPanelAccountHeader,1500);setTimeout(syncPurchaseButtonV5,1500);
})();

