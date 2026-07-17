import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  points: string[];
  index: number;
  accent: 'blue' | 'gold';
}

export default function ServiceCard({ icon, title, points, index, accent }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${py * -7}deg) rotateY(${px * 9}deg) translateY(-6px) translateZ(14px)`,
      '--mx': `${(px + 0.5) * 100}%`,
      '--my': `${(py + 0.5) * 100}%`,
    } as React.CSSProperties);
  }

  function handleLeave() {
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0) translateY(0) translateZ(0)' });
  }

  return (
    <div
      ref={ref}
      className={`service-card service-card--${accent}`}
      style={{ ...style, transitionDelay: `${index * 40}ms` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span className="service-card__num">{String(index + 1).padStart(2, '0')}</span>
      <div className="service-card__glow" />
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      <ul className="service-card__points">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="service-card__ring" />
    </div>
  );
}
