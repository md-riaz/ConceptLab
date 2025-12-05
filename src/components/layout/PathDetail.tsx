import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import dsaBeginnerPath from '../../content/paths/dsa-beginner.json';
import bubbleSortTopic from '../../content/topics/bubble-sort.json';
import insertionSortTopic from '../../content/topics/insertion-sort.json';
import mergeSortTopic from '../../content/topics/merge-sort.json';
import type { LearningPath, Topic } from '../../visualizer/engine/types';
import { getTopicProgress, markAsCompleted } from '../../utils/localStorage';

const allPaths: LearningPath[] = [dsaBeginnerPath as LearningPath];
const allTopics: Topic[] = [
  bubbleSortTopic as Topic,
  insertionSortTopic as Topic,
  mergeSortTopic as Topic,
];

export default function PathDetail() {
  const { pathId } = useParams();
  const path = allPaths.find(p => p.id === pathId);

  const [topicsProgress, setTopicsProgress] = useState<{ [topicId: string]: string }>(() => {
    if (path) {
      const progress: { [topicId: string]: string } = {};
      path.topicIds.forEach(topicId => {
        const topicProgress = getTopicProgress(topicId);
        progress[topicId] = topicProgress?.status || 'not_started';
      });
      return progress;
    }
    return {};
  });

  if (!path) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="h1 text-gray-900 dark:text-white mb-4">
          Path Not Found
        </h1>
        <p className="body text-gray-600 dark:text-gray-300 mb-6">
          The learning path you're looking for doesn't exist.
        </p>
        <Link to="/paths" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to all paths
        </Link>
      </div>
    );
  }

  const completedCount = path.topicIds.filter(id => topicsProgress[id] === 'completed').length;
  const progress = Math.round((completedCount / path.topicIds.length) * 100);

  const handleMarkCompleted = (topicId: string) => {
    markAsCompleted(topicId);
    setTopicsProgress(prev => ({ ...prev, [topicId]: 'completed' }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link to="/paths" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to all paths
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">📚</div>
          <div className="flex-1">
            <h1 className="h1 text-gray-900 dark:text-white mb-2">
              {path.title}
            </h1>
            <p className="body text-gray-600 dark:text-gray-300">
              {path.description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="body font-semibold text-gray-900 dark:text-white">
              Your Progress
            </span>
            <span className="body font-semibold text-indigo-600 dark:text-indigo-400">
              {completedCount} / {path.topicIds.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
            {progress}% complete
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="h2 text-gray-900 dark:text-white mb-4">
          Topics in This Path
        </h2>
        
        {path.topicIds.map((topicId, index) => {
          const topic = allTopics.find(t => t.id === topicId);
          const status = topicsProgress[topicId] || 'not_started';
          
          if (!topic) {
            return (
              <div key={topicId} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Topic "{topicId}" not found
                </p>
              </div>
            );
          }

          const statusConfig = {
            not_started: { icon: '⚪', color: 'text-gray-400', label: 'Not Started' },
            in_progress: { icon: '🔵', color: 'text-blue-500', label: 'In Progress' },
            completed: { icon: '✅', color: 'text-green-500', label: 'Completed' },
          };

          const config = statusConfig[status as keyof typeof statusConfig];

          return (
            <div
              key={topicId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                {/* Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="h3 text-gray-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <span className={`text-2xl ${config.color}`} title={config.label}>
                      {config.icon}
                    </span>
                  </div>

                  <p className="body-sm text-gray-600 dark:text-gray-300 mb-4">
                    {topic.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/topics/${topic.slug}`}
                      className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition-colors"
                    >
                      📖 Learn More
                    </Link>
                    
                    {topic.visualAlgorithmId && (
                      <Link
                        to={`/visualizer/${topic.visualAlgorithmId}`}
                        className="inline-block px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors"
                      >
                        🎨 Visualize
                      </Link>
                    )}

                    {status !== 'completed' && (
                      <button
                        onClick={() => handleMarkCompleted(topicId)}
                        className="inline-block px-4 py-2 border-2 border-green-500 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                      >
                        ✓ Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div className="mt-8 bg-green-50 dark:bg-green-900 rounded-lg p-6 border-2 border-green-500">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎉</span>
            <div>
              <h3 className="h3 text-green-900 dark:text-green-100 mb-1">
                Congratulations!
              </h3>
              <p className="body text-green-800 dark:text-green-200">
                You've completed the {path.title}! Keep learning and exploring more topics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
