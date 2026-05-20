import { useState, useRef, useCallback } from 'react';
import { ChevronDown, Dna, Heart, AirVent, ArrowRight, Flag, Lock } from 'lucide-react';

/* ── Main WorkupPage ── */
export default function WorkupPage() {
  const [activeTab, setActiveTab] = useState<'cardiac' | 'pulmonary'>('cardiac');

  return (
    <div className="animate-fade-in">
      <div className="page-header mb-7">
        <h1 className="font-heading text-[26px] font-bold text-navy mb-1.5 tracking-tight">Diagnostic workup</h1>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed mb-7 max-w-[700px]">
        This stepwise approach supports the differential diagnosis of eosinophilia and helps to distinguish between
        clonal and non-clonal eosinophilic disorders.
      </p>

      {/* Key diagnostic criteria */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mb-4">Key diagnostic criteria (overview)</h2>
      <CriteriaAccordion />

      {/* Genetic Workup */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mt-7 mb-4">Genetic workup</h2>
      <GeneticWorkup />

      {/* Clinical Workup Tabs */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mt-7 mb-4">Clinical workup</h2>
      <div className="flex gap-2.5 mb-6">
        <button
          onClick={() => setActiveTab('cardiac')}
          className={`flex items-center gap-2 px-[18px] py-2 border rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 ${
            activeTab === 'cardiac'
              ? 'bg-navy border-navy text-white'
              : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue hover:bg-blue-pale'
          }`}
        >
          <Heart size={15} />
          Cardiac involvement
        </button>
        <button
          onClick={() => setActiveTab('pulmonary')}
          className={`flex items-center gap-2 px-[18px] py-2 border rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 ${
            activeTab === 'pulmonary'
              ? 'bg-navy border-navy text-white'
              : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue hover:bg-blue-pale'
          }`}
        >
          <AirVent size={15} />
          Pulmonary involvement
        </button>
      </div>

      {activeTab === 'cardiac' ? <CardiacWorkup /> : <PulmonaryWorkup />}
    </div>
  );
}

/* ── Criteria Accordion ── */
const criteriaData = [
  {
    id: 'mln',
    title: 'Myeloid / Lymphoid Neoplasms with TK Fusion Genes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 2 C8 7, 16 9, 16 12 C16 15, 8 17, 8 22" strokeLinecap="round" />
        <path d="M16 2 C16 7, 8 9, 8 12 C8 15, 16 17, 16 22" strokeLinecap="round" />
        <line x1="9.2" y1="5.5" x2="14.8" y2="5.5" strokeLinecap="round" />
        <line x1="9.5" y1="9.5" x2="14.5" y2="9.5" strokeLinecap="round" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" strokeLinecap="round" />
        <line x1="9.2" y1="18.5" x2="14.8" y2="18.5" strokeLinecap="round" />
      </svg>
    ),
    iconBg: 'bg-[#f0ebff] text-[#7c5cbf]',
    content: (
      <div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Feature</th>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Disease-defining fusion gene</td><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Rearrangements in <em>PDGFRA</em>, <em>PDGFRB</em>, <em>FGFR1</em>, <em>JAK2</em>, <em>ABL1</em>, <em>FLT3</em></td></tr>
            <tr><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Other defined tyrosine kinase fusions</td><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top"><em>ETV6::FGFR2</em>; <em>ETV6::LYN</em>; <em>ETV6::NTRK3</em>; <em>RANBP2::ALK</em>; <em>BCR::RET</em>; <em>FGFR1OP::RET</em></td></tr>
            <tr><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Eosinophilia</td><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Recurrent eosinophilia is common and may be the presenting feature</td></tr>
          </tbody>
        </table>
        <div className="mt-5">
          <div className="text-[13px] font-bold text-navy mb-1.5">Genetic abnormalities, clinical presentations, and targeted therapy of myeloid/lymphoid neoplasms with eosinophilia and tyrosine kinase gene fusions</div>
          <p className="text-[11px] text-text-muted mb-2.5">Adapted from: Arber DA et al. <em>Blood</em>. 2022;140(11):1200–1228 (ICC Classification, Table 10)</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr>
                  <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">TK gene</th>
                  <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Most common fusion</th>
                  <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Partner genes / variants</th>
                  <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Typical clinical & BM manifestations</th>
                  <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Targeted therapy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['PDGFRA', 'Cryptic del 4q12 / FIP1L1::PDGFRA', 'CDK5RAP2; STRN; KIF5B; TNKS2; ETV6; BCR', 'Common: CEL-like BM with frequent extramedullary involvement; Others: B-ALL/LL, AML or mast cell proliferations', 'Excellent response to TKI (imatinib)'],
                  ['PDGFRB', 't(5;12)(q32;p13.2) / ETV6::PDGFRB', '> 30 partners, cryptic', 'Common: CEL-like or monocytosis with eosinophilia; Others: ALL/LL, AML or mast cell proliferations', 'Excellent response to TKI'],
                  ['FGFR1', 't(8;13)(p11.2;q12.1) / ZMYM2::FGFR1', '15 other partners including BCR', 'Common: Extramedullary T-ALL/LL with BM MPN-like or blast phase; Others: B-ALL/LL, myeloid sarcoma, AML or MPAL', 'High rate of response to FGFR inhibitor (e.g. pemigatinib), especially in chronic phase'],
                  ['JAK2', 't(8;9)(p22;p24.1) / PCM1::JAK2', 'ETV6 and BCR', 'Common: MPN or MDS/MPN-like BM with eosinophilia; Others: B- and T-ALL/LL with BM MPN', 'Limited responses to ruxolitinib'],
                  ['FLT3', 't(12;13)(p13.2;q12.2) / ETV6::FLT3', 'ZMYM2; TRIP11; SPTBN1; GOLGB1; CCDC88C; MYO18A; BCR', 'T-ALL/LL or myeloid sarcoma with CEL-like or MDS/MPN BM features', 'Various responses to specific FLT3 inhibitors'],
                  ['ABL1', 't(9;12)(q34.1;p13.2) / ETV6::ABL1', 'Unknown', 'CML-like with frequent eosinophilia in chronic or blast phase', 'Various responses to second-generation TKI'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-1.5 py-1 text-text-secondary border-b border-border align-top">
                        {j === 0 ? <em>{cell}</em> : cell.includes('<em>') || cell.includes('em>') || cell.includes('(') || cell.includes('::') ? <span dangerouslySetInnerHTML={{ __html: cell }} /> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">Adapted from the current ICC Classification (Arber DA et al. <em>Blood</em>. 2022;140(11):1200–1228)</p>
      </div>
    ),
  },
  {
    id: 'sm',
    title: 'Systemic Mastocytosis',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="13" r="6" />
        <circle cx="11" cy="13" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="19" cy="5" r="1.2" fill="currentColor" />
        <circle cx="21" cy="9" r="1" fill="currentColor" />
        <circle cx="17" cy="3" r="0.9" fill="currentColor" />
        <line x1="15.2" y1="8.2" x2="18" y2="5.5" />
        <line x1="16.5" y1="9.5" x2="19.5" y2="8.5" />
        <line x1="15" y1="7" x2="17.2" y2="4" />
      </svg>
    ),
    iconBg: 'bg-[#e6f5f5] text-[#2a9d8f]',
    content: (
      <div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Feature</th>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-bg"><td colSpan={2} className="px-2 py-1.5 border-b border-border">
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap bg-blue-pale text-blue">Major criterion</span>
            </td></tr>
            <tr><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Multifocal dense mast cell infiltrates</td><td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">Tryptase- and/or CD117-positive mast cell aggregates (≥ 15 mast cells) in bone marrow sections and/or other extracutaneous organs</td></tr>
            <tr className="bg-bg"><td colSpan={2} className="px-2 py-1.5 border-b border-border">
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap bg-bg text-text-secondary">Minor criteria</span>
              <span className="text-[11px] font-normal text-text-muted ml-1">— in absence of major criterion, ≥ 3 of 4 required</span>
            </td></tr>
            {[
              ['Atypical mast cell morphology', '> 25% of mast cells are spindle-shaped or have atypical immature morphology in bone marrow biopsy or other extracutaneous organ sections'],
              ['Abnormal surface markers', 'Mast cells express CD25, CD2, and/or CD30 in addition to standard mast cell markers (in bone marrow, peripheral blood, or extracutaneous organs)'],
              ['KIT D816V mutation', 'Activating KIT D816V or other activating KIT mutation detected in bone marrow, peripheral blood, or extracutaneous organs'],
              ['Elevated serum tryptase', 'Persistently > 20 ng/mL. Note: in cases of SM with associated myeloid neoplasm (SM-AMN), elevated tryptase does not count as a SM minor criterion'],
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[0]}</td>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[1]}</td>
              </tr>
            ))}
            <tr className="bg-[#fffbec]"><td colSpan={2} className="px-2 py-1.5 text-navy text-xs font-medium rounded-b-lg">
              ⚡ Diagnosis requires <strong>1 Major + 1 Minor</strong>, or <strong>3 Minor</strong> criteria
            </td></tr>
          </tbody>
        </table>
        <p className="text-[11px] text-text-muted italic mt-2.5">Adapted from the current ICC Classification (Arber DA et al. <em>Blood</em>. 2022;140(11):1200–1228)</p>
      </div>
    ),
  },
  {
    id: 'egpa',
    title: 'Eosinophilic Granulomatosis with Polyangiitis (EGPA)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20 L12 13" /><path d="M12 13 L7 8" /><path d="M12 13 L17 8" />
        <path d="M7 8 L4 4" /><path d="M7 8 L10 4" /><path d="M17 8 L14 4" /><path d="M17 8 L20 4" />
      </svg>
    ),
    iconBg: 'bg-[#fff0ea] text-[#e07050]',
    content: (
      <div>
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Feature</th>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-center">Weight</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Maximum eosinophil count ≥ 1 × 10⁹/L', '+5', 'text-accent-green'],
              ['Obstructive airway disease', '+3', 'text-accent-green'],
              ['Nasal polyps', '+3', 'text-accent-green'],
              ['Extravascular eosinophilic predominant inflammation (biopsy)', '+2', 'text-accent-green'],
              ['Mononeuritis multiplex / motor neuropathy not due to radiculopathy', '+1', 'text-accent-green'],
              ['Cytoplasmic ANCA or anti-PR3 ANCA positivity', '-3', 'text-accent-red'],
              ['Hematuria', '-1', 'text-accent-red'],
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-1.5 py-1 text-text-secondary border-b border-border">{row[0]}</td>
                <td className={`px-1.5 py-1 border-b border-border text-center font-bold ${row[2]}`}>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 bg-[#fffbec] text-navy text-xs font-medium p-2.5 rounded-lg border-l-3 border-accent-orange">
          ⚡ ACR/EULAR weighted score ≥ 6 classifies EGPA (research use). Alternative causes of eosinophilia and vasculitis must be excluded.
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">Adapted from the current ICC Classification (Arber DA et al. <em>Blood</em>. 2022;140(11):1200–1228)</p>
      </div>
    ),
  },
  {
    id: 'ihes',
    title: 'Idiopathic Hypereosinophilic Syndrome',
    icon: (
      <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity=".9" />
        <circle cx="24" cy="12" r="3" fill="currentColor" opacity=".5" />
        <circle cx="18" cy="22" r="5" fill="currentColor" opacity=".7" />
        <circle cx="10" cy="22" r="2.5" fill="currentColor" opacity=".4" />
        <circle cx="26" cy="22" r="2.5" fill="currentColor" opacity=".4" />
      </svg>
    ),
    iconBg: 'bg-[#fff8e6] text-[#c9943a]',
    content: (
      <div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Feature</th>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Persistent peripheral blood hypereosinophilia', 'Eosinophil count ≥ 1.5 × 10⁹/L and ≥ 10% eosinophils'],
              ['Organ damage / dysfunction', 'Attributable to tissue eosinophilic infiltrate (cardiac, pulmonary, neurologic, gastrointestinal, or dermatologic)'],
              ['No underlying reactive condition', 'No evidence of a reactive, well-defined autoimmune disease or neoplastic condition/disorder underlying the hypereosinophilia'],
              ['Exclusion of lymphocyte variant HES', 'Absence of clonal T-cell population producing eosinophilopoietic cytokines'],
              ['Normal bone marrow morphology', 'Bone marrow morphologically within normal limits except for increased eosinophils'],
              ['Exclusion of clonal causes', 'No molecular genetic clonal abnormality; clonal hematopoiesis of indeterminate potential (CHIP) does not exclude diagnosis'],
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[0]}</td>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[1]}</td>
              </tr>
            ))}
            <tr className="bg-[#fffbec]"><td colSpan={2} className="px-2 py-1.5 text-navy text-xs font-medium rounded-b-lg">
              ⚡ iHES is a diagnosis of exclusion. Only after all reactive, autoimmune, and clonal etiologies (including <em>PDGFRA</em>, <em>PDGFRB</em>, <em>FGFR1</em>, <em>JAK2</em> rearrangements) have been ruled out may the diagnosis be applied.
            </td></tr>
          </tbody>
        </table>
        <p className="text-[11px] text-text-muted italic mt-2.5">Adapted from the current ICC Classification (Arber DA et al. <em>Blood</em>. 2022;140(11):1200–1228)</p>
      </div>
    ),
  },
];

function CriteriaAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [arrowLeft, setArrowLeft] = useState(60);
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  const toggle = (id: string) => {
    const nextId = openId === id ? null : id;
    setOpenId(nextId);
    if (nextId) {
      // Position arrow under the clicked card after render
      requestAnimationFrame(() => {
        const areaEl = areaRef.current;
        const cardEl = cardRefs.current.get(nextId);
        if (areaEl && cardEl) {
          const areaRect = areaEl.getBoundingClientRect();
          const cardRect = cardEl.getBoundingClientRect();
          const left = Math.max(10, (cardRect.left - areaRect.left) + cardRect.width / 2 - 10);
          setArrowLeft(left);
        }
      });
    }
  };

  return (
    <div className="criteria-area" ref={areaRef}>
      <div className="grid grid-cols-4 gap-3.5 mb-8">
        {criteriaData.map((crit) => {
          const isOpen = openId === crit.id;
          return (
            <div key={crit.id} ref={(el) => setCardRef(crit.id, el)} className="flex flex-col">
              <div
                onClick={() => toggle(crit.id)}
                className={`bg-white border rounded-xl p-5 shadow-sm cursor-pointer select-none transition-[box-shadow,border-color] duration-150 hover:shadow-md hover:border-blue flex flex-col flex-1 ${
                  isOpen ? 'border-blue shadow-md' : 'border-border'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${crit.iconBg}`}>
                  {crit.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-navy mb-2.5 leading-tight flex-1">{crit.title}</h3>
                <div className="text-xs text-blue font-semibold flex items-center gap-1">
                  View criteria
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bubble panel */}
      {openId && (
        <div className="bg-white border-2 border-blue rounded-xl shadow-md mb-4 overflow-visible relative animate-fade-in">
          {/* Arrow */}
          <div
            className="absolute -top-2.5 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-blue"
            style={{ left: `${arrowLeft}px` }}
          />
          <div
            className="absolute -top-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"
            style={{ left: `${arrowLeft + 2}px` }}
          />
          <div className="p-5">
            {criteriaData.find((c) => c.id === openId)?.content}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Genetic Workup ── */
function GeneticWorkup() {
  const [unlockedStep, setUnlockedStep] = useState(1);

  const unlock = (step: number) => {
    setUnlockedStep(step);
    setTimeout(() => {
      document.getElementById(`gw-step-${step}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Step 1 */}
      <FlowStep number={1} isActive={true} isLast={unlockedStep < 2}>
        <FlowPanel
          icon={<Dna size={18} />}
          title="Initial genetic diagnostics"
          subtitle="Standard cytogenetic and molecular screening"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 my-3.5">
            <MethodCard title="Conventional cytogenetics (karyotype)" />
            <MethodCard title="Fluorescence in situ hybridization (FISH)" />
            <MethodCard title="Reverse transcriptase PCR (RT-PCR)" />
          </div>
          <button
            onClick={() => unlock(2)}
            className="inline-flex items-center gap-1.5 px-[18px] py-2 bg-navy text-white border-none rounded-lg font-[DM_Sans,sans-serif] text-[13px] font-semibold cursor-pointer mt-2 hover:bg-blue transition-colors duration-150"
          >
            Next <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </FlowPanel>
      </FlowStep>

      {/* Step 2 */}
      <FlowStep number={2} isActive={unlockedStep >= 2} isLast={unlockedStep < 3}>
        <FlowPanel
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2 C8 7, 16 9, 16 12 C16 15, 8 17, 8 22" strokeLinecap="round" />
              <path d="M16 2 C16 7, 8 9, 8 12 C8 15, 16 17, 16 22" strokeLinecap="round" />
              <line x1="9.5" y1="9.5" x2="14.5" y2="9.5" strokeLinecap="round" />
              <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" strokeLinecap="round" />
            </svg>
          }
          title="Next generation sequencing (NGS)"
          subtitle="Targeted myeloid panel sequencing"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 my-3.5">
            <MethodCard title="Myeloid gene panel (NGS)" />
            <MethodCard title="Variant interpretation" />
          </div>
          <button
            onClick={() => unlock(3)}
            className="inline-flex items-center gap-1.5 px-[18px] py-2 bg-navy text-white border-none rounded-lg font-[DM_Sans,sans-serif] text-[13px] font-semibold cursor-pointer mt-2 hover:bg-blue transition-colors duration-150"
          >
            Next <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </FlowPanel>
      </FlowStep>

      {/* Step 3 */}
      <FlowStep number={3} isActive={unlockedStep >= 3} isLast={true} isFlag={true}>
        <FlowPanel
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          }
          title="Advanced sequencing"
          subtitle="Whole transcriptome and genome sequencing"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 my-3.5">
            <MethodCard title="Whole transcriptome sequencing (WTS)" />
            <MethodCard title="Whole genome sequencing (WGS)" />
          </div>
        </FlowPanel>
      </FlowStep>
    </div>
  );
}

function FlowStep({
  number,
  isActive,
  isLast,
  isFlag,
  children,
}: {
  number: number;
  isActive: boolean;
  isLast: boolean;
  isFlag?: boolean;
  children: React.ReactNode;
}) {
  if (!isActive) {
    return (
      <div className="flex gap-[18px] items-start" id={`gw-step-${number}`} style={{ display: 'none' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="flex gap-[18px] items-start" id={`gw-step-${number}`}>
      <div className="flex flex-col items-center shrink-0 w-8">
        {isFlag ? (
          <div className="w-8 h-8 bg-white border-2 border-border rounded-full flex items-center justify-center text-text-muted">
            <Flag size={14} />
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue text-white rounded-full flex items-center justify-center font-heading text-sm font-bold shrink-0 relative z-10">
            {number}
          </div>
        )}
        {!isLast && <div className="w-[2px] flex-1 min-h-[20px] bg-border my-1" />}
      </div>
      <div className="flex-1 mb-5">{children}</div>
    </div>
  );
}

function FlowPanel({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className="w-9 h-9 bg-blue-pale rounded-lg flex items-center justify-center text-blue">
          {icon}
        </div>
        <div>
          <h3 className="font-heading text-[15px] font-semibold text-navy">{title}</h3>
          <p className="text-[13px] text-text-muted mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function MethodCard({ title }: { title: string }) {
  return (
    <div className="bg-bg border border-border rounded-lg p-3">
      <div className="text-xs font-bold text-navy mb-1.5">{title}</div>
      <p className="text-xs text-text-muted italic leading-relaxed m-0">
        [ Placeholder – indication, specimen, and interpretation details to be added ]
      </p>
    </div>
  );
}

/* ── Cardiac Workup ── */
function CardiacWorkup() {
  const [trop, setTrop] = useState('');
  const [bnp, setBnp] = useState('');
  const [lge, setLge] = useState('');
  const [showResult, setShowResult] = useState(false);

  const tropVal = parseFloat(trop) || 0;
  const bnpVal = parseFloat(bnp) || 0;

  let score = 0;
  const details: string[] = [];

  const canCompute = trop !== '' && bnp !== '' && lge !== '';

  if (canCompute) {
    if (tropVal >= 0.045) { score += 1; details.push('hs-Troponin I ≥ 0.045 µg/L: +1'); }
    if (bnpVal >= 125) { score += 1; details.push('NT-proBNP ≥ 125 ng/L: +1'); }
    if (lge === 'yes') { score += 3; details.push('LGE positive: +3'); }
  }

  const riskLabel = score === 0 ? 'Low cardiac risk' : score <= 3 ? 'Intermediate cardiac risk' : 'High cardiac risk';

  const handleInput = () => {
    if (canCompute && !showResult) setShowResult(true);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Step 1: Input */}
      <div className="flex gap-[18px] items-start">
        <div className="flex flex-col items-center shrink-0 w-8">
          <div className="w-8 h-8 bg-blue text-white rounded-full flex items-center justify-center font-heading text-sm font-bold shrink-0 relative z-10">1</div>
          <div className="w-[2px] flex-1 min-h-[20px] bg-border my-1" />
        </div>
        <div className="flex-1 mb-5">
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-9 h-9 bg-blue-pale rounded-lg flex items-center justify-center text-blue">
                <Heart size={18} />
              </div>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-navy">Cardiac parameters</h3>
                <p className="text-[13px] text-text-muted mt-0.5">Enter cardiac biomarkers and imaging findings.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3.5 items-end">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-1.5">hs-Troponin I (µg/L)</label>
                <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
                  <input
                    type="number"
                    value={trop}
                    onChange={(e) => { setTrop(e.target.value); handleInput(); }}
                    placeholder="e.g. 0.040"
                    min="0"
                    step="0.001"
                    className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
                  />
                  <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">µg/L</div>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-1.5">NT-proBNP (ng/L)</label>
                <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:border-blue transition-[border-color] duration-150">
                  <input
                    type="number"
                    value={bnp}
                    onChange={(e) => { setBnp(e.target.value); handleInput(); }}
                    placeholder="e.g. 120"
                    min="0"
                    step="1"
                    className="flex-1 px-3 py-2 border-none outline-none font-[DM_Sans,sans-serif] text-sm text-text-primary bg-transparent"
                  />
                  <div className="px-3 py-2 text-[13px] text-text-muted bg-bg border-l border-border whitespace-nowrap">ng/L</div>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-1.5">LGE in MRI</label>
                <div className="relative">
                  <select
                    value={lge}
                    onChange={(e) => { setLge(e.target.value); if (!showResult) setShowResult(true); }}
                    className="w-full px-3 py-2 pr-9 border border-border rounded-lg bg-white font-[DM_Sans,sans-serif] text-sm text-text-primary appearance-none cursor-pointer outline-none focus:border-blue transition-[border-color] duration-150"
                  >
                    <option value="">— Select —</option>
                    <option value="yes">Positive</option>
                    <option value="no">Negative / not done</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-text-muted pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Result */}
      <div className={`flex gap-[18px] items-start ${!canCompute ? 'opacity-40 pointer-events-none' : ''}`}>
        <div className="flex flex-col items-center shrink-0 w-8">
          <div className={`w-8 h-8 bg-white border-2 rounded-full flex items-center justify-center ${showResult && canCompute ? 'border-accent-green text-accent-green' : 'border-border text-text-muted'}`}>
            <Flag size={14} />
          </div>
        </div>
        <div className="flex-1 mb-5">
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${showResult && canCompute ? 'bg-blue-pale text-blue' : 'bg-bg text-text-muted'}`}>
                <Lock size={18} />
              </div>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-navy">Cardiac risk assessment</h3>
                <p className="text-[13px] text-text-muted mt-0.5">
                  {showResult && canCompute ? 'Cardiac risk assessment complete.' : 'Complete the parameters to see the result.'}
                </p>
              </div>
            </div>

            {showResult && canCompute && (
              <div>
                <div className="inline-flex items-center gap-2 px-[18px] py-2.5 rounded-lg font-bold text-base mb-3.5 bg-bg text-navy border border-border">
                  {riskLabel} (Score: {score})
                </div>
                <div className="text-[13px] text-text-secondary mb-3.5">
                  <strong>Score components:</strong> {details.length ? details.join(' · ') : 'No points scored'} &nbsp;|&nbsp;{' '}
                  <strong>Total: {score} point{score !== 1 ? 's' : ''}</strong>
                </div>
                <p className="mt-2.5 text-[11px] text-text-muted italic">
                  ⚠ This cardiac risk score has not yet been formally validated and should be interpreted with caution. It is intended as a preliminary clinical support tool only.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pulmonary Workup (placeholder) ── */
function PulmonaryWorkup() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex gap-[18px] items-start">
        <div className="flex flex-col items-center shrink-0 w-8">
          <div className="w-8 h-8 bg-blue text-white rounded-full flex items-center justify-center font-heading text-sm font-bold shrink-0 relative z-10">1</div>
          <div className="w-[2px] flex-1 min-h-[20px] bg-border my-1" />
        </div>
        <div className="flex-1 mb-5">
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-9 h-9 bg-blue-pale rounded-lg flex items-center justify-center text-blue">
                <AirVent size={18} />
              </div>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-navy">Pulmonary parameters</h3>
                <p className="text-[13px] text-text-muted mt-0.5">This section is a placeholder and will be completed in a subsequent version.</p>
              </div>
            </div>
            <div className="bg-white border border-dashed border-border rounded-xl p-5 text-center text-text-muted text-[13px]">
              <strong className="block text-sm font-semibold text-text-secondary mb-1">Work in progress</strong>
              Specific pulmonary parameters (e.g. spirometry, DLCO, CT findings) will be added here.
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-[18px] items-start opacity-40 pointer-events-none">
        <div className="flex flex-col items-center shrink-0 w-8">
          <div className="w-8 h-8 bg-white border-2 border-border rounded-full flex items-center justify-center text-text-muted">
            <Flag size={14} />
          </div>
        </div>
        <div className="flex-1 mb-5">
          <div className="bg-white border border-dashed border-border rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-[15px] font-semibold text-text-secondary">Pulmonary risk assessment</h3>
              <p className="text-[13px] text-text-muted mt-0.5">The result will appear here once the section is fully implemented.</p>
            </div>
            <Lock size={18} className="text-text-muted shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
