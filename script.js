/* ===== NORTE SANEAMENTO - SCRIPT ===== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // ===== NAVEGAÇÃO ATIVA =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const activateNav = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateNav);

    // ===== ANIMAÇÃO DE NÚMEROS (CONTADOR) =====
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number, .indicador-number');

        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();
            const isYear = target === 2021;

            const updateNumber = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                if (isYear) {
                    num.textContent = current;
                } else if (target >= 1000000) {
                    num.textContent = (current / 1000000).toFixed(1).replace('.', ',') + 'M';
                } else if (target >= 1000) {
                    num.textContent = current.toLocaleString('pt-BR');
                } else {
                    num.textContent = current;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    if (isYear) {
                        num.textContent = target;
                    } else if (target >= 1000000) {
                        num.textContent = '1M+';
                    } else if (target >= 1000) {
                        num.textContent = target.toLocaleString('pt-BR');
                    } else {
                        num.textContent = target;
                    }
                }
            };

            requestAnimationFrame(updateNumber);
        });
    };

    // ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards para animação
    document.querySelectorAll('.sobre-card, .estado-card, .indicador-card, .esg-card, .info-card, .dado-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer para números
    const numbersSection = document.querySelector('#indicadores');
    if (numbersSection) {
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        numberObserver.observe(numbersSection);
    }

    // Números do hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroNumberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    heroNumberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroNumberObserver.observe(heroSection);
    }

    // ===== ANIMAÇÃO DOS CARDS =====
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== FORMULÁRIO DE CONTATO =====
    const form = document.getElementById('form-contato');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validação básica
            if (!nome || !email || !assunto || !mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Simulação de envio
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ===== NOTIFICAÇÃO TOAST =====
    function showNotification(message, type = 'success') {
        // Remover notificação existente
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Estilos da notificação
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            background: type === 'success' ? '#00c896' : '#ff4757',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: '500',
            boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
            zIndex: '9999',
            transform: 'translateY(20px)',
            opacity: '0',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '380px',
            fontFamily: "'Poppins', sans-serif"
        });

        document.body.appendChild(toast);

        // Animação de entrada
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Remover após 4 segundos
        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== EFEITO PARALLAX NO HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
            }
        });
    }

    // ===== ANO ATUAL NO FOOTER =====
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    // ===== HOVER NOS ESTADOS (efeito de seleção) =====
    document.querySelectorAll('.estado-card').forEach(card => {
        card.addEventListener('click', () => {
            const estado = card.getAttribute('data-estado');
            showNotification(`📍 ${estado} - Uma das 59 cidades atendidas pela Norte Saneamento!`, 'success');
        });
    });

    console.log('%c💧 Norte Saneamento S.A. ', 'background: linear-gradient(135deg, #003d82, #00c896); color: #fff; font-size: 1.2rem; padding: 8px 16px; border-radius: 8px; font-weight: bold;');
    console.log('%cEntregando soluções de água e esgoto, promovendo desenvolvimento e saúde nos quatro cantos do Brasil.', 'color: #0066cc; font-size: 0.9rem;');
});
