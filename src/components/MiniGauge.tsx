interface MiniGaugeProps {
  value: number | null;
}

function miniPolarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function miniArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = miniPolarToXY(cx, cy, r, startDeg);
  const e = miniPolarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export default function MiniGauge({ value }: MiniGaugeProps) {
  const cx = 36;
  const cy = 36;
  const r = 26;
  const startDeg = -135;
  const endDeg = 135;

  let fillDeg = startDeg + 0.01;
  let displayText = '—';
  let dot = miniPolarToXY(cx, cy, r, startDeg);

  if (value !== null) {
    const pct = Math.min(value / 6, 1);
    fillDeg = startDeg + (endDeg - startDeg) * pct;
    dot = miniPolarToXY(cx, cy, r, fillDeg);
    displayText = value >= 6 ? '≥6' : String(value);
  }

  const trackD = miniArcPath(cx, cy, r, startDeg, endDeg);
  const fillD = miniArcPath(cx, cy, r, startDeg, fillDeg);

  return (
    <div className="flex flex-col items-center gap-1 mt-2">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <defs>
          <linearGradient id="miniGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3aaa6b" />
            <stop offset="35%" stopColor="#ffcc02" />
            <stop offset="65%" stopColor="#e8893a" />
            <stop offset="100%" stopColor="#e05252" />
          </linearGradient>
        </defs>
        <path d={trackD} fill="none" stroke="#e8eef9" strokeWidth="6" strokeLinecap="round" />
        <path d={fillD} fill="none" stroke="url(#miniGaugeGrad)" strokeWidth="6" strokeLinecap="round" />
        <circle cx={dot.x} cy={dot.y} r="3.5" fill="white" stroke="#1a2b4a" strokeWidth="2" />
        <text
          x="36" y="42"
          textAnchor="middle"
          fontFamily="Sora, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#1a2b4a"
        >
          {displayText}
        </text>
      </svg>
      <span className="text-[11px] text-text-muted text-center">Organs</span>
    </div>
  );
}
