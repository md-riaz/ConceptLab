import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-bg-surface shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="h2 font-bold text-accent-primary hover:text-primary-600 transition-colors no-underline"
            >
              ConceptLab
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/topics" 
              className="body text-text-secondary hover:text-accent-primary transition-colors no-underline"
            >
              Topics
            </Link>
            <Link 
              to="/paths" 
              className="body text-text-secondary hover:text-accent-primary transition-colors no-underline"
            >
              Learning Paths
            </Link>
            <Link 
              to="/components" 
              className="body text-text-secondary hover:text-accent-primary transition-colors no-underline"
            >
              Components
            </Link>
            <Link 
              to="/settings" 
              className="body text-text-secondary hover:text-accent-primary transition-colors no-underline"
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
