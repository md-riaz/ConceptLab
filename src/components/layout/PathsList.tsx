import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Chip } from '../common';
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
    <div className="min-h-screen">
      {/* Hero Header */}
      <div 
        className="relative overflow-hidden py-16"
        style={{ backgroundColor: 'var(--color-bg-app)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--color-accent-secondary)]/15 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute right-[-5%] bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)]/10 via-transparent to-transparent blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4" style={{ backgroundColor: 'var(--color-bg-chip)' }}>
              <span className="text-lg">📚</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Structured Curriculum</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Learning Paths
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Follow structured paths to master algorithms and data structures step by step
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {allPaths.map((path) => {
            const progress = pathProgress[path.id] || 0;
            const topicCount = path.topicIds.length;
            const completedCount = Math.round((progress / 100) * topicCount);

            return (
              <Link 
                key={path.id} 
                to={`/paths/${path.id}`}
                className="group no-underline"
              >
                <div className="card h-full p-6">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-bg-pill))' }}
                  >
                    📚
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-2xl font-bold mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {path.title}
                  </h2>

                  {/* Description */}
                  <p 
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {path.description}
                  </p>

                  {/* Topics Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <Chip variant="primary" size="sm">
                      {topicCount} Topics
                    </Chip>
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {completedCount} completed
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div 
                    className="w-full rounded-full h-2 mb-2"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))'
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-right" style={{ color: 'var(--color-text-secondary)' }}>
                    {progress}% complete
                  </div>

                  {/* CTA */}
                  <div 
                    className="flex items-center gap-1 text-sm font-medium mt-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      color: 'var(--color-accent-primary)',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <span>Start learning</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--color-text-primary)' }}>
            Why Use Learning Paths?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Structured Learning', desc: 'Follow a carefully designed curriculum that builds knowledge progressively' },
              { icon: '📊', title: 'Track Progress', desc: 'Monitor your learning journey with automatic progress tracking' },
              { icon: '🎨', title: 'Visual Learning', desc: 'Understand concepts through interactive visualizations' },
            ].map((benefit) => (
              <div 
                key={benefit.title}
                className="card text-center p-6"
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ backgroundColor: 'var(--color-bg-chip)' }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
