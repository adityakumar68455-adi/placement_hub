import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className={`pub-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" id="nav-logo" className="nav-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="logo-svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-7-7l7 3.5L19 14" />
              </svg>
            </div>
            <span className="logo-text">Placement<span className="logo-accent">Hub</span></span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how" className="nav-link">How it Works</a>
          </div>

          {/* Auth buttons */}
          <div className="nav-auth">
            <Link to="/login" id="nav-login-btn" className="nav-login">Sign In</Link>
            <Link to="/register" id="nav-register-btn" className="nav-register">Get Started</Link>
          </div>

          {/* Hamburger */}
          <button
            id="hamburger-btn"
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-open' : ''}`}>
          <a href="#features" className="mob-link">Features</a>
          <a href="#how" className="mob-link">How it Works</a>
          <Link to="/login" id="mob-login" className="mob-link">Sign In</Link>
          <Link to="/register" id="mob-register" className="mob-cta">Get Started Free</Link>
        </div>
      </nav>

      {/* ─── Page Content ─── */}
      <main>
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="pub-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="logo-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-7-7l7 3.5L19 14" />
                </svg>
              </div>
              <span className="logo-text">Placement<span className="logo-accent">Hub</span></span>
            </Link>
            <p className="footer-tagline">Bridging talent with opportunity, one placement at a time.</p>
          </div>
          <div className="footer-links-group">
            <span className="footer-links-title">Platform</span>
            <Link to="/register" className="footer-link">For Students</Link>
            <Link to="/register" className="footer-link">For Companies</Link>
            <Link to="/login" className="footer-link">Sign In</Link>
          </div>
          <div className="footer-links-group">
            <span className="footer-links-title">Company</span>
            <a href="#features" className="footer-link">Features</a>
            <a href="#how" className="footer-link">How it Works</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PlacementHub. All rights reserved.</span>
        </div>
      </footer>

      <style>{`
        /* ─── Navbar ─── */
        .pub-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav-scrolled {
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom-color: rgba(255,255,255,0.07);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(99,102,241,0.4);
        }
        .logo-svg { width: 18px; height: 18px; color: #fff; }
        .logo-text { font-size: 1.15rem; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
        .logo-accent { color: #818cf8; }

        /* Links */
        .nav-links {
          display: flex;
          gap: 0.25rem;
          margin-left: auto;
        }
        .nav-link {
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover { color: #f1f5f9; background: rgba(255,255,255,0.05); }

        /* Auth buttons */
        .nav-auth { display: flex; align-items: center; gap: 0.75rem; }
        .nav-login {
          padding: 0.5rem 1rem;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 9px;
          transition: color 0.2s;
        }
        .nav-login:hover { color: #f1f5f9; }
        .nav-register {
          padding: 0.5rem 1.1rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 9px;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 0 18px rgba(99,102,241,0.35);
        }
        .nav-register:hover { opacity: 0.9; transform: translateY(-1px); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #94a3b8;
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 1.5rem 1.25rem;
          background: rgba(10,10,15,0.95);
          border-top: 1px solid rgba(255,255,255,0.06);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .mobile-menu.mobile-open { max-height: 300px; }
        .mob-link { padding: 0.65rem 0; color: #94a3b8; text-decoration: none; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .mob-link:hover { color: #f1f5f9; }
        .mob-cta { margin-top: 0.75rem; padding: 0.75rem; text-align: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; border-radius: 10px; font-weight: 700; text-decoration: none; }

        /* ─── Footer ─── */
        .pub-footer {
          background: #080810;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 3.5rem 2rem 0;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
        }
        .footer-tagline { color: #475569; font-size: 0.875rem; margin-top: 0.75rem; line-height: 1.6; max-width: 260px; }
        .footer-links-group { display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-links-title { color: #e2e8f0; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.25rem; }
        .footer-link { color: #475569; text-decoration: none; font-size: 0.875rem; transition: color 0.2s; }
        .footer-link:hover { color: #818cf8; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 1.25rem 0; text-align: center; color: #334155; font-size: 0.8rem; max-width: 1200px; margin: 0 auto; }

        @media (max-width: 768px) {
          .nav-links, .nav-auth { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .footer-inner { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}

export default PublicLayout
