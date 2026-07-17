import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section id="contact" className="contact">
      <div className="contact__glow" aria-hidden="true" />
      <motion.div
        className="contact__inner"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="contact__eyebrow">Let's talk</p>
        <h2 className="contact__title">
          Ready to build? <em>Contact us today.</em>
        </h2>
        <p className="contact__sub">
          Tell us what you're trying to ship. We'll reply within one business day with next steps.
        </p>
        <button className="contact__cta" onClick={onOpenContact}>
          Schedule a meeting
        </button>
      </motion.div>
    </section>
  );
}
