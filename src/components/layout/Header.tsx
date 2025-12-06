import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header style={{ 
      backgroundColor: 'var(--color-bg-surface)', 
      borderBottom: '1px solid var(--color-border-subtle)'
    }} className="shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold no-underline transition-colors"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              🧪 ConceptLab
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/topics" 
              className="body font-medium no-underline transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Topics
            </Link>
            <Link 
              to="/paths" 
              className="body font-medium no-underline transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Learning Paths
            </Link>
            <Link 
              to="/components" 
              className="body font-medium no-underline transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Components
            </Link>
            <Link 
              to="/settings" 
              className="body font-medium no-underline transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Settings
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
