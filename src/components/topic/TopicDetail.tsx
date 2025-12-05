import { useParams } from 'react-router-dom';

export default function TopicDetail() {
  const { slug } = useParams();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Topic: {slug}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Topic detail page will be implemented in Checkpoint 4
      </p>
    </div>
  );
}
