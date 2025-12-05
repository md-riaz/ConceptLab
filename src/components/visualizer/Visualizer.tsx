import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { VisualRunner } from '../../visualizer/engine/VisualRunner';
import { BubbleSort } from '../../visualizer/algorithms/sorting/BubbleSort';
import { InsertionSort } from '../../visualizer/algorithms/sorting/InsertionSort';
import { BFS } from '../../visualizer/algorithms/graphs/BFS';
import { DFS } from '../../visualizer/algorithms/graphs/DFS';
import { RoundRobin } from '../../visualizer/algorithms/os/RoundRobin';
import { SJF } from '../../visualizer/algorithms/os/SJF';
import SortingBarsCanvas from '../../visualizer/renderers/SortingBarsCanvas';
import { GraphCanvas } from '../../visualizer/renderers/GraphCanvas';
import { GanttChart } from '../../visualizer/renderers/GanttChart';
import PseudoCodeBlock from '../common/PseudoCodeBlock';
import { pseudocodeMap } from '../../visualizer/pseudocode/sortingPseudocode';
import { graphPseudocode } from '../../visualizer/pseudocode/graphPseudocode';
import { osPseudocode } from '../../visualizer/pseudocode/osPseudocode';
import type { VisualAlgorithm } from '../../visualizer/engine/types';

const algorithms: Record<string, VisualAlgorithm> = {
  'bubble-sort': BubbleSort,
  'insertion-sort': InsertionSort,
  'bfs': BFS,
  'dfs': DFS,
  'round-robin': RoundRobin,
  'sjf': SJF,
};

const allPseudocode = { ...pseudocodeMap, ...graphPseudocode, ...osPseudocode };

export default function Visualizer() {
  const { algoId } = useParams();
  const algorithm = algorithms[algoId || 'bubble-sort'] || BubbleSort;
  
  const [arraySize, setArraySize] = useState(7);
  const [speed, setSpeed] = useState(500);
  const [customInput, setCustomInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'pseudocode'>('explanation');
  const [verboseMode, setVerboseMode] = useState(false);
  
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

  const initializeVisualization = useCallback(() => {
    let steps;
    
    if (algorithm.categoryId === 'sorting') {
      const inputArray = customInput ? (parseCustomInput(customInput) || generateRandomArray(arraySize)) : generateRandomArray(arraySize);
      steps = algorithm.generateSteps(inputArray);
    } else {
      // For non-sorting algorithms, use default input
      steps = algorithm.generateSteps(algorithm.defaultInput);
    }
    
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
  }, [algorithm, arraySize, customInput, speed]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeVisualization();
    return () => {
      if (runnerRef.current) {
        runnerRef.current.destroy();
      }
    };
  }, [initializeVisualization]);

  useEffect(() => {
    if (runnerRef.current) {
      runnerRef.current.setSpeed(speed);
    }
  }, [speed]);

  const handleStart = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.stop();
      setIsPlaying(false);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.next();
    }
  }, []);

  const handlePrevious = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.previous();
    }
  }, []);

  const handleRestart = useCallback(() => {
    initializeVisualization();
    setIsPlaying(false);
  }, [initializeVisualization]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ': // Space - Play/Pause
          event.preventDefault();
          if (isPlaying) {
            handlePause();
          } else {
            handleStart();
          }
          break;
        case 'ArrowLeft': // Previous step
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight': // Next step
          event.preventDefault();
          handleNext();
          break;
        case 'r': // Restart
        case 'R':
          event.preventDefault();
          handleRestart();
          break;
        case 's': // Stop
        case 'S':
          event.preventDefault();
          handleStop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, handlePause, handleStart, handleNext, handlePrevious, handleRestart, handleStop]);

  // Store currentStepData in state to avoid accessing ref during render
  const [currentStepData, setCurrentStepData] = useState<ReturnType<VisualRunner['getCurrentStep']> | undefined>();

  useEffect(() => {
    if (runnerRef.current) {
      setCurrentStepData(runnerRef.current.getCurrentStep());
    }
  }, [currentStep]);

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
              <optgroup label="Sorting Algorithms">
                <option value="bubble-sort">Bubble Sort</option>
                <option value="insertion-sort">Insertion Sort</option>
              </optgroup>
              <optgroup label="Graph Algorithms">
                <option value="bfs">Breadth-First Search (BFS)</option>
                <option value="dfs">Depth-First Search (DFS)</option>
              </optgroup>
              <optgroup label="OS Scheduling">
                <option value="round-robin">Round Robin</option>
                <option value="sjf">Shortest Job First (SJF)</option>
              </optgroup>
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
          <>
            {algorithm.categoryId === 'sorting' && (
              <SortingBarsCanvas state={currentStepData.state} width={800} height={400} />
            )}
            {algorithm.categoryId === 'graph' && (
              <GraphCanvas state={currentStepData.state} width={800} height={500} />
            )}
            {algorithm.categoryId === 'os' && (
              <GanttChart state={currentStepData.state} />
            )}
          </>
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
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
          <h2 className="h3" style={{ color: 'var(--color-text-primary)' }}>
            Step Information
          </h2>
          <label className="flex items-center gap-2 body-sm" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={verboseMode}
              onChange={(e) => setVerboseMode(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>Verbose Mode</span>
          </label>
        </div>

        {/* Tabs */}
        <div style={{ 
          borderBottom: '1px solid var(--color-border-subtle)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          gap: 'var(--space-4)',
        }}>
          <button
            onClick={() => setActiveTab('explanation')}
            className="body-sm font-medium transition-colors"
            style={{
              padding: 'var(--space-2) var(--space-4)',
              color: activeTab === 'explanation' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'explanation' ? '2px solid var(--color-accent-secondary)' : '2px solid transparent',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Explanation
          </button>
          <button
            onClick={() => setActiveTab('pseudocode')}
            className="body-sm font-medium transition-colors"
            style={{
              padding: 'var(--space-2) var(--space-4)',
              color: activeTab === 'pseudocode' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'pseudocode' ? '2px solid var(--color-accent-secondary)' : '2px solid transparent',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Pseudo-code
          </button>
        </div>

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
          <div>
            {activeTab === 'explanation' && (
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
                  
                  {verboseMode && currentStepData.state && (
                    <div style={{ 
                      marginTop: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      backgroundColor: 'var(--color-orange-100)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <p className="body-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <strong>Array state:</strong> [{currentStepData.state.array.join(', ')}]
                      </p>
                      {currentStepData.state.comparing && (
                        <p className="body-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <strong>Comparing indices:</strong> {currentStepData.state.comparing[0]} and {currentStepData.state.comparing[1]}
                        </p>
                      )}
                    </div>
                  )}
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

            {activeTab === 'pseudocode' && (
              <div>
                <PseudoCodeBlock 
                  code={(allPseudocode as Record<string, string>)[algoId || 'bubble-sort'] || '// Pseudo-code not available'}
                  highlightedLine={currentStepData.pseudocodeLine}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
