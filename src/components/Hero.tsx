import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CircuitBackdrop from './CircuitBackdrop';
import logo from '../assets/alpha_premium_logo.png';
import './Hero.css';

type Accent = 'blue' | 'gold';

const SWAP_MS = 4000;

interface ServiceScene {
  label: string;
  accent: Accent;
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  tags: string[];
  gradient: string;
}

const SCENES: ServiceScene[] = [
  {
    label: 'Web Development',
    accent: 'blue',
    gradient: 'from-blue to-cyan',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="10" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="20" cy="14" r="1.5" fill="currentColor"/>
        <line x1="4" y1="19" x2="44" y2="19" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="24" width="12" height="8" rx="2" fill="currentColor" opacity="0.3"/>
        <rect x="24" y="24" width="15" height="3" rx="1.5" fill="currentColor" opacity="0.5"/>
        <rect x="24" y="29" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.3"/>
        <line x1="16" y1="36" x2="32" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="20" y1="36" x2="20" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="36" x2="28" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="14" y1="40" x2="34" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Web Development',
    subtitle: 'Lightning-fast, pixel-perfect web experiences built with modern frameworks',
    stats: [
      { value: '99%', label: 'Performance' },
      { value: '<1s', label: 'Load Time' },
      { value: '100%', label: 'Responsive' },
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    label: 'App Development',
    accent: 'gold',
    gradient: 'from-gold to-amber',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="13" y="4" width="22" height="40" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <line x1="13" y1="12" x2="35" y2="12" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13" y1="38" x2="35" y2="38" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="41" r="1.5" fill="currentColor"/>
        <rect x="21" y="7" width="6" height="2" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="17" y="17" width="14" height="4" rx="2" fill="currentColor" opacity="0.4"/>
        <rect x="17" y="24" width="14" height="4" rx="2" fill="currentColor" opacity="0.25"/>
        <rect x="17" y="31" width="8" height="4" rx="2" fill="currentColor" opacity="0.15"/>
      </svg>
    ),
    title: 'App Development',
    subtitle: 'Native & cross-platform mobile apps that users love on iOS and Android',
    stats: [
      { value: '4.9★', label: 'Avg Rating' },
      { value: '2M+', label: 'Downloads' },
      { value: '60fps', label: 'Smoothness' },
    ],
    tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    label: 'Automation',
    accent: 'blue',
    gradient: 'from-blue to-indigo',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="10" cy="13" r="1.5" fill="#e5645a"/>
        <circle cx="15" cy="13" r="1.5" fill="#e5b84f"/>
        <circle cx="20" cy="13" r="1.5" fill="#4fc97a"/>
        <text x="8" y="26" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.9">$ python run.py</text>
        <text x="8" y="33" fontFamily="monospace" fontSize="7" fill="#4fc97a" opacity="0.8">✓ Tasks completed</text>
        <line x1="14" y1="36" x2="34" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="20" y1="36" x2="20" y2="42" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="28" y1="36" x2="28" y2="42" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="13" y1="42" x2="35" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Automation',
    subtitle: 'Eliminate repetitive work with smart scripts, bots, and scheduled pipelines',
    stats: [
      { value: '10x', label: 'Faster Ops' },
      { value: '0', label: 'Manual Errors' },
      { value: '24/7', label: 'Uptime' },
    ],
    tags: ['Python', 'Selenium', 'FastAPI', 'Celery'],
  },
  {
    label: 'Model Training',
    accent: 'gold',
    gradient: 'from-gold to-orange',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="8" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="40" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="36" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="40" cy="36" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="6" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="42" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <line x1="11" y1="13.5" x2="19.8" y2="20.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <line x1="37" y1="13.5" x2="28.2" y2="20.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <line x1="11" y1="34.5" x2="19.8" y2="27.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <line x1="37" y1="34.5" x2="28.2" y2="27.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <line x1="24" y1="9.5" x2="24" y2="19" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <line x1="24" y1="29" x2="24" y2="38.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      </svg>
    ),
    title: 'Model Training',
    subtitle: 'Custom AI models trained on your data for classification, prediction & vision',
    stats: [
      { value: '97%+', label: 'Accuracy' },
      { value: 'GPU', label: 'Accelerated' },
      { value: 'Custom', label: 'Datasets' },
    ],
    tags: ['PyTorch', 'TensorFlow', 'HuggingFace', 'CUDA'],
  },
  {
    label: 'RAG Systems',
    accent: 'blue',
    gradient: 'from-cyan to-blue',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <line x1="8" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="8" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="36" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <line x1="41.5" y1="25.5" x2="44" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="33" y1="20" x2="39" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="17" x2="36" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 38 Q18 34 24 38 Q30 42 36 38" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
      </svg>
    ),
    title: 'RAG Systems',
    subtitle: 'AI-powered document assistants that answer questions from your knowledge base',
    stats: [
      { value: 'GPT-4', label: 'Powered' },
      { value: '1M+', label: 'Tokens/Doc' },
      { value: 'Real-time', label: 'Retrieval' },
    ],
    tags: ['LangChain', 'Pinecone', 'OpenAI', 'Weaviate'],
  },
  {
    label: 'MLOps',
    accent: 'gold',
    gradient: 'from-amber to-gold',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="13.8" y1="11.5" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="28" y1="20" x2="34.2" y2="11.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13.8" y1="36.5" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="28" y1="28" x2="34.2" y2="36.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 10 Q8 3 15 3 L33 3 Q40 3 40 10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
        <path d="M8 38 Q8 45 15 45 L33 45 Q40 45 40 38" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
      </svg>
    ),
    title: 'MLOps & Deployment',
    subtitle: 'End-to-end ML pipelines — from training to production with CI/CD & monitoring',
    stats: [
      { value: '99.9%', label: 'SLA' },
      { value: 'Auto', label: 'Scaling' },
      { value: 'Full', label: 'Monitoring' },
    ],
    tags: ['Docker', 'Kubernetes', 'MLflow', 'Airflow'],
  },
];

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - startTime) % SWAP_MS;
      setProgress(elapsed / SWAP_MS);
    };
    const raf = setInterval(tick, 50);
    return () => clearInterval(raf);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SCENES.length);
      setProgress(0);
    }, SWAP_MS);
    return () => clearInterval(id);
  }, []);

  const scene = SCENES[active];

  return (
    <section id="top" className="hero">
      <CircuitBackdrop className="hero__circuit" />
      <div className="hero__glow-blue" aria-hidden="true" />
      <div className="hero__glow-gold" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">

          <h1 className="hero__heading">
            CRAFTING MODERN
            <br />
            <span className="grad-gold-text">DIGITAL SYSTEMS</span>
            <br />
            THAT MATTER.
          </h1>

          <p className="hero__sub">
            Alpha designs and engineers high-performance web, mobile and AI products —
            fast, secure, and built to scale. From first line of code to production launch,
            we ship digital experiences that connect brands with people and drive real results.
          </p>

          <div className="hero__actions">
            <button className="hero__cta" onClick={onOpenContact}>
              Ready to Build? Contact Us Today
            </button>
            <a href="#services" className="hero__link">
              Explore services ↓
            </a>
          </div>

          {/* Service nav dots */}
          <div className="hero__scene-nav">
            {SCENES.map((s, i) => (
              <button
                key={s.label}
                className={`hero__scene-dot${i === active ? ' hero__scene-dot--active' : ''}`}
                onClick={() => { setActive(i); setProgress(0); }}
                title={s.label}
              />
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={`svc-card svc-card--${scene.accent}`}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top gradient bar */}
              <div className="svc-card__bar" />

              {/* Header */}
              <div className="svc-card__header">
                <div className={`svc-card__icon-wrap svc-card__icon-wrap--${scene.accent}`}>
                  {scene.icon}
                </div>
                <div className="svc-card__badge">
                  <span className={`svc-card__badge-dot svc-card__badge-dot--${scene.accent}`} />
                  {`0${active + 1} / 0${SCENES.length}`}
                </div>
              </div>

              {/* Title + subtitle */}
              <h2 className="svc-card__title">{scene.title}</h2>
              <p className="svc-card__subtitle">{scene.subtitle}</p>

              {/* Stats row */}
              <div className="svc-card__stats">
                {scene.stats.map((s) => (
                  <div key={s.label} className={`svc-card__stat svc-card__stat--${scene.accent}`}>
                    <span className="svc-card__stat-value">{s.value}</span>
                    <span className="svc-card__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="svc-card__tags">
                {scene.tags.map((tag) => (
                  <span key={tag} className={`svc-card__tag svc-card__tag--${scene.accent}`}>{tag}</span>
                ))}
              </div>

              {/* Progress bar */}
              <div className="svc-card__progress">
                <motion.div
                  className={`svc-card__progress-fill svc-card__progress-fill--${scene.accent}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>

              {/* Decorative glow */}
              <div className={`svc-card__glow-orb svc-card__glow-orb--${scene.accent}`} />
            </motion.div>
          </AnimatePresence>

          {/* Floating ambient dots */}
          <div className="hero__ambient-dot hero__ambient-dot--1" />
          <div className="hero__ambient-dot hero__ambient-dot--2" />
          <div className="hero__ambient-dot hero__ambient-dot--3" />
        </div>
      </div>

      <div className="hero__floor" />
    </section>
  );
}