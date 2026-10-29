import { Info } from 'lucide-react';

interface ProbabilityScaleProps {
  percentage: number;
}

export default function ProbabilityScale({ percentage }: ProbabilityScaleProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-3.5">
        Probability scale
        <Info size={14} className="text-text-muted" />
      </div>

      <div className="relative mb-[18px]">
        {/* Tooltip */}
        <div
          className="absolute -top-7 transition-all duration-500 ease-out"
          style={{ left: `calc(${percentage}% - 18px)` }}
        >
          <div className="bg-navy text-white text-[11px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap relative">
            {percentage}%
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
          </div>
        </div>

        {/* Scale bar */}
        <div className="h-3 rounded-full relative flex overflow-visible mb-2">
          <div className="w-[84%] h-full bg-accent-green rounded-l-full" />
          <div className="w-[16%] h-full bg-accent-red rounded-r-full" />
          {/* Cutoff line at 84% */}
          <div
            className="absolute top-[-4px] w-[2px] h-5 bg-navy rounded-sm"
            style={{ left: '84%', transform: 'translateX(-50%)' }}
          />
          {/* Marker */}
          <div
            className="absolute top-1/2 w-[18px] h-[18px] bg-white border-[3px] border-navy rounded-full shadow-md transition-all duration-500 ease-out"
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[11px] text-text-muted relative mb-2.5">
        <span>0%</span>
        <span className="absolute left-[84%] -translate-x-1/2">84%</span>
        <span>100%</span>
      </div>

      {/* Regions */}
      <div className="flex">
        <div className="flex flex-col text-xs font-semibold text-accent-green gap-0.5" style={{ width: '84%' }}>
          Clonal eosinophilia unlikely
        </div>
        <div className="flex flex-col text-xs font-semibold text-accent-red gap-0.5 text-right" style={{ width: '16%' }}>
          Clonal eosinophilia likely
        </div>
      </div>
    </div>
  );
}
