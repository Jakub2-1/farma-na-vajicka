// Plynulé scrollování a fixní navigace
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

    // Změna stylu navigace při scrollu
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

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
            
            // Získání dat z formuláře
            const formData = new FormData(this);
            const orderData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                quantity: formData.get('quantity'),
                pickup: formData.get('pickup'),
                note: formData.get('note')
            };

            // Kontrola vyplnění povinných polí
            if (!orderData.name || !orderData.email || !orderData.phone || !orderData.quantity || !orderData.pickup) {
                showMessage('Prosím vyplňte všechna povinná pole.', 'error');
                return;
            }

            // Simulace odeslání objednávky
            showMessage('Děkujeme za objednávku! Brzy vás budeme kontaktovat.', 'success');
            
            // Vyčištění formuláře
            this.reset();
            
            // Zde by bylo skutečné odeslání dat na server
            console.log('Objednávka odeslána:', orderData);
        });
    }

    // Funkce pro zobrazení zpráv
    function showMessage(message, type) {
        // Odstranění existující zprávy
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Vytvoření nové zprávy
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <p>${message}</p>
            <button class="close-message" onclick="this.parentElement.remove()">×</button>
        `;

        // Přidání stylů pro zprávy
        if (!document.querySelector('#message-styles')) {
            const styles = document.createElement('style');
            styles.id = 'message-styles';
            styles.textContent = `
                .form-message {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                    max-width: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    animation: slideIn 0.3s ease;
                }
                
                .form-message.success {
                    background: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                }
                
                .form-message.error {
                    background: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                }
                
                .form-message p {
                    margin: 0;
                    flex: 1;
                }
                
                .close-message {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: 1rem;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }
                
                .close-message:hover {
                    opacity: 1;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 768px) {
                    .form-message {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Přidání zprávy do DOM
        document.body.appendChild(messageDiv);

        // Automatické odstranění po 5 sekundách
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Animace při scrollování
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Přidání animací k sekcím
    const animatedElements = document.querySelectorAll('.benefit-item, .breed-item, .price-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Plynulé scrollování pro iOS Safari
    if (CSS.supports('scroll-behavior', 'smooth')) {
        // Prohlížeč podporuje scroll-behavior: smooth
    } else {
        // Fallback pro starší prohlížeče
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.offsetTop - 80; // 80px pro výšku navigace
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Lazy loading pro iframe mapy
    const mapIframe = document.querySelector('iframe');
    if (mapIframe) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Mapa se zobrazí, když se dostane do viewport
                    entry.target.style.opacity = '1';
                    mapObserver.unobserve(entry.target);
                }
            });
        });

        mapIframe.style.opacity = '0.5';
        mapIframe.style.transition = 'opacity 0.5s ease';
        mapObserver.observe(mapIframe);
    }

    // Validace formuláře v reálném čase
    const formInputs = document.querySelectorAll('#orderForm input, #orderForm select, #orderForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Odstranění chybového stylu při psaní
            this.classList.remove('error');
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Kontrola povinných polí
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        // Kontrola e-mailu
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Kontrola telefonu
        if (field.type === 'tel' && value) {
            const phoneRegex = /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
            }
        }

        // Přidání/odstranění třídy error
        if (!isValid) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }

        return isValid;
    }

    // Přidání stylů pro chybové stavy
    if (!document.querySelector('#validation-styles')) {
        const validationStyles = document.createElement('style');
        validationStyles.id = 'validation-styles';
        validationStyles.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #dc3545;
                box-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
            }
        `;
        document.head.appendChild(validationStyles);
    }
});

// Funkce pro kopírování kontaktních údajů
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showMessage('Zkopírováno do schránky!', 'success');
    }, function() {
        // Fallback pro starší prohlížeče
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMessage('Zkopírováno do schránky!', 'success');
    });
}

// Přidání funkcionality pro kopírování při kliknutí na kontaktní údaje
document.addEventListener('DOMContentLoaded', function() {
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.textContent;
            copyToClipboard(phoneNumber);
        });
    }

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            copyToClipboard(email);
        });
    }
});
