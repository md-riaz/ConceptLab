import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Chip, Button } from '../common';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="h1 text-text-primary mb-4">
          All Topics
        </h1>
        <p className="body text-text-secondary">
          Explore algorithms and computer science concepts with interactive visualizations
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <h2 className="h4 text-text-primary mb-5">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            size="sm"
          >
            All Topics
          </Button>
          {(categories as Category[]).map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
            >
              <span className="mr-1.5">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const category = (categories as Category[]).find(c => c.id === topic.categoryId);
          
          return (
            <Link key={topic.id} to={`/topics/${topic.slug}`}>
              <Card hover padding="lg" className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="h3 text-text-primary flex-1">
                    {topic.title}
                  </h3>
                  {topic.visualAlgorithmId && (
                    <span className="text-2xl ml-2" title="Has visualization">
                      🎨
                    </span>
                  )}
                </div>

                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-3">
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
                <p className="body-sm text-text-secondary mb-4 flex-1">
                  {topic.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                      style={{ 
                        backgroundColor: 'var(--color-gray-100)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <Card padding="lg" className="text-center">
          <p className="body text-text-secondary">
            No topics found in this category yet. Check back soon!
          </p>
        </Card>
      )}
    </div>
  );
}
