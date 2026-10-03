import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '10K+', label: 'Students Placed' },
  { value: '500+', label: 'Partner Companies' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Industries' },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Smart Job Matching',
    desc: 'Our intelligent algorithm matches students with roles perfectly suited to their skills, CGPA, and career goals.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Verified Companies',
    desc: 'Every company on our platform goes through a strict verification process so students can apply with full confidence.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Real-Time Tracking',
    desc: 'Students track every application status live. Companies manage pipelines and shortlist candidates in one click.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Dedicated Dashboards',
    desc: 'Students, Companies, and Admins each get a powerful, role-specific dashboard built for their exact workflow.',
  },
];

const STEPS = [
  { step: '01', role: 'Student', title: 'Create Your Profile', desc: 'Sign up, complete your academic profile, upload your resume and skills.' },
  { step: '02', role: 'Student', title: 'Browse & Apply', desc: 'Explore curated job listings and apply to your dream companies in seconds.' },
  { step: '03', role: 'Company', title: 'Post Opportunities', desc: 'Companies post roles, set eligibility criteria, and review a shortlisted talent pool.' },
  { step: '04', role: 'Admin', title: 'Supervised Placement', desc: 'Admins oversee the full pipeline, ensure fairness, and finalize placements.' },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''));
    const step = num / (duration / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(timer);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, label }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const num = useCountUp(value, 1800, visible);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">{num}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home-root">

      {/* ─── HERO ─── */}
      <section className="hero-section">
        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="hero-content">
          <div className="hero-badge">🎓 India's #1 Campus Placement Platform</div>
          <h1 className="hero-heading">
            Connecting <span className="gradient-text">Talent</span> with
            <br />Top <span className="gradient-text">Opportunities</span>
          </h1>
          <p className="hero-sub">
            PlacementHub bridges the gap between ambitious students and world-class companies.
            Smart matching. Real-time tracking. Zero friction.
          </p>
          <div className="hero-actions">
            <Link to="/register" id="cta-register-btn" className="btn-primary">
              Get Started Free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link to="/login" id="cta-login-btn" className="btn-ghost">
              Sign In →
            </Link>
          </div>

          {/* Floating cards */}
          <div className="floating-cards">
            <div className="float-card fc-left">
              <div className="fc-dot dot-green" />
              <div>
                <div className="fc-title">Software Engineer</div>
                <div className="fc-sub">Google · ₹24 LPA</div>
              </div>
            </div>
            <div className="float-card fc-right">
              <div className="fc-dot dot-blue" />
              <div>
                <div className="fc-title">Data Analyst</div>
                <div className="fc-sub">Microsoft · ₹18 LPA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </section>

      {/* ─── FEATURES ─── */}
      <section className="features-section" id="features">
        <div className="section-badge">Why PlacementHub?</div>
        <h2 className="section-heading">Everything you need, <span className="gradient-text">nothing you don't</span></h2>
        <p className="section-sub">A unified platform purpose-built for modern campus recruitment.</p>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="how-section" id="how">
        <div className="section-badge">The Process</div>
        <h2 className="section-heading">How <span className="gradient-text">PlacementHub</span> works</h2>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{s.step}</div>
              <div className={`step-role-badge ${s.role.toLowerCase()}-badge`}>{s.role}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <h2 className="cta-heading">Ready to land your dream placement?</h2>
        <p className="cta-sub">Join thousands of students and companies already on PlacementHub.</p>
        <div className="cta-actions">
          <Link to="/register" id="final-cta-student" className="btn-primary">I'm a Student</Link>
          <Link to="/register" id="final-cta-company" className="btn-outline">I'm a Company</Link>
        </div>
      </section>

      <style>{`
        /* ── Base ── */
        .home-root {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: #0a0a0f;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6rem 1.5rem 4rem;
          overflow: hidden;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: blobMove 8s ease-in-out infinite alternate;
        }
        .blob-1 { width: 500px; height: 500px; background: #6366f1; top: -100px; left: -100px; animation-delay: 0s; }
        .blob-2 { width: 400px; height: 400px; background: #8b5cf6; bottom: -80px; right: -80px; animation-delay: 2s; }
        .blob-3 { width: 300px; height: 300px; background: #06b6d4; top: 40%; left: 50%; transform: translateX(-50%); animation-delay: 4s; }
        @keyframes blobMove {
          0%   { transform: scale(1) translateY(0); }
          100% { transform: scale(1.15) translateY(-30px); }
        }

        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-badge {
          display: inline-block;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.35);
          color: #a5b4fc;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          margin-bottom: 1.5rem;
          animation: fadeDown 0.6s ease both;
        }
        .hero-heading {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          animation: fadeDown 0.7s ease 0.1s both;
        }
        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #a78bfa, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.15rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 2.5rem;
          animation: fadeDown 0.7s ease 0.2s both;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeDown 0.7s ease 0.3s both;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 30px rgba(99,102,241,0.4);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 45px rgba(99,102,241,0.6); }
        .btn-icon { width: 18px; height: 18px; }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 1.75rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          color: #cbd5e1;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: #6366f1; color: #a5b4fc; background: rgba(99,102,241,0.08); }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 2rem;
          border-radius: 12px;
          border: 2px solid rgba(99,102,241,0.5);
          color: #a5b4fc;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: rgba(99,102,241,0.12); border-color: #818cf8; }

        /* Floating job cards */
        .floating-cards {
          position: relative;
          height: 80px;
          margin-top: 3.5rem;
          animation: fadeDown 0.7s ease 0.5s both;
        }
        .float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          white-space: nowrap;
        }
        .fc-left  { left: 50%; transform: translateX(-130%); animation: floatL 4s ease-in-out infinite alternate; }
        .fc-right { left: 50%; transform: translateX(20%);   animation: floatR 4s ease-in-out infinite alternate; }
        @keyframes floatL { 0%{transform:translateX(-130%) translateY(0)}  100%{transform:translateX(-130%) translateY(-8px)} }
        @keyframes floatR { 0%{transform:translateX(20%) translateY(-8px)} 100%{transform:translateX(20%) translateY(0)} }
        .fc-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .dot-green { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
        .dot-blue  { background: #38bdf8; box-shadow: 0 0 8px #38bdf8; }
        .fc-title { font-weight: 700; font-size: 0.9rem; color: #f1f5f9; }
        .fc-sub   { font-size: 0.75rem; color: #94a3b8; margin-top: 1px; }

        /* Scroll hint */
        .hero-scroll-hint { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index:2; }
        .scroll-mouse { width: 24px; height: 38px; border: 2px solid rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: flex-start; justify-content: center; padding-top: 6px; }
        .scroll-wheel { width: 4px; height: 8px; background: #6366f1; border-radius: 2px; animation: scrollDown 1.5s ease-in-out infinite; }
        @keyframes scrollDown { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(10px);opacity:0} }

        /* ── Stats ── */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .stat-card {
          padding: 2.5rem 1.5rem;
          text-align: center;
          background: #0a0a0f;
          transition: background 0.2s;
        }
        .stat-card:hover { background: rgba(99,102,241,0.05); }
        .stat-value { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #818cf8, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-label { color: #64748b; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.4rem; }

        /* ── Sections Common ── */
        .features-section, .how-section { padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; }
        .section-badge {
          display: inline-block;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          color: #818cf8;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-heading { font-size: clamp(1.8rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.75rem; }
        .section-sub { color: #64748b; font-size: 1.05rem; max-width: 500px; line-height: 1.6; margin-bottom: 3.5rem; }

        /* ── Features ── */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
        .feature-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.25s, border-color 0.25s, background 0.25s;
        }
        .feature-card:hover { transform: translateY(-5px); border-color: rgba(99,102,241,0.35); background: rgba(99,102,241,0.05); }
        .feature-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); display: flex; align-items: center; justify-content: center; color: #818cf8; margin-bottom: 1.25rem; }
        .feature-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; color: #f1f5f9; }
        .feature-desc { color: #64748b; font-size: 0.92rem; line-height: 1.65; }

        /* ── Steps ── */
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
        .step-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.25s, border-color 0.25s;
        }
        .step-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.3); }
        .step-number { font-size: 3rem; font-weight: 900; background: linear-gradient(135deg, rgba(129,140,248,0.25), rgba(56,189,248,0.1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.75rem; }
        .step-role-badge { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .student-badge { background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
        .company-badge { background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.25); }
        .admin-badge   { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
        .step-title { font-size: 1.05rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.5rem; }
        .step-desc { color: #64748b; font-size: 0.88rem; line-height: 1.65; }

        /* ── CTA ── */
        .cta-section {
          position: relative;
          text-align: center;
          padding: 7rem 2rem;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .cta-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .cta-heading { position: relative; font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1rem; }
        .cta-sub { position: relative; color: #64748b; font-size: 1rem; margin-bottom: 2.5rem; }
        .cta-actions { position: relative; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* ── Animations ── */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .fc-left { display: none; }
          .fc-right { left: 50%; transform: translateX(-50%); animation: none; }
          .floating-cards { height: 60px; }
        }
      `}</style>
    </div>
  );
}
