import type { SortingState } from '../algorithms/sorting/BubbleSort';

interface SortingBarsCanvasProps {
  state: SortingState;
  width?: number;
  height?: number;
}

export default function SortingBarsCanvas({ state, width = 800, height = 400 }: SortingBarsCanvasProps) {
  const { array, comparing, swapping, sorted = [] } = state;
  const maxValue = Math.max(...array);
  const barWidth = Math.floor((width - 40) / array.length);
  const barSpacing = 2;

  const getBarColor = (index: number): string => {
    // Using design token colors for semantic meaning
    if (sorted.includes(index)) {
      return 'bg-[var(--viz-bar-final)]'; // Sorted - green
    }
    if (comparing && (comparing[0] === index || comparing[1] === index)) {
      return 'bg-[var(--viz-bar-current)]'; // Comparing - orange
    }
    if (swapping && (swapping[0] === index || swapping[1] === index)) {
      return 'bg-[var(--viz-bar-comparison)]'; // Swapping - purple
    }
    return 'bg-[var(--viz-bar-default)]'; // Default - gray
  };

  return (
    <div 
      className="relative rounded-md shadow-md border"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border-subtle)',
        padding: 'var(--space-5)',
      }}
    >
      {/* Canvas area */}
      <div className="absolute inset-5 flex items-end justify-center gap-1">
        {array.map((value, index) => {
          const barHeight = (value / maxValue) * (height - 80);
          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-end"
              style={{ width: `${barWidth - barSpacing}px` }}
            >
              {/* Bar */}
              <div
                className={`${getBarColor(index)} transition-all duration-300 flex items-end justify-center`}
                style={{ 
                  height: `${barHeight}px`,
                  width: '100%',
                  borderTopLeftRadius: 'var(--radius-sm)',
                  borderTopRightRadius: 'var(--radius-sm)',
                }}
              >
                {/* Value label */}
                <span 
                  className="font-semibold mb-1"
                  style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-on-primary)',
                  }}
                >
                  {value}
                </span>
              </div>
              {/* Index label */}
              <span 
                className="mt-1"
                style={{ 
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {index}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend with semantic color chips */}
      <div 
        className="absolute bottom-2 left-4 flex gap-4"
        style={{ fontSize: 'var(--font-size-xs)' }}
      >
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3"
            style={{ 
              backgroundColor: 'var(--viz-bar-default)',
              borderRadius: 'var(--radius-sm)',
            }}
          ></div>
          <span style={{ color: 'var(--color-text-secondary)' }}>Unsorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3"
            style={{ 
              backgroundColor: 'var(--viz-bar-current)',
              borderRadius: 'var(--radius-sm)',
            }}
          ></div>
          <span style={{ color: 'var(--color-text-secondary)' }}>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3"
            style={{ 
              backgroundColor: 'var(--viz-bar-comparison)',
              borderRadius: 'var(--radius-sm)',
            }}
          ></div>
          <span style={{ color: 'var(--color-text-secondary)' }}>Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3"
            style={{ 
              backgroundColor: 'var(--viz-bar-final)',
              borderRadius: 'var(--radius-sm)',
            }}
          ></div>
          <span style={{ color: 'var(--color-text-secondary)' }}>Sorted</span>
        </div>
      </div>
    </div>
  );
}
