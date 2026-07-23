import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header mb-7">
        <h1 className="font-heading text-[26px] font-bold text-navy mb-1.5 tracking-tight">Contact</h1>
      </div>

      {/* Contact Card */}
      <div className="bg-blue-pale border-[#c5d4f0] border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-sm mb-9">
        <div className="w-14 h-14 bg-white rounded-full border-2 border-[#c5d4f0] flex items-center justify-center text-blue shrink-0">
          <Mail size={24} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="font-heading text-[15px] font-semibold text-navy">
            University Hospital Heidelberg, UK Mannheim GmbH
          </div>
          <div className="text-xs text-text-muted mt-0.5">Department of Hematology and Oncology</div>
          <div className="text-xs text-text-muted mt-0.5">Theodor-Kutzer-Ufer 1-3, 68167 Mannheim</div>
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
      <div className="bg-white border border-border rounded-xl p-7 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-navy mb-[18px]">Participation in the German Registry on Disorders of Eosinophils and Mast Cells (GREM)</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-3.5">
          We would like to invite you to enroll your patient in the German Registry on Disorders of Eosinophils and Mast Cells (GREM). The registry aims
          to systematically document clinical, laboratory, and genetic data from patients with persistent eosinophilia
          to improve diagnostic and therapeutic approaches. Participation requires written informed consent from the
          patient.
        </p>
        <div className="bg-blue-pale border border-[#c5d4f0] rounded-lg p-4 mt-4">
          <div className="text-[13px] text-navy space-y-2">
            <div>
              Download the patient informed consent form:{' '}
              <a href="#" className="text-blue font-semibold no-underline hover:underline">
                Consent form for registry — German Registry on Disorders of Eosinophils and Mast Cells (GREM; PDF) ↗
              </a>
            </div>
            <div>
              Download the patient informed consent form for laboratory sampling and analyses:{' '}
              <a href="#" className="text-blue font-semibold no-underline hover:underline">
                Consent form — Laboratory form (PDF) ↗
              </a>
            </div>
            <div className="text-text-muted">
              For questions regarding enrollment, please contact us (see general contact).
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
