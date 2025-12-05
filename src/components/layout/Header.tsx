import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ConceptLab
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/topics" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Topics
            </Link>
            <Link 
              to="/paths" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Learning Paths
            </Link>
            <Link 
              to="/settings" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
