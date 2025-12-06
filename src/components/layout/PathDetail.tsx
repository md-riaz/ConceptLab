import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button } from '../common';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card padding="lg">
          <h1 className="h1 text-text-primary mb-4">
            Path Not Found
          </h1>
          <p className="body text-text-secondary mb-6">
            The learning path you're looking for doesn't exist.
          </p>
          <Link to="/paths">
            <Button variant="secondary" size="md">
              ← Back to all paths
            </Button>
          </Link>
        </Card>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link 
          to="/paths"
          className="inline-flex items-center justify-center font-medium transition-all duration-200 text-sm px-3 py-1.5 rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary"
          style={{ textDecoration: 'none' }}
        >
          ← Back to all paths
        </Link>
      </nav>

      {/* Header */}
      <Card variant="elevated" padding="lg" className="mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-6xl">📚</div>
          <div className="flex-1">
            <h1 className="h1 text-text-primary mb-2">
              {path.title}
            </h1>
            <p className="body text-text-secondary">
              {path.description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="body font-semibold text-text-primary">
              Your Progress
            </span>
            <span className="body font-semibold" style={{ color: 'var(--color-accent-primary)' }}>
              {completedCount} / {path.topicIds.length} completed
            </span>
          </div>
          <div className="w-full rounded-full h-3 mb-2" style={{ backgroundColor: 'var(--color-gray-200)' }}>
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: 'var(--color-accent-primary)'
              }}
            ></div>
          </div>
          <div className="text-sm text-text-secondary text-right">
            {progress}% complete
          </div>
        </div>
      </Card>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="h2 text-text-primary mb-6">
          Topics in This Path
        </h2>
        
        {path.topicIds.map((topicId, index) => {
          const topic = allTopics.find(t => t.id === topicId);
          const status = topicsProgress[topicId] || 'not_started';
          
          if (!topic) {
            return (
              <Card key={topicId} padding="md">
                <p className="text-text-secondary">
                  Topic "{topicId}" not found
                </p>
              </Card>
            );
          }

          const statusConfig = {
            not_started: { icon: '⚪', color: 'text-gray-400', label: 'Not Started' },
            in_progress: { icon: '🔵', color: 'text-blue-500', label: 'In Progress' },
            completed: { icon: '✅', color: 'text-green-500', label: 'Completed' },
          };

          const config = statusConfig[status as keyof typeof statusConfig];

          return (
            <Card key={topicId} hover variant="elevated" padding="lg">
              {/* Header */}
              <div className="flex items-start gap-4">
                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-accent-primary)' }}>
                  <span className="text-lg font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="h3 text-text-primary">
                      {topic.title}
                    </h3>
                    <span className={`text-2xl ${config.color}`} title={config.label}>
                      {config.icon}
                    </span>
                  </div>

                  <p className="body-sm text-text-secondary mb-4">
                    {topic.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/topics/${topic.slug}`}>
                      <Button variant="primary" size="sm">
                        📖 Learn More
                      </Button>
                    </Link>
                    
                    {topic.visualAlgorithmId && (
                      <Link to={`/visualizer/${topic.visualAlgorithmId}`}>
                        <Button variant="secondary" size="sm">
                          🎨 Visualize
                        </Button>
                      </Link>
                    )}

                    {status !== 'completed' && (
                      <Button
                        onClick={() => handleMarkCompleted(topicId)}
                        variant="ghost"
                        size="sm"
                        className="border-2 border-green-500 text-green-700 hover:bg-green-50"
                      >
                        ✓ Mark as Completed
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div className="mt-8">
          <Card 
            variant="elevated" 
            padding="lg" 
            className="border-2"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderColor: 'var(--color-green-500)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-5xl">🎉</span>
              <div>
                <h3 className="h3 mb-1" style={{ color: 'var(--color-green-500)' }}>
                  Congratulations!
                </h3>
                <p className="body" style={{ color: 'var(--color-green-500)' }}>
                  You've completed the {path.title}! Keep learning and exploring more topics.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
