import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer 
      className="mt-auto"
      style={{ 
        backgroundColor: 'var(--color-bg-surface)', 
        borderTop: '1px solid var(--color-border-subtle)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-lg font-bold no-underline mb-3"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              <span className="text-xl">🧪</span>
              <span className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                ConceptLab
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Interactive algorithm visualizer designed to help learners understand complex processes step-by-step.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/topics', label: 'All Topics' },
                { to: '/paths', label: 'Learning Paths' },
                { to: '/visualizer/bubble-sort', label: 'Visualizer' },
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="footer-link text-sm no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Categories</h4>
            <div className="flex flex-wrap gap-2">
              {['Sorting', 'Graphs', 'OS Scheduling'].map((category) => (
                <span 
                  key={category}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ 
                    backgroundColor: 'var(--color-bg-chip)',
                    color: 'var(--color-accent-primary)'
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div 
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Built with ❤️ for learners everywhere
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} ConceptLab
          </p>
        </div>
      </div>
    </footer>
  );
}
