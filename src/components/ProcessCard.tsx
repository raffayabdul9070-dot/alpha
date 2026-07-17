import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  body: string;
  index: number;
  accent: 'gold' | 'blue';
}

export default function ProcessCard({ icon, title, body, index, accent }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 13 });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <div
      ref={ref}
      className={`proc-card proc-card--${accent}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? '-6px' : '0'}) translateZ(${hovered ? '12px' : '0'})`,
      }}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handleLeave}
    >
      {/* Ambient glow */}
      <div className={`proc-card__glow proc-card__glow--${accent}`} />

      {/* Top: step number pill + connector dot */}
      <div className="proc-card__top">
        <span className={`proc-card__step proc-card__step--${accent}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Icon */}
      <div className={`proc-card__icon proc-card__icon--${accent}`}>
        <div className="proc-card__icon-inner">{icon}</div>
        <div className={`proc-card__icon-ring proc-card__icon-ring--${accent}`} />
      </div>

      {/* Text */}
      <h3 className="proc-card__title">{title}</h3>
      <p className="proc-card__body">{body}</p>

      {/* Bottom accent bar */}
      <div className={`proc-card__bar proc-card__bar--${accent}`} />

      {/* Ghost watermark */}
      <span className="proc-card__ghost">{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}
