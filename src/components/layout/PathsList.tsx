import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Chip } from '../common';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="h1 text-text-primary mb-4">
          Learning Paths
        </h1>
        <p className="body text-text-secondary">
          Follow structured paths to master algorithms and data structures step by step
        </p>
      </div>

      {/* Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {allPaths.map((path) => {
          const progress = pathProgress[path.id] || 0;
          const topicCount = path.topicIds.length;
          const completedCount = Math.round((progress / 100) * topicCount);

          return (
            <Link key={path.id} to={`/paths/${path.id}`}>
              <Card hover variant="elevated" padding="lg" className="h-full">
                {/* Icon */}
                <div className="text-5xl mb-4">📚</div>

                {/* Title */}
                <h2 className="h2 text-text-primary mb-3">
                  {path.title}
                </h2>

                {/* Description */}
                <p className="body-sm text-text-secondary mb-4">
                  {path.description}
                </p>

                {/* Topics Count */}
                <div className="flex items-center gap-2 mb-3">
                  <Chip variant="primary" size="sm">
                    {topicCount} Topics
                  </Chip>
                  <span className="text-sm text-text-secondary">
                    {completedCount} completed
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full rounded-full h-3 mb-2"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}>
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
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card padding="lg" className="text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="h3 text-text-primary mb-3">Structured Learning</h3>
          <p className="body-sm text-text-secondary">
            Follow a carefully designed curriculum that builds knowledge progressively
          </p>
        </Card>
        <Card padding="lg" className="text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="h3 text-text-primary mb-3">Track Progress</h3>
          <p className="body-sm text-text-secondary">
            Monitor your learning journey with automatic progress tracking
          </p>
        </Card>
        <Card padding="lg" className="text-center">
          <div className="text-5xl mb-4">🎨</div>
          <h3 className="h3 text-text-primary mb-3">Visual Learning</h3>
          <p className="body-sm text-text-secondary">
            Understand concepts through interactive visualizations
          </p>
        </Card>
      </div>
    </div>
  );
}
