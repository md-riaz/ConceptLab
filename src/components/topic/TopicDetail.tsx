import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import categories from '../../content/categories.json';
import bubbleSortTopic from '../../content/topics/bubble-sort.json';
import insertionSortTopic from '../../content/topics/insertion-sort.json';
import mergeSortTopic from '../../content/topics/merge-sort.json';
import type { Topic, Category } from '../../visualizer/engine/types';
import { getTopicProgress, markAsInProgress } from '../../utils/localStorage';

// Combine all topics
const allTopics: Topic[] = [
  bubbleSortTopic as Topic,
  insertionSortTopic as Topic,
  mergeSortTopic as Topic,
];

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

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
  const [progress, setProgress] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');

  const topic = allTopics.find(t => t.slug === slug);

  useEffect(() => {
    if (topic) {
      const currentProgress = getTopicProgress(topic.id);
      const status = currentProgress?.status || 'not_started';
      setProgress(status);
      
      // Mark as in progress if not started
      if (status === 'not_started') {
        markAsInProgress(topic.id);
        setProgress('in_progress');
      }
    }
  }, [topic]);

  if (!topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="h1 text-gray-900 dark:text-white mb-4">
          Topic Not Found
        </h1>
        <p className="body text-gray-600 dark:text-gray-300 mb-6">
          The topic you're looking for doesn't exist.
        </p>
        <Link to="/topics" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to all topics
        </Link>
      </div>
    );
  }

  const category = (categories as Category[]).find(c => c.id === topic.categoryId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link to="/topics" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to all topics
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="h1 text-gray-900 dark:text-white">
            {topic.title}
          </h1>
          {progress === 'completed' && (
            <span className="text-3xl" title="Completed">✅</span>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              <span className="mr-1.5">{category.icon}</span>
              {category.name}
            </span>
          )}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[topic.difficulty]}`}>
            {topic.difficulty.toUpperCase()}
          </span>
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-1 text-sm rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="body text-gray-700 dark:text-gray-300 mb-6">
          {topic.summary}
        </p>

        {/* CTA */}
        {topic.visualAlgorithmId && (
          <Link
            to={`/visualizer/${topic.visualAlgorithmId}`}
            className="inline-block px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors"
          >
            🎨 Open in Visualizer
          </Link>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {topic.sections.map((section) => (
          <section key={section.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              {renderMarkdown(section.contentMarkdown)}
            </div>
          </section>
        ))}
      </div>

      {/* Related Topics */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="h3 text-gray-900 dark:text-white mb-4">
          More in {category?.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTopics
            .filter(t => t.categoryId === topic.categoryId && t.id !== topic.id)
            .slice(0, 2)
            .map((relatedTopic) => (
              <Link
                key={relatedTopic.id}
                to={`/topics/${relatedTopic.slug}`}
                className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <h4 className="h4 text-gray-900 dark:text-white mb-2">
                  {relatedTopic.title}
                </h4>
                <p className="body-sm text-gray-600 dark:text-gray-400">
                  {relatedTopic.summary.slice(0, 100)}...
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
