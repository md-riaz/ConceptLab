export default function Footer() {
  return (
    <footer className="mt-auto" style={{ 
      backgroundColor: 'var(--color-bg-surface)', 
      borderTop: '1px solid var(--color-border-subtle)' 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="body font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            🧪 ConceptLab - Algorithm & CS Concept Visualizer
          </p>
          <p className="body-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Built to help learners visualize abstract processes step-by-step
          </p>
        </div>
      </div>
    </footer>
  );
}
