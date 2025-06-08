document.addEventListener("DOMContentLoaded", () => {
  const mask = document.getElementById('transition-mask');

  // 所有具有 data-href 的元素都會啟動轉場
  document.querySelectorAll('[data-href]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('data-href');
      mask.classList.add('show');

      setTimeout(() => {
        window.location.href = href;
      }, 1300); // 要比 CSS 的 transition 時間長一點點
    });
  });
});
