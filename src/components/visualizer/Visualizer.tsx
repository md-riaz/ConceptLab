import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { VisualRunner } from '../../visualizer/engine/VisualRunner';
import { BubbleSort } from '../../visualizer/algorithms/sorting/BubbleSort';
import { InsertionSort } from '../../visualizer/algorithms/sorting/InsertionSort';
import SortingBarsCanvas from '../../visualizer/renderers/SortingBarsCanvas';
import type { VisualAlgorithm } from '../../visualizer/engine/types';

const algorithms: Record<string, VisualAlgorithm> = {
  'bubble-sort': BubbleSort,
  'insertion-sort': InsertionSort,
};

export default function Visualizer() {
  const { algoId } = useParams();
  const algorithm = algorithms[algoId || 'bubble-sort'] || BubbleSort;
  
  const [arraySize, setArraySize] = useState(7);
  const [speed, setSpeed] = useState(500);
  const [customInput, setCustomInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const runnerRef = useRef<VisualRunner | null>(null);

  const generateRandomArray = (size: number): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  };

  const parseCustomInput = (input: string): number[] | null => {
    try {
      const numbers = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      return numbers.length > 0 ? numbers : null;
    } catch {
      return null;
    }
  };

  const initializeVisualization = () => {
    const inputArray = customInput ? (parseCustomInput(customInput) || generateRandomArray(arraySize)) : generateRandomArray(arraySize);
    const steps = algorithm.generateSteps(inputArray);
    
    if (runnerRef.current) {
      runnerRef.current.destroy();
    }

    runnerRef.current = new VisualRunner(steps, {
      speedMs: speed,
      onStepChange: (step, total) => {
        setCurrentStep(step);
        setTotalSteps(total);
      },
      onComplete: () => {
        setIsPlaying(false);
      },
    });

    setCurrentStep(0);
    setTotalSteps(steps.length);
  };

  useEffect(() => {
    initializeVisualization();
    return () => {
      if (runnerRef.current) {
        runnerRef.current.destroy();
      }
    };
  }, [algorithm, arraySize]);

  useEffect(() => {
    if (runnerRef.current) {
      runnerRef.current.setSpeed(speed);
    }
  }, [speed]);

  const handleStart = () => {
    if (runnerRef.current) {
      runnerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (runnerRef.current) {
      runnerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (runnerRef.current) {
      runnerRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (runnerRef.current) {
      runnerRef.current.next();
    }
  };

  const handlePrevious = () => {
    if (runnerRef.current) {
      runnerRef.current.previous();
    }
  };

  const handleRestart = () => {
    initializeVisualization();
    setIsPlaying(false);
  };

  const currentStepData = runnerRef.current?.getCurrentStep();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1" style={{ 
          color: 'var(--color-text-primary)', 
          marginBottom: 'var(--space-2)' 
        }}>
          Algorithm Visualizer
        </h1>
        <p className="body" style={{ color: 'var(--color-text-secondary)' }}>
          Choose an algorithm, hit start, and watch each step play out in real time
        </p>
      </div>

      {/* Control Panel */}
      <div style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        <h2 className="h3" style={{ 
          color: 'var(--color-text-primary)', 
          marginBottom: 'var(--space-4)' 
        }}>Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algorithm Selection */}
          <div>
            <label className="block body-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Algorithm
            </label>
            <select
              className="w-full"
              style={{
                padding: 'var(--space-3) var(--space-4)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-md)',
              }}
              value={algoId || 'bubble-sort'}
              onChange={(e) => window.location.href = `/visualizer/${e.target.value}`}
            >
              <option value="bubble-sort">Bubble Sort</option>
              <option value="insertion-sort">Insertion Sort</option>
            </select>
          </div>

          {/* Array Size */}
          <div>
            <label className="block body-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="3"
              max="20"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="w-full accent-[var(--color-accent-primary)]"
              style={{ height: '4px' }}
            />
          </div>

          {/* Step Delay */}
          <div>
            <label className="block body-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Step Delay: {speed}ms
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full accent-[var(--color-accent-primary)]"
              style={{ height: '4px' }}
            />
          </div>

          {/* Custom Input */}
          <div>
            <label className="block body-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Custom Array (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., 23, 5, 7, 1, 9"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  initializeVisualization();
                }
              }}
              className="w-full"
              style={{
                padding: 'var(--space-3) var(--space-4)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-md)',
              }}
            />
          </div>
        </div>

        {/* Transport Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          {!isPlaying ? (
            <button
              onClick={handleStart}
              className="font-semibold transition-all"
              style={{
                padding: 'var(--space-3) var(--space-5)',
                backgroundColor: 'var(--color-accent-primary)',
                color: 'var(--color-text-on-primary)',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'var(--font-size-md)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-600)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)'}
            >
              ▶ Start Visualization
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="font-semibold transition-all"
              style={{
                padding: 'var(--space-3) var(--space-5)',
                backgroundColor: 'var(--color-orange-500)',
                color: 'var(--color-text-on-primary)',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'var(--font-size-md)',
              }}
            >
              ⏸ Pause
            </button>
          )}
          
          <button
            onClick={handleStop}
            className="font-semibold transition-all"
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'var(--color-red-500)',
              color: 'var(--color-text-on-primary)',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--font-size-md)',
            }}
          >
            ⏹ Stop / Reset
          </button>

          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: 'var(--font-size-md)',
            }}
          >
            ◀ Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              cursor: currentStep === totalSteps - 1 ? 'not-allowed' : 'pointer',
              fontSize: 'var(--font-size-md)',
            }}
          >
            Next ▶
          </button>

          <button
            onClick={handleRestart}
            className="font-semibold transition-all"
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'var(--color-accent-secondary)',
              color: 'var(--color-text-on-primary)',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--font-size-md)',
            }}
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 className="h3" style={{ 
          color: 'var(--color-text-primary)', 
          marginBottom: 'var(--space-4)' 
        }}>Visualization</h2>
        {currentStepData && (
          <SortingBarsCanvas state={currentStepData.state} width={800} height={400} />
        )}
      </div>

      {/* Step Information */}
      <div style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: 'var(--space-6)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        <h2 className="h3" style={{ 
          color: 'var(--color-text-primary)', 
          marginBottom: 'var(--space-4)' 
        }}>
          Step Information
        </h2>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
            <span className="caption font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Step {currentStep + 1} of {totalSteps}
            </span>
            {currentStepData?.metadata?.label && (
              <span style={{
                padding: 'var(--space-1) var(--space-3)',
                backgroundColor: 'var(--color-bg-chip)',
                color: 'var(--color-accent-primary)',
                borderRadius: 'var(--radius-pill)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
              }}>
                {currentStepData.metadata.label}
              </span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full" style={{
            backgroundColor: 'var(--viz-bar-default)',
            borderRadius: 'var(--radius-pill)',
            height: '4px',
          }}>
            <div
              className="transition-all duration-300"
              style={{ 
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
                backgroundColor: 'var(--color-accent-primary)',
                height: '4px',
                borderRadius: 'var(--radius-pill)',
              }}
            ></div>
          </div>
        </div>

        {currentStepData && (
          <div className="space-y-4">
            <div>
              <h3 className="body-sm font-semibold" style={{ 
                color: 'var(--color-text-secondary)', 
                marginBottom: 'var(--space-1)' 
              }}>
                Description
              </h3>
              <p className="body" style={{ color: 'var(--color-text-primary)' }}>
                {currentStepData.description}
              </p>
            </div>

            {currentStepData.reason && (
              <div>
                <h3 className="body-sm font-semibold" style={{ 
                  color: 'var(--color-text-secondary)', 
                  marginBottom: 'var(--space-1)' 
                }}>
                  Why?
                </h3>
                <p className="body italic" style={{ color: 'var(--color-text-primary)' }}>
                  {currentStepData.reason}
                </p>
              </div>
            )}

            {currentStepData.metadata && (
              <div className="flex gap-4 body-sm">
                {currentStepData.metadata.comparisons !== undefined && (
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Comparisons: </span>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {currentStepData.metadata.comparisons}
                    </span>
                  </div>
                )}
                {currentStepData.metadata.swaps !== undefined && (
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Swaps: </span>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {currentStepData.metadata.swaps}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
