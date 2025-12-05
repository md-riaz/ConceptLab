import { useState } from 'react';
import { Link } from 'react-router-dom';
import categories from '../../content/categories.json';
import bubbleSortTopic from '../../content/topics/bubble-sort.json';
import insertionSortTopic from '../../content/topics/insertion-sort.json';
import mergeSortTopic from '../../content/topics/merge-sort.json';
import bfsTopic from '../../content/topics/bfs.json';
import dfsTopic from '../../content/topics/dfs.json';
import type { Topic, Category } from '../../visualizer/engine/types';

// Combine all topics
const allTopics: Topic[] = [
  bubbleSortTopic as Topic,
  insertionSortTopic as Topic,
  mergeSortTopic as Topic,
  bfsTopic as Topic,
  dfsTopic as Topic,
];

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function TopicsList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTopics = selectedCategory
    ? allTopics.filter(topic => topic.categoryId === selectedCategory)
    : allTopics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="h1 text-gray-900 dark:text-white mb-4">
          All Topics
        </h1>
        <p className="body text-gray-600 dark:text-gray-300">
          Explore algorithms and computer science concepts with interactive visualizations
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="h4 text-gray-900 dark:text-white mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === null
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All Topics
          </button>
          {(categories as Category[]).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const category = (categories as Category[]).find(c => c.id === topic.categoryId);
          
          return (
            <Link
              key={topic.id}
              to={`/topics/${topic.slug}`}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="h3 text-gray-900 dark:text-white">
                  {topic.title}
                </h3>
                {topic.visualAlgorithmId && (
                  <span className="text-2xl" title="Has visualization">
                    🎨
                  </span>
                )}
              </div>

              {/* Category & Difficulty */}
              <div className="flex items-center gap-2 mb-3">
                {category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </span>
                )}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[topic.difficulty]}`}>
                  {topic.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Summary */}
              <p className="body-sm text-gray-600 dark:text-gray-300 mb-4">
                {topic.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {topic.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="body text-gray-600 dark:text-gray-400">
            No topics found in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
