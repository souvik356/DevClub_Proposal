// =========================================================
// DevClub Proposal — interactions
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile sidebar ---------- */
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    const overlay = document.querySelector('.overlay');
    const closeSidebar = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-open'); };
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
      });
    }
    if (overlay) overlay.addEventListener('click', closeSidebar);
    document.querySelectorAll('.graph-item').forEach(item => {
      item.addEventListener('click', () => { if (window.innerWidth <= 860) closeSidebar(); });
    });
  
    /* ---------- Scrollspy: git-graph nav ---------- */
    const navItems = Array.from(document.querySelectorAll('.graph-item'));
    const sections = navItems
      .map(item => document.getElementById(item.dataset.target))
      .filter(Boolean);
  
    function updateActiveNav() {
      let currentIndex = 0;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      sections.forEach((sec, i) => {
        if (sec.offsetTop <= scrollPos) currentIndex = i;
      });
      navItems.forEach((item, i) => {
        item.classList.toggle('is-active', i === currentIndex);
        item.classList.toggle('is-past', i < currentIndex);
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  
    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  
    /* ---------- Hero build-graph sequential light-up ---------- */
    const buildNodes = document.querySelectorAll('.build-node');
    const buildConnectors = document.querySelectorAll('.build-connector');
    function runBuildGraph() {
      buildNodes.forEach(n => n.classList.remove('lit'));
      buildConnectors.forEach(c => c.classList.remove('lit'));
      buildNodes.forEach((node, i) => {
        setTimeout(() => {
          node.classList.add('lit');
          if (buildConnectors[i]) buildConnectors[i].classList.add('lit');
        }, i * 550);
      });
    }
    runBuildGraph();
    setInterval(runBuildGraph, buildNodes.length * 550 + 1800);
  
    /* ---------- Expandable cards (communities, gains, pillars-detail) ---------- */
    document.querySelectorAll('.expand-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('is-open');
        card.parentElement.querySelectorAll('.expand-card').forEach(c => c.classList.remove('is-open'));
        if (!wasOpen) card.classList.add('is-open');
      });
    });
  
    /* ---------- Roadmap accordion ---------- */
    document.querySelectorAll('.roadmap-item').forEach(item => {
      const head = item.querySelector('.roadmap-head');
      head.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        item.parentElement.querySelectorAll('.roadmap-item').forEach(i => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  
    /* ---------- Month strip ---------- */
    document.querySelectorAll('.month-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('is-open');
        card.parentElement.querySelectorAll('.month-card').forEach(c => c.classList.remove('is-open'));
        if (!wasOpen) card.classList.add('is-open');
      });
    });
  
    /* ---------- KPI counters ---------- */
    const counters = document.querySelectorAll('.kpi-num');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => counterObserver.observe(c));
  
    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffixEl = el.querySelector('.suffix');
      const numSpan = el.querySelector('.num-value');
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numSpan.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else numSpan.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
    }
  
    /* ---------- Progress chain (vision section) ---------- */
    const chainSteps = document.querySelectorAll('.pc-step');
    const chainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chainSteps.forEach((step, i) => {
            setTimeout(() => step.classList.add('on'), i * 260);
          });
          chainObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    const chainWrap = document.querySelector('.progress-chain');
    if (chainWrap) chainObserver.observe(chainWrap);
  
    /* ---------- Smooth-scroll for CTA links ---------- */
    document.querySelectorAll('[data-scroll-to]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.scrollTo);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
  });