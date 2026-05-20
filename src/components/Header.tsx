import { Info } from 'lucide-react';

interface HeaderProps {
  onAbout: () => void;
}

export default function Header({ onAbout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border px-8 h-[60px] flex items-center justify-between sticky top-0 z-100 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#e8eef9" />
          <circle cx="12" cy="12" r="4" fill="#3b5fc0" opacity=".9" />
          <circle cx="24" cy="12" r="3" fill="#3b5fc0" opacity=".5" />
          <circle cx="18" cy="22" r="5" fill="#3b5fc0" opacity=".7" />
          <circle cx="10" cy="22" r="2.5" fill="#3b5fc0" opacity=".4" />
          <circle cx="26" cy="22" r="2.5" fill="#3b5fc0" opacity=".4" />
        </svg>
        <span className="font-heading font-semibold text-[17px] text-navy tracking-tight">
          Eosinophilia Differentiation Score
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={onAbout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 border-none bg-transparent text-text-secondary text-sm font-medium cursor-pointer rounded-lg hover:bg-blue-pale hover:text-blue transition-[background,color] duration-150"
        >
          <Info size={15} />
          About
        </button>

      </div>
    </header>
  );
}
