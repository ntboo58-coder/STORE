
(function(){
  async function readControl(panelId){
    const id=String(panelId||'').replace(/^#?panel[-_]?/i,'');
    if(!id)return null;
    try{
      const db=window.database||(window.firebase&&typeof firebase.database==='function'?firebase.database():null);
      if(!db)return null;
      const s=await db.ref('storeData/panelControls/'+id).once('value');
      return s.val()||null;
    }catch(e){console.warn('Panel control unavailable',e);return null;}
  }
  function blocked(status){
    const down=String(status||'').toLowerCase()==='server_down';
    const title=down?'Server Down ❌':'Key Access Failed 🚫';
    const desc=down?'এই Panel-এর Server Down আছে। বর্তমানে Buy করা যাচ্ছে না।':'এই Panel-এর Key Access Failed হয়েছে। বর্তমানে Buy করা যাচ্ছে না।';
    if(typeof window.showNotification==='function') window.showNotification(down?'❌':'🚫',title,desc,'OK',false);
    else if(typeof window.showToast==='function') window.showToast(title+' — '+desc,'#20c8f5',down?'❌':'🚫');
    else alert(title+'\n\n'+desc);
  }
  window.NEAMOTCheckPurchaseControl=async function(panelId){
    const c=await readControl(panelId), st=c&&String(c.status||'').toLowerCase();
    if(st==='server_down'||st==='key_failed'){blocked(st);return false;}
    return true;
  };
})();
