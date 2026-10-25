
(function(){
  const defaultMessage = 'বাংলা: এই প্যানেলটি বর্তমানে মেইনটেন্যান্সে রয়েছে। তাই আপাতত এটি কেনা বা ব্যবহার করা যাবে না। মেইনটেন্যান্স শেষ হলে আবার চালু করা হবে।\n\nEnglish: This panel is currently under maintenance, so it cannot be purchased or used right now. It will be available again when maintenance is complete.\n\nहिंदी: यह पैनल अभी मेंटेनेंस में है, इसलिए फिलहाल इसे खरीदा या इस्तेमाल नहीं किया जा सकता। मेंटेनेंस पूरा होने पर इसे फिर से चालू किया जाएगा.';
  window.showProductMaintenanceNotice = function(id){
    let item = null;
    try { const db = window.panelDatabase || window.panelsDatabase || {}; item = db[String(id)] || null; } catch(e){}
    // Product data can be exposed through the existing page database or the currently rendered card.
    let message = item && (item.maintenanceMessage || item.maintenanceNote || item.maintenanceText);
    const card = document.querySelector('.unique-product-card[onclick*="'+String(id).replace(/[^a-zA-Z0-9_-]/g,'')+'"]');
    const titleEl = card && card.querySelector('.product-card-title');
    const title = titleEl ? titleEl.textContent.trim() : 'Product Maintenance';
    const modal = document.getElementById('gx-maintenance-modal');
    const titleNode = document.getElementById('gx-maintenance-title');
    const bodyNode = document.getElementById('gx-maintenance-body');
    if(titleNode) titleNode.textContent = title + ' — Maintenance';
    if(bodyNode) bodyNode.textContent = (message && String(message).trim()) || defaultMessage;
    if(modal) { modal.style.display='flex'; document.body.style.overflow='hidden'; }
  };
  window.closeProductMaintenanceNotice = function(){ const modal=document.getElementById('gx-maintenance-modal'); if(modal) modal.style.display='none'; document.body.style.overflow=''; };
  document.addEventListener('keydown',function(e){if(e.key==='Escape')window.closeProductMaintenanceNotice();});
})();
