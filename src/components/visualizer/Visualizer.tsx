import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  const navigate = useNavigate();
  const algorithm = algorithms[algoId || 'bubble-sort'] || BubbleSort;

  const pillClass =
    'inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[rgba(99,102,241,0.08)] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)] backdrop-blur';
  const primaryButton =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-primary-600)] px-4 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] shadow-[0_12px_40px_rgba(99,102,241,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(99,102,241,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] disabled:opacity-60 disabled:hover:translate-y-0';
  const outlineButton =
    'inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border-subtle)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] disabled:opacity-60 disabled:hover:translate-y-0';
  const ghostButton =
    'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(226,232,240,0.8)] bg-[rgba(226,232,240,0.6)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[rgba(226,232,240,0.95)]';
  const softButton =
    'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(168,85,247,0.2)] bg-[rgba(168,85,247,0.14)] px-4 py-3 text-sm font-semibold text-[var(--color-accent-secondary)] transition hover:bg-[rgba(168,85,247,0.22)]';
  
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

  const progress = totalSteps ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const statPills = useMemo(() => {
    const chips = [
      `Step ${currentStep + 1} of ${totalSteps || '…'}`,
    ];

    if (currentStepData?.metadata?.comparisons !== undefined) {
      chips.push(`Comparisons: ${currentStepData.metadata.comparisons}`);
    }
    if (currentStepData?.metadata?.swaps !== undefined) {
      chips.push(`Swaps: ${currentStepData.metadata.swaps}`);
    }

    return chips;
  }, [currentStep, currentStepData?.metadata?.comparisons, currentStepData?.metadata?.swaps, totalSteps]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.12),transparent_32%),linear-gradient(135deg,#f8fafc,#eef2ff)] px-6 py-8 shadow-2xl sm:px-10 sm:py-12">
        <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(99,102,241,0.1)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-accent-primary)]">Live, step-by-step learning</span>
            <h1 className="text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">Algorithm Visualizer</h1>
            <p className="max-w-3xl text-lg leading-7 text-[var(--color-text-secondary)]">
              Choose an algorithm, press play, and watch every comparison, swap, and traversal unfold with calm, premium visuals.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className={pillClass}>🎛️ {algorithm.name}</span>
              <span className={pillClass}>⏱️ {speed}ms speed</span>
              <span className={pillClass}>🧭 Step {Math.min(currentStep + 1, totalSteps || 1)} / {totalSteps || '…'}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgba(226,232,240,0.9)] bg-white/80 p-6 shadow-xl backdrop-blur">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Comfort-first controls</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Space to play/pause, ⬅️ / ➡️ to scrub steps, R to restart, and S to stop. Built for smooth practice without friction.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-[var(--color-text-secondary)]">
              <span className={pillClass}>⌨️ Keyboard friendly</span>
              <span className={pillClass}>🌓 Theme aware</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-[rgba(226,232,240,0.9)] bg-white/90 p-6 shadow-xl backdrop-blur lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-[rgba(99,102,241,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-primary)]">Control deck</p>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Curate your run</h2>
            </div>
            <span className={pillClass}>🎯 {algorithm.categoryId.toUpperCase()}</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Algorithm</span>
                <span className="caption">Switch instantly</span>
              </div>
              <select
                className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)] shadow-inner shadow-[rgba(0,0,0,0.02)] outline-none transition focus:border-[var(--color-accent-primary)] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
                value={algoId || 'bubble-sort'}
                onChange={(e) => navigate(`/visualizer/${e.target.value}`)}
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

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Array Size</span>
                <span className="caption">{arraySize} bars</span>
              </div>
              <input
                type="range"
                min="3"
                max="20"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full accent-[var(--color-accent-primary)]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Step Delay</span>
                <span className="caption">{speed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-[var(--color-accent-primary)]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Custom Array</span>
                <span className="caption">Comma-separated</span>
              </div>
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
                className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)] shadow-inner shadow-[rgba(0,0,0,0.02)] outline-none transition focus:border-[var(--color-accent-primary)] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {!isPlaying ? (
              <button onClick={handleStart} className={primaryButton}>
                ▶ Start visualization
              </button>
            ) : (
              <button onClick={handlePause} className={softButton}>
                ⏸ Pause
              </button>
            )}

            <button onClick={handleStop} className={ghostButton}>
              ⏹ Stop / Reset
            </button>

            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={outlineButton}
            >
              ◀ Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps - 1}
              className={outlineButton}
            >
              Next ▶
            </button>

            <button onClick={handleRestart} className={primaryButton}>
              🔄 Restart
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-[linear-gradient(180deg,rgba(248,250,252,0.9),rgba(237,242,247,0.9))] p-6 shadow-lg lg:col-span-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Visualization</h2>
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                A calm, centered canvas that mirrors the premium look from the preview.
              </p>
            </div>
            {currentStepData?.metadata?.label && <span className={pillClass}>{currentStepData.metadata.label}</span>}
          </div>

          {currentStepData && (
            <div className="mt-4 space-y-4">
              {algorithm.categoryId === 'sorting' && (
                <div className="flex justify-center">
                  <SortingBarsCanvas state={currentStepData.state} width={900} height={380} />
                </div>
              )}
              {algorithm.categoryId === 'graph' && (
                <GraphCanvas state={currentStepData.state} width={900} height={500} />
              )}
              {algorithm.categoryId === 'os' && <GanttChart state={currentStepData.state} />}
            </div>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-[rgba(226,232,240,0.9)] bg-white/90 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-[rgba(99,102,241,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-primary)]">Guided walkthrough</p>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Step information</h2>
          </div>
          <label className={`${pillClass} cursor-pointer select-none`}>
            <input
              type="checkbox"
              checked={verboseMode}
              onChange={(e) => setVerboseMode(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-accent-primary)]"
            />
            Verbose mode
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--color-text-secondary)]">
              {statPills.map((label) => (
                <span key={label} className={pillClass}>
                  {label}
                </span>
              ))}
            </div>
            <div className="h-2 w-full rounded-full bg-[rgba(226,232,240,0.8)]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-[rgba(226,232,240,0.6)] p-1 text-sm font-semibold text-[var(--color-text-secondary)]">
            <button
              onClick={() => setActiveTab('explanation')}
              className={`rounded-xl px-4 py-2 transition ${
                activeTab === 'explanation'
                  ? 'bg-white text-[var(--color-text-primary)] shadow-md'
                  : 'hover:text-[var(--color-text-primary)]'
              }`}
            >
              Explanation
            </button>
            <button
              onClick={() => setActiveTab('pseudocode')}
              className={`rounded-xl px-4 py-2 transition ${
                activeTab === 'pseudocode'
                  ? 'bg-white text-[var(--color-text-primary)] shadow-md'
                  : 'hover:text-[var(--color-text-primary)]'
              }`}
            >
              Pseudo-code
            </button>
          </div>
        </div>

        {currentStepData && (
          <div className="mt-4">
            {activeTab === 'explanation' && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">Description</h3>
                  <p className="text-base leading-7 text-[var(--color-text-primary)]">{currentStepData.description}</p>

                  {verboseMode && currentStepData.state && (
                    <div className="mt-2 space-y-2 rounded-lg bg-[var(--color-orange-100)] px-3 py-2 text-sm text-[var(--color-text-secondary)]">
                      <p>
                        <strong>Array state:</strong> [{currentStepData.state.array.join(', ')}]
                      </p>
                      {currentStepData.state.comparing && (
                        <p>
                          <strong>Comparing indices:</strong> {currentStepData.state.comparing[0]} and {currentStepData.state.comparing[1]}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {currentStepData.reason && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">Why?</h3>
                    <p className="italic text-base leading-7 text-[var(--color-text-primary)]">{currentStepData.reason}</p>
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
      </section>
    </div>
  );
}
