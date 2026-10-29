import { NavLink } from 'react-router';
import { Info } from 'lucide-react';
import { EosinophilIcon } from './icons';

const navItems = [
  { path: '/', label: 'Score' },
  { path: '/methods', label: 'Methods' },
  { path: '/workup', label: 'Diagnostic workup' },
  { path: '/contact', label: 'Contact' },
];

interface HeaderProps {
  onAbout: () => void;
}

export default function Header({ onAbout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-100 shadow-sm">
      <div className="px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[60px]">
        {/* Top row: Logo + Title + About */}
        <div className="flex items-center justify-between py-2 lg:py-0 gap-2 sm:gap-4 lg:gap-6 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <EosinophilIcon
              size={28}
              className="w-7 h-7 sm:w-9 sm:h-9 shrink-0"
              style={{ color: '#728edc' }}
            />
            <span className="font-heading font-semibold text-[14px] sm:text-[17px] text-navy tracking-tight lg:whitespace-nowrap">
              Eosinophilia Differentiation Score
            </span>
          </div>
          <div className="lg:hidden shrink-0">
            <button
              onClick={onAbout}
              className="flex items-center gap-1 px-2 py-1.5 border-none bg-transparent text-text-secondary text-[13px] font-medium cursor-pointer rounded-lg hover:bg-blue-pale hover:text-blue transition-[background,color] duration-150"
            >
              <Info size={14} />
              About
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center gap-0.5 sm:gap-1 pb-2 lg:pb-0">
          {/* NavLink matches with or without a trailing slash (static servers
              and the prerender serve /methods/ as well as /methods). */}
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `
                px-1.5 sm:px-2.5 lg:px-3 py-1.5 rounded-lg text-[13px] sm:text-sm font-medium cursor-pointer no-underline
                transition-[background,color] duration-150
                ${isActive
                  ? 'bg-blue-pale text-blue font-semibold'
                  : 'text-text-secondary hover:bg-blue-pale hover:text-blue'
                }
              `}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop About button */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onAbout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border-none bg-transparent text-text-secondary text-sm font-medium cursor-pointer rounded-lg hover:bg-blue-pale hover:text-blue transition-[background,color] duration-150"
          >
            <Info size={15} />
            About
          </button>
        </div>
      </div>
    </header>
  );
}
