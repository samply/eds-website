import { Info, Activity, BookOpen, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function MethodsPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header mb-7">
        <h1 className="font-heading text-[26px] font-bold text-navy mb-1.5 tracking-tight">Methods</h1>
      </div>

      {/* About section */}
      <Section icon={Info} title="About the Eosinophilia Differentiation Score (EDS)">
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          The diagnostic evaluation of persistent eosinophilia with organ involvement remains challenging, as clonal and
          non-clonal etiologies frequently exhibit overlapping clinical phenotypes despite substantial differences in
          underlying pathophysiology, therapeutic implications, and prognosis. An early and accurate distinction between
          these entities is crucial to appropriately guide genetic testing and to enable timely initiation of targeted
          therapy, particularly with the aim of preventing irreversible eosinophil-mediated end-organ damage.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          The Eosinophilia Differentiation Score (EDS) represents a robust tool for discriminating between clonal and
          non-clonal eosinophilia and may support individualized decision-making with respect to genetic work-up and
          therapeutic management. Methodologically, the EDS integrates the continuous variables serum tryptase,
          immunoglobulin E, lactate dehydrogenase, vitamin B12 levels, and the number of involved organs, as well as
          the categorical variables splenomegaly and ear-nose-throat (ENT) involvement/asthma.
        </p>
      </Section>

      {/* Statistical Background */}
      <Section icon={Activity} title="Statistical Background and Validation">
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          For development of EDS, a random forest-based machine-learning approach informed a two-step logistic
          regression model that identified 7 variables as the most informative predictors for distinguishing clonal
          from non-clonal eosinophilic disorders in patients with eosinophils ≥0.5 × 10⁹/L. These comprised the
          continuous variables higher serum tryptase, higher vitamin B12, lower immunoglobulin E (IgE), lower lactate
          dehydrogenase (LDH), and fewer involved organ sites, together with the categorical variables presence of
          splenomegaly and absence of asthma and/or ENT involvement.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          The linear predictor η of the EDS was calculated as a weighted linear combination of these variables, whereby
          each patient-specific variable x<sub>j</sub> for a given patient was weighted by a coefficient w<sub>j</sub>.
          The resulting linear predictor was then converted into a probability using logistic transformation.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3.5 my-5">
          <div className="bg-bg border border-border rounded-lg p-4 text-center">
            <div className="font-heading text-2xl font-bold text-navy">96.7%</div>
            <div className="text-xs text-text-muted mt-0.5">Sensitivity (optimal cutoff)</div>
          </div>
          <div className="bg-bg border border-border rounded-lg p-4 text-center">
            <div className="font-heading text-2xl font-bold text-navy">96.5%</div>
            <div className="text-xs text-text-muted mt-0.5">Specificity (optimal cutoff)</div>
          </div>
          <div className="bg-bg border border-border rounded-lg p-4 text-center">
            <div className="font-heading text-2xl font-bold text-navy">0.993</div>
            <div className="text-xs text-text-muted mt-0.5">Area under the curve (AUC)</div>
          </div>
        </div>

        {/* Cohort cards */}
        <div className="grid grid-cols-2 gap-3.5 my-[18px]">
          <div className="bg-bg border-2 border-dashed border-border rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-navy uppercase tracking-wider mb-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Training cohort
            </div>
            <p className="text-xs text-text-muted italic leading-relaxed m-0">
              [ Placeholder – training cohort details to be added: n, institutions, time period, clonal vs. non-clonal distribution ]
            </p>
          </div>
          <div className="bg-bg border-2 border-dashed border-border rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-navy uppercase tracking-wider mb-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Validation cohort
            </div>
            <p className="text-xs text-text-muted italic leading-relaxed m-0">
              [ Placeholder – validation cohort details to be added: n, institutions, time period, performance metrics ]
            </p>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          The optimal cutoff, determined using Youden's index, was 0.730, yielding a sensitivity of 96.7% and
          specificity of 96.5% with an AUC of 0.993. The corrected partial AUC (pAUC) was 0.965 in the
          high-specificity range (100–90%) and 0.962 in the high-sensitivity range (100–90%), highlighting robustness
          across clinically relevant thresholds.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          Additional sensitivity analyses were performed in patient subgroups defined by progressively higher
          eosinophil thresholds (1.0–5.0 × 10⁹/L). Across all thresholds tested, the model maintained high
          discriminatory performance.
        </p>

        <InfoBox>
          Full details on methods, analyses, and validation are available in our publication.{' '}
          <a href="#" className="text-blue font-semibold no-underline hover:underline">
            Link to publication (placeholder) ↗
          </a>
        </InfoBox>
      </Section>

      {/* Limitations */}
      <Section icon={AlertTriangle} title="Limitations" iconClass="bg-[#fff4ec] border border-[#fcd8b4] [&_svg]:text-accent-orange">
        <ol className="list-decimal pl-5 flex flex-col gap-2.5 mt-1">
          {[
            'Although externally validated across different registries and clinical trials, the EDS was derived from referral-center cohorts enriched for diagnostically challenging and clinically significant eosinophilic disorders; performance in unselected community-based populations remains to be established despite the inclusion.',
            'Some diagnostic subgroups were relatively small, limiting subgroup-specific inference.',
            'The EDS is intended as a clinical support tool. Rare entities, atypical phenotypes (including hereditary alpha-tryptasemia), and treatment-modified presentations may still lead to misclassification.',
          ].map((text, i) => (
            <li key={i} className="text-sm text-text-secondary leading-relaxed pl-1">{text}</li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

/* ── Helper sub-components ── */

function Section({
  icon: Icon,
  title,
  children,
  iconClass,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
  iconClass?: string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-7 mb-6 shadow-sm">
      <div className="flex items-center gap-3.5 mb-[18px]">
        <div className={cn('w-[42px] h-[42px] bg-blue-pale rounded-[10px] flex items-center justify-center text-blue shrink-0', iconClass)}>
          <Icon size={20} />
        </div>
        <h2 className="font-heading text-lg font-semibold text-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 bg-blue-pale border border-[#c5d4f0] rounded-lg p-4 mt-5">
      <BookOpen size={18} className="text-blue shrink-0 mt-0.5" />
      <p className="text-[13px] text-navy">{children}</p>
    </div>
  );
}
