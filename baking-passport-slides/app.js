const deck = document.getElementById('deck');
const stage = document.getElementById('stage');
const slides = [...document.querySelectorAll('.slide')];
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const controls = document.querySelector('.controls');
const journeyQrOpen = document.getElementById('journey-qr-open');
const journeyQrOverlay = document.getElementById('journey-qr-overlay');
const journeyQrClose = document.getElementById('journey-qr-close');
const demoVideo = document.querySelector('.demo-video');
let current = 0;

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

previous.addEventListener('click', () => showSlide(current - 1));
next.addEventListener('click', () => showSlide(current + 1));
journeyQrOpen.addEventListener('click', openJourneyQr);
journeyQrClose.addEventListener('click', closeJourneyQr);
journeyQrOverlay.addEventListener('click', (event) => {
  if (event.target === journeyQrOverlay) closeJourneyQr();
});
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
document.getElementById('print').addEventListener('click', () => window.print());
document.getElementById('demo-fullscreen').addEventListener('click', () => {
  if (demoVideo.requestFullscreen) void demoVideo.requestFullscreen().catch(() => {});
  else demoVideo.webkitEnterFullscreen?.();
  void demoVideo.play().catch(() => {});
});

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
