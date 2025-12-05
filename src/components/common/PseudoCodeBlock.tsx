interface PseudoCodeBlockProps {
  code: string;
  highlightedLine?: number;
}

export default function PseudoCodeBlock({ code, highlightedLine }: PseudoCodeBlockProps) {
  const lines = code.split('\n');

  return (
    <div
      className="code"
      style={{
        backgroundColor: 'var(--color-bg-code)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        overflow: 'auto',
        maxHeight: '400px',
      }}
    >
      {lines.map((line, index) => {
        const lineNumber = index + 1;
        const isHighlighted = highlightedLine === lineNumber;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              backgroundColor: isHighlighted
                ? 'rgba(168, 85, 247, 0.25)'
                : 'transparent',
              borderLeft: isHighlighted
                ? '2px solid var(--color-purple-500)'
                : '2px solid transparent',
              paddingLeft: 'var(--space-2)',
              transition: 'all 0.3s ease',
            }}
          >
            <span
              style={{
                color: '#9ca3af',
                minWidth: '30px',
                marginRight: 'var(--space-3)',
                userSelect: 'none',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {lineNumber}
            </span>
            <span
              style={{
                color: '#e5e7eb',
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-family-mono)',
                whiteSpace: 'pre',
              }}
            >
              {line}
            </span>
          </div>
        );
      })}
    </div>
  );
}
