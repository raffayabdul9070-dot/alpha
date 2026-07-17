import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './TechStack.css';

const STACK = [
  { name: 'HTML5', tag: 'H5', color: '#e34f26' },
  { name: 'CSS3', tag: 'C3', color: '#3fc8ff' },
  { name: 'JavaScript', tag: 'JS', color: '#f0db4f' },
  { name: 'React', tag: 'R', color: '#61dafb' },
  { name: 'Next.js', tag: 'N', color: '#ffffff' },
  { name: 'Node.js', tag: 'JS', color: '#8cc84b' },
  { name: 'Python', tag: 'Py', color: '#ffd43b' },
  { name: 'Tailwind CSS', tag: 'TW', color: '#38bdf8' },
  { name: 'MongoDB', tag: 'M', color: '#4db33d' },
  { name: 'PostgreSQL', tag: 'PG', color: '#f5a623' },
  { name: 'TypeScript', tag: 'TS', color: '#3178c6' },
  { name: 'Docker', tag: 'Do', color: '#0db7ed' },
];

export default function TechStack() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STACK.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="stack" className="tech">
      <div className="tech__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technologies We Use
        </motion.p>
        <motion.h2
          className="tech__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          One stack. <span className="grad-blue-text">Zero guesswork.</span>
        </motion.h2>

        <div className="tech__grid">
          {STACK.map((t, i) => {
            const isActive = i === active;
            return (
              <motion.div
                className={`tech__tag ${isActive ? 'is-active' : ''}`}
                key={t.name}
                style={{ '--tc': t.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="tech__badge">{t.tag}</span>
                <span className="tech__name">{t.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
