import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Button } from '../common';
import categories from '../../content/categories.json';
import bubbleSortTopic from '../../content/topics/bubble-sort.json';
import insertionSortTopic from '../../content/topics/insertion-sort.json';
import mergeSortTopic from '../../content/topics/merge-sort.json';
import bfsTopic from '../../content/topics/bfs.json';
import dfsTopic from '../../content/topics/dfs.json';
import roundRobinTopic from '../../content/topics/round-robin.json';
import sjfTopic from '../../content/topics/sjf.json';
import type { Topic, Category } from '../../visualizer/engine/types';

// Combine all topics
const allTopics: Topic[] = [
  bubbleSortTopic as Topic,
  insertionSortTopic as Topic,
  mergeSortTopic as Topic,
  bfsTopic as Topic,
  dfsTopic as Topic,
  roundRobinTopic as Topic,
  sjfTopic as Topic,
];

const difficultyVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

export default function TopicsList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTopics = selectedCategory
    ? allTopics.filter(topic => topic.categoryId === selectedCategory)
    : allTopics;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div 
        className="relative overflow-hidden py-16"
        style={{ backgroundColor: 'var(--color-bg-app)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)]/10 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute left-[-5%] bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-[var(--color-accent-secondary)]/10 via-transparent to-transparent blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              All Topics
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Explore algorithms and computer science concepts with interactive visualizations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{ 
                backgroundColor: selectedCategory === null ? 'var(--color-accent-primary)' : 'var(--color-bg-surface)',
                color: selectedCategory === null ? 'white' : 'var(--color-text-secondary)',
                border: selectedCategory === null ? 'none' : '1px solid var(--color-border-subtle)',
              }}
            >
              All Topics
            </button>
            {(categories as Category[]).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{ 
                  backgroundColor: selectedCategory === category.id ? 'var(--color-accent-primary)' : 'var(--color-bg-surface)',
                  color: selectedCategory === category.id ? 'white' : 'var(--color-text-secondary)',
                  border: selectedCategory === category.id ? 'none' : '1px solid var(--color-border-subtle)',
                }}
              >
                <span>{category.icon}</span>
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
                className="group no-underline"
              >
                <div className="card h-full flex flex-col p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 
                      className="text-xl font-semibold flex-1 group-hover:text-[var(--color-accent-primary)] transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {topic.title}
                    </h3>
                    {topic.visualAlgorithmId && (
                      <span 
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-lg"
                        style={{ backgroundColor: 'var(--color-primary-100)' }}
                        title="Has visualization"
                      >
                        🎨
                      </span>
                    )}
                  </div>

                  {/* Category & Difficulty */}
                  <div className="flex items-center gap-2 mb-4">
                    {category && (
                      <Chip variant="primary" size="sm">
                        <span className="mr-0.5">{category.icon}</span>
                        {category.name}
                      </Chip>
                    )}
                    <Chip variant={difficultyVariant[topic.difficulty]} size="sm">
                      {topic.difficulty.toUpperCase()}
                    </Chip>
                  </div>

                  {/* Summary */}
                  <p 
                    className="text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {topic.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-0.5 text-xs rounded-full"
                        style={{ 
                          backgroundColor: 'var(--color-gray-100)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div 
                    className="flex items-center gap-1 text-sm font-medium pt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      color: 'var(--color-accent-primary)',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <span>Learn more</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div 
            className="text-center py-16 rounded-2xl"
            style={{ 
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <div className="text-4xl mb-4">📭</div>
            <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
              No topics found
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No topics found in this category yet. Check back soon!
            </p>
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-4"
              onClick={() => setSelectedCategory(null)}
            >
              View all topics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
