import { useEffect, useRef, useState } from 'react';
import './ContactModal.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFieldRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = `Meeting request — ${name || 'New client'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      date ? `Preferred date: ${date}` : null,
      time ? `Preferred time: ${time}` : null,
      '',
      'Project details:',
      message || '(none provided)',
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = `mailto:hello@alpha.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className="cmodal__overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cmodal" role="dialog" aria-modal="true" aria-label="Schedule a meeting">
        <button className="cmodal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {sent ? (
          <div className="cmodal__success">
            <div className="cmodal__success-icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="13" cy="13" r="12" stroke="#f5a623" strokeWidth="1.4" />
                <path d="M7.5 13.4l3.4 3.4L18.5 8.6" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Your email client is opening</h3>
            <p>We've prefilled your request — just hit send. We reply within one business day.</p>
            <button className="cmodal__submit" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Let's talk</p>
            <h3 className="cmodal__title">Schedule a meeting</h3>
            <p className="cmodal__sub">Tell us a bit about the project and when's good for a call.</p>

            <form className="cmodal__form" onSubmit={handleSubmit}>
              <div className="cmodal__row">
                <label>
                  <span>Name</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Lee"
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label>
                <span>Company (optional)</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                />
              </label>

              <div className="cmodal__row">
                <label>
                  <span>Preferred date</span>
                  <input
                    type="date"
                    required
                    min={todayISO()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <label>
                  <span>Preferred time</span>
                  <select required value={time} onChange={(e) => setTime(e.target.value)}>
                    <option value="" disabled>
                      Select a slot
                    </option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span>Project details</span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you trying to build?"
                />
              </label>

              <button className="cmodal__submit" type="submit">
                Request meeting
              </button>
              <p className="cmodal__note">
                Opens your email client with these details prefilled — nothing is sent automatically.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
