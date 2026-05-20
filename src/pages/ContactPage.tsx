import { Mail, Phone, BookOpen, Shield, Info } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header mb-7">
        <h1 className="font-heading text-[26px] font-bold text-navy mb-1.5 tracking-tight">Contact</h1>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-7 max-w-[700px]">
        If you have any questions, suggestions, or require further information about the Eosinophilia Differentiation
        Score (EDS), please do not hesitate to contact us.
      </p>

      {/* Contact Card */}
      <div className="bg-blue-pale border-[#c5d4f0] border rounded-xl p-5 flex items-center gap-5 shadow-sm mb-9">
        <div className="w-14 h-14 bg-white rounded-full border-2 border-[#c5d4f0] flex items-center justify-center text-blue shrink-0">
          <Mail size={24} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="font-heading text-[15px] font-semibold text-navy">
            University Hospital Mannheim, Heidelberg University
          </div>
          <div className="text-xs text-text-muted mt-0.5">Department of Hematology and Oncology</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5 text-[13px] text-text-secondary">
            <Phone size={15} className="text-blue shrink-0" />
            0621 / 383-4214
          </div>
          <div className="flex items-center gap-2.5 text-[13px] text-text-secondary">
            <Mail size={15} className="text-blue shrink-0" />
            <a href="mailto:med3-sek@umm.de" className="text-blue no-underline hover:underline">med3-sek@umm.de</a>
          </div>
        </div>
      </div>

      {/* Eosinophilia Registry */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mb-4">Eosinophilia Registry</h2>
      <div className="bg-white border border-border rounded-xl p-7 mb-9 shadow-sm">
        <div className="flex items-center gap-3.5 mb-[18px]">
          <div className="w-[42px] h-[42px] bg-blue-pale rounded-[10px] flex items-center justify-center text-blue shrink-0">
            <BookOpen size={20} />
          </div>
          <h2 className="font-heading text-lg font-semibold text-navy">Participation in the Eosinophilia Registry</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          We would like to invite you to enrol your patient in our prospective Eosinophilia Registry. The registry aims
          to systematically document clinical, laboratory, and genetic data from patients with persistent eosinophilia
          to improve diagnostic and therapeutic approaches. Inclusion is subject to written informed consent by the
          patient.
        </p>
        <div className="flex items-start gap-3.5 bg-blue-pale border border-[#c5d4f0] rounded-lg p-4 mt-4">
          <BookOpen size={18} className="text-blue shrink-0 mt-0.5" />
          <p className="text-[13px] text-navy">
            Download the patient informed consent form:{' '}
            <a href="#" className="text-blue font-semibold no-underline hover:underline">
              Consent form – Eosinophilia Registry (PDF) ↗
            </a>
            <br />
            For questions regarding enrolment, please contact the secretariat at{' '}
            <a href="mailto:med3-sek@umm.de" className="text-blue font-semibold no-underline hover:underline">
              med3-sek@umm.de
            </a>{' '}
            or by phone at 0621 / 383-4214.
          </p>
        </div>
      </div>

      {/* Legal Grid */}
      <h2 className="font-heading text-[17px] font-semibold text-navy mb-4">Imprint &amp; Legal information</h2>
      <div className="grid grid-cols-3 gap-3.5">
        <LegalCard
          icon={<BookOpen size={20} />}
          title="Imprint"
          description="Information according to § 5 TDDDG (Germany)"
        />
        <LegalCard
          icon={<Shield size={20} />}
          title="Privacy policy"
          description="Information on the collection and processing of personal data"
        />
        <LegalCard
          icon={<Info size={20} />}
          title="Disclaimer"
          description="Important information on the use and limitations of the EDS"
        />
      </div>
    </div>
  );
}

function LegalCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
      <div className="w-10 h-10 bg-blue-pale rounded-[10px] flex items-center justify-center text-blue mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-navy mb-1">{title}</h3>
      <p className="text-xs text-text-muted mb-3 leading-relaxed">{description}</p>
      <a href="#" className="text-[13px] text-blue font-semibold flex items-center gap-1 no-underline cursor-pointer hover:underline">
        Read more{' '}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}
