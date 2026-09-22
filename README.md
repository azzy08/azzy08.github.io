# Azza Touati — Data Science & AI Portfolio Website

An ultra-modern, sleek, highly interactive personal portfolio website for **Azza Touati** — Computer Science graduate and Master's student in Data Science for Business and Economics.

![Portfolio Preview](assets/images/project_parkinsons.png)

## 🌟 Key Features

- **Dynamic Interactive Canvas**: Custom HTML5 particle network hero background with ambient cursor gravity physics.
- **Centerpiece Projects & Modal Inspector**: Interactive filtering by domain (AI/ML, Data Science, Data Engineering, Business Analytics) with rich detail modals containing live model & pipeline simulators.
- **Filterable Skills Matrix**: Categorized grid (Programming, Data & Databases, Data Viz & BI, AI & ML, Backend, Tools) with real-world application context and instant search.
- **Interactive Timelines**: Vertical experience and education timelines with expandable detail cards.
- **Contact Form & Micro-Interactions**: Client-side form validation, copy-to-clipboard email action, scrollspy sticky navbar, and smooth reveal animations.
- **Zero-Dependency Architecture**: Built using pure semantic HTML5, modern CSS3, and vanilla ES6 JavaScript modules. Directly compatible with GitHub Pages out of the box!

---

## 📁 Project Architecture

```
azza-touati-portfolio/
├── index.html              # Main HTML entry point
├── README.md               # Overview & deployment guide
├── assets/
│   ├── css/
│   │   ├── main.css        # Base design tokens, reset & typography
│   │   ├── components.css  # Component layouts (Navbar, Hero, Modals, Cards)
│   │   └── animations.css  # Keyframes, micro-interactions & responsive rules
│   ├── js/
│   │   ├── main.js         # ES6 Module entry point
│   │   ├── canvas.js       # Interactive particle network background
│   │   ├── skills.js       # Skills dataset & search/filter engine
│   │   ├── projects.js     # Projects dataset, detail modal & interactive simulators
│   │   └── interactions.js # UI animations, scrollspy & contact validator
│   └── images/             # Generated custom visual assets for project cards
│       ├── project_parkinsons.png
│       ├── project_etl.png
│       ├── project_macrocast.png
│       └── project_jobmarket.png
```

---

## 🚀 How to Deploy on GitHub Pages

1. **Create a GitHub Repository**:
   Create a new public repository on GitHub (e.g., `azza-touati-portfolio` or `username.github.io`).

2. **Push the Code**:
   ```bash
   cd azza-touati-portfolio
   git init
   git add .
   git commit -m "Initial commit of Azza Touati portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/azza-touati-portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to **Repository Settings** -> **Pages**.
   - Under **Source**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
   - Your website will be live at `https://YOUR_USERNAME.github.io/azza-touati-portfolio/` in less than a minute!

---

## 💻 Local Development

No build process or NPM installation required! Simply open `index.html` in your web browser or run a local static server:

```bash
# Using Python
python -m http.server 8000

# Using Node npx
npx serve .
```
Then visit `http://localhost:8000`.
