import { useEffect, useRef, useState } from 'react';
import './FeatureBar.css';

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const FEATURES = [
  {
    title: 'High Performance',
    body: 'Sub-second load times with optimized pipelines and edge delivery.',
    stat: '99%',
    statLabel: 'Uptime SLA',
    accent: 'gold',
    icon: (
      <svg {...ICON_PROPS} stroke="#f5a623">
        <path d="M13 2L4.09 12.78A1 1 0 0 0 5 14h6.5l-1.5 8L20 9.22A1 1 0 0 0 19 8H12.5L14 0" />
      </svg>
    ),
  },
  {
    title: 'Secure by Design',
    body: 'Enterprise-grade encryption, auth flows and OWASP-compliant code.',
    stat: '0',
    statLabel: 'Breaches',
    accent: 'blue',
    icon: (
      <svg {...ICON_PROPS} stroke="#3fc8ff">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: 'Infinitely Scalable',
    body: 'Cloud-native architecture that grows with your traffic and team.',
    stat: '10x',
    statLabel: 'Growth Ready',
    accent: 'gold',
    icon: (
      <svg {...ICON_PROPS} stroke="#f5a623">
        <path d="M4 20V14M10 20V10M16 20V6" />
        <path d="M4 13l6-4 6 3 6-7" />
        <circle cx="20" cy="5" r="1.5" fill="#f5a623" />
      </svg>
    ),
  },
  {
    title: 'Modern UI/UX',
    body: 'Pixel-perfect, accessible interfaces that users fall in love with.',
    stat: '4.9★',
    statLabel: 'User Rating',
    accent: 'blue',
    icon: (
      <svg {...ICON_PROPS} stroke="#3fc8ff">
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 9h4M7 12h6" />
      </svg>
    ),
  },
];

function FeatureItem({
  title, body, stat, statLabel, accent, icon, index,
}: (typeof FEATURES)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fb-item fb-item--${accent} ${visible ? 'fb-item--visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Hover glow */}
      <div className={`fb-item__glow fb-item__glow--${accent}`} />

      {/* Top row: icon + stat */}
      <div className="fb-item__top">
        <div className={`fb-item__icon fb-item__icon--${accent}`}>
          {icon}
        </div>
        <div className={`fb-item__stat fb-item__stat--${accent}`}>
          <span className="fb-item__stat-value">{stat}</span>
          <span className="fb-item__stat-label">{statLabel}</span>
        </div>
      </div>

      {/* Text */}
      <h3 className="fb-item__title">{title}</h3>
      <p className="fb-item__body">{body}</p>

      {/* Bottom accent line */}
      <div className={`fb-item__line fb-item__line--${accent}`} />
    </div>
  );
}

export default function FeatureBar() {
  return (
    <section className="feature-bar">
      <div className="feature-bar__inner">
        {FEATURES.map((f, i) => (
          <FeatureItem key={f.title} {...f} index={i} />
        ))}
      </div>
    </section>
  );
}
