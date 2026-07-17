import { motion } from 'framer-motion';
import './WhyChoose.css';

const POINTS = [
  { title: 'Experienced Team', body: 'Skilled developers with expertise across modern, production-grade technologies.' },
  { title: 'Clean & Maintainable Code', body: 'We write code that is efficient, scalable, and built to be handed off cleanly.' },
  { title: 'Transparent Communication', body: "You're always in the loop, from kickoff to final delivery." },
  { title: 'On-Time Delivery', body: 'We scope realistically and deliver as promised — no surprise slippage.' },
];

function Globe() {
  return (
    <svg viewBox="0 0 400 400" className="why__globe-svg" aria-hidden="true">
      <defs>
        <radialGradient id="globe-fill" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#122036" />
          <stop offset="100%" stopColor="#060a12" />
        </radialGradient>
        <linearGradient id="arc-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffcf5c" />
        </linearGradient>
      </defs>

      <circle className="why__globe-pulse" cx="200" cy="200" r="170" fill="none" stroke="#3fc8ff" />
      <circle cx="200" cy="200" r="170" fill="url(#globe-fill)" stroke="#3fc8ff" strokeOpacity="0.25" />

      <g className="why__globe-grid">
        {[...Array(7)].map((_, i) => (
          <ellipse
            key={`m${i}`}
            cx="200"
            cy="200"
            rx="170"
            ry="170"
            fill="none"
            stroke="#3fc8ff"
            strokeOpacity="0.14"
            transform={`rotate(${i * 25.7} 200 200) scale(${0.15 + i * 0.14},1)`}
          />
        ))}
        {[60, 100, 140, 180].map((r, i) => (
          <circle key={`p${i}`} cx="200" cy="200" r={r} fill="none" stroke="#3fc8ff" strokeOpacity="0.09" />
        ))}
      </g>

      <g className="why__globe-orbit why__globe-orbit--a">
        <circle cx="200" cy="30" r="4" fill="#3fc8ff" />
      </g>
      <g className="why__globe-orbit why__globe-orbit--b">
        <circle cx="200" cy="18" r="3" fill="#ffcf5c" />
      </g>
      <g className="why__globe-orbit why__globe-orbit--c">
        <circle cx="60" cy="200" r="2.6" fill="#8fe3ff" />
      </g>

      <path
        className="why__globe-arc"
        d="M40 300 Q 160 260 220 190 T 340 90"
        fill="none"
        stroke="url(#arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M340 90 l-16 3 M340 90 l-4 15" stroke="#ffcf5c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function WhyChoose() {
  return (
    <section className="why">
      <div className="why__inner">
        <motion.div
          className="why__copy"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Why choose Alpha</p>
          <h2 className="why__title">Built for teams who don't get second chances at launch.</h2>
          <ul className="why__list">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="why__check">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.2l3 3L11.5 3.6" stroke="#04060c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="why__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Globe />
        </motion.div>
      </div>
    </section>
  );
}
