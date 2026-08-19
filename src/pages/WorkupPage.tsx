import { useState, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Dna, Database } from 'lucide-react';
import {
  MastCellIcon,
  VesselsIcon,
  EosinophilIcon,
  SpleenIcon,
  HeartIcon,
  LungsIcon,
  EntIcon,
  StomachIcon,
  SkinIcon,
  KidneyIcon,
  NerveIcon,
  BrainIcon,
  LymphNodeIcon,
} from '../components/icons';

/* ── Abbreviations of the M/LN-TK table, shown as hover tooltips ── */
const ABBREVIATIONS: Record<string, string> = {
  ALL: 'Acute lymphoid leukemia',
  AML: 'Acute myeloid leukemia',
  BM: 'Bone marrow',
  CEL: 'Chronic eosinophilic leukemia',
  CML: 'Chronic myeloid leukemia',
  LL: 'Lymphoblastic lymphoma',
  MDS: 'Myelodysplastic syndrome',
  MPAL: 'Mixed-phenotype acute leukemia',
  MPN: 'Myeloproliferative neoplasm',
  TK: 'Tyrosine kinase',
  TKI: 'Tyrosine kinase inhibitor',
};

/* Longest terms first so e.g. "SM-AMN" wins over "SM". */
const ABBR_RE = new RegExp(
  `\\b(${Object.keys(ABBREVIATIONS)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`,
  'g'
);

/**
 * An abbreviation with its expansion on hover/focus. The tooltip is rendered
 * into document.body so it is not clipped by scrollable table containers.
 */
function Abbr({ term }: { term: string }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  const show = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos({ top: rect.top - 6, left: rect.left + rect.width / 2 });
  };
  const hide = () => setPos(null);

  return (
    <>
      <span
        ref={ref}
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={pos ? tooltipId : undefined}
        className="underline decoration-dotted decoration-text-muted underline-offset-2 cursor-help outline-none"
      >
        {term}
      </span>
      {pos &&
        createPortal(
          <span
            id={tooltipId}
            role="tooltip"
            className="fixed z-[100] -translate-x-1/2 -translate-y-full bg-navy text-white text-[11px] font-medium px-2 py-1 rounded shadow-md pointer-events-none max-w-[240px] text-center leading-snug"
            style={{ top: pos.top, left: pos.left }}
          >
            {ABBREVIATIONS[term]}
          </span>,
          document.body
        )}
    </>
  );
}

/** Turn every known abbreviation inside a plain string into a hover tooltip. */
function AbbrText({ children }: { children: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  ABBR_RE.lastIndex = 0;
  for (let m = ABBR_RE.exec(children); m !== null; m = ABBR_RE.exec(children)) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    parts.push(<Abbr key={m.index} term={m[0]} />);
    last = m.index + m[0].length;
  }
  if (!parts.length) return <>{children}</>;
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}

/* ── Clinical tab types & data ── */
type TabId = 'cardiac' | 'pulmonary' | 'ent' | 'gi' | 'skin' | 'kidney' | 'pns' | 'cns' | 'spleen' | 'lymph';

const TAB_ICONS: Record<TabId, React.ReactNode> = {
  cardiac: <HeartIcon size={15} />,
  pulmonary: <LungsIcon size={15} />,
  ent: <EntIcon size={15} />,
  gi: <StomachIcon size={15} />,
  skin: <SkinIcon size={15} />,
  kidney: <KidneyIcon size={15} />,
  pns: <NerveIcon size={15} />,
  cns: <BrainIcon size={15} />,
  spleen: <SpleenIcon size={15} />,
  lymph: <LymphNodeIcon size={15} />,
};

/* Organ systems are listed alphabetically by label. */
const TABS: { id: TabId; label: string; cardTitle?: string }[] = [
  { id: 'cardiac', label: 'Cardiac involvement' },
  { id: 'cns', label: 'CNS involvement' },
  { id: 'ent', label: 'ENT involvement', cardTitle: 'Ear-nose-throat (ENT) involvement' },
  { id: 'gi', label: 'Gastrointestinal incl. liver', cardTitle: 'Gastrointestinal involvement including liver involvement' },
  { id: 'kidney', label: 'Kidney involvement' },
  { id: 'lymph', label: 'Lymph node involvement' },
  { id: 'pns', label: 'PNS involvement' },
  { id: 'pulmonary', label: 'Pulmonary involvement' },
  { id: 'skin', label: 'Skin involvement' },
  { id: 'spleen', label: 'Spleen involvement' },
];

interface TabRow { modality: string; findings: string }
interface TabData { rows: TabRow[]; references: string[] }

const tabData: Record<TabId, TabData> = {
  cardiac: {
    rows: [
      { modality: 'Biopsy', findings: 'e.g., eosinophilic infiltration, eosinophilic inflammation, fibrotic changes, necrosis' },
      { modality: 'Magnetic resonance imaging (MRI)', findings: 'e.g., late gadolinium enhancement, thrombus, pericardial effusion, reduced ejection fraction, signs of myocardial edema' },
      { modality: 'Echocardiography', findings: 'e.g., valvular heart disease, reduced ejection fraction, pericardial effusion' },
      { modality: 'Electrocardiography (ECG)', findings: 'e.g., arrhythmia, low voltage, ST-segment abnormalities' },
      { modality: 'Laboratory parameters', findings: 'e.g., elevated troponin I or T (TnI/TnT) and (glomerular filtration rate-corrected) N-terminal prohormone B-type natriuretic peptide (NT-proBNP)' },
    ],
    references: [
      'Bishop, G. G., Bergin, J. D., & Kramer, C. M. (2001). Hypereosinophilic syndrome and restrictive cardiomyopathy due to apical thrombi. Circulation, 104(2), E3-4.',
      'Cereda, A. F., Pedrotti, P., De Capitani, L., Giannattasio, C., & Roghi, A. (2017). Comprehensive evaluation of cardiac involvement in eosinophilic granulomatosis with polyangiitis (EGPA) with cardiac magnetic resonance. Eur J Intern Med, 39, 51-56.',
      'Cheung, C. C., Constantine, M., Ahmadi, A., Shiau, C., & Chen, L. Y. C. (2017). Eosinophilic Myocarditis. Am J Med Sci, 354(5), 486-492.',
      'Dennert, R. M., van Paassen, P., Schalla, S., et al. (2010). Cardiac involvement in Churg-Strauss syndrome. Arthritis Rheum, 62(2), 627-634.',
      'Garcia-Vives, E., Rodriguez-Palomares, J. F., Harty, L., Solans-Laque, R., & Jayne, D. (2021). Heart disease in eosinophilic granulomatosis with polyangiitis (EGPA) patients: a screening approach proposal. Rheumatology (Oxford), 60(10), 4538-4547.',
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia and the management of hypereosinophilic syndromes. Orphanet J Rare Dis, 18(1), 100.',
      'Hazebroek, M. R., Kemna, M. J., Schalla, S., et al. (2015). Prevalence and prognostic relevance of cardiac involvement in ANCA-associated vasculitis. Int J Cardiol, 199, 170-179.',
      'Kleinfeldt, T., Nienaber, C. A., Kische, S., et al. (2010). Cardiac manifestation of the hypereosinophilic syndrome: new insights. Clin Res Cardiol, 99(7), 419-427.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes: First Findings From a Nationwide Multicenter Cohort. Allergy, 80(4), 1100-1110.',
      'Mankad, R., Bonnichsen, C., & Mankad, S. (2016). Hypereosinophilic syndrome: cardiac diagnosis and management. Heart, 102(2), 100-106.',
      'Valent, P., Klion, A. D., Roufosse, F., et al. (2023). Proposed refined diagnostic criteria and classification of eosinophil disorders and related syndromes. Allergy, 78(1), 47-59.',
    ],
  },
  pulmonary: {
    rows: [
      { modality: 'Biopsy/Bronchoalveolar lavage (BAL)', findings: 'e.g., eosinophilic infiltration, eosinophilic inflammation, high number of eosinophils in BAL' },
      { modality: 'Computed tomography (CT)', findings: 'e.g., parenchymal opacities, airway abnormalities, pleural effusion, nodules, emphysema' },
      { modality: 'X-ray', findings: 'e.g., parenchymal opacities, airway abnormalities, pleural effusion, nodules, emphysema' },
      { modality: 'Pulmonary function test (PFT)', findings: 'e.g., reduced forced expiratory volume in 1 second (FEV1), increased fractional exhaled nitric oxide (FeNO), reduced Tiffeneau-index, increased airway resistance (Rtot)' },
    ],
    references: [
      'Cottin, V., Bel, E., Bottero, P., et al. (2016). Respiratory manifestations of eosinophilic granulomatosis with polyangiitis (Churg-Strauss). Eur Respir J, 48(5), 1429-1441.',
      'Emmi, G., Bass, J., Baratella, E., Akuthota, P., & Loscocco, G. G. (2026). Differential Diagnosis of Eosinophilic Lung Diseases. J Allergy Clin Immunol Pract, 14(3), 542-557.',
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Valent, P., Klion, A. D., Roufosse, F., et al. (2023). Proposed refined diagnostic criteria. Allergy, 78(1), 47-59.',
    ],
  },
  ent: {
    rows: [
      { modality: 'Biopsy', findings: 'e.g., eosinophilic infiltration of nasal mucosa, eosinophilic inflammation in nasal polyps, fibrosis' },
      { modality: 'Computed tomography (CT)', findings: 'e.g., signs of mucosal thickening, polypoid proliferation, air-fluid levels in acute sinusitis' },
      { modality: 'Rhinoscopy', findings: 'e.g., signs of mucosal inflammation, evidence of nasal polyposis' },
    ],
    references: [
      'Bacciu, A., Bacciu, S., Mercante, G., et al. (2006). Ear, nose and throat manifestations of Churg-Strauss syndrome. Acta Otolaryngol, 126(5), 503-509.',
      'Cottin, V., Bel, E., Bottero, P., et al. (2016). Respiratory manifestations of eosinophilic granulomatosis with polyangiitis. Eur Respir J, 48(5), 1429-1441.',
      "D'Onofrio, M., La Prova, D., Galdiero, M. R., et al. (2023). Early Ear, Nose and Throat Manifestations in EGPA. J Clin Med, 12(22).",
      'Fokkens, W. J., Lund, V. J., Hopkins, C., et al. (2020). European Position Paper on Rhinosinusitis and Nasal Polyps 2020. Rhinology, 58(Suppl S29), 1-464.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Nakamaru, Y., Takagi, D., Suzuki, M., et al. (2016). Otologic and Rhinologic Manifestations of EGPA. Audiol Neurootol, 21(1), 45-53.',
    ],
  },
  gi: {
    rows: [
      { modality: 'Biopsy/Ascites paracentesis', findings: 'e.g., eosinophilic tissue infiltration, elevated eosinophils in ascites' },
      { modality: 'Endoscopy', findings: 'e.g., edema, erosions, ulcerations, polypoid lesions, giant gastric folds (antrum/peripyloric)' },
      { modality: 'Computed tomography (CT)', findings: 'e.g., ascites, bowel wall thickening, hepatomegaly' },
      { modality: 'Sonography', findings: 'e.g., ascites, diffuse bowel wall thickening of small and/or large bowel, hepatomegaly' },
    ],
    references: [
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Kuang, F. L., Curtin, B. F., Alao, H., et al. (2020). Single-Organ and Multisystem HES Patients with GI Manifestations. J Allergy Clin Immunol Pract, 8(8), 2718-2726.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Nanagas, V. C., & Kovalszki, A. (2019). Gastrointestinal Manifestations of HES and Mast Cell Disorders. Clin Rev Allergy Immunol, 57(2), 194-212.',
      'Valent, P., Klion, A. D., Roufosse, F., et al. (2023). Proposed refined diagnostic criteria. Allergy, 78(1), 47-59.',
    ],
  },
  skin: {
    rows: [
      { modality: 'Biopsy', findings: 'e.g., perivascular/interstitial eosinophilic inflammatory infiltrate, epidermal necrosis' },
      { modality: 'Clinical examination', findings: 'e.g., pruritus, urticarial lesions, maculopapular lesions, erythroderma' },
    ],
    references: [
      'Brunetto, S., Buta, F., Gangemi, S., & Ricciardi, L. (2025). Immunological Markers Associated with Skin Manifestations of EGPA. Int J Mol Sci, 26(15).',
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Leiferman, K. M., & Peters, M. S. (2018). Eosinophil-Related Disease and the Skin. J Allergy Clin Immunol Pract, 6(5), 1462-1482.',
      'Valent, P., Klion, A. D., Roufosse, F., et al. (2023). Proposed refined diagnostic criteria. Allergy, 78(1), 47-59.',
    ],
  },
  kidney: {
    rows: [
      { modality: 'Biopsy', findings: 'e.g., eosinophilic interstitial nephritis, glomerular thrombosis and necrosis, tubulointerstitial nephritis, tubular atrophy' },
      { modality: 'Laboratory examinations', findings: 'e.g., impaired renal function, creatinine elevation' },
      { modality: 'Urine analyses', findings: 'e.g., proteinuria, hematuria' },
    ],
    references: [
      'Durel, C. A., Sinico, R. A., Teixeira, V., et al. (2021). Renal involvement in EGPA: a multicentric retrospective study of 63 biopsy-proven cases. Rheumatology (Oxford), 60(1), 359-365.',
      'Gauckler, P., Shin, J. I., Mayer, G., & Kronbichler, A. (2018). Eosinophilia and Kidney Disease. J Clin Med, 7(12).',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      "Reggiani, F., L'Imperio, V., Calatroni, M., Pagni, F., & Sinico, R. A. (2023). Renal involvement in EGPA. Front Med (Lausanne), 10, 1244651.",
      'Wu, Q. S., Yu, Z. L., Lin, X., Wu, Z. L., & Yang, L. (2026). Renal involvement in HES: a systematic review. Front Immunol, 17, 1820583.',
    ],
  },
  pns: {
    rows: [
      { modality: 'Biopsy', findings: 'e.g., axonal degeneration, demyelination, non-vasculitic eosinophilic infiltrates, endoneurinal edema' },
      { modality: 'Electrophysiology', findings: 'e.g., reduced amplitudes of sensory/motor evoked responses, abnormal conduction velocity, axonal polyneuropathy' },
      { modality: 'Clinical examination', findings: 'e.g., evidence of polyneuropathy without other cause, radiculopathy, mononeuritis multiplex' },
    ],
    references: [
      'Bennett, D. L., Groves, M., Blake, J., et al. (2008). The use of nerve and muscle biopsy in the diagnosis of vasculitis. J Neurol Neurosurg Psychiatry, 79(12), 1376-1381.',
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Monaco, S., Lucci, B., Laperchia, N., et al. (1988). Polyneuropathy in hypereosinophilic syndrome. Neurology, 38(3), 494-496.',
    ],
  },
  cns: {
    rows: [
      { modality: 'Biopsy/Cerebrospinal fluid (CSF)', findings: 'e.g., thromboembolic occlusion of small arteries, petechial hemorrhages, granulomatous inflammation, eosinophilic invasion into CSF (rare)' },
      { modality: 'Computed tomography (CT)', findings: 'e.g., hypodense areas in watershed/border-zone distribution, cortical and subcortical ischemic lesions' },
      { modality: 'Magnetic resonance imaging (MRI)', findings: 'e.g., ischemic lesions, cerebral infarction' },
      { modality: 'Clinical examination', findings: 'e.g., hemiparesis, hemiplegia, dysarthria, seizure' },
    ],
    references: [
      'Chen, H., Raza, H. K., Jing, J., et al. (2017). HES with central nervous system involvement. Brain Inj, 31(12), 1695-1700.',
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lee, D., & Ahn, T. B. (2014). Central nervous system involvement of HES. J Neurol Sci, 347(1-2), 281-287.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Liu, S., Guo, L., Fan, X., et al. (2021). Clinical features of CNS involvement in EGPA. Orphanet J Rare Dis, 16(1), 152.',
    ],
  },
  spleen: {
    rows: [
      { modality: 'Computed tomography (CT)', findings: 'splenomegaly' },
      { modality: 'Sonography', findings: 'splenomegaly' },
      { modality: 'Clinical examination', findings: 'palpable spleen below costal arch' },
    ],
    references: [
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Metzgeroth, G., Steiner, L., Naumann, N., et al. (2023). Myeloid/lymphoid neoplasms with eosinophilia and TK gene fusions. Leukemia, 37(9), 1860-1867.',
      'Ogbogu, P. U., Bochner, B. S., Butterfield, J. H., et al. (2009). HES: a multicenter, retrospective analysis. J Allergy Clin Immunol, 124(6), 1319-1325.',
    ],
  },
  lymph: {
    rows: [
      { modality: 'Computed tomography (CT)', findings: 'lymphadenopathy' },
      { modality: 'Sonography', findings: 'lymphadenopathy' },
      { modality: 'Clinical examination', findings: 'palpable lymph nodes' },
    ],
    references: [
      'Groh, M., Rohmer, J., Etienne, N., et al. (2023). French guidelines for the etiological workup of eosinophilia. Orphanet J Rare Dis, 18(1), 100.',
      'Lefèvre, G., Bleuse, S., Puyade, M., et al. (2025). Hypereosinophilia and Hypereosinophilic Syndromes. Allergy, 80(4), 1100-1110.',
      'Metzgeroth, G., Steiner, L., Naumann, N., et al. (2023). Myeloid/lymphoid neoplasms with eosinophilia and TK gene fusions. Leukemia, 37(9), 1860-1867.',
      'Ogbogu, P. U., Bochner, B. S., Butterfield, J. H., et al. (2009). HES: a multicenter, retrospective analysis. J Allergy Clin Immunol, 124(6), 1319-1325.',
    ],
  },
};

/* ── Collapsible References ── */
function CollapsibleRefs({ refs }: { refs: string[] }) {
  const [open, setOpen] = useState(false);
  if (!refs.length) return null;
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-blue transition-colors duration-150"
      >
        <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        References ({refs.length})
      </button>
      {open && (
        <div className="mt-2.5 text-[11px] text-text-muted leading-relaxed space-y-1.5 border-l-2 border-border pl-3 animate-fade-in">
          {refs.map((r, i) => (
            <p key={i} className="m-0">{r}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Diagnostic Table ── */
function DiagnosticTable({ rows }: { rows: TabRow[] }) {
  return (
    <div className="overflow-x-auto mb-6">
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr>
          <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left w-[35%]">Modality</th>
          <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5 border-b border-border bg-bg text-left">Findings</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top font-medium">{row.modality}</td>
            <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row.findings}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

/* ── Main WorkupPage ── */
export default function WorkupPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cardiac');

  const currentTab = tabData[activeTab];

  return (
    <div className="animate-fade-in">
      <div className="page-header mb-7">
        <h1 className="font-heading text-[26px] font-bold text-navy mb-1.5 tracking-tight">Diagnostic workup</h1>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed mb-7 max-w-[700px]">
        A stepwise approach supports the diagnostic workup of eosinophilia and helps to distinguish between clonal and non-clonal eosinophilia-associated disorders.
      </p>

      {/* Key diagnostic criteria */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mb-4">Key diagnostic criteria (overview)</h2>
      <CriteriaAccordion />

      {/* Criteria references (§4.1) */}
      <CollapsibleRefs refs={[
        'Arber, D. A., Orazi, A., Hasserjian, R. P., et al. (2022). International Consensus Classification of Myeloid Neoplasms and Acute Leukemias: integrating morphologic, clinical, and genomic data. Blood, 140(11), 1200-1228.',
        'Grayson, P. C., Ponte, C., Suppiah, R., et al. (2022). 2022 American College of Rheumatology/European Alliance of Associations for Rheumatology Classification Criteria for Eosinophilic Granulomatosis with Polyangiitis. Ann Rheum Dis, 81(3), 309-314.',
      ]} />

      {/* Genetic Workup */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mt-7 mb-4">Genetic workup</h2>
      <GeneticWorkup />

      {/* Genetic references (§4.3) */}
      <CollapsibleRefs refs={[
        'Baer, C., Muehlbacher, V., Kern, W., Haferlach, C., & Haferlach, T. (2018). Molecular genetic characterization of myeloid/lymphoid neoplasms associated with eosinophilia and rearrangement of PDGFRA, PDGFRB, FGFR1 or PCM1-JAK2. Haematologica, 103(8), e348-e350.',
        'Cools, J., DeAngelo, D. J., Gotlib, J., et al. (2003). A tyrosine kinase created by fusion of the PDGFRA and FIP1L1 genes as a therapeutic target of imatinib. N Engl J Med, 348(13), 1201-1214.',
        'Gerds, A. T., Gotlib, J., Bose, P., et al. (2020). Myeloid/Lymphoid Neoplasms with Eosinophilia and TK Fusion Genes, NCCN Guidelines. J Natl Compr Canc Netw, 18(9), 1248-1269.',
        'Meggendorfer, M., Walter, W., & Haferlach, T. (2020). WGS and WTS in leukaemia: A tool for diagnostics? Best Pract Res Clin Haematol, 33(3), 101190.',
        'Metzgeroth, G., Steiner, L., Naumann, N., et al. (2023). Myeloid/lymphoid neoplasms with eosinophilia and TK gene fusions. Leukemia, 37(9), 1860-1867.',
        'Reiter, A., & Gotlib, J. (2017). Myeloid neoplasms with eosinophilia. Blood, 129(6), 704-714.',
        'Reiter, A., Metzgeroth, G., & Cross, N. C. P. (2025). How I diagnose and treat myeloid/lymphoid neoplasms with TK gene fusions. Blood, 145(16), 1758-1768.',
        'Rohmer, J., Couteau-Chardon, A., Trichereau, J., et al. (2020). Epidemiology, clinical picture and long-term outcomes of FIP1L1-PDGFRA-positive myeloid neoplasm with eosinophilia. Am J Hematol, 95(11), 1314-1323.',
        'Schwaab, J., Naumann, N., Luebke, J., et al. (2020). Response to TKIs in myeloid neoplasms associated with PCM1-JAK2, BCR-JAK2 and ETV6-ABL1 fusion genes. Am J Hematol, 95(7), 824-833.',
        'Shomali, W., & Gotlib, J. (2024). WHO and ICC classification of eosinophilic disorders: 2024 update. Am J Hematol, 99(5), 946-968.',
        'Verstovsek, S., Kiladjian, J. J., Vannucchi, A. M., et al. (2025). Pemigatinib for Myeloid/Lymphoid Neoplasms with FGFR1 Rearrangement. NEJM Evid, 4(9), EVIDoa2500017.',
      ]} />

      {/* Clinical Workup Tabs */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mt-7 mb-4">Clinical workup</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-[18px] py-2 border rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-navy border-navy text-white'
                : 'bg-white border-border text-text-secondary hover:border-blue hover:text-blue hover:bg-blue-pale'
            }`}
          >
            {TAB_ICONS[tab.id]}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border rounded-xl p-7 shadow-sm">
        <div className="flex items-center gap-3.5 mb-[18px]">
          <div className="w-[42px] h-[42px] bg-blue-pale rounded-[10px] flex items-center justify-center text-blue shrink-0">
            {TAB_ICONS[activeTab]}
          </div>
          <h2 className="font-heading text-lg font-semibold text-navy">
            {(() => { const t = TABS.find(t => t.id === activeTab); return t?.cardTitle || t?.label; })()}
          </h2>
        </div>
        <DiagnosticTable rows={currentTab.rows} />
        <CollapsibleRefs refs={currentTab.references} />
      </div>
    </div>
  );
}

/* ── Criteria Accordion ── */
const criteriaData = [
  {
    id: 'mln',
    title: 'Myeloid / Lymphoid Neoplasms with TK Fusion Genes (M/LN-TK)',
    icon: (
      <Dna size={22} />
    ),
    iconBg: 'bg-[#f0ebff] text-[#7c5cbf]',
    content: (
      <div>
        <div className="overflow-x-auto">
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
          </tbody>
        </table>
        </div>
        <div className="mt-5">
          <div className="text-[13px] font-bold text-navy mb-1.5">Genetic abnormalities, clinical presentations, and targeted therapy of myeloid/lymphoid neoplasms with eosinophilia and tyrosine kinase gene fusions</div>
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
                  {
                    gene: 'PDGFRA',
                    fusion: <>Cryptic del 4q12 / <em>FIP1L1::PDGFRA</em></>,
                    partners: <><em>CDK5RAP2</em>; <em>STRN</em>; <em>KIF5B</em>; <em>TNKS2</em>; <em>ETV6</em>; <em>BCR</em></>,
                    manifestations: 'Common: CEL-like BM with frequent extramedullary involvement; Others: B-ALL/LL, AML or mast cell proliferations',
                    therapy: 'Excellent response to TKI (imatinib)',
                  },
                  {
                    gene: 'PDGFRB',
                    fusion: <>t(5;12)(q32;p13.2) / <em>ETV6::PDGFRB</em></>,
                    partners: <>&gt; 30 partners, cryptic</>,
                    manifestations: 'Common: CEL-like or monocytosis with eosinophilia; Others: ALL/LL, AML or mast cell proliferations',
                    therapy: 'Excellent response to TKI',
                  },
                  {
                    gene: 'FGFR1',
                    fusion: <>t(8;13)(p11.2;q12.1) / <em>ZMYM2::FGFR1</em></>,
                    partners: <>15 other partners including <em>BCR</em></>,
                    manifestations: 'Common: Extramedullary T-ALL/LL with BM MPN-like or blast phase; Others: B-ALL/LL, myeloid sarcoma, AML or MPAL',
                    therapy: 'High rate of response to FGFR inhibitor (e.g. pemigatinib), especially in chronic phase',
                  },
                  {
                    gene: 'JAK2',
                    fusion: <>t(8;9)(p22;p24.1) / <em>PCM1::JAK2</em></>,
                    partners: <><em>ETV6</em> and <em>BCR</em></>,
                    manifestations: 'Common: MPN or MDS/MPN-like BM with eosinophilia; Others: B- and T-ALL/LL with BM MPN',
                    therapy: 'Limited responses to ruxolitinib',
                  },
                  {
                    gene: 'FLT3',
                    fusion: <>t(12;13)(p13.2;q12.2) / <em>ETV6::FLT3</em></>,
                    partners: <><em>ZMYM2</em>; <em>TRIP11</em>; <em>SPTBN1</em>; <em>GOLGB1</em>; <em>CCDC88C</em>; <em>MYO18A</em>; <em>BCR</em></>,
                    manifestations: 'T-ALL/LL or myeloid sarcoma with CEL-like or MDS/MPN BM features',
                    therapy: 'Various responses to specific FLT3 inhibitors',
                  },
                  {
                    gene: 'ABL1',
                    fusion: <>t(9;12)(q34.1;p13.2) / <em>ETV6::ABL1</em></>,
                    partners: 'Unknown',
                    manifestations: 'CML-like with frequent eosinophilia in chronic or blast phase',
                    therapy: 'Various responses to second-generation TKI',
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-1.5 py-1 text-text-secondary border-b border-border align-top"><em>{row.gene}</em></td>
                    <td className="px-1.5 py-1 text-text-secondary border-b border-border align-top">{row.fusion}</td>
                    <td className="px-1.5 py-1 text-text-secondary border-b border-border align-top">{row.partners}</td>
                    <td className="px-1.5 py-1 text-text-secondary border-b border-border align-top"><AbbrText>{row.manifestations}</AbbrText></td>
                    <td className="px-1.5 py-1 text-text-secondary border-b border-border align-top"><AbbrText>{row.therapy}</AbbrText></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">ICC Classification (Arber DA et al. <em>Blood</em>. 2022)</p>
      </div>
    ),
  },
  {
    id: 'sm',
    title: 'Systemic Mastocytosis (SM)',
    icon: (
      <MastCellIcon size={22} />
    ),
    iconBg: 'bg-[#e6f5f5] text-[#2a9d8f]',
    content: (
      <div>
        <div className="overflow-x-auto">
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
              [<><em>KIT</em> D816V mutation</>, <>Activating <em>KIT</em> D816V or other activating <em>KIT</em> mutation detected in bone marrow, peripheral blood, or extracutaneous organs</>],
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
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">ICC Classification (Arber DA et al. <em>Blood</em>. 2022)</p>
      </div>
    ),
  },
  {
    id: 'egpa',
    title: 'Eosinophilic Granulomatosis with Polyangiitis (EGPA)',
    icon: (
      <VesselsIcon size={22} />
    ),
    iconBg: 'bg-[#fff0ea] text-[#e07050]',
    content: (
      <div>
        <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-left">Feature</th>
              <th className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1.5 py-1 border-b border-border bg-bg text-center">Weight</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Blood eosinophil count ≥ 1 × 10⁹/L', '+5', 'text-accent-green'],
              ['Obstructive airway disease', '+3', 'text-accent-green'],
              ['Nasal polyps', '+3', 'text-accent-green'],
              ['Extravascular eosinophilic predominant inflammation (biopsy)', '+2', 'text-accent-green'],
              ['Mononeuritis multiplex / motor neuropathy not due to radiculopathy', '+1', 'text-accent-green'],
              ['Cytoplasmic anti-neutrophil cytoplasmic antibodies (cANCA) or anti-proteinase 3 (anti-PR3) ANCA positivity', '-3', 'text-accent-red'],
              ['Hematuria', '-1', 'text-accent-red'],
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-1.5 py-1 text-text-secondary border-b border-border">{row[0]}</td>
                <td className={`px-1.5 py-1 border-b border-border text-center font-bold ${row[2]}`}>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="mt-3 bg-[#fffbec] text-navy text-xs font-medium p-2.5 rounded-lg border-l-3 border-accent-orange">
          ⚡ These classification criteria should be applied to classify a patient as having eosinophilic granulomatosis with polyangiitis when a diagnosis of small- or medium-vessel vasculitis has been made. Alternate diagnoses mimicking vasculitis should be excluded prior to applying the criteria. A score of ≥ 6 is needed for classification of EGPA.
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">ACR/EULAR Classification (Grayson PC et al. <em>Ann Rheum Dis</em>. 2022)</p>
      </div>
    ),
  },
  {
    id: 'ihes',
    title: 'Idiopathic Hypereosinophilic Syndrome (iHES)',
    icon: (
      <EosinophilIcon size={22} />
    ),
    iconBg: 'bg-[#fff8e6] text-[#c9943a]',
    content: (
      <div>
        <div className="overflow-x-auto">
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
              ['Organ damage / dysfunction', 'Attributable to tissue eosinophilic infiltrate'],
              ['No underlying reactive condition', 'No evidence of a reactive, well-defined autoimmune disease or neoplastic condition/disorder underlying the hypereosinophilia'],
              ['Exclusion of lymphocyte variant HES (lHES)', 'An abnormal T-cell population must be detected immunophenotypically with or without T-cell receptor clonality by molecular analysis for diagnosis of lHES'],
              ['Normal bone marrow morphology', 'Bone marrow morphologically within normal limits except for increased eosinophils'],
              ['Exclusion of clonal causes', 'No molecular genetic clonal abnormality; clonal hematopoiesis of indeterminate potential (CHIP) does not exclude diagnosis'],
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[0]}</td>
                <td className="px-2 py-1.5 text-text-secondary border-b border-border align-top">{row[1]}</td>
              </tr>
            ))}
            <tr className="bg-[#fffbec]"><td colSpan={2} className="px-2 py-1.5 text-navy text-xs font-medium rounded-b-lg">
              ⚡ The diagnosis of iHES requires all 6 criteria.
            </td></tr>
          </tbody>
        </table>
        </div>
        <p className="text-[11px] text-text-muted italic mt-2.5">ICC Classification (Arber DA et al. <em>Blood</em>. 2022)</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
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

/* ── Genetic Workup (§4.2) ── */
function GeneticWorkup() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (step: number) => {
    setOpenStep((prev) => (prev === step ? null : step));
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <GeneticAccordion
        isOpen={openStep === 1}
        onToggle={() => toggleStep(1)}
        icon={<Dna size={18} />}
        title="Initial genetic diagnostics"
        subtitle="Conventional cytogenetics, FISH, PCR, and NGS"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3 my-3.5">
          <MethodCard title="Conventional cytogenetics (karyotype)">
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-0.5">
              <li>Detectable chromosomal rearrangements involving tyrosine kinase-encoding genes</li>
              <li>Also suitable for identifying both fusion partners</li>
              <li>Important exceptions: <em>FIP1L1::PDGFRA</em> and <em>ETV6::ABL1</em> (cryptic rearrangements, not detectable by karyotype)</li>
            </ul>
          </MethodCard>
          <MethodCard title="Fluorescence in situ hybridization (FISH)">
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-0.5">
              <li>The cytogenetically cryptic <em>FIP1L1::PDGFRA</em> rearrangement can be detected by FISH</li>
              <li>Further assessment for rearrangements and aberrations involving <em>PDGFRA</em>, <em>PDGFRB</em>, <em>FGFR1</em>, and <em>JAK2</em></li>
            </ul>
          </MethodCard>
          <MethodCard title="Polymerase Chain Reaction (PCR)">
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-0.5">
              <li>Assessment of established rearrangements including <em>FIP1L1::PDGFRA</em>, <em>ETV6::PDGFRB</em>, <em>ZMYM2::FGFR1</em>, <em>PCM1::JAK2</em>, and <em>ETV6::ABL1</em></li>
            </ul>
          </MethodCard>
          <MethodCard title="Myeloid gene panel (NGS)">
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-0.5">
              <li>Assessment of point mutations including <em>JAK2 V617F</em>, <em>KIT D816V</em>, and <em>STAT5B</em></li>
            </ul>
          </MethodCard>
        </div>
      </GeneticAccordion>

      <GeneticAccordion
        isOpen={openStep === 2}
        onToggle={() => toggleStep(2)}
        icon={<Database size={18} />}
        title="Advanced sequencing"
        subtitle="Whole transcriptome and genome sequencing"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3 my-3.5">
          <MethodCard title="Whole transcriptome sequencing (WTS) / Whole genome sequencing (WGS)">
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-0.5">
              <li>Identifying gene expression profiles and fusion transcripts</li>
              <li>Detection of single nucleotide variants (SNV), small deletions/insertions (Indels), structural variants (SV) and copy number variants (CNV)</li>
            </ul>
          </MethodCard>
        </div>
      </GeneticAccordion>
    </div>
  );
}

function GeneticAccordion({
  isOpen,
  onToggle,
  icon,
  title,
  subtitle,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden transition-[box-shadow,border-color] duration-150 hover:shadow-md hover:border-blue">
      <div
        onClick={onToggle}
        className={`flex items-center gap-3.5 cursor-pointer select-none ${isOpen ? 'p-5' : 'p-3.5'}`}
      >
        <div className={`${isOpen ? 'w-9 h-9' : 'w-8 h-8'} bg-blue-pale rounded-lg flex items-center justify-center text-blue shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-heading font-semibold text-navy ${isOpen ? 'text-[15px]' : 'text-sm'}`}>{title}</h3>
          {isOpen && <p className="text-[13px] text-text-muted mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`text-text-muted shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="px-5 pb-5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

function MethodCard({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="bg-bg border border-border rounded-lg p-3">
      <div className="text-xs font-bold text-navy mb-1.5">{title}</div>
      {children}
    </div>
  );
}
