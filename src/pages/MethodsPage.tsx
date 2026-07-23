import { Info, Activity, BookOpen, AlertTriangle, BarChart3, BadgeCheck } from 'lucide-react';
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
          The Eosinophilia Differentiation Score (EDS) displays the probability of clonal vs. non-clonal eosinophilia derived from the published training cohort.
        </p>
        <InfoBox>
          For a full description of the cohorts and statistical approach, please refer to the original publication:{' '}
          <a href="#" className="text-blue font-semibold no-underline hover:underline">
            Link to publication ↗
          </a>
        </InfoBox>
      </Section>

      {/* Statistical Background */}
      <Section icon={Activity} title="Statistical Background and Validation">
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          To develop the EDS, a random forest machine-learning algorithm was used to identify the most relevant
          predictors, which were subsequently incorporated into a two-step logistic regression model. Seven variables
          emerged as the strongest discriminators between clonal and non-clonal eosinophilic disorders among patients
          with eosinophils ≥ 0.5 × 10⁹/L. A clonal phenotype was indicated by the continuous predictors elevated
          serum tryptase, elevated vitamin B12, lower immunoglobulin E, lower lactate dehydrogenase, lower number
          of involved organ sites, as well as the categorical predictors presence of splenomegaly and absence of
          asthma and/or ENT involvement.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          The EDS linear predictor η was derived by computing a weighted sum of all patient-specific variable values
          x<sub>j</sub>, each multiplied by its corresponding model coefficient weight w<sub>j</sub>. The linear
          predictor was subsequently transformed into a probability estimate via logistic transformation. Optimal
          probability cutoff was determined using Youden's index.
        </p>

        {/* Cutoff box */}
        <div className="bg-blue-pale border-2 border-blue rounded-xl p-6 my-5 text-center">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Cutoff</div>
          <div className="font-heading text-[42px] font-bold text-navy leading-none">73%</div>
          <div className="text-sm text-text-secondary mt-3 space-y-2">
            <div>
              <span className="font-semibold text-navy">Score ≥ 73%</span>
              {' — '}clonal disorders
            </div>
            <div>
              <span className="font-semibold text-navy">Score &lt; 73%</span>
              {' — '}non-clonal disorders
            </div>
          </div>
        </div>

        {/* Metrics boxes side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
          <div className="bg-bg border border-border rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-navy uppercase tracking-wider mb-2.5">
              <BarChart3 size={13} strokeWidth={2} />
              Training metrics
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] text-text-secondary">Sensitivity</span>
              <span className="font-heading text-base font-bold text-navy">96.7%</span>
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] text-text-secondary">Specificity</span>
              <span className="font-heading text-base font-bold text-navy">96.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-text-secondary">Area under the curve</span>
              <span className="font-heading text-base font-bold text-navy">0.993</span>
            </div>
          </div>
          <div className="bg-bg border border-border rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-navy uppercase tracking-wider mb-2.5">
              <BadgeCheck size={13} strokeWidth={2} />
              Validation metrics
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] text-text-secondary">Sensitivity</span>
              <span className="font-heading text-base font-bold text-navy">### %</span>
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] text-text-secondary">Specificity</span>
              <span className="font-heading text-base font-bold text-navy">### %</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-text-secondary">Area under the curve</span>
              <span className="font-heading text-base font-bold text-navy">###</span>
            </div>
          </div>
        </div>

        {/* Cohort cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-[18px]">
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
          Sensitivity analyses across patient subgroups with progressively higher eosinophil count thresholds
          (1.0–5.0 × 10⁹/L) confirmed strong and consistent discriminatory performance of the model regardless of
          the threshold applied.
        </p>
      </Section>

      {/* Limitations */}
      <Section icon={AlertTriangle} title="Limitations" className="!mb-0" iconClass="bg-[#fff4ec] border border-[#fcd8b4] [&_svg]:text-accent-orange">
        <ol className="list-decimal pl-5 flex flex-col gap-2.5 mt-1">
          {[
            'Misclassification may still occur in disorders not included in this analysis, as well as in cases with atypical presentations and/or treatment-modified phenotypes.',
            'Despite external validation across multiple registries and clinical trials, the EDS was developed in referral-center cohorts enriched for diagnostically complex eosinophilia-associated disorders; diagnostic performance in unselected community-based populations remains to be established.',
            'Some diagnostic subgroups were relatively small, restricting subgroup-specific inference.',
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
  className,
  iconClass,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={cn('bg-white border border-border rounded-xl p-7 mb-6 shadow-sm', className)}>
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
