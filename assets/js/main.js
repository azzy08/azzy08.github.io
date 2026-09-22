/* ==========================================================================
   AZZA TOUATI PORTFOLIO - MAIN ENTRY POINT
   ========================================================================== */

import { initHeroCanvas } from './canvas.js';
import { initSkillsMatrix } from './skills.js';
import { initProjectsSection } from './projects.js';
import { initTimelineEngine } from './timeline.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Neural Backdrop Engine
  initHeroCanvas();

  // Initialize Technology Constellation & Skills Matrix
  initSkillsMatrix();

  // Initialize Centerpiece Projects & Simulators
  initProjectsSection();

  // Initialize Timeline Line Engine & Metric Counters
  initTimelineEngine();

  // Initialize Interactive UI, Dual Cursor & Magnetic Physics
  initInteractions();
});
