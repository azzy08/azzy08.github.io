/* ==========================================================================
   AZZA TOUATI PORTFOLIO - INTERACTIVE TECHNOLOGY CONSTELLATION MODULE
   ========================================================================== */

export const skillsData = [
  // AI
  { id: 'python', name: 'Python', category: 'DEVELOPMENT', color: '#38bdf8', connections: ['ml', 'dl', 'tf', 'keras', 'flask', 'time-series', 'data-viz', 'scraping'], desc: 'Primary core programming language for AI modeling, ML pipelines, Data Science & web backends.' },
  { id: 'ml', name: 'Machine Learning', category: 'AI', color: '#a855f7', connections: ['python', 'dl', 'predictive', 'data-analysis', 'keras', 'r'], desc: 'Supervised/unsupervised learning, scikit-learn, classification, regression & clustering models.' },
  { id: 'dl', name: 'Deep Learning', category: 'AI', color: '#ec4899', connections: ['python', 'tf', 'keras', 'ml', 'parkinsons-ai'], desc: 'Neural network architectures (CNNs, RNNs) for clinical pattern recognition and predictive healthcare models.' },
  { id: 'tf', name: 'TensorFlow', category: 'AI', color: '#f97316', connections: ['dl', 'keras', 'python', 'ml'], desc: 'End-to-end open-source machine learning framework for training deep neural network tensors.' },
  { id: 'keras', name: 'Keras', category: 'AI', color: '#ef4444', connections: ['tf', 'dl', 'python'], desc: 'High-level neural network API for rapid prototyping and deep learning model construction.' },
  { id: 'data-analysis', name: 'Data Analysis', category: 'DATA', color: '#38bdf8', connections: ['python', 'r', 'excel', 'powerbi', 'sql', 'tableau'], desc: 'Exploratory data analysis (EDA), data cleaning, statistical hypotheses, and actionable insight extraction.' },
  { id: 'predictive', name: 'Predictive Modeling', category: 'AI', color: '#8b5cf6', connections: ['ml', 'time-series', 'python', 'r'], desc: 'Building data-driven algorithms to forecast future trends and clinical probabilities.' },
  { id: 'time-series', name: 'Time Series', category: 'DATA', color: '#06b6d4', connections: ['python', 'r', 'predictive', 'macrocast'], desc: 'Econometric forecasting, CPI inflation, GDP modeling, SARIMAX, Prophet and trend decomposition.' },
  { id: 'data-viz', name: 'Data Visualization', category: 'DATA', color: '#10b981', connections: ['powerbi', 'tableau', 'python', 'r', 'excel'], desc: 'Transforming complex quantitative data into intuitive interactive charts, graphs, and executive dashboards.' },

  // DEVELOPMENT
  { id: 'r', name: 'R', category: 'DEVELOPMENT', color: '#2563eb', connections: ['time-series', 'predictive', 'data-analysis', 'data-viz'], desc: 'Statistical programming language used for econometric modeling, time-series, and quantitative research.' },
  { id: 'html', name: 'HTML5', category: 'DEVELOPMENT', color: '#f97316', connections: ['css', 'js', 'flask'], desc: 'Semantic, accessible structural web markup for modern web apps and interactive dashboards.' },
  { id: 'css', name: 'CSS3', category: 'DEVELOPMENT', color: '#38bdf8', connections: ['html', 'js'], desc: 'Modern responsive styling, CSS Grid, Flexbox, custom design systems, and glassmorphic aesthetics.' },
  { id: 'js', name: 'JavaScript', category: 'DEVELOPMENT', color: '#eab308', connections: ['html', 'css', 'rest-api'], desc: 'Vanilla JS DOM scripting, HTML5 Canvas 2D visualization engines, and client-side interactions.' },
  { id: 'flask', name: 'Flask', category: 'DEVELOPMENT', color: '#64748b', connections: ['python', 'rest-api', 'ml', 'dl'], desc: 'Lightweight Python web framework for exposing Machine Learning models via REST APIs and web interfaces.' },

  // DATA & BI
  { id: 'sql', name: 'SQL', category: 'BI', color: '#6366f1', connections: ['ssms', 'ssis', 'etl', 'dw', 'bigquery', 'powerbi'], desc: 'Complex relational database queries, joins, aggregations, views, and stored procedure optimization.' },
  { id: 'powerbi', name: 'Power BI', category: 'BI', color: '#f59e0b', connections: ['sql', 'excel', 'tableau', 'data-viz', 'dw'], desc: '365 Data Science Certified. Designing interactive executive business intelligence dashboards & DAX analytics.' },
  { id: 'excel', name: 'Excel', category: 'BI', color: '#16a34a', connections: ['powerbi', 'sql', 'data-analysis'], desc: 'Advanced business data preparation, pivot tables, financial formulas, and spreadsheet modeling.' },
  { id: 'tableau', name: 'Tableau', category: 'BI', color: '#ea580c', connections: ['powerbi', 'data-viz', 'data-analysis'], desc: 'Visual analytics platform for creating interactive storyboards and high-impact business visual dashboards.' },

  // DATABASES & DATA ENGINEERING
  { id: 'ssms', name: 'SSMS (SQL Server)', category: 'DATABASES', color: '#dc2626', connections: ['sql', 'ssis', 'etl', 'dw'], desc: 'Microsoft SQL Server Management Studio for enterprise database management, indexing & administration.' },
  { id: 'ssis', name: 'SSIS (Integration Services)', category: 'DATABASES', color: '#4f46e5', connections: ['ssms', 'etl', 'dw', 'sql'], desc: 'Building automated enterprise ETL pipelines, data extraction, transformations & warehouse staging.' },
  { id: 'etl', name: 'ETL Pipelines', category: 'DATA', color: '#0284c7', connections: ['ssis', 'ssms', 'dw', 'sql', 'bigquery'], desc: 'Designing Extract, Transform, Load data pipelines for reliable data integration and warehouse synchronization.' },
  { id: 'dw', name: 'Data Warehousing', category: 'DATABASES', color: '#7c3aed', connections: ['etl', 'ssis', 'ssms', 'sql', 'bigquery'], desc: 'Dimensional Star Schema architecture, fact/dimension table design, and historical data repository management.' },
  { id: 'bigquery', name: 'BigQuery', category: 'DATABASES', color: '#0284c7', connections: ['sql', 'dw', 'etl'], desc: 'Google Cloud serverless data warehouse for high-speed SQL analytics on massive enterprise datasets.' },

  // TOOLS & METHODOLOGIES
  { id: 'rest-api', name: 'REST APIs', category: 'TOOLS', color: '#14b8a6', connections: ['flask', 'js', 'python'], desc: 'Designing and consuming HTTP REST endpoints for seamless communication between web frontends and AI backends.' },
  { id: 'agile', name: 'Agile', category: 'TOOLS', color: '#06b6d4', connections: ['scrum'], desc: 'Iterative project management methodology focusing on collaborative, adaptive, and high-value software delivery.' },
  { id: 'scrum', name: 'Scrum', category: 'TOOLS', color: '#3b82f6', connections: ['agile'], desc: 'Agile framework execution: managing user stories, sprint planning, daily standups, and incremental iterations.' }
];

export function initSkillsMatrix() {
  const gridContainer = document.getElementById('skills-grid');
  const filterBtns = document.querySelectorAll('.skills-filter-btn');

  let activeFilter = 'all';

  const categoryColors = {
    'AI': '#ec4899',
    'DATA': '#06b6d4',
    'DEVELOPMENT': '#38bdf8',
    'BI': '#f59e0b',
    'DATABASES': '#8b5cf6',
    'TOOLS': '#14b8a6'
  };

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

  renderGridSkills();
}
