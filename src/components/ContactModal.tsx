import { useEffect, useRef, useState } from 'react';
import './ContactModal.css';
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM'
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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "meetingRequests"), {
        name,
        email,
        company,
        date,
        time,
        message,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      setName('');
      setEmail('');
      setCompany('');
      setDate('');
      setTime('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert("Failed to submit meeting request.");
    }
  }

  return (
    <div className="cmodal__overlay" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}>
      <div className="cmodal" role="dialog" aria-modal="true" aria-label="Schedule a meeting">
        <button className="cmodal__close" onClick={onClose}>✕</button>

        {sent ? (
          <div className="cmodal__success">
            <h3>Meeting Request Sent</h3>
            <p>Thank you! Your request has been submitted successfully. We will contact you soon.</p>
            <button className="cmodal__submit" onClick={onClose}>Done</button>

            <div className="cmodal__social">
              <p className="cmodal__social-label">Connect with us</p>
              <div className="cmodal__social-row">
                <a
                  href="https://github.com/Alpha-Tech-Solution"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cmodal__social-btn"
                >
                  <svg viewBox="0 0 19 19" width="18" height="18" fill="currentColor">
                    <path fillRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clipRule="evenodd" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/posts/alpha-tech-ai_alpha-artificialintelligence-agenticai-activity-7489008667116113920-HDOX?utm_source=share&utm_medium=member_android&rcm=ACoAAE4tJHIByy7jmNMKw__azp4QkxO4fW-bDCY"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="cmodal__social-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.68H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.11 20.45H3.56V9h3.55z" />
                  </svg>
                </a>

                <a
                  href="https://whatsapp.com/channel/0029VbDlTPkEVccF8PN8ot2L"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="cmodal__social-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.51h-.56c-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.35M12.02 22h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.75.98 1-3.65-.24-.38A9.9 9.9 0 0 1 2 12.02C2 6.5 6.5 2 12.02 2c2.66 0 5.16 1.04 7.04 2.93A9.9 9.9 0 0 1 22 12.03c0 5.52-4.5 9.97-9.98 9.97m8.5-18.47A11.8 11.8 0 0 0 12.02 0C5.4 0 .02 5.38.02 12.02c0 2.12.55 4.19 1.6 6.02L0 24l6.1-1.6a12 12 0 0 0 5.92 1.51h.01c6.62 0 12-5.38 12-12.02 0-3.21-1.25-6.23-3.51-8.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow">Let's talk</p>
            <h3 className="cmodal__title">Schedule a meeting</h3>
            <p className="cmodal__sub">Tell us about your project.</p>

            <form className="cmodal__form" onSubmit={handleSubmit}>
              <div className="cmodal__row">
                <label>
                  <span>Name</span>
                  <input ref={firstFieldRef} required value={name} onChange={e=>setName(e.target.value)} />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
                </label>
              </div>

              <label>
                <span>Company</span>
                <input value={company} onChange={e=>setCompany(e.target.value)} />
              </label>

              <div className="cmodal__row">
                <label>
                  <span>Date</span>
                  <input type="date" min={todayISO()} required value={date} onChange={e=>setDate(e.target.value)} />
                </label>

                <label>
                  <span>Time</span>
                  <select required value={time} onChange={e=>setTime(e.target.value)}>
                    <option value="">Select a slot</option>
                    {TIME_SLOTS.map(t=><option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>

              <label>
                <span>Project Details</span>
                <textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} />
              </label>

              <button className="cmodal__submit" type="submit">
                Request Meeting
              </button>

              <p className="cmodal__note">
                Your meeting request will be securely submitted to our team.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}