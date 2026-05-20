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
  const cx = 85;
  const cy = 85;
  const r = 65;
  const startDeg = -135;
  const endDeg = 135;
  const fillDeg = startDeg + (endDeg - startDeg) * percentage / 100;

  const trackD = arcPath(cx, cy, r, startDeg, endDeg);
  const fillD = arcPath(cx, cy, r, startDeg, fillDeg);
  const dot = polarToXY(cx, cy, r, fillDeg);

  return (
    <svg className="w-[170px] h-[170px]" viewBox="0 0 170 170">
      {/* Track */}
      <path d={trackD} fill="none" stroke="#e8eef9" strokeWidth="14" strokeLinecap="round" />
      {/* Fill */}
      <path d={fillD} fill="none" stroke="#2563eb" strokeWidth="14" strokeLinecap="round" />
      {/* Needle dot */}
      <circle cx={dot.x} cy={dot.y} r="7" fill="white" stroke="#1a2b4a" strokeWidth="3" />
      {/* Text */}
      <text
        x="85" y="100"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="#1a2b4a"
      >
        {Math.round(percentage)}
      </text>
      <text
        x="85" y="122"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontSize="11"
        fill="#8a9ab8"
      >
        %
      </text>
    </svg>
  );
}
