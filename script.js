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
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, ' : 'rgba(255, 0, 255, ';
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse repulsion
        if (mouse.x != null && mouse.y != null) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
            }
        }
        
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
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 200);
    for(let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw connections
    for(let i = 0; i < particles.length; i++) {
        // Draw connection to mouse
        if (mouse.x != null && mouse.y != null) {
            let dxMouse = particles[i].x - mouse.x;
            let dyMouse = particles[i].y - mouse.y;
            let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            if (distMouse < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 0, 255, ${0.3 * (1 - distMouse/mouse.radius)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
        
        for(let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if(dist < 180) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.12 - dist/1500})`;
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

// Add Mouse interaction for particles
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// Parallax Scroll Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        layer.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
    });
});



// Scroll to Top Button Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});
scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


