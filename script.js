// Menu Mobile
function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav').classList.remove('active');
    });
});

// Animação dos Números (Stats)
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString('pt-BR');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target.toLocaleString('pt-BR');
            }
        };
        
        updateNumber();
    });
}

// Observer para animação ao scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger number animation when stats section is visible
            if (entry.target.classList.contains('stats-grid')) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .stat-card, .corporate-card, .contact-card, .stats-grid').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de digitação no Hero (opcional)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Norte Saneamento - Site carregado com sucesso');
});
