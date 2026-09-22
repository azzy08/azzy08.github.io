/* ==========================================================================
   AZZA TOUATI PORTFOLIO - STANDALONE JS BUNDLE (FILE:// & HTTP COMPATIBLE)
   ========================================================================== */

(function() {
  'use strict';

  /* --------------------------------------------------------------------------
     1. HERO CANVASES BACKDROP
     -------------------------------------------------------------------------- */
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const maxDistance = 140;
    const mouse = { x: null, y: null, radius: 180 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.2;
        this.color = Math.random() > 0.4 ? '#38bdf8' : (Math.random() > 0.5 ? '#6366f1' : '#a855f7');
        this.alpha = Math.random() * 0.5 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / maxDistance) * 0.2;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* --------------------------------------------------------------------------
     2. SKILLS MATRIX & CONSTELLATION VISUALIZER
     -------------------------------------------------------------------------- */
  const skillsData = [
    { id: 'python', name: 'Python', category: 'DEVELOPMENT', color: '#38bdf8', connections: ['ml', 'dl', 'tf', 'keras', 'flask', 'time-series', 'data-viz'], desc: 'Primary core programming language for AI modeling, ML pipelines, Data Science & web backends.' },
    { id: 'ml', name: 'Machine Learning', category: 'AI', color: '#a855f7', connections: ['python', 'dl', 'predictive', 'data-analysis', 'keras', 'r'], desc: 'Supervised/unsupervised learning, scikit-learn, classification, regression & clustering models.' },
    { id: 'dl', name: 'Deep Learning', category: 'AI', color: '#ec4899', connections: ['python', 'tf', 'keras', 'ml'], desc: 'Neural network architectures (CNNs, RNNs) for clinical pattern recognition and predictive healthcare models.' },
    { id: 'tf', name: 'TensorFlow', category: 'AI', color: '#f97316', connections: ['dl', 'keras', 'python', 'ml'], desc: 'End-to-end open-source machine learning framework for training deep neural network tensors.' },
    { id: 'keras', name: 'Keras', category: 'AI', color: '#ef4444', connections: ['tf', 'dl', 'python'], desc: 'High-level neural network API for rapid prototyping and deep learning model construction.' },
    { id: 'data-analysis', name: 'Data Analysis', category: 'DATA', color: '#38bdf8', connections: ['python', 'r', 'excel', 'powerbi', 'sql', 'tableau'], desc: 'Exploratory data analysis (EDA), data cleaning, statistical hypotheses, and actionable insight extraction.' },
    { id: 'predictive', name: 'Predictive Modeling', category: 'AI', color: '#8b5cf6', connections: ['ml', 'time-series', 'python', 'r'], desc: 'Building data-driven algorithms to forecast future trends and clinical probabilities.' },
    { id: 'time-series', name: 'Time Series', category: 'DATA', color: '#06b6d4', connections: ['python', 'r', 'predictive'], desc: 'Econometric forecasting, CPI inflation, GDP modeling, SARIMAX, Prophet and trend decomposition.' },
    { id: 'data-viz', name: 'Data Visualization', category: 'DATA', color: '#10b981', connections: ['powerbi', 'tableau', 'python', 'r', 'excel'], desc: 'Transforming complex quantitative data into intuitive interactive charts, graphs, and executive dashboards.' },
    { id: 'r', name: 'R', category: 'DEVELOPMENT', color: '#2563eb', connections: ['time-series', 'predictive', 'data-analysis', 'data-viz'], desc: 'Statistical programming language used for econometric modeling, time-series, and quantitative research.' },
    { id: 'html', name: 'HTML5', category: 'DEVELOPMENT', color: '#f97316', connections: ['css', 'js', 'flask'], desc: 'Semantic, accessible structural web markup for modern web apps and interactive dashboards.' },
    { id: 'css', name: 'CSS3', category: 'DEVELOPMENT', color: '#38bdf8', connections: ['html', 'js'], desc: 'Modern responsive styling, CSS Grid, Flexbox, custom design systems, and glassmorphic aesthetics.' },
    { id: 'js', name: 'JavaScript', category: 'DEVELOPMENT', color: '#eab308', connections: ['html', 'css', 'rest-api'], desc: 'Vanilla JS DOM scripting, HTML5 Canvas 2D visualization engines, and client-side interactions.' },
    { id: 'flask', name: 'Flask', category: 'DEVELOPMENT', color: '#64748b', connections: ['python', 'rest-api', 'ml', 'dl'], desc: 'Lightweight Python web framework for exposing Machine Learning models via REST APIs and web interfaces.' },
    { id: 'sql', name: 'SQL', category: 'BI', color: '#6366f1', connections: ['ssms', 'ssis', 'etl', 'dw', 'bigquery', 'powerbi'], desc: 'Complex relational database queries, joins, aggregations, views, and stored procedure optimization.' },
    { id: 'powerbi', name: 'Power BI', category: 'BI', color: '#f59e0b', connections: ['sql', 'excel', 'tableau', 'data-viz', 'dw'], desc: '365 Data Science Certified. Designing interactive executive business intelligence dashboards & DAX analytics.' },
    { id: 'excel', name: 'Excel', category: 'BI', color: '#16a34a', connections: ['powerbi', 'sql', 'data-analysis'], desc: 'Advanced business data preparation, pivot tables, financial formulas, and spreadsheet modeling.' },
    { id: 'tableau', name: 'Tableau', category: 'BI', color: '#ea580c', connections: ['powerbi', 'data-viz', 'data-analysis'], desc: 'Visual analytics platform for creating interactive storyboards and high-impact business visual dashboards.' },
    { id: 'ssms', name: 'SSMS (SQL Server)', category: 'DATABASES', color: '#dc2626', connections: ['sql', 'ssis', 'etl', 'dw'], desc: 'Microsoft SQL Server Management Studio for enterprise database management, indexing & administration.' },
    { id: 'ssis', name: 'SSIS (Integration Services)', category: 'DATABASES', color: '#4f46e5', connections: ['ssms', 'etl', 'dw', 'sql'], desc: 'Building automated enterprise ETL pipelines, data extraction, transformations & warehouse staging.' },
    { id: 'etl', name: 'ETL Pipelines', category: 'DATA', color: '#0284c7', connections: ['ssis', 'ssms', 'dw', 'sql', 'bigquery'], desc: 'Designing Extract, Transform, Load data pipelines for reliable data integration and warehouse synchronization.' },
    { id: 'dw', name: 'Data Warehousing', category: 'DATABASES', color: '#7c3aed', connections: ['etl', 'ssis', 'ssms', 'sql', 'bigquery'], desc: 'Dimensional Star Schema architecture, fact/dimension table design, and historical data repository management.' },
    { id: 'bigquery', name: 'BigQuery', category: 'DATABASES', color: '#0284c7', connections: ['sql', 'dw', 'etl'], desc: 'Google Cloud serverless data warehouse for high-speed SQL analytics on massive enterprise datasets.' },
    { id: 'rest-api', name: 'REST APIs', category: 'TOOLS', color: '#14b8a6', connections: ['flask', 'js', 'python'], desc: 'Designing and consuming HTTP REST endpoints for seamless communication between web frontends and AI backends.' },
    { id: 'agile', name: 'Agile', category: 'TOOLS', color: '#06b6d4', connections: ['scrum'], desc: 'Iterative project management methodology focusing on collaborative, adaptive, and high-value software delivery.' },
    { id: 'scrum', name: 'Scrum', category: 'TOOLS', color: '#3b82f6', connections: ['agile'], desc: 'Agile framework execution: managing user stories, sprint planning, daily standups, and incremental iterations.' }
  ];

  function initSkillsMatrix() {
    const container = document.getElementById('constellation-wrapper');
    const canvas = document.getElementById('constellation-canvas');
    const gridContainer = document.getElementById('skills-grid');
    const filterBtns = document.querySelectorAll('.skills-filter-btn');
    const viewToggleBtns = document.querySelectorAll('.constellation-control-btn');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let activeFilter = 'all';
    let activeView = 'constellation';
    let hoveredNode = null;

    const categoryColors = {
      'AI': '#ec4899', 'DATA': '#06b6d4', 'DEVELOPMENT': '#38bdf8', 'BI': '#f59e0b', 'DATABASES': '#8b5cf6', 'TOOLS': '#14b8a6'
    };

    class ConstellationNode {
      constructor(data, index, total) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.color = data.color || categoryColors[data.category] || '#38bdf8';
        this.connections = data.connections || [];
        this.desc = data.desc;

        const angle = (index / total) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        const radiusOffset = 120 + Math.random() * 140;

        this.targetX = width / 2 + Math.cos(angle) * radiusOffset;
        this.targetY = height / 2 + Math.sin(angle) * radiusOffset;

        this.x = this.targetX;
        this.y = this.targetY;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 16;
        this.baseRadius = 16;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const padding = 50;
        if (this.x < padding || this.x > width - padding) this.vx *= -1;
        if (this.y < padding || this.y > height - padding) this.vy *= -1;

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.x += dx * 0.005;
        this.y += dy * 0.005;

        const isHovered = hoveredNode && hoveredNode.id === this.id;
        const isConnected = hoveredNode && hoveredNode.connections.includes(this.id);

        let targetR = this.baseRadius;
        if (isHovered) targetR = 24;
        else if (isConnected) targetR = 20;

        this.radius += (targetR - this.radius) * 0.15;
      }

      draw() {
        const isFiltered = activeFilter !== 'all' && this.category.toLowerCase() !== activeFilter.toLowerCase();
        const isHovered = hoveredNode && hoveredNode.id === this.id;
        const isConnected = hoveredNode && hoveredNode.connections.includes(this.id);
        const isDimmed = hoveredNode && !isHovered && !isConnected;

        ctx.save();
        ctx.globalAlpha = isFiltered ? 0.15 : (isDimmed ? 0.25 : 1.0);

        if (isHovered || isConnected) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = isHovered ? 0.35 : 0.18;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(11, 14, 22, 0.9)';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = isHovered ? 3.5 : (isConnected ? 2.5 : 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.font = `${isHovered ? '700' : '600'} ${isHovered ? '13px' : '11px'} "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isHovered ? '#ffffff' : (isDimmed ? '#64748b' : '#f8fafc');
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText(this.name, this.x, this.y + this.radius + 14);

        ctx.restore();
      }
    }

    let nodes = [];

    function resizeCanvas() {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      nodes = skillsData.map((data, idx) => new ConstellationNode(data, idx, skillsData.length));
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const tooltip = document.getElementById('constellation-tooltip');

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = null;
      for (let node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 10) {
          found = node;
          break;
        }
      }

      hoveredNode = found;

      if (found && tooltip) {
        tooltip.innerHTML = `
          <div style="font-family: var(--font-mono); font-weight: 700; color: ${found.color}; font-size: 0.9rem; margin-bottom: 0.25rem;">${found.name}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">[ Category: ${found.category} ]</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${found.desc}</div>
        `;
        tooltip.style.left = `${found.x}px`;
        tooltip.style.top = `${found.y}px`;
        tooltip.classList.add('active');
      } else if (tooltip) {
        tooltip.classList.remove('active');
      }
    });

    canvas.addEventListener('mouseleave', () => {
      hoveredNode = null;
      if (tooltip) tooltip.classList.remove('active');
    });

    let time = 0;
    function renderConstellation() {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      ctx.restore();

      const drawnPairs = new Set();

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const nodeB = nodes[j];

          const isConnected = nodeA.connections.includes(nodeB.id);
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (isConnected || dist < 120) {
            const pairKey = [nodeA.id, nodeB.id].sort().join('--');
            if (drawnPairs.has(pairKey)) continue;
            drawnPairs.add(pairKey);

            const isHoveredLine = hoveredNode && (
              (hoveredNode.id === nodeA.id && nodeA.connections.includes(nodeB.id)) ||
              (hoveredNode.id === nodeB.id && nodeB.connections.includes(nodeA.id))
            );

            const isFilteredLine = activeFilter !== 'all' &&
              (nodeA.category.toLowerCase() !== activeFilter.toLowerCase() && nodeB.category.toLowerCase() !== activeFilter.toLowerCase());

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            if (isHoveredLine) {
              ctx.strokeStyle = nodeA.color;
              ctx.lineWidth = 2.5;
              ctx.globalAlpha = 0.85;

              const pulsePos = (Math.sin(time * 3) + 1) / 2;
              const px = nodeA.x + (nodeB.x - nodeA.x) * pulsePos;
              const py = nodeA.y + (nodeB.y - nodeA.y) * pulsePos;

              ctx.stroke();

              ctx.beginPath();
              ctx.arc(px, py, 4, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = nodeA.color;
              ctx.shadowBlur = 10;
              ctx.fill();
            } else {
              ctx.strokeStyle = isConnected ? nodeA.color : 'rgba(56, 189, 248, 0.2)';
              ctx.lineWidth = isConnected ? 1.2 : 0.6;
              ctx.globalAlpha = isFilteredLine ? 0.05 : (isConnected ? 0.35 : 0.15);
              ctx.stroke();
            }

            ctx.restore();
          }
        }
      }

      for (let node of nodes) {
        node.update();
        node.draw();
      }

      requestAnimationFrame(renderConstellation);
    }

    renderConstellation();

    function renderGridSkills() {
      if (!gridContainer) return;

      const filtered = skillsData.filter(skill => {
        return activeFilter === 'all' || skill.category.toLowerCase() === activeFilter.toLowerCase();
      });

      gridContainer.innerHTML = filtered.map(skill => `
        <div class="skill-card card-fade-in">
          <div>
            <div class="skill-header">
              <h3 class="skill-name">${skill.name}</h3>
              <span class="skill-level-badge" style="background: ${categoryColors[skill.category]}18; color: ${categoryColors[skill.category]}; border-color: ${categoryColors[skill.category]}40;">
                ${skill.category}
              </span>
            </div>
            <div class="skill-category-tag">
              <i class="fa-solid fa-code" style="font-size: 0.75rem; margin-right: 4px; color: ${categoryColors[skill.category]};"></i> 
              ${skill.category} Stack
            </div>
          </div>
          <p class="skill-context">${skill.desc}</p>
        </div>
      `).join('');
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderGridSkills();
      });
    });

    viewToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeView = btn.dataset.mode;

        if (activeView === 'grid') {
          container.style.display = 'none';
          gridContainer.style.display = 'grid';
          renderGridSkills();
        } else {
          container.style.display = 'block';
          gridContainer.style.display = 'grid';
        }
      });
    });

    renderGridSkills();
  }

  /* --------------------------------------------------------------------------
     3. FEATURED PROJECTS & SIMULATORS
     -------------------------------------------------------------------------- */
  const projectsData = [
    {
      id: 'parkinsons-ai',
      number: '01',
      title: "Parkinson's AI — Deep Learning System for Disease Recognition",
      category: 'ai',
      categoryLabel: 'Deep Learning & Healthcare AI',
      shortDesc: "Developed deep learning system for Parkinson's disease recognition from hand-drawing patterns and clinical datasets.",
      technologies: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'Data Augmentation', 'Flask'],
      problem: "Early clinical detection of Parkinson's disease using non-invasive motor drawing patterns requires highly accurate deep learning architectures resistant to noise.",
      solution: "Trained Convolutional Neural Network (CNN) models and deep feature extractors on clinical hand-drawing datasets. Applied data augmentation and built an interactive Flask dashboard.",
      results: "Achieved 94.8% classification accuracy; latency < 120ms; delivered interactive web-based prediction tool.",
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
      problem: "Enterprise transactional databases experienced query bottlenecks and schema inconsistencies, impeding executive reporting.",
      solution: "Architected a Star Schema dimensional model (FactSales, DimStore, DimCustomer, DimProduct) in SSMS. Built SSIS ETL packages for automated extraction, cleansing, transformation, and warehouse staging.",
      results: "Ingested 500,000+ retail records with zero loss; reduced query latency by 75%; automated daily ETL sync.",
      githubUrl: 'https://github.com/touatiazza',
      simType: 'etl',
      visualType: 'pipeline-flow'
    },
    {
      id: 'macrocast',
      number: '03',
      title: 'MacroCast — Inflation & GDP Time-Series Forecasting',
      category: 'analytics',
      categoryLabel: 'Econometrics & Data Science',
      shortDesc: "Macroeconomic inflation and GDP growth modeling and forecasting using econometric time-series analysis.",
      technologies: ['Python', 'R', 'Time Series Analysis', 'Econometrics', 'Data Visualization'],
      problem: "Macroeconomic fluctuations in inflation rates and GDP trends complicate strategic corporate planning.",
      solution: "Conducted Augmented Dickey-Fuller stationarity tests, seasonal trend decomposition, and constructed SARIMAX & Prophet econometric forecasting models.",
      results: "Achieved MAPE < 3.8%; generated 12-month forward forecasts with 95% confidence intervals.",
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

  function initProjectsSection() {
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
            <div class="project-footer">
              <span class="project-expand-hint">
                <i class="fa-solid fa-expand" style="font-size: 0.85rem;"></i> View Interactive Project
              </span>
              <div class="project-actions" onclick="event.stopPropagation();">
                <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                  <i class="fa-brands fa-github"></i> Code
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      attachCardInteractions();
      initVisualCanvasEngines();
    }

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

        card.addEventListener('click', () => {
          const id = card.dataset.id;
          openProjectModal(id);
        });
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.filter;
        renderProjects();
      });
    });

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

  function initVisualCanvasEngines() {
    const parkCanvas = document.getElementById('canvas-parkinsons-ai');
    if (parkCanvas) {
      const ctx = parkCanvas.getContext('2d');
      parkCanvas.width = parkCanvas.clientWidth || 500;
      parkCanvas.height = parkCanvas.clientHeight || 270;

      const layers = [3, 5, 5, 2];
      const nodes = [];
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

        for (let a of nodes) {
          for (let b of nodes) {
            if (b.layer === a.layer + 1) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
              ctx.lineWidth = 1;
              ctx.stroke();

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

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }

        ctx.beginPath();
        for (let x = 0; x < w; x += 5) {
          const y = h / 2 + Math.sin(x * 0.02 + offset) * 35 + Math.cos(x * 0.01 + offset) * 15;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        requestAnimationFrame(animMacro);
      }
      animMacro();
    }

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
              out.innerHTML = `[CLASSIFICATION RESULT]\nStatus: HEALTHY CONTROL (Negative)\nModel Confidence: 97.4%\nTremor Amplitude: Normal (< 0.04 Hz)\nDecision Support: Low risk. Recommendation: Standard routine follow-up.`;
            } else if (type === 'spiral-parkinsons') {
              out.innerHTML = `[CLASSIFICATION RESULT]\nStatus: PARKINSON'S PATTERN DETECTED (Positive)\nModel Confidence: 95.8%\nTremor Peak: 5.2 Hz Micro-fluctuation Index: 0.78\nDecision Support: Diagnostic indicators detected. Recommendation: Specialist clinical evaluation.`;
            } else {
              out.innerHTML = `[CLASSIFICATION RESULT]\nStatus: PARKINSON'S PATTERN DETECTED (Positive)\nModel Confidence: 92.1%\nMotor Asymmetry Variance: 0.69\nDecision Support: Wave tremor asymmetry present. Recommendation: Specialist clinical evaluation.`;
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
          out.innerHTML = `[SARIMAX & PROPHET FORECAST — ${val} MONTH HORIZON]\nProjected GDP Growth: +2.4% (95% CI: [1.8%, 3.1%])\nProjected CPI Inflation: 3.1% (95% CI: [2.6%, 3.7%])\nSeasonal Econometric Trend: Demand cycle uptick predicted.\nEvaluation Metrics: MAPE = 3.65%, RMSE = 0.42.`;
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
              out.innerHTML = `[NLP SCRAPER RESULT — DATA SCIENTIST]\nAnalyzed Postings: 3,420 postings\nTop Demanded Skills: Python (89%), SQL (82%), Machine Learning (78%), PyTorch/TensorFlow (64%)\nAI Automation Exposure Score: LOW (22%) — High demand for strategic problem formulation & custom modeling.`;
            } else if (role === 'bi-analyst') {
              out.innerHTML = `[NLP SCRAPER RESULT — BI ANALYST]\nAnalyzed Postings: 2,890 postings\nTop Demanded Skills: SQL (94%), Power BI / Tableau (88%), Data Warehousing (72%), Excel (69%)\nAI Automation Exposure Score: MODERATE (34%) — Reporting automated; focus on strategic business storytelling.`;
            } else {
              out.innerHTML = `[NLP SCRAPER RESULT — ML ENGINEER]\nAnalyzed Postings: 2,150 postings\nTop Demanded Skills: Python (96%), MLOps (81%), REST APIs/Flask (71%), Deep Learning (69%)\nAI Automation Exposure Score: VERY LOW (14%) — Critical demand for deploying and maintaining AI infrastructure.`;
            }
          }, 300);
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. TIMELINE & METRICS COUNTER
     -------------------------------------------------------------------------- */
  function initTimelineEngine() {
    const timelineContainers = document.querySelectorAll('.timeline-container');

    function updateTimelines() {
      timelineContainers.forEach(container => {
        const items = container.querySelectorAll('.timeline-item');
        const containerRect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        items.forEach(item => {
          const itemRect = item.getBoundingClientRect();
          const dot = item.querySelector('.timeline-dot');

          if (itemRect.top < windowHeight * 0.85) {
            item.classList.add('active');
            if (dot) dot.style.boxShadow = '0 0 20px var(--accent-cyan)';
          }
        });
      });
    }

    window.addEventListener('scroll', updateTimelines);
    updateTimelines();

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
          const duration = 1200;
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

  /* --------------------------------------------------------------------------
     5. INTERACTIONS, DUAL CURSOR & NAVIGATION
     -------------------------------------------------------------------------- */
  function initInteractions() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
      });
    }

    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorRing = document.getElementById('custom-cursor-ring');

    if (cursorDot && cursorRing && window.innerWidth > 768) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      });

      function renderCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(renderCursor);
      }
      renderCursor();

      const hoverables = document.querySelectorAll('a, button, .project-card, .pillar-card, .stat-card-cyber, .contact-card-sleek');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
      });
    }

    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-card-sleek');
    if (window.innerWidth > 768) {
      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0px, 0px)';
        });
      });
    }

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, observerOptions);
    document.querySelectorAll('.reveal-init').forEach(el => observer.observe(el));

    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'touatiazza4@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email address copied to clipboard: touatiazza4@gmail.com');
        }).catch(() => {
          showToast('Contact Azza at: touatiazza4@gmail.com');
        });
      });
    }
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #38bdf8;"></i> <span>${message}</span>`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3500);
  }

  /* --------------------------------------------------------------------------
     INITIALIZATION TRIGGER
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initSkillsMatrix();
    initProjectsSection();
    initTimelineEngine();
    initInteractions();
  });
})();
