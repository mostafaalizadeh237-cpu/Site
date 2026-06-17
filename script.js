
# فایل 3: script.js - جاوااسکریپت Cyberpunk

js_code = '''// ===== MATRIX RAIN EFFECT =====
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/\\[]{}=+-_*&^%$#@!';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== CURSOR TRAIL EFFECT =====
function initCursorTrail() {
    const trails = [];
    const maxTrails = 20;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        trails.push(trail);
        
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 500);
        }, 100);
    });
}

// ===== GLITCH EFFECT ON HOVER =====
function initGlitchEffect() {
    const glitchOverlay = document.getElementById('glitchOverlay');
    if (!glitchOverlay) return;
    
    const glitchElements = document.querySelectorAll('.cyber-card, .cyber-btn, .cyber-link');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glitchOverlay.classList.add('active');
            setTimeout(() => glitchOverlay.classList.remove('active'), 200);
        });
    });
}

// ===== TYPING EFFECT =====
function initTyping() {
    const textElement = document.getElementById('typingText');
    if (!textElement) return;
    
    const texts = [
        'CYBER_SECURITY_ACTIVE',
        'SYSTEM_PROTECTED',
        'ENCRYPTION_ENABLED'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== NUMBER COUNTER =====
function initCounters() {
    const counters = document.querySelectorAll('.status-value[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toString().padStart(2, '0');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toString().padStart(2, '0');
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.cyber-card, .status-item, .terminal-window');
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
}

// ===== RANDOM GLITCH =====
function initRandomGlitch() {
    const glitchTexts = document.querySelectorAll('.glitch-text, .nav-glitch');
    
    setInterval(() => {
        const randomEl = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
        if (randomEl) {
            randomEl.style.animation = 'glitch-anim 0.3s ease-out';
            setTimeout(() => {
                randomEl.style.animation = '';
            }, 300);
        }
    }, 5000);
}

// ===== TERMINAL TYPING EFFECT =====
function initTerminalTyping() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const lines = terminalBody.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease';
            line.style.opacity = '1';
        }, index * 300);
    });
}

// ===== MOUSE PARALLAX =====
function initParallax() {
    const orbits = document.querySelectorAll('.orbit');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        orbits.forEach((orbit, index) => {
            const speed = (index + 1) * 0.5;
            orbit.style.transform = `translate(-50%, -50%) translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initCursorTrail();
    initGlitchEffect();
    initTyping();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initCounters();
    initScrollReveal();
    initRandomGlitch();
    initTerminalTyping();
    initParallax();
});
'''

with open('/mnt/agents/output/script.js', 'w', encoding='utf-8') as f:
    f.write(js_code)
