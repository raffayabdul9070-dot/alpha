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
