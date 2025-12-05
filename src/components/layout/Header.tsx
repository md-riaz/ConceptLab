import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header style={{
      backgroundColor: 'var(--color-bg-surface)',
      boxShadow: 'var(--shadow-sm)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="h2 font-bold transition-colors"
              style={{ 
                color: 'var(--color-accent-primary)',
                textDecoration: 'none',
              }}
            >
              ConceptLab
            </Link>
          </div>
          
          <div className="flex items-center" style={{ gap: 'var(--space-6)' }}>
            <Link 
              to="/topics" 
              className="body transition-colors"
              style={{ 
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Topics
            </Link>
            <Link 
              to="/paths" 
              className="body transition-colors"
              style={{ 
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Learning Paths
            </Link>
            <Link 
              to="/settings" 
              className="body transition-colors"
              style={{ 
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
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
