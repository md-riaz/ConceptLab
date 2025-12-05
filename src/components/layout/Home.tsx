import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Algorithm Visualizer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Watch every concept step out in real time
        </p>
        <Link
          to="/visualizer/bubble-sort"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
        >
          Try the Algorithm Visualizer
        </Link>
      </div>

      {/* Featured Algorithms */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Featured Algorithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlgos.map((algo) => (
            <Link
              key={algo.id}
              to={`/visualizer/${algo.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {algo.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded ${algo.color}`}>
                  {algo.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {algo.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Paths Teaser */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Learning Paths
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Follow structured paths to master algorithms and data structures
        </p>
        <Link
          to="/paths"
          className="inline-block bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Explore Learning Paths →
        </Link>
      </div>
    </div>
  );
}

const featuredAlgos = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: 'Simple comparison-based sorting algorithm',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: 'Efficient divide-and-conquer sorting',
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    category: 'Graph',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    description: 'Find shortest paths in weighted graphs',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    description: 'Explore graphs depth-first',
  },
];
