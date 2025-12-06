import { Link } from 'react-router-dom';
import { Button, Card, Chip } from '../common';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="h1 text-text-primary mb-6" style={{ fontSize: '3.5rem' }}>
          Algorithm Visualizer
        </h1>
        <p className="text-2xl text-text-secondary mb-10 max-w-3xl mx-auto">
          Watch every concept step out in real time
        </p>
        <Link to="/visualizer/bubble-sort">
          <Button variant="primary" size="lg">
            🎨 Try the Algorithm Visualizer
          </Button>
        </Link>
      </div>

      {/* Featured Algorithms */}
      <div className="mb-20">
        <h2 className="h2 text-text-primary mb-8">
          Featured Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlgos.map((algo) => (
            <Link key={algo.id} to={`/visualizer/${algo.id}`}>
              <Card hover padding="lg" className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="h4 text-text-primary">
                    {algo.name}
                  </h3>
                  <span className="text-2xl">{algo.icon}</span>
                </div>
                <div className="mb-3">
                  <Chip variant={algo.chipVariant} size="sm">
                    {algo.category}
                  </Chip>
                </div>
                <p className="body-sm text-text-secondary">
                  {algo.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Paths Teaser */}
      <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-primary-100 to-purple-100">
        <div className="max-w-2xl">
          <h2 className="h2 text-text-primary mb-4">
            Learning Paths
          </h2>
          <p className="body text-text-secondary mb-6">
            Follow structured paths to master algorithms and data structures step by step
          </p>
          <Link to="/paths">
            <Button variant="secondary" size="md">
              📚 Explore Learning Paths →
            </Button>
          </Link>
        </div>
      </Card>
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
