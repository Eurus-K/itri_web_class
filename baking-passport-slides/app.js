const deck = document.getElementById('deck');
const stage = document.getElementById('stage');
const slides = [...document.querySelectorAll('.slide')];
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const controls = document.querySelector('.controls');
const journeyQrOpen = document.getElementById('journey-qr-open');
const journeyQrOverlay = document.getElementById('journey-qr-overlay');
const journeyQrClose = document.getElementById('journey-qr-close');
const videos = [...document.querySelectorAll('.demo-video')];
const demoSelectors = [...document.querySelectorAll('.demo-selector')];
const demoFeatures = [
  {
    title: '完整體驗流程',
    description: '從掃碼、選擇語言、挑選甜點到完成個人化拍貼，展示烘焙體驗護照的操作流程。',
  },
  {
    title: '外語字卡示範',
    description: '顧客可透過手機上的多語言協助卡，向現場人員表達需求，減少語言溝通障礙。',
  },
];
let current = 0;
let currentDemo = 0;

function fitSlide() {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  deck.style.transform = `scale(${scale})`;
  deck.style.left = `${(window.innerWidth - 1920 * scale) / 2}px`;
  deck.style.top = `${(window.innerHeight - 1080 * scale) / 2}px`;
}

function showSlide(index) {
  if (!journeyQrOverlay.hidden) closeJourneyQr();
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === current);
    slide.setAttribute('aria-hidden', String(i !== current));
    if (i !== current) slide.querySelectorAll('video').forEach((video) => video.pause());
  });
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

function openJourneyQr() {
  journeyQrOverlay.hidden = false;
  controls.inert = true;
  journeyQrClose.focus();
}

function closeJourneyQr() {
  journeyQrOverlay.hidden = true;
  controls.inert = false;
  if (current === 1) journeyQrOpen.focus();
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else stage.requestFullscreen?.();
}

function showDemo(index) {
  const selected = (index + videos.length) % videos.length;
  if (selected !== currentDemo) {
    videos[currentDemo].pause();
    if (videos[currentDemo].readyState > 0) videos[currentDemo].currentTime = 0;
  }
  currentDemo = selected;
  videos.forEach((video, i) => {
    video.hidden = i !== selected;
    video.classList.toggle('is-selected', i === selected);
  });
  demoSelectors.forEach((button, i) => {
    button.classList.toggle('is-selected', i === selected);
    button.setAttribute('aria-pressed', String(i === selected));
  });
  document.getElementById('demo-feature-title').textContent = demoFeatures[selected].title;
  document.getElementById('demo-feature-description').textContent = demoFeatures[selected].description;
}

previous.addEventListener('click', () => showSlide(current - 1));
next.addEventListener('click', () => showSlide(current + 1));
journeyQrOpen.addEventListener('click', openJourneyQr);
journeyQrClose.addEventListener('click', closeJourneyQr);
journeyQrOverlay.addEventListener('click', (event) => {
  if (event.target === journeyQrOverlay) closeJourneyQr();
});
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
document.getElementById('print').addEventListener('click', () => window.print());
document.querySelectorAll('[data-demo-direction]').forEach((button) => {
  button.addEventListener('click', () => showDemo(currentDemo + Number(button.dataset.demoDirection)));
});
demoSelectors.forEach((button) => {
  button.addEventListener('click', () => showDemo(Number(button.dataset.demoIndex)));
});
document.getElementById('demo-fullscreen').addEventListener('click', () => {
  const video = videos[currentDemo];
  if (video.requestFullscreen) void video.requestFullscreen().catch(() => {});
  else video.webkitEnterFullscreen?.();
  void video.play().catch(() => {});
});

videos.forEach((video) => video.addEventListener('play', () => {
  videos.forEach((other) => { if (other !== video) other.pause(); });
}));

document.addEventListener('keydown', (event) => {
  if (!journeyQrOverlay.hidden) {
    if (event.key === 'Escape') closeJourneyQr();
    if (event.key === 'Tab') {
      event.preventDefault();
      journeyQrClose.focus();
    }
    return;
  }
  if (event.key === 'ArrowLeft') showSlide(current - 1);
  else if (event.key === 'ArrowRight') showSlide(current + 1);
  else if (event.key.toLowerCase() === 'f') toggleFullscreen();
  else if (event.key.toLowerCase() === 'p' && !event.ctrlKey && !event.metaKey) window.print();
});

window.addEventListener('resize', fitSlide);
fitSlide();
showDemo(0);
showSlide(0);
