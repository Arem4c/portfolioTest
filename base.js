/**
 * ========================================
 * МОДУЛЬ 1: БУРГЕР-МЕНЮ
 * ========================================
 */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", function () {
  nav.classList.toggle("active");
  burger.classList.toggle("active");
});

document.querySelectorAll(".nav__list a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("active");
    burger.classList.remove("active");
  });
});

/**
 * ========================================
 * МОДУЛЬ 2: ЭФФЕКТ СКРОЛЛА ДЛЯ ХЕДЕРА
 * ========================================
 */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/**
 * ========================================
 * МОДУЛЬ 3: SCROLL PROGRESS CAR
 * ========================================
 */

const scrollProgress = document.getElementById("scrollProgress");
const scrollProgressCar = document.getElementById("scrollProgressCar");
const scrollProgressTrack = scrollProgress?.querySelector(".scroll-progress__track");

function updateScrollProgress() {
  if (!scrollProgress || !scrollProgressCar || !scrollProgressTrack) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update track width (progress line) via CSS custom property
  scrollProgressTrack.style.setProperty('--progress-width', `${scrollPercent}%`);

  // Update car position - center of car follows scroll percentage
  const containerWidth = scrollProgress.clientWidth;
  const carPosition = (scrollPercent / 100) * containerWidth;
  scrollProgressCar.style.left = `${carPosition}px`;
}

// Initialize track pseudo-element via CSS custom property
if (scrollProgressTrack) {
  scrollProgressTrack.style.setProperty('--progress-width', '0%');
}

// Throttled scroll listener for performance
let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      updateScrollProgress();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial update
updateScrollProgress();

// Update on resize
window.addEventListener("resize", updateScrollProgress);

// Flag click → scroll to footer
const progressFlag = document.querySelector(".scroll-progress__flag");
if (progressFlag) {
  progressFlag.addEventListener("click", function () {
    const footer = document.getElementById("contact");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/**
 * ========================================
 * МОДУЛЬ 4: SPONSORS TICKER (F1 Movie Partners)
 * ========================================
 */

const F1_SPONSORS = [
  { name: 'Apple Original Films', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Mercedes-AMG', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'IWC Schaffhausen', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/IWC_Schaffhausen_logo.svg' },
  { name: 'Tommy Hilfiger', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tommy_Hilfiger_logo.svg' },
  { name: 'Expensify', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Expensify_logo.svg' },
  { name: 'GEICO', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/GEICO_logo.svg' },
  { name: 'EA Sports', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/EA_Sports_logo.svg' },
  { name: 'MSC Cruises', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/MSC_Cruises_logo.svg' },
  { name: 'SharkNinja', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/SharkNinja_logo.svg' },
  { name: 'Heineken 0.0', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Heineken_International_logo.svg' },
  { name: 'Pirelli', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Pirelli_logo.svg' },
  { name: 'Formula 1', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg' },
];

function initSponsorsTicker() {
  const list = document.getElementById('sponsorsList');
  if (!list) return;

  const html = F1_SPONSORS.map(sponsor => `
    <div class="sponsor-item" title="${sponsor.name}">
      <img src="${sponsor.logo}" alt="${sponsor.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
      <span style="display:none;">${sponsor.name}</span>
    </div>
  `).join('');

  list.innerHTML = html;
  list.innerHTML += html;
  list.innerHTML += html; // Triple for seamless loop
}

// Initialize
document.addEventListener('DOMContentLoaded', initSponsorsTicker);

/**
 * ========================================
 * МОДУЛЬ 5: HERO HOTSPOTS - ПОКАЗ ОПИСАНИЯ В МЕСТЕ ГЕРОЯ
 * ========================================
 */

const heroContent = document.querySelector('.hero__content');
const heroHotspots = document.querySelectorAll('.hero__hotspots .car-hotspot');
const hotspotPanel = document.getElementById('hotspotPanel');
const hotspotTitle = document.getElementById('hotspotTitle');
const hotspotDesc = document.getElementById('hotspotDesc');
const hotspotClose = document.getElementById('hotspotClose');

if (heroHotspots.length && hotspotPanel) {
  let activeHotspot = null;

  function openPanel(hotspot) {
    const title = hotspot.dataset.title || '';
    const desc = hotspot.dataset.desc || '';
    hotspotTitle.textContent = title;
    hotspotDesc.textContent = desc;
    hotspotPanel.classList.add('open');
  }

  function closePanel() {
    hotspotPanel.classList.remove('open');
    if (activeHotspot) {
      activeHotspot.classList.remove('active');
      activeHotspot = null;
    }
  }

  heroHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', function (e) {
      e.stopPropagation();
      if (activeHotspot === this) {
        closePanel();
        return;
      }
      if (activeHotspot) {
        activeHotspot.classList.remove('active');
      }
      this.classList.add('active');
      activeHotspot = this;
      openPanel(this);
    });
  });

  if (hotspotClose) {
    hotspotClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closePanel();
    });
  }

  document.addEventListener('click', function () {
    closePanel();
  });

  hotspotPanel.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}
