
(function(){
  'use strict';
  // Block context menu (right click / long press) except on inputs
  document.addEventListener('contextmenu', function(e){
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    e.preventDefault();
    return false;
  }, true);

  // Block copy/cut from page (Copy button uses clipboard API directly — still works)
  document.addEventListener('copy', function(e){
    var sel = window.getSelection && window.getSelection();
    var text = sel ? String(sel) : '';
    // allow only if selection is inside reset key
    var node = sel && sel.anchorNode;
    var el = node && (node.nodeType === 3 ? node.parentElement : node);
    if (el && el.closest && el.closest('.kr2-reset-key-text, .kr2-reset-key-line')) return;
    e.preventDefault();
    return false;
  }, true);
  document.addEventListener('cut', function(e){ e.preventDefault(); return false; }, true);

  // Block common select-all / copy shortcuts on non-inputs
  document.addEventListener('keydown', function(e){
    var t = e.target;
    var inField = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
    if (inField) return;
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A' || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      return false;
    }
  }, true);

  // Prevent drag of images/logos
  document.addEventListener('dragstart', function(e){
    if (e.target && (e.target.tagName === 'IMG' || e.target.closest && e.target.closest('img'))) {
      e.preventDefault();
      return false;
    }
  }, true);

  // Mark all images non-draggable
  function lockImages(){
    document.querySelectorAll('img').forEach(function(img){
      img.setAttribute('draggable', 'false');
      img.ondragstart = function(){ return false; };
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lockImages);
  } else {
    lockImages();
  }
  setTimeout(lockImages, 500);
  setTimeout(lockImages, 2000);
})();
