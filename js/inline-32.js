
(function () {
  function apply() {
    var btn = document.getElementById('tg-btn');
    if (!btn) return;
    var icon = btn.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-headset';
    } else {
      btn.innerHTML = '<i class="fas fa-headset"></i>';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  setTimeout(apply, 800);
})();
