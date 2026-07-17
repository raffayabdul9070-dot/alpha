import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import './Services.css';

function iconProps(color: string) {
  return {
    width: 26,
    height: 26,
    viewBox: '0 0 26 26',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

const BLUE = '#3fc8ff';
const GOLD = '#f5a623';

const SERVICES: {
  title: string;
  points: string[];
  accent: 'blue' | 'gold';
  icon: React.ReactNode;
}[] = [
  {
    title: 'Web Development',
    points: ['Scalable solutions', 'Seamless UI/UX', 'Dynamic web apps'],
    accent: 'blue',
    icon: (
      <svg {...iconProps(BLUE)}>
        <rect x="3" y="5" width="20" height="16" rx="1.5" />
        <path d="M3 9.5h20" />
        <circle cx="6" cy="7.2" r="0.6" fill={GOLD} stroke="none" />
      </svg>
    ),
  },
  {
    title: 'App Development',
    points: ['iOS & Android experts', 'Feature-rich designs', 'Native performance'],
    accent: 'gold',
    icon: (
      <svg {...iconProps(GOLD)}>
        <rect x="7" y="2.5" width="12" height="21" rx="2.2" />
        <path d="M11.5 20.2h3" />
      </svg>
    ),
  },
  {
    title: 'Automation',
    points: ['Custom scripting', 'Process optimization', 'Robust workflows'],
    accent: 'blue',
    icon: (
      <svg {...iconProps(BLUE)}>
        <path d="M9 4h5a3 3 0 0 1 3 3v3H9a3 3 0 0 1-3-3 3 3 0 0 1 3-3Z" />
        <path d="M17 22h-5a3 3 0 0 1-3-3v-3h8a3 3 0 0 1 3 3 3 3 0 0 1-3 3Z" />
        <circle cx="10.5" cy="6" r="0.5" fill={GOLD} stroke="none" />
        <circle cx="15.5" cy="20" r="0.5" fill={GOLD} stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Model Training',
    points: ['High-accuracy AI', 'Transfer learning', 'Custom datasets'],
    accent: 'gold',
    icon: (
      <svg {...iconProps(GOLD)}>
        <circle cx="6" cy="7" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="20" cy="13" r="2" />
        <circle cx="13" cy="4" r="1.6" />
        <path d="M7.6 8.2 18.4 12M7.6 17.8 18.4 14.1M6 9v8" />
      </svg>
    ),
  },
  {
    title: 'RAG Systems',
    points: ['Knowledge-enhanced LLMs', 'Accurate content retrieval', 'Real-time information'],
    accent: 'blue',
    icon: (
      <svg {...iconProps(BLUE)}>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="M15 15l6.5 6.5" />
        <path d="M8 10.5h5" />
      </svg>
    ),
  },
  {
    title: 'MLOps',
    points: ['AI model deployments', 'Data science efficiency'],
    accent: 'gold',
    icon: (
      <svg {...iconProps(GOLD)}>
        <path d="M7 13a4 4 0 1 1 4-4c0 4-2 8-4 8a4 4 0 1 1 4-4c0-4 2-8 4-8a4 4 0 1 1-4 4" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services__inner">
        <motion.div
          className="services__head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Capabilities</p>
          <h2 className="services__title">
            Six disciplines. <span>One build system.</span>
          </h2>
        </motion.div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard icon={s.icon} title={s.title} points={s.points} index={i} accent={s.accent} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
