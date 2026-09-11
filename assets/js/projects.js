/* ==========================================================================
   AZZA TOUATI PORTFOLIO - FEATURED PROJECTS & INTERACTIVE SIMULATOR MODULE
   ========================================================================== */

export const projectsData = [
  {
    id: 'parkinsons-ai',
    number: '01',
    title: "Parkinson's AI — Deep Learning System for Disease Recognition",
    category: 'ai',
    categoryLabel: 'Deep Learning & Healthcare AI',
    shortDesc: "Developed deep learning system for Parkinson's disease recognition from hand-drawing patterns and clinical datasets.",
    technologies: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'Data Augmentation', 'Flask'],
    problem: "Early clinical detection of Parkinson's disease using non-invasive motor drawing patterns requires highly accurate, robust deep-learning architectures resistant to data noise and patient variance.",
    solution: "Trained and evaluated Convolutional Neural Network (CNN) models and deep feature extractors on clinical hand-drawing datasets. Applied real-time data augmentation and built an interactive Flask prediction dashboard.",
    results: "Achieved 94.8% classification accuracy; latency < 120ms; delivered interactive web-based prediction tool for clinical decision interpretation.",
    githubUrl: 'https://github.com/touatiazza',
    simType: 'parkinsons',
    visualType: 'neural-canvas'
  },
  {
    id: 'retail-etl',
    number: '02',
    title: 'RetailFlow — Sales ETL Pipeline & Data Warehouse',
    category: 'engineering',
    categoryLabel: 'Data Engineering & BI',
    shortDesc: "End-to-end data engineering pipeline extracting, transforming, and loading retail sales data into an SSMS Star Schema warehouse.",
    technologies: ['SQL Server', 'SSMS', 'SSIS', 'ETL', 'Data Warehousing'],
    problem: "Enterprise transactional databases experienced query bottlenecks and schema inconsistencies, impeding executive Power BI reporting.",
    solution: "Architected a Star Schema dimensional model (FactSales, DimStore, DimCustomer, DimProduct) in SSMS. Built SSIS ETL packages for automated extraction, data cleansing, transformation, and warehouse staging.",
    results: "Ingested 500,000+ retail records with zero loss; reduced query reporting latency by 75%; automated daily ETL sync.",
    githubUrl: 'https://github.com/touatiazza',
    simType: 'etl',
    visualType: 'pipeline-flow'
  },
  {
    id: 'macrocast',
    number: '03',
    title: 'JobPulse AI — Inflation & GDP Time-Series Forecasting',
    category: 'analytics',
    categoryLabel: 'Econometrics & Data Science',
    shortDesc: "Macroeconomic inflation and GDP growth modeling and forecasting using econometric time-series analysis.",
    technologies: ['Python', 'R', 'Time Series Analysis', 'Econometrics', 'Data Visualization'],
    problem: "Macroeconomic fluctuations in inflation rates and GDP trends complicate strategic corporate planning and macroeconomic forecasting.",
    solution: "Conducted Augmented Dickey-Fuller stationarity tests, seasonal trend decomposition, and constructed SARIMAX & Prophet econometric forecasting models on macroeconomic indicator datasets.",
    results: "Achieved MAPE < 3.8%; generated 12-month forward forecasts with 95% confidence intervals for business strategy decisions.",
    githubUrl: 'https://github.com/touatiazza',
    simType: 'macrocast',
    visualType: 'time-series-canvas'
  },
  {
    id: 'job-market-ai',
    number: '04',
    title: 'JobPulse AI — Job Market Intelligence Analytics',
    category: 'science',
    categoryLabel: 'Machine Learning & Web Analytics',
    shortDesc: "Data science analysis examining how AI automation impacts labor market demands, skill clusters, and job exposure.",
    technologies: ['Python', 'Web Scraping', 'Data Analysis', 'Machine Learning', 'Visualization'],
    problem: "Lack of quantitative clarity regarding which technical skills and job roles face high exposure to AI-driven automation.",
    solution: "Scraped 15,000+ tech job postings via Python; parsed text using Natural Language Processing (TF-IDF); trained k-means clustering models to analyze skill shift trends and automation risk indices.",
    results: "Mapped 8 key labor sectors; identified high-growth AI skill sets vs automation-sensitive task clusters; built interactive visual reports.",
    githubUrl: 'https://github.com/touatiazza',
    simType: 'jobmarket',
    visualType: 'scatter-canvas'
  }
];

export function initProjectsSection() {
  const gridContainer = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.projects-filter-btn');
  const modalOverlay = document.getElementById('project-modal');

  if (!gridContainer) return;

  let activeCategory = 'all';

  function renderProjects() {
    const filtered = projectsData.filter(p => activeCategory === 'all' || p.category === activeCategory);

    gridContainer.innerHTML = filtered.map(project => `
      <div class="project-card card-fade-in" data-id="${project.id}">
        <div class="project-image-wrap">
          ${renderProjectVisual(project)}
          <span class="project-badge-top">[ ${project.number} ] ${project.categoryLabel}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDesc}</p>
          <div class="project-tags">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer" style="justify-content: flex-end;">
            <div class="project-actions">
              <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
                <i class="fa-brands fa-github"></i> Code
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach card 3D tilt & modal click handlers
    attachCardInteractions();
    initVisualCanvasEngines();
  }

  // Render Visual Preview inside project card
  function renderProjectVisual(project) {
    if (project.visualType === 'pipeline-flow') {
      return `
        <div class="etl-pipeline-visual">
          <div class="pipeline-step-node">
            <div class="pipeline-step-icon"><i class="fa-solid fa-database"></i></div>
            <span class="pipeline-step-title">DATA SOURCE</span>
            <span class="pipeline-step-sub">Retail Logs</span>
          </div>
          <div class="pipeline-connector-line"><div class="pipeline-pulse-packet"></div></div>
          <div class="pipeline-step-node">
            <div class="pipeline-step-icon"><i class="fa-solid fa-filter"></i></div>
            <span class="pipeline-step-title">EXTRACTION</span>
            <span class="pipeline-step-sub">SSIS Package</span>
          </div>
          <div class="pipeline-connector-line"><div class="pipeline-pulse-packet" style="animation-delay: 0.8s;"></div></div>
          <div class="pipeline-step-node">
            <div class="pipeline-step-icon"><i class="fa-solid fa-gears"></i></div>
            <span class="pipeline-step-title">TRANSFORM</span>
            <span class="pipeline-step-sub">Data Cleanse</span>
          </div>
          <div class="pipeline-connector-line"><div class="pipeline-pulse-packet" style="animation-delay: 1.6s;"></div></div>
          <div class="pipeline-step-node">
            <div class="pipeline-step-icon"><i class="fa-solid fa-warehouse"></i></div>
            <span class="pipeline-step-title">WAREHOUSE</span>
            <span class="pipeline-step-sub">SSMS Schema</span>
          </div>
          <div class="pipeline-connector-line"><div class="pipeline-pulse-packet" style="animation-delay: 2.2s;"></div></div>
          <div class="pipeline-step-node">
            <div class="pipeline-step-icon"><i class="fa-solid fa-chart-pie"></i></div>
            <span class="pipeline-step-title">ANALYTICS</span>
            <span class="pipeline-step-sub">Power BI</span>
          </div>
        </div>
      `;
    }

    return `<canvas id="canvas-${project.id}" style="width: 100%; height: 100%; display: block; background: #06070a;"></canvas>`;
  }

  // 3D Tilt Card Interaction
  function attachCardInteractions() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // Filter Button Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      renderProjects();
    });
  });

  // Modal Handler
  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !modalOverlay) return;

    const modalBody = modalOverlay.querySelector('#modal-content');
    modalBody.innerHTML = `
      <div style="padding: 2.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
          <span class="section-badge">[ ${project.number} ] ${project.categoryLabel}</span>
          <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> GitHub Repository</a>
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <div class="project-tags" style="margin-bottom: 2rem;">
          ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="modal-sections-grid">
          <div class="modal-info-box">
            <div class="modal-info-label"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</div>
            <div class="modal-info-val">${project.problem}</div>
          </div>
          <div class="modal-info-box">
            <div class="modal-info-label"><i class="fa-solid fa-lightbulb"></i> Solution Approach</div>
            <div class="modal-info-val">${project.solution}</div>
          </div>
          <div class="modal-info-box">
            <div class="modal-info-label"><i class="fa-solid fa-chart-line"></i> Impact & Metrics</div>
            <div class="modal-info-val">${project.results}</div>
          </div>
        </div>

        <div class="modal-sim-container">
          <div class="modal-sim-title">
            <i class="fa-solid fa-flask-vial"></i> Live Interactive Model & Data Pipeline Simulator
          </div>
          <div id="sim-widget-content">
            ${renderSimWidget(project.simType)}
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    initSimWidgetEvents(project.simType);
  }

  // Close Modal Events
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) closeModal();
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  renderProjects();
}

/* --------------------------------------------------------------------------
   CANVAS ANIMATION ENGINES FOR PROJECT CARDS
   -------------------------------------------------------------------------- */
function initVisualCanvasEngines() {
  // 1. Parkinson's AI Neural Canvas Visualizer
  const parkCanvas = document.getElementById('canvas-parkinsons-ai');
  if (parkCanvas) {
    const ctx = parkCanvas.getContext('2d');
    parkCanvas.width = parkCanvas.clientWidth || 500;
    parkCanvas.height = parkCanvas.clientHeight || 270;

    const layers = [3, 5, 5, 2];
    const nodes = [];

    // Calculate node coordinates per layer
    const layerGap = parkCanvas.width / (layers.length + 1);
    layers.forEach((count, lIdx) => {
      const x = layerGap * (lIdx + 1);
      const nodeGap = parkCanvas.height / (count + 1);
      for (let nIdx = 0; nIdx < count; nIdx++) {
        nodes.push({ x, y: nodeGap * (nIdx + 1), layer: lIdx, pulse: Math.random() });
      }
    });

    let frame = 0;
    function animPark() {
      if (!parkCanvas.getContext) return;
      ctx.clearRect(0, 0, parkCanvas.width, parkCanvas.height);
      frame += 0.03;

      // Draw synapse connections
      for (let a of nodes) {
        for (let b of nodes) {
          if (b.layer === a.layer + 1) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Energy signal pulse along connection
            const progress = (Math.sin(frame + a.pulse * 5) + 1) / 2;
            const px = a.x + (b.x - a.x) * progress;
            const py = a.y + (b.y - a.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          }
        }
      }

      // Draw Layer Nodes
      for (let n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = n.layer === 0 ? '#6366f1' : (n.layer === layers.length - 1 ? '#a855f7' : '#38bdf8');
        ctx.fill();
        ctx.strokeStyle = '#06070a';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(animPark);
    }
    animPark();
  }

  // 2. MacroCast Time-Series Canvas Visualizer
  const macroCanvas = document.getElementById('canvas-macrocast');
  if (macroCanvas) {
    const ctx = macroCanvas.getContext('2d');
    macroCanvas.width = macroCanvas.clientWidth || 500;
    macroCanvas.height = macroCanvas.clientHeight || 270;

    let offset = 0;
    function animMacro() {
      if (!macroCanvas.getContext) return;
      ctx.clearRect(0, 0, macroCanvas.width, macroCanvas.height);
      offset += 0.04;

      const w = macroCanvas.width;
      const h = macroCanvas.height;

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }

      // Draw GDP Growth Wave Line
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const y = h / 2 + Math.sin(x * 0.02 + offset) * 35 + Math.cos(x * 0.01 + offset) * 15;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw Inflation Confidence Interval Band
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const yUpper = h / 2 - 20 + Math.sin(x * 0.015 - offset) * 25;
        if (x === 0) ctx.moveTo(x, yUpper); else ctx.lineTo(x, yUpper);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      requestAnimationFrame(animMacro);
    }
    animMacro();
  }

  // 3. Job Market Scatter Canvas Visualizer
  const jobCanvas = document.getElementById('canvas-job-market-ai');
  if (jobCanvas) {
    const ctx = jobCanvas.getContext('2d');
    jobCanvas.width = jobCanvas.clientWidth || 500;
    jobCanvas.height = jobCanvas.clientHeight || 270;

    const points = Array.from({ length: 45 }, () => ({
      x: Math.random() * jobCanvas.width,
      y: Math.random() * jobCanvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3.5 + 2,
      color: Math.random() > 0.5 ? '#38bdf8' : (Math.random() > 0.5 ? '#6366f1' : '#a855f7')
    }));

    function animJob() {
      if (!jobCanvas.getContext) return;
      ctx.clearRect(0, 0, jobCanvas.width, jobCanvas.height);

      for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > jobCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > jobCanvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      requestAnimationFrame(animJob);
    }
    animJob();
  }
}

/* --------------------------------------------------------------------------
   INTERACTIVE SIMULATORS FOR MODALS
   -------------------------------------------------------------------------- */
function renderSimWidget(simType) {
  if (simType === 'parkinsons') {
    return `
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Select a clinical drawing pattern sample to test the deep learning classification model:</p>
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm sim-park-btn" data-sample="spiral-healthy"><i class="fa-solid fa-circle-check" style="color: #4ade80;"></i> Sample A (Healthy Control)</button>
        <button class="btn btn-secondary btn-sm sim-park-btn" data-sample="spiral-parkinsons"><i class="fa-solid fa-triangle-exclamation" style="color: #f43f5e;"></i> Sample B (Parkinson's Spiral)</button>
        <button class="btn btn-secondary btn-sm sim-park-btn" data-sample="wave-parkinsons"><i class="fa-solid fa-wave-square" style="color: #38bdf8;"></i> Sample C (Wave Tremor)</button>
      </div>
      <div class="modal-sim-output" id="parkinsons-output">Click a test clinical sample above to execute model inference...</div>
    `;
  } else if (simType === 'etl') {
    return `
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Click 'Execute SSIS Pipeline' to run raw extraction, cleansing, transformation, and star schema load:</p>
      <div style="margin-bottom: 1rem;">
        <button class="btn btn-primary btn-sm" id="run-etl-btn"><i class="fa-solid fa-play"></i> Execute SSIS Pipeline</button>
      </div>
      <div class="modal-sim-output" id="etl-output">Status: Ready. Awaiting SSIS execution...</div>
    `;
  } else if (simType === 'macrocast') {
    return `
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Adjust Econometric Forecast Horizon (Months):</p>
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <input type="range" id="macro-slider" min="3" max="18" value="6" step="3" style="width: 200px;">
        <span id="macro-slider-val" style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;">6 Months</span>
      </div>
      <div class="modal-sim-output" id="macro-output">Forecast horizon updated: 6 Months projected trends...</div>
    `;
  } else if (simType === 'jobmarket') {
    return `
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Select Job Market Domain to analyze AI automation exposure and skill demands:</p>
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm job-btn" data-role="data-scientist">Data Scientist</button>
        <button class="btn btn-secondary btn-sm job-btn" data-role="bi-analyst">BI Analyst</button>
        <button class="btn btn-secondary btn-sm job-btn" data-role="ml-engineer">ML Engineer</button>
      </div>
      <div class="modal-sim-output" id="job-output">Select a job role to view top skill clusters and AI impact score...</div>
    `;
  }
  return '<p style="color: var(--text-muted);">Simulator ready.</p>';
}

function initSimWidgetEvents(simType) {
  if (simType === 'parkinsons') {
    const btns = document.querySelectorAll('.sim-park-btn');
    const out = document.getElementById('parkinsons-output');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.sample;
        out.innerHTML = `[DEEP LEARNING TENSOR INFERENCE IN PROGRESS...] Preprocessing input drawing tensor...`;
        setTimeout(() => {
          if (type === 'spiral-healthy') {
            out.innerHTML = `[CLASSIFICATION RESULT]
Status: HEALTHY CONTROL (Negative)
Model Confidence: 97.4%
Tremor Amplitude: Normal (< 0.04 Hz)
Decision Support: Low risk. Recommendation: Standard routine follow-up.`;
          } else if (type === 'spiral-parkinsons') {
            out.innerHTML = `[CLASSIFICATION RESULT]
Status: PARKINSON'S PATTERN DETECTED (Positive)
Model Confidence: 95.8%
Tremor Peak: 5.2 Hz Micro-fluctuation Index: 0.78
Decision Support: Diagnostic indicators detected. Recommendation: Specialist clinical evaluation.`;
          } else {
            out.innerHTML = `[CLASSIFICATION RESULT]
Status: PARKINSON'S PATTERN DETECTED (Positive)
Model Confidence: 92.1%
Motor Asymmetry Variance: 0.69
Decision Support: Wave tremor asymmetry present. Recommendation: Specialist clinical evaluation.`;
          }
        }, 350);
      });
    });
  } else if (simType === 'etl') {
    const btn = document.getElementById('run-etl-btn');
    const out = document.getElementById('etl-output');
    if (btn) {
      btn.addEventListener('click', () => {
        out.innerHTML = `[STAGE 1/3] Extracting raw retail sales logs in SSMS (500,000 records)...`;
        setTimeout(() => {
          out.innerHTML += `\n[STAGE 2/3] Executing SSIS Data Cleansing: Schema normalization, missing value treatment...`;
          setTimeout(() => {
            out.innerHTML += `\n[STAGE 3/3] Loading FactSales & Dim Tables into SQL Server Data Warehouse...`;
            out.innerHTML += `\nSUCCESS: 500,000 records synced in 1.42s. Star Schema ready for Power BI!`;
          }, 400);
        }, 400);
      });
    }
  } else if (simType === 'macrocast') {
    const slider = document.getElementById('macro-slider');
    const label = document.getElementById('macro-slider-val');
    const out = document.getElementById('macro-output');
    if (slider) {
      const update = () => {
        const val = slider.value;
        label.innerText = `${val} Months`;
        out.innerHTML = `[SARIMAX & PROPHET FORECAST — ${val} MONTH HORIZON]
Projected GDP Growth: +2.4% (95% CI: [1.8%, 3.1%])
Projected CPI Inflation: 3.1% (95% CI: [2.6%, 3.7%])
Seasonal Econometric Trend: Demand cycle uptick predicted.
Evaluation Metrics: MAPE = 3.65%, RMSE = 0.42.`;
      };
      slider.addEventListener('input', update);
      update();
    }
  } else if (simType === 'jobmarket') {
    const btns = document.querySelectorAll('.job-btn');
    const out = document.getElementById('job-output');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        out.innerHTML = `Parsing scraped job postings for ${role}...`;
        setTimeout(() => {
          if (role === 'data-scientist') {
            out.innerHTML = `[NLP SCRAPER RESULT — DATA SCIENTIST]
Analyzed Postings: 3,420 postings
Top Demanded Skills: Python (89%), SQL (82%), Machine Learning (78%), PyTorch/TensorFlow (64%)
AI Automation Exposure Score: LOW (22%) — High demand for strategic problem formulation & custom modeling.`;
          } else if (role === 'bi-analyst') {
            out.innerHTML = `[NLP SCRAPER RESULT — BI ANALYST]
Analyzed Postings: 2,890 postings
Top Demanded Skills: SQL (94%), Power BI / Tableau (88%), Data Warehousing (72%), Excel (69%)
AI Automation Exposure Score: MODERATE (34%) — Reporting automated; focus on strategic business storytelling.`;
          } else {
            out.innerHTML = `[NLP SCRAPER RESULT — ML ENGINEER]
Analyzed Postings: 2,150 postings
Top Demanded Skills: Python (96%), MLOps (81%), REST APIs/Flask (71%), Deep Learning (69%)
AI Automation Exposure Score: VERY LOW (14%) — Critical demand for deploying and maintaining AI infrastructure.`;
          }
        }, 300);
      });
    });
  }
}
