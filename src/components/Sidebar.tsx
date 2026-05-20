import { Link, useLocation } from 'wouter';
import { Gauge, LineChart, ClipboardCheck, Mail } from 'lucide-react';

const navItems = [
  { path: '/score', label: 'Score', icon: Gauge },
  { path: '/methods', label: 'Methods', icon: LineChart },
  { path: '/workup', label: 'Diagnostic workup', icon: ClipboardCheck },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <nav className="w-[200px] flex-shrink-0 bg-white border-r border-border p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shadow-sm">
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location === path;
        return (
          <Link
            key={path}
            href={path}
            className={`
              flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-medium cursor-pointer
              transition-[background,color] duration-150 mb-0.5 no-underline
              ${isActive
                ? 'bg-blue-pale text-blue font-semibold'
                : 'text-text-secondary hover:bg-blue-pale hover:text-blue'
              }
            `}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
