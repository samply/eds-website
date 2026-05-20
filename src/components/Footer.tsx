import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border px-8 py-3 flex items-center gap-2 text-xs text-text-muted fixed bottom-0 left-0 right-0 z-50">
      <Shield size={14} className="text-text-muted shrink-0" />
      The Eosinophilia Differentiation Score (EDS) supports clinical decision-making but does not replace the physician's judgment.
    </footer>
  );
}
