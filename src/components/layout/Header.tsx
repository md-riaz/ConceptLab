import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/topics', label: 'Topics' },
    { path: '/paths', label: 'Learning Paths' },
    { path: '/components', label: 'Components' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-lg"
      style={{ 
        backgroundColor: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold no-underline transition-all duration-200 hover:scale-105"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            <span className="text-2xl">🧪</span>
            <span className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
              ConceptLab
            </span>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`nav-link relative px-4 py-2 rounded-lg text-sm font-medium no-underline ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="ml-2 pl-2" style={{ borderLeft: '1px solid var(--color-border-subtle)' }}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
