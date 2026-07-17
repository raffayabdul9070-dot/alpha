import { motion } from 'framer-motion';
import ProcessCard from './ProcessCard';
import './Process.css';

const ICON_PROPS = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const STEPS = [
  {
    title: 'Discover',
    body: 'We understand your idea, users, and requirements before writing a single line of code.',
    accent: 'gold' as const,
    icon: (
      <svg {...ICON_PROPS} stroke="#f5a623">
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.46 1 1.18 1 1.95V16h5.2v-.25c0-.77.4-1.5 1-1.95A6 6 0 0 0 12 3Z" />
      </svg>
    ),
  },
  {
    title: 'Design',
    body: 'We create wireframes and interactive prototypes so you can see it before it\'s built.',
    accent: 'blue' as const,
    icon: (
      <svg {...ICON_PROPS} stroke="#3fc8ff">
        <path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20Z" />
        <path d="M14 7l3 3" />
      </svg>
    ),
  },
  {
    title: 'Develop',
    body: 'We write clean, scalable, well-tested code in short, transparent cycles.',
    accent: 'gold' as const,
    icon: (
      <svg {...ICON_PROPS} stroke="#f5a623">
        <path d="M9 8l-5 4 5 4M15 8l5 4-5 4" />
        <line x1="12" y1="4" x2="12" y2="20" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'Test',
    body: 'We test for quality, performance, and security before anything ships.',
    accent: 'blue' as const,
    icon: (
      <svg {...ICON_PROPS} stroke="#3fc8ff">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: 'Deploy',
    body: 'We launch, monitor, and stay close for the weeks that matter most.',
    accent: 'gold' as const,
    icon: (
      <svg {...ICON_PROPS} stroke="#f5a623">
        <path d="M12 19V5M5 12l7-7 7 7" />
        <path d="M5 19h14" strokeOpacity="0.5" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="process__inner">

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Development Process
        </motion.p>

        <motion.h2
          className="process__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Five stages. <span className="grad-gold-text">No surprises.</span>
        </motion.h2>

        {/* Animated connector line */}
        <div className="process__track">
          <div className="process__line-track">
            <motion.div
              className="process__line-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Step dots on the line */}
          <div className="process__dots">
            {STEPS.map((s, i) => (
              <div key={i} className={`process__dot process__dot--${s.accent}`} />
            ))}
          </div>

          <div className="process__grid">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProcessCard
                  icon={s.icon}
                  title={s.title}
                  body={s.body}
                  index={i}
                  accent={s.accent}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
