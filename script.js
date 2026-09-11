// Particle Canvas Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let w, h;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
initCanvas();
window.addEventListener('resize', initCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, ' : 'rgba(255, 0, 255, ';
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if(this.x > w) this.x = 0;
        if(this.x < 0) this.x = w;
        if(this.y > h) this.y = 0;
        if(this.y < 0) this.y = h;
    }
    
    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100);
    for(let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw connections
    for(let i = 0; i < particles.length; i++) {
        for(let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if(dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 - dist/1000})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    observer.observe(section);
});

// Mobile Nav Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typing effect for console loading (optional addition if needed)
console.log("%cSYSTEM ONLINE: AZZA TOUATI PORTFOLIO INITIALIZED", "color: #00f3ff; font-size: 16px; font-weight: bold;");
