import { useState } from 'react';
import { Link } from 'wouter';
import { Calculator, ExternalLink } from 'lucide-react';
import { DEFAULT_FORM_VALUES } from '../types';
import type { FormValues, ResultData } from '../types';
import { calculateResult } from '../utils/scoring';
import Gauge from '../components/Gauge';
import ContributionCards from '../components/ContributionCards';

export default function ScorePage() {
  const [values, setValues] = useState<FormValues>(DEFAULT_FORM_VALUES);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleTextChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (key: 'splen' | 'ent', val: 'yes' | 'no') => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSelectChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    const res = calculateResult(values);
    if (!res) {
      alert('Please fill in all fields before calculating the score.');
      return;
    }
    setResult(res);
  };

  return (
    <div className="grid grid-cols-[340px_1fr] gap-7 items-start animate-fade-in">
      {/* Input Panel */}
      <div className="bg-white border border-border rounded-xl p-7 shadow-sm">
        <div className="font-heading text-lg font-semibold text-navy mb-1.5">Input variables</div>
        <div className="text-[13px] text-text-muted mb-6">Enter the patient's values.</div>

        {/* Tryptase */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Tryptase (µg/L)
          </label>
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
            <input
              type="number"
              value={values.tryptase}
              onChange={(e) => handleTextChange('tryptase', e.target.value)}
              placeholder="e.g. 11.2"
              min="0"
              step="0.1"
              className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
            />
            <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">µg/L</div>
          </div>
        </div>

        {/* IgE */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Immunoglobulin E (kU/L)
          </label>
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
            <input
              type="number"
              value={values.ige}
              onChange={(e) => handleTextChange('ige', e.target.value)}
              placeholder="e.g. 450"
              min="0"
              step="1"
              className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
            />
            <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">kU/L</div>
          </div>
        </div>

        {/* LDH */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Lactate dehydrogenase (U/L)
          </label>
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
            <input
              type="number"
              value={values.ldh}
              onChange={(e) => handleTextChange('ldh', e.target.value)}
              placeholder="e.g. 380"
              min="0"
              step="1"
              className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
            />
            <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">U/L</div>
          </div>
        </div>

        {/* Vitamin B12 */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Vitamin B12 (pmol/L)
          </label>
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
            <input
              type="number"
              value={values.b12}
              onChange={(e) => handleTextChange('b12', e.target.value)}
              placeholder="e.g. 950"
              min="0"
              step="1"
              className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
            />
            <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">pmol/L</div>
          </div>
        </div>

        {/* Organs */}
        <div className="mb-[18px]">
          <label className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary mb-1.5">
            Number of involved organs
            <span className="relative inline-flex cursor-help group">
              <svg size={15} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a9ab8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-navy text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none z-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-5 after:border-transparent after:border-t-navy">
                placeholder – explanation of this variable to be added
              </span>
            </span>
          </label>
          <div className="relative">
            <select
              value={values.organs}
              onChange={(e) => handleSelectChange('organs', e.target.value)}
              className="w-full px-3 py-2 pr-9 border border-border rounded-lg bg-white font-[DM_Sans,sans-serif] text-sm text-text-primary appearance-none cursor-pointer outline-none focus:border-blue transition-[border-color] duration-150"
            >
              <option value="">— Select —</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">≥ 6</option>
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
                ear-nose-throat
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

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-navy text-white border-none rounded-lg font-[DM_Sans,sans-serif] text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2 mt-2 hover:bg-navy-mid active:scale-[0.99] transition-[background,transform] duration-150 tracking-wide"
        >
          <Calculator size={16} strokeWidth={2.2} />
          Calculate score
        </button>

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
              Enter the patient's values on the left and click <strong>Calculate score</strong> to see the result.
            </p>
          </div>
        ) : (
          /* Result content */
          <div>
            {/* Top: Gauge + interpretation */}
            <div className="flex items-start gap-8 mb-7">
              <div className="shrink-0 flex flex-col items-center gap-2">
                <Gauge percentage={Math.round(result.probability * 100)} />
                <div className="text-xs text-text-muted text-center font-medium max-w-[130px] leading-tight">
                  Eosinophilia Differentiation Score
                </div>
              </div>

              <div className="flex-1">
                <div className="font-heading text-xl font-bold text-navy mb-1">Eosinophilia Differentiation Score</div>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-[48px] font-bold text-navy leading-none">{Math.round(result.probability * 100)}</span>
                  <span className="text-lg font-semibold text-text-muted">/ 100</span>
                </div>
                <p className="text-sm text-text-secondary mb-[18px] leading-relaxed">
                  The Eosinophilia Differentiation Score (EDS) is a multivariate tool that estimates the likelihood of
                  clonal eosinophilia based on routinely available clinical parameters. It is intended as a supportive
                  reference and should be interpreted in the full clinical context.
                </p>
                <Link
                  to="/methods"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-blue-dark transition-colors duration-150"
                >
                  <ExternalLink size={15} />
                  View methods & interpretation
                </Link>
              </div>
            </div>

            <hr className="border-t border-border my-6" />

            {/* Contribution cards */}
            <ContributionCards contributions={result.contributions} />
          </div>
        )}
      </div>
    </div>
  );
}
