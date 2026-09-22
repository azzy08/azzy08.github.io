/* ==========================================================================
   AZZA TOUATI PORTFOLIO - SCROLL TIMELINE & STAT METRICS COUNTER ENGINE
   ========================================================================== */

export function initTimelineEngine() {
  // 1. Progressive Timeline Line Drawing & Node Activation
  const timelineContainers = document.querySelectorAll('.timeline-container');

  function updateTimelines() {
    timelineContainers.forEach(container => {
      const items = container.querySelectorAll('.timeline-item');
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far down the timeline container has scrolled into view
      const scrolledIn = windowHeight - containerRect.top;
      const totalHeight = containerRect.height;
      const progress = Math.min(Math.max(scrolledIn / (totalHeight + windowHeight * 0.3), 0), 1);

      // Activate nodes as scroll passes them
      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const dot = item.querySelector('.timeline-dot');

        if (itemRect.top < windowHeight * 0.8) {
          item.classList.add('active');
          if (dot) dot.style.boxShadow = '0 0 20px var(--accent-cyan)';
        }
      });
    });
  }

  window.addEventListener('scroll', updateTimelines);
  updateTimelines();

  // 2. Animated Numerical Metric Counters
  const counterElements = document.querySelectorAll('.counter-value');
  let countersAnimated = false;

  function checkCounters() {
    if (countersAnimated) return;

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      countersAnimated = true;

      counterElements.forEach(el => {
        const targetStr = el.dataset.target;
        if (targetStr === '∞') {
          el.innerText = '∞';
          return;
        }

        const targetNum = parseInt(targetStr, 10);
        if (isNaN(targetNum)) return;

        let current = 0;
        const duration = 1500; // ms
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            el.innerText = targetNum < 10 ? `0${targetNum}+` : `${targetNum}+`;
            clearInterval(timer);
          } else {
            const displayVal = Math.floor(current);
            el.innerText = displayVal < 10 ? `0${displayVal}+` : `${displayVal}+`;
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', checkCounters);
  checkCounters();
}
