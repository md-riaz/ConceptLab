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
  const barSpacing = 4;

  const getBarColor = (index: number): string => {
    if (sorted.includes(index)) {
      return 'bg-green-500'; // Sorted - green
    }
    if (comparing && (comparing[0] === index || comparing[1] === index)) {
      return 'bg-orange-500'; // Comparing - orange
    }
    if (swapping && (swapping[0] === index || swapping[1] === index)) {
      return 'bg-purple-500'; // Swapping - purple
    }
    return 'bg-blue-500'; // Default - blue
  };

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Canvas area */}
      <div className="absolute inset-4 flex items-end justify-center gap-1">
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
                className={`${getBarColor(index)} transition-all duration-300 rounded-t flex items-end justify-center`}
                style={{ 
                  height: `${barHeight}px`,
                  width: '100%',
                }}
              >
                {/* Value label */}
                <span className="text-white font-semibold text-xs mb-1">
                  {value}
                </span>
              </div>
              {/* Index label */}
              <span className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                {index}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Unsorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Sorted</span>
        </div>
      </div>
    </div>
  );
}
