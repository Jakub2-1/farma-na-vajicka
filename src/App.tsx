import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Zde by byla integrace s e-mailingovou službou
      setShowSuccessMessage(true);
      setEmail('');
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="aurora-app">
      {/* Úvodní sekce */}
      <section id="intro" className="intro-section">
        <div 
          className="parallax-bg"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div className="intro-content">
          <img src="/aurora-logo.svg" alt="Aurora Logo" className="logo" />
          <h1 className="main-title glow-text">Aurora</h1>
          <p className="subtitle fade-in-up">Již brzy… chuť nového rána</p>
          <button 
            className="cta-button"
            onClick={() => scrollToSection('email-signup')}
          >
            Chci vědět, až začnete
          </button>
        </div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </section>

      {/* Sekce Co chystáme */}
      <section id="what-we-prepare" className="section">
        <div className="container">
          <div className="content-wrapper">
            <h2 className="section-title">Co chystáme</h2>
            <p className="mysterious-text hover-glow">
              Nebudou to obyčejná vajca. Připravujeme něco, co Ostrava ještě nezažila. 
              Zůstaňte s námi.
            </p>
          </div>
        </div>
      </section>

      {/* Sekce Přidej se mezi první */}
      <section id="email-signup" className="section email-section">
        <div className="container">
          <div className="content-wrapper">
            <h2 className="section-title">Přidej se mezi první</h2>
            <p className="section-description">
              Buď u toho od prvního dne. Zadej svůj e-mail a dejme ti vědět, 
              až to celé odpálíme.
            </p>
            
            {showSuccessMessage && (
              <div className="success-message">
                <p>Děkujeme! Budeme vás kontaktovat, až bude Aurora připravena.</p>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Zadej svůj e-mail"
                  className="email-input"
                  required
                />
                <button type="submit" className="submit-button">
                  Přidat mě
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Sekce Sleduj nás */}
      <section id="follow-us" className="section social-section">
        <div className="container">
          <div className="content-wrapper">
            <h2 className="section-title">Sleduj nás</h2>
            <p className="section-description">
              Na sítích odhalujeme první střípky příběhu.
            </p>
            <div className="social-links">
              <a 
                href="#" 
                className="social-link instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a 
                href="#" 
                className="social-link facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Patička */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Aurora. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;