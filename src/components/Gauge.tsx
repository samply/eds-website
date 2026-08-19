interface GaugeProps {
  percentage: number;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export default function Gauge({ percentage }: GaugeProps) {
  const cx = 110;
  const cy = 110;
  const r = 85;
  const startDeg = -135;
  const endDeg = 135;
  const fillDeg = startDeg + (endDeg - startDeg) * percentage / 100;

  const trackD = arcPath(cx, cy, r, startDeg, endDeg);
  const fillD = arcPath(cx, cy, r, startDeg, fillDeg);
  const dot = polarToXY(cx, cy, r, fillDeg);

  return (
    <svg className="w-[220px] max-w-full h-auto" viewBox="0 0 220 200">
      {/* Track */}
      <path d={trackD} fill="none" stroke="#e8eef9" strokeWidth="17" strokeLinecap="round" />
      {/* Fill */}
      <path d={fillD} fill="none" stroke="#2563eb" strokeWidth="17" strokeLinecap="round" />
      {/* Needle dot */}
      <circle cx={dot.x} cy={dot.y} r="8.5" fill="white" stroke="#1a2b4a" strokeWidth="3.5" />
      {/* Score */}
      <text
        x={cx} y="120"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontSize="48"
        fontWeight="700"
        fill="#1a2b4a"
      >
        {Math.round(percentage)}
      </text>
      <text
        x={cx} y="148"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="#8a9ab8"
      >
        / 100
      </text>
    </svg>
  );
}
