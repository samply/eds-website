import type { Contribution } from '../types';
import { Droplets, FlaskConical, Dna, Pill, Heart, Shield, Wind } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Tryptase': <Droplets size={20} />,
  'Immunoglobulin E': <FlaskConical size={20} />,
  'LDH': <Dna size={20} />,
  'Vitamin B12': <Pill size={20} />,
  'Involved organs': <Heart size={20} />,
  'Splenomegaly': <Shield size={20} />,
  'ENT / Asthma': <Wind size={20} />,
};

interface ContributionCardsProps {
  contributions: Contribution[];
}

export default function ContributionCards({ contributions }: ContributionCardsProps) {
  const maxAbs = Math.max(...contributions.map((c) => Math.abs(c.pct)), 1);

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-3.5">
        Contribution of variables
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
        {contributions.map((c) => {
          const isPos = c.pct >= 0;
          const barWidth = (Math.abs(c.pct) / maxAbs) * 100;
          return (
            <div key={c.name} className="bg-bg border border-border rounded-lg p-3.5 flex flex-col items-center gap-2">
              <div className="w-9 h-9 bg-white border border-border rounded-lg flex items-center justify-center text-blue shrink-0">
                {iconMap[c.name] || null}
              </div>
              <div className="text-xs font-semibold text-text-primary text-center leading-tight">
                {c.name}
              </div>
              <div className={`text-base font-bold ${isPos ? 'text-blue' : 'text-text-secondary'}`}>
                {c.pct >= 0 ? '+' : ''}{c.pct} %
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-600 ease-out ${isPos ? 'bg-blue' : 'bg-text-secondary'}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
