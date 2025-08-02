// Moderní JavaScript pro luxusní web farmy
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Zavření menu při kliknutí na odkaz
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Plynulé scrollování na sekce (s Safari fallback)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 80px pro fixní navigaci
                
                // Kontrola podpory smooth scrolling
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback pro Safari - animované scrollování
                    smoothScrollTo(offsetTop, 600);
                }
            }
        });
    });

    // Funkce pro smooth scrolling fallback
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Tlačítko "Předobjednat" v hero sekci
    const heroButton = document.querySelector('.hero .btn-primary');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            const ordersSection = document.querySelector('#orders');
            if (ordersSection) {
                const offsetTop = ordersSection.offsetTop - 80;
                
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(offsetTop, 600);
                }
            }
        });
    }

    // Změna stylu navigace při scrollu
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    });

    // Intersection Observer pro fade-in animace (s Safari fallback)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Přidání fade-in třídy k elementům a pozorování
        const fadeElements = document.querySelectorAll('section, .benefit-item, .breed-item, .price-item, .contact-item');
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } else {
        // Fallback pro starší Safari
        const fadeElements = document.querySelectorAll('section, .benefit-item, .breed-item, .price-item, .contact-item');
        fadeElements.forEach(el => {
            el.classList.add('fade-in', 'visible');
        });
    }

    // Zvýraznění aktivní sekce v navigaci
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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

    // Formulář objednávky
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Základní validace
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const quantity = document.getElementById('quantity').value;
            const pickup = document.getElementById('pickup').value;

            // Validace povinných polí
            if (!name || !email || !phone || !quantity || !pickup) {
                alert('Prosím vyplňte všechna povinná pole.');
                return;
            }

            // Validace emailu
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Prosím zadejte platnou e-mailovou adresu.');
                return;
            }

            // Validace telefonu (základní)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Prosím zadejte platné telefonní číslo.');
                return;
            }

            // Zobrazení zprávy o úspěchu
            showSuccessMessage();
            
            // Reset formuláře
            orderForm.reset();
        });
    }

    // Funkce pro zobrazení zprávy o úspěchu
    function showSuccessMessage() {
        // Odstraň existující zprávu pokud existuje
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Vytvoř novou zprávu
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <strong>Děkujeme za objednávku!</strong><br>
            Brzy vás budeme kontaktovat ohledně převzetí vajec.
        `;

        // Vlož zprávu před formulář
        const formContainer = document.querySelector('.order-form-container');
        formContainer.insertBefore(successMessage, formContainer.firstChild);

        // Zobraz zprávu s animací
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);

        // Skryj zprávu po 5 sekundách
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 500);
        }, 5000);
    }

    // Animace tlačítek při načtení stránky
    setTimeout(() => {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        });
    }, 500);

    // Parallax efekt pro hero sekci (jemný)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Hover efekty pro karty
    const cards = document.querySelectorAll('.benefit-item, .breed-item, .price-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Počítadlo pro animaci čísel (pokud by bylo potřeba)
    function animateNumbers() {
        const numbers = document.querySelectorAll('.price-amount');
        numbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/\D/g, ''));
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current) + ' Kč';
            }, 50);
        });
    }

    // Kontrola viditelnosti pro spuštění animací
    const checkVisibility = () => {
        const priceSection = document.querySelector('.price-section');
        if (priceSection) {
            const rect = priceSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // animateNumbers(); // Odkomentuj pokud chceš animované číslice
            }
        }
    };

    window.addEventListener('scroll', checkVisibility);
    
    // Inicializace při načtení
    checkVisibility();
});


