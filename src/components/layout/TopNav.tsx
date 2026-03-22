import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Investments', path: '/investments' },
  { label: 'Net Worth', path: '/net-worth' },
  { label: 'Shares', path: '/shares' },
  { label: 'Ask AI', path: '/ask-ai' },
  { label: 'Tax', path: '/tax' },
];

const TopNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
            <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-display text-penta-text1">PentAIGen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
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
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-penta-surface1 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-penta-text2" /> : <Menu className="w-4 h-4 text-penta-text2" />}
          </button>
          
          {/* Bell Icon */}
          <button className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:bg-penta-surface1 transition-colors text-penta-text2">
            <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-penta-rose rounded-full" />
          </button>
          
          {/* User Button */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-penta-surface1 transition-colors">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-body font-medium text-penta-text1">
              {user ? `+91 ${user.phone.slice(0, 5)}` : 'User'}
            </span>
          </button>
          
          {/* Mobile User Button */}
          <button className="sm:hidden w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-14 left-0 right-0 bg-card border-b border-border">
            <nav className="p-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors mb-1 ${
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
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
