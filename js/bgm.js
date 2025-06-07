const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgm-toggle");

window.addEventListener("DOMContentLoaded", () => {
  const lastTime = localStorage.getItem("bgm-time");
  const isPlaying = localStorage.getItem("bgm-playing");

  if (lastTime) bgm.currentTime = parseFloat(lastTime);
  bgm.volume = 0.5;
  bgm.muted = false;

  if (isPlaying === "true" && bgm.paused) {
    bgm.play().catch(() => {
      document.body.addEventListener("click", () => bgm.play(), { once: true });
    });
  }

  setInterval(() => {
    localStorage.setItem("bgm-time", bgm.currentTime);
    localStorage.setItem("bgm-playing", !bgm.paused);
  }, 1000);

  if (bgmToggle) {
    updateToggleUI();

    bgmToggle.addEventListener("click", () => {
      if (bgm.paused) {
        bgm.play().then(updateToggleUI);
      } else {
        bgm.pause();
        updateToggleUI();
      }
    });
  }

  function updateToggleUI() {
    if (!bgmToggle) return;
    bgmToggle.innerHTML = bgm.paused ? "🎶" : "🔇";
  }
});
