
(function(){
  function ensureNoticeBoard(){
    var board=document.getElementById('NEAMOTTopNoticeBoard');
    if(!board) return;
    if(board.parentElement!==document.body){
      document.body.appendChild(board);
    }
    board.classList.add('NEAMOT-v10-visible-notice');
    document.body.classList.add('NEAMOT-v10-notice-spacer');
    board.style.display='flex';
    board.style.visibility='visible';
    board.style.opacity='1';
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){
      ensureNoticeBoard();
      setTimeout(ensureNoticeBoard,300);
    });
  }else{
    ensureNoticeBoard();
    setTimeout(ensureNoticeBoard,300);
  }
})();
