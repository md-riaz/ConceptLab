import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
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
import { getTopicProgress, markAsInProgress } from '../../utils/localStorage';

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

// Simple markdown-to-JSX converter for basic formatting
function renderMarkdown(markdown: string) {
  // Split by lines
  const lines = markdown.split('\n');
  const elements: React.ReactElement[] = [];
  let key = 0;

  lines.forEach((line) => {
    // Headers
    if (line.startsWith('###')) {
      elements.push(<h4 key={key++} className="h4 text-gray-900 dark:text-white mt-4 mb-2">{line.replace(/^###\s*/, '')}</h4>);
    } else if (line.startsWith('##')) {
      elements.push(<h3 key={key++} className="h3 text-gray-900 dark:text-white mt-6 mb-3">{line.replace(/^##\s*/, '')}</h3>);
    }
    // Bold text
    else if (line.includes('**')) {
      const parts = line.split('**');
      const formatted = parts.map((part, i) => 
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      );
      elements.push(<p key={key++} className="body text-gray-700 dark:text-gray-300 mb-2">{formatted}</p>);
    }
    // List items
    else if (line.trim().startsWith('-')) {
      elements.push(<li key={key++} className="body text-gray-700 dark:text-gray-300 ml-4 mb-1">{line.replace(/^-\s*/, '')}</li>);
    }
    // Checkmark list items
    else if (line.trim().startsWith('✅') || line.trim().startsWith('❌')) {
      elements.push(<li key={key++} className="body text-gray-700 dark:text-gray-300 mb-1 list-none">{line}</li>);
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<br key={key++} />);
    }
    // Regular paragraph
    else if (line.trim()) {
      elements.push(<p key={key++} className="body text-gray-700 dark:text-gray-300 mb-2">{line}</p>);
    }
  });

  return elements;
}

export default function TopicDetail() {
  const { slug } = useParams();
  const topic = allTopics.find(t => t.slug === slug);

  const [progress] = useState<'not_started' | 'in_progress' | 'completed'>(() => {
    if (topic) {
      const currentProgress = getTopicProgress(topic.id);
      const status = currentProgress?.status || 'not_started';
      
      // Mark as in progress if not started
      if (status === 'not_started') {
        markAsInProgress(topic.id);
        return 'in_progress';
      }
      return status;
    }
    return 'not_started';
  });

  if (!topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card padding="lg">
          <h1 className="h1 text-text-primary mb-4">
            Topic Not Found
          </h1>
          <p className="body text-text-secondary mb-6">
            The topic you're looking for doesn't exist.
          </p>
          <Link to="/topics">
            <Button variant="secondary" size="md">
              ← Back to all topics
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const category = (categories as Category[]).find(c => c.id === topic.categoryId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link 
          to="/topics"
          className="inline-flex items-center justify-center font-medium transition-all duration-200 text-sm px-3 py-1.5 rounded-md text-text-secondary hover:bg-gray-100 hover:text-text-primary"
          style={{ textDecoration: 'none' }}
        >
          ← Back to all topics
        </Link>
      </nav>

      {/* Header */}
      <Card variant="elevated" padding="lg" className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="h1 text-text-primary">
            {topic.title}
          </h1>
          {progress === 'completed' && (
            <span className="text-3xl" title="Completed">✅</span>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {category && (
            <Chip variant="primary" size="md">
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Chip>
          )}
          <Chip variant={difficultyVariant[topic.difficulty]} size="md">
            {topic.difficulty.toUpperCase()}
          </Chip>
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-1 text-sm rounded"
              style={{
                backgroundColor: 'var(--color-gray-100)',
                color: 'var(--color-text-secondary)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="body text-text-secondary mb-6">
          {topic.summary}
        </p>

        {/* CTA */}
        {topic.visualAlgorithmId && (
          <Link to={`/visualizer/${topic.visualAlgorithmId}`}>
            <Button variant="primary" size="md">
              🎨 Open in Visualizer
            </Button>
          </Link>
        )}
      </Card>

      {/* Sections */}
      <div className="space-y-6">
        {topic.sections.map((section) => (
          <Card key={section.id} variant="elevated" padding="lg">
            <h2 className="h2 text-text-primary mb-4">
              {section.title}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              {renderMarkdown(section.contentMarkdown)}
            </div>
          </Card>
        ))}
      </div>

      {/* Related Topics */}
      <div className="mt-12">
        <h3 className="h3 text-text-primary mb-4">
          More in {category?.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTopics
            .filter(t => t.categoryId === topic.categoryId && t.id !== topic.id)
            .slice(0, 2)
            .map((relatedTopic) => (
              <Link key={relatedTopic.id} to={`/topics/${relatedTopic.slug}`}>
                <Card hover padding="md">
                  <h4 className="h4 text-text-primary mb-2">
                    {relatedTopic.title}
                  </h4>
                  <p className="body-sm text-text-secondary">
                    {relatedTopic.summary.slice(0, 100)}...
                  </p>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
