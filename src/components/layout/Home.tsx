import { Link } from 'react-router-dom';
import { Button, Chip } from '../common';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient background */}
      <div className="relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-[-10%] h-96 w-96 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)]/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute right-[-10%] top-20 h-80 w-80 rounded-full bg-gradient-to-tr from-[var(--color-accent-secondary)]/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-[var(--color-accent-primary)]/10 to-[var(--color-accent-secondary)]/10 blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-chip)] px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse"></span>
              <span className="text-sm font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">Interactive Learning Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] bg-clip-text text-transparent">
              Algorithm Visualizer
            </h1>
            <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Master complex algorithms through <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>step-by-step visual explanations</span>. Watch data structures transform in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/visualizer/bubble-sort">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  🎨 Try the Visualizer
                </button>
              </Link>
              <Link to="/topics">
                <Button variant="secondary" size="lg">
                  📖 Browse Topics
                </Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
              {[
                { value: '7+', label: 'Algorithms' },
                { value: '3', label: 'Categories' },
                { value: '100%', label: 'Interactive' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--color-accent-primary)' }}>{stat.value}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Algorithms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Featured Algorithms
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Start exploring with these popular algorithms and data structures
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlgos.map((algo, index) => (
            <Link key={algo.id} to={`/visualizer/${algo.id}`} className="group no-underline">
              <div 
                className="card relative h-full p-6"
              >
                {/* Gradient accent on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ 
                    background: index % 2 === 0 
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))'
                      : 'linear-gradient(135deg, rgba(168,85,247,0.05), rgba(99,102,241,0.05))'
                  }}
                ></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ 
                        backgroundColor: algo.chipVariant === 'primary' 
                          ? 'var(--color-primary-100)' 
                          : 'rgba(34,197,94,0.1)'
                      }}
                    >
                      {algo.icon}
                    </div>
                    <Chip variant={algo.chipVariant} size="sm">
                      {algo.category}
                    </Chip>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                    {algo.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {algo.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent-primary)' }}>
                    <span>Visualize</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Paths Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div 
          className="relative overflow-hidden rounded-3xl p-8 lg:p-12"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-bg-pill))'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--color-accent-primary)]/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[var(--color-accent-secondary)]/10 blur-2xl pointer-events-none"></div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <span className="text-lg">📚</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Structured Learning</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Learning Paths
              </h2>
              <p className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                Follow curated paths designed to take you from beginner to expert. Track your progress and build a solid foundation in algorithms and data structures.
              </p>
              <Link to="/paths">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', boxShadow: 'var(--shadow-md)' }}>
                  Explore Learning Paths
                  <span>→</span>
                </button>
              </Link>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Structured', desc: 'Step-by-step curriculum' },
                { icon: '📊', title: 'Track Progress', desc: 'Monitor your journey' },
                { icon: '🎨', title: 'Visual Learning', desc: 'Interactive examples' },
                { icon: '✅', title: 'Practice', desc: 'Hands-on exercises' },
              ].map((feature) => (
                <div 
                  key={feature.title} 
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: 'var(--color-bg-surface)' }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{feature.title}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const featuredAlgos: Array<{
  id: string;
  name: string;
  category: string;
  icon: string;
  chipVariant: 'primary' | 'success';
  description: string;
}> = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    icon: '🔃',
    chipVariant: 'primary',
    description: 'Simple comparison-based sorting algorithm',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    icon: '🔃',
    chipVariant: 'primary',
    description: 'Efficient divide-and-conquer sorting',
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    category: 'Graph',
    icon: '🕸️',
    chipVariant: 'success',
    description: 'Find shortest paths in weighted graphs',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph',
    icon: '🕸️',
    chipVariant: 'success',
    description: 'Explore graphs depth-first',
  },
];
