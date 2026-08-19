import { useMemo } from 'react';
import { Link } from 'wouter';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { DEFAULT_FORM_VALUES } from '../types';
import type { FormValues } from '../types';
import { calculateResult, INPUT_LIMITS, isOutOfRange } from '../utils/scoring';
import type { LimitedField } from '../utils/scoring';
import Gauge from '../components/Gauge';
import ContributionCards from '../components/ContributionCards';

/* Example patients — clonal (1) and non-clonal (2) presentation */
const EXAMPLE_PATIENTS: { label: string; values: FormValues }[] = [
  {
    label: 'Example 1',
    values: { tryptase: '40', ige: '170', ldh: '160', b12: '1400', organs: '1', splen: 'yes', ent: 'no' },
  },
  {
    label: 'Example 2',
    values: { tryptase: '6', ige: '1800', ldh: '120', b12: '280', organs: '3', splen: 'no', ent: 'yes' },
  },
];

interface ScorePageProps {
  values: FormValues;
  onValuesChange: React.Dispatch<React.SetStateAction<FormValues>>;
}

export default function ScorePage({ values, onValuesChange: setValues }: ScorePageProps) {
  const handleReset = () => setValues(DEFAULT_FORM_VALUES);
  const handleTextChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (key: 'splen' | 'ent', val: 'yes' | 'no') => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSelectChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const result = useMemo(() => {
    const canCompute =
      values.tryptase !== '' &&
      values.ige !== '' &&
      values.ldh !== '' &&
      values.b12 !== '' &&
      values.organs !== '' &&
      values.splen !== null &&
      values.ent !== null;
    return canCompute ? calculateResult(values) : null;
  }, [values]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-7 items-start animate-fade-in">
      {/* Input Panel */}
      <div className="bg-white border border-border rounded-xl p-7 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="font-heading text-lg font-semibold text-navy">Input variables</div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 border border-border bg-white text-text-secondary text-xs font-medium cursor-pointer rounded-lg hover:border-blue hover:bg-blue-pale hover:text-blue transition-[border-color,background,color] duration-150"
          >
            <RotateCcw size={13} strokeWidth={2.2} />
            Reset
          </button>
        </div>
        <div className="text-[13px] text-text-muted mb-6">Enter the patient's values.</div>

        <NumberField
          label="Serum tryptase"
          field="tryptase"
          unit="ng/mL"
          placeholder="e.g. 11.2"
          step="0.1"
          value={values.tryptase}
          onChange={handleTextChange}
        />

        <NumberField
          label="Immunoglobulin E"
          field="ige"
          unit="kU/L"
          placeholder="e.g. 450"
          step="1"
          value={values.ige}
          onChange={handleTextChange}
        />

        <NumberField
          label="Lactate dehydrogenase"
          field="ldh"
          unit="U/L"
          placeholder="e.g. 380"
          step="1"
          value={values.ldh}
          onChange={handleTextChange}
        />

        <NumberField
          label="Vitamin B12"
          field="b12"
          unit="pg/mL"
          placeholder="e.g. 950"
          step="1"
          value={values.b12}
          onChange={handleTextChange}
        />

        {/* Organs */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Number of involved organs
          </label>
          <div className="relative">
            <select
              value={values.organs}
              onChange={(e) => handleSelectChange('organs', e.target.value)}
              className="w-full px-3 py-2 pr-9 border border-border rounded-lg bg-white font-[DM_Sans,sans-serif] text-sm text-text-primary appearance-none cursor-pointer outline-none focus:border-blue transition-[border-color] duration-150"
            >
              <option value="">— Select —</option>
              {Array.from({ length: INPUT_LIMITS.organs.max + 1 }, (_, n) => (
                <option key={n} value={String(n)}>{n}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Splenomegaly */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Splenomegaly
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleToggle('splen', 'no')}
              className={`flex-1 py-2 border rounded-lg text-[13px] font-medium cursor-pointer text-center transition-all duration-150 ${
                values.splen === 'no'
                  ? 'bg-navy border-navy text-white'
                  : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleToggle('splen', 'yes')}
              className={`flex-1 py-2 border rounded-lg text-[13px] font-medium cursor-pointer text-center transition-all duration-150 ${
                values.splen === 'yes'
                  ? 'bg-navy border-navy text-white'
                  : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue'
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* ENT/Asthma */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            <span className="relative inline-block underline decoration-dotted underline-offset-3 cursor-help group">
              ENT
              <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-navy text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none z-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-5 after:border-transparent after:border-t-navy">
                Ear-nose-throat
              </span>
            </span>
            {' '}involvement or asthma
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleToggle('ent', 'no')}
              className={`flex-1 py-2 border rounded-lg text-[13px] font-medium cursor-pointer text-center transition-all duration-150 ${
                values.ent === 'no'
                  ? 'bg-navy border-navy text-white'
                  : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleToggle('ent', 'yes')}
              className={`flex-1 py-2 border rounded-lg text-[13px] font-medium cursor-pointer text-center transition-all duration-150 ${
                values.ent === 'yes'
                  ? 'bg-navy border-navy text-white'
                  : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue'
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* Example patients */}
        <div className="mt-6 pt-5 border-t border-border">
          <div className="text-[13px] text-text-muted mb-2">Or load an example patient:</div>
          <div className="flex gap-2">
            {EXAMPLE_PATIENTS.map((example) => (
              <button
                key={example.label}
                onClick={() => setValues(example.values)}
                className="flex-1 py-2 border border-border rounded-lg bg-white text-[13px] font-medium text-text-secondary cursor-pointer text-center hover:border-blue hover:bg-blue-pale hover:text-blue transition-all duration-150"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Panel */}
      <div className="bg-white border border-border rounded-xl p-7 shadow-sm">
        <div className="font-heading text-lg font-semibold text-navy mb-1.5">Result</div>

        {!result ? (
          /* Placeholder */
          <div className="flex flex-col items-center justify-center text-center py-12 px-6 text-text-muted gap-3.5">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-border">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="10" x2="12" y2="15" strokeLinecap="round" strokeWidth="1.5" />
              <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            <p className="text-sm max-w-[260px] leading-relaxed">
              Specify all input variables on the left to display the EDS result.
            </p>
          </div>
        ) : (
          /* Result content */
          <div>
            {/* Top: Gauge + interpretation */}
            <div className="flex items-start gap-8 mb-7">
              <div className="shrink-0">
                <Gauge percentage={Math.round(result.probability * 100)} />
              </div>

              <div className="flex-1">
                <div className="font-heading text-xl font-bold text-navy mb-3">Eosinophilia Differentiation Score</div>
                <p className="text-sm text-text-secondary mb-[18px] leading-relaxed">
                  The Eosinophilia Differentiation Score (EDS) displays the probability of clonal vs. non-clonal eosinophilia derived from the published training cohort.
                </p>
                <Link
                  to="/methods"
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-blue hover:text-blue-dark transition-colors duration-150 group"
                >
                  <span className="group-hover:underline decoration-1 underline-offset-2">Learn more about the results and how the EDS is calculated.</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-pale text-blue text-xs font-bold border border-transparent group-hover:border-blue">
                    Methods
                    <ArrowRight size={11} strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>

            <hr className="border-t border-border my-6" />

            {/* Contribution cards */}
            <ContributionCards contributions={result.contributions} />

            <p className="text-xs text-text-muted mt-5 leading-relaxed">
              This prediction is for informational purposes only and cannot replace the judgement of a clinician.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Numeric input with the cohort's observed range (1st–99th percentile) ── */
function NumberField({
  label,
  field,
  unit,
  placeholder,
  step,
  value,
  onChange,
}: {
  label: string;
  field: LimitedField;
  unit: string;
  placeholder: string;
  step: string;
  value: string;
  onChange: (field: keyof FormValues, value: string) => void;
}) {
  const { min, max } = INPUT_LIMITS[field];
  const outOfRange = isOutOfRange(value, field);

  return (
    <div className="mb-[18px]">
      <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
        {label} ({unit})
      </label>
      <div
        className={`flex items-center border rounded-lg bg-white overflow-hidden transition-[border-color] duration-150 ${
          outOfRange ? 'border-accent-orange' : 'border-border focus-within:border-blue'
        }`}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          min="0"
          step={step}
          className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
        />
        <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">{unit}</div>
      </div>
      <div className="text-[11px] mt-1 leading-snug">
        {outOfRange ? (
          <span className="text-accent-orange">
            Outside the observed range ({min}–{max} {unit}); the limit value is used for the calculation.
          </span>
        ) : (
          <span className="text-text-muted">Observed range: {min}–{max} {unit}</span>
        )}
      </div>
    </div>
  );
}
