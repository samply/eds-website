export default function Footer() {
  return (
    <footer className="bg-white border-t border-border px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-xs text-text-muted">
      <a href="#" className="text-text-secondary no-underline hover:text-blue hover:underline transition-colors duration-150 shrink-0">Imprint</a>
      <a href="#" className="text-text-secondary no-underline hover:text-blue hover:underline transition-colors duration-150 shrink-0">Privacy Policy</a>
      <span className="text-text-muted leading-relaxed">
        The Eosinophilia Differentiation Score (EDS) is provided for informational purposes only and cannot replace the judgement of an experienced clinician.
      </span>
    </footer>
  );
}
