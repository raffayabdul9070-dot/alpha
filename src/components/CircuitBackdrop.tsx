interface Props {
  className?: string;
}

/** Faint animated circuit-board linework — the tech texture from the brand poster. */
export default function CircuitBackdrop({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="circuit-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3fc8ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <g stroke="url(#circuit-fade)" strokeWidth="1" fill="none" opacity="0.35">
        <path d="M0 120 H180 L220 160 H420" />
        <path d="M1200 90 H1000 L960 130 H760 L720 90" />
        <path d="M0 620 H140 L180 660 H360 L400 700" />
        <path d="M1200 700 H980 L940 660 H700" />
        <path d="M60 0 V80 L100 120 V300" />
        <path d="M1140 0 V60 L1100 100 V260" />
      </g>
      <g fill="#3fc8ff">
        <circle cx="220" cy="160" r="3" opacity="0.6" />
        <circle cx="960" cy="130" r="3" opacity="0.6" />
        <circle cx="180" cy="660" r="3" opacity="0.6" />
        <circle cx="940" cy="660" r="3" opacity="0.6" />
        <circle cx="100" cy="120" r="3" opacity="0.6" />
        <circle cx="1100" cy="100" r="3" opacity="0.6" />
      </g>
      <g fill="#f5a623">
        <circle cx="420" cy="160" r="3" opacity="0.55" />
        <circle cx="720" cy="90" r="3" opacity="0.55" />
        <circle cx="400" cy="700" r="3" opacity="0.55" />
        <circle cx="700" cy="660" r="3" opacity="0.55" />
      </g>
    </svg>
  );
}
