import { Link } from 'react-router-dom';
import { useState } from 'react';
import dsaBeginnerPath from '../../content/paths/dsa-beginner.json';
import type { LearningPath } from '../../visualizer/engine/types';
import { getTopicProgress } from '../../utils/localStorage';

const allPaths: LearningPath[] = [dsaBeginnerPath as LearningPath];

export default function PathsList() {
  const [pathProgress] = useState<{ [pathId: string]: number }>(() => {
    // Calculate progress for each path
    const progress: { [pathId: string]: number } = {};
    
    allPaths.forEach(path => {
      const completedCount = path.topicIds.filter(topicId => {
        const topicProgress = getTopicProgress(topicId);
        return topicProgress?.status === 'completed';
      }).length;
      progress[path.id] = Math.round((completedCount / path.topicIds.length) * 100);
    });

    return progress;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="h1 text-gray-900 dark:text-white mb-4">
          Learning Paths
        </h1>
        <p className="body text-gray-600 dark:text-gray-300">
          Follow structured paths to master algorithms and data structures step by step
        </p>
      </div>

      {/* Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPaths.map((path) => {
          const progress = pathProgress[path.id] || 0;
          const topicCount = path.topicIds.length;
          const completedCount = Math.round((progress / 100) * topicCount);

          return (
            <Link
              key={path.id}
              to={`/paths/${path.id}`}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">📚</div>

              {/* Title */}
              <h2 className="h2 text-gray-900 dark:text-white mb-3">
                {path.title}
              </h2>

              {/* Description */}
              <p className="body-sm text-gray-600 dark:text-gray-300 mb-4">
                {path.description}
              </p>

              {/* Topics Count */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {topicCount} Topics
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {completedCount} completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div
                  className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                {progress}% complete
              </div>
            </Link>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="h3 text-gray-900 dark:text-white mb-2">Structured Learning</h3>
          <p className="body-sm text-gray-600 dark:text-gray-300">
            Follow a carefully designed curriculum that builds knowledge progressively
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="h3 text-gray-900 dark:text-white mb-2">Track Progress</h3>
          <p className="body-sm text-gray-600 dark:text-gray-300">
            Monitor your learning journey with automatic progress tracking
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="h3 text-gray-900 dark:text-white mb-2">Visual Learning</h3>
          <p className="body-sm text-gray-600 dark:text-gray-300">
            Understand concepts through interactive visualizations
          </p>
        </div>
      </div>
    </div>
  );
}
