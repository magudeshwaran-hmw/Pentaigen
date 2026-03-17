import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Investments', path: '/investments' },
  { label: 'Net Worth', path: '/net-worth' },
  { label: 'Ask AI', path: '/ask-ai' },
  { label: 'Tax', path: '/tax' },
];

const TopNav: React.FC = () => {
  const location = useLocation();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 sticky top-0 z-30">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2 mr-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          </svg>
        </div>
        <span className="text-xl font-display text-penta-text1">PentAIGen</span>
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-penta-text2 hover:text-penta-text1 hover:bg-penta-surface1'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-penta-surface1 transition-colors text-penta-text2">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-penta-rose rounded-full" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-penta-surface1 transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-body font-medium text-penta-text1">Arjun</span>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
