const bgm = document.getElementById("bgm");

window.addEventListener("DOMContentLoaded", () => {
  const lastTime = localStorage.getItem("bgm-time");
  const isPlaying = localStorage.getItem("bgm-playing");

  if (lastTime) bgm.currentTime = parseFloat(lastTime);
  bgm.volume = 0.5; // 可選：預設音量

  if (isPlaying === "true" && bgm.paused) {
    bgm.play().catch(() => {
      document.body.addEventListener("click", () => bgm.play(), { once: true });
    });
  }

  setInterval(() => {
    localStorage.setItem("bgm-time", bgm.currentTime);
    localStorage.setItem("bgm-playing", !bgm.paused);
  }, 1000);
});
