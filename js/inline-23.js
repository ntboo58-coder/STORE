
(function(){
  function finalFix(){
    var board=document.getElementById('NEAMOTTopNoticeBoard');
    if(board){
      board.classList.remove('NEAMOT-v10-visible-notice');
      board.style.cssText='';
      board.classList.add('NEAMOT-final-notice');
      document.body.classList.remove('NEAMOT-v10-notice-spacer');
    }
    var other=document.getElementById('other-pay-tab');
    if(other){
      other.classList.add('NEAMOT-addfunds-pay-btn');
      other.innerHTML='<div class="NEAMOT-addfunds-static-icon"><i class="fas fa-wallet"></i></div><span>𝐀𝐃𝐃 𝐅𝐔𝐍𝐃𝐒</span>';
      other.onclick=function(){ if(typeof window.selectPanelPaymentMethod==='function') window.selectPanelPaymentMethod('addfunds'); else if(typeof window.switchTab==='function') window.switchTab('addfunds'); };
    }
    var panelUpi=document.getElementById('ind-upi-tab');
    if(panelUpi && panelUpi.closest('.ind-upi-separate-wrap')) panelUpi.closest('.ind-upi-separate-wrap').style.display='none';
    var list=document.querySelector('.funds-method-options');
    if(list && !list.querySelector('[data-method="ind_upi"]')){
      var b=document.createElement('button');
      b.type='button'; b.className='funds-method-option'; b.dataset.method='ind_upi';
      b.innerHTML='<span class="funds-method-option-left"><span class="funds-method-upi-badge">UPI</span><span><span class="funds-method-option-name">IND UPI PAY</span><span class="funds-method-option-sub">India UPI • QR Payment</span></span></span><span class="funds-method-radio"></span>';
      b.onclick=function(){ if(typeof window.selectFundsMethod==='function') window.selectFundsMethod('ind_upi'); if(typeof window.closeFundsMethodModal==='function') window.closeFundsMethodModal(); };
      list.appendChild(b);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){finalFix();setTimeout(finalFix,400);setTimeout(finalFix,1200);});
  else {finalFix();setTimeout(finalFix,400);setTimeout(finalFix,1200);}
})();
