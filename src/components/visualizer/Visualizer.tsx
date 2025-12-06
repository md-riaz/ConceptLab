import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const progressPercent = totalSteps ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-app)] pb-14">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-20 top-[-10%] h-80 w-80 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)]/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-[-10%] h-96 w-96 rounded-full bg-gradient-to-tr from-[var(--color-accent-secondary)]/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--color-bg-app)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-8 px-4 pt-10 lg:px-6">
        {/* Header */}
        <section className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/80 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="grid gap-10 p-8 md:grid-cols-[1.2fr,1fr] md:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-chip)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-primary)]"></span>
                Live algorithm studio
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Premium Algorithm Visualizer</h1>
                <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  Balance clarity and calm while you experiment. Choose an algorithm, tune the pacing, and glide through each step with polished controls and responsive visuals.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)]/60 bg-[var(--color-bg-app)] px-4 py-2 font-semibold text-[var(--color-text-primary)] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]"></span>
                  {algorithm.displayName || 'Algorithm'}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-4 py-2 text-[var(--color-text-secondary)]">
                  Space · Play / Pause
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-4 py-2 text-[var(--color-text-secondary)]">
                  ← / → · Step
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-4 py-2 text-[var(--color-text-secondary)]">
                  R · Restart · S · Stop
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)]/90 p-6 shadow-inner">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-[var(--color-text-secondary)]">Run progress</p>
                  <p className="text-4xl font-semibold text-[var(--color-text-primary)]">
                    {Math.min(currentStep + 1, totalSteps)}
                    <span className="text-lg text-[var(--color-text-secondary)]"> / {totalSteps || 1}</span>
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-chip)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-primary)]">
                    {algorithm.categoryId.toUpperCase()}
                  </span>
                  <div className="text-xs text-[var(--color-text-secondary)]">{speed}ms delay · size {arraySize}</div>
                </div>
              </div>

              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)]">
                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2">
                  <p className="text-xs uppercase tracking-[0.12em]">Array size</p>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">{arraySize}</p>
                </div>
                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-3 py-2">
                  <p className="text-xs uppercase tracking-[0.12em]">Step delay</p>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">{speed} ms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[0_16px_52px_rgba(15,23,42,0.14)] p-6 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">Setup</p>
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Shape your run</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Select the algorithm, feed inputs, and fine-tune pacing before you launch.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
              <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1">Space = Play/Pause</span>
              <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1">← / → = Step</span>
              <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1">R / S = Reset</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Algorithm</label>
              <select
                className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] px-4 py-3 text-[var(--color-text-primary)] shadow-inner"
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
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Array Size: {arraySize}</label>
              <input
                type="range"
                min="3"
                max="20"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="h-2 w-full rounded-full bg-[var(--color-border-subtle)] accent-[var(--color-accent-primary)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Step Delay: {speed}ms</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="h-2 w-full rounded-full bg-[var(--color-border-subtle)] accent-[var(--color-accent-secondary)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Custom Array (comma-separated)</label>
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
                className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] px-4 py-3 text-[var(--color-text-primary)] shadow-inner placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isPlaying ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                ▶ Start visualization
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 rounded-full bg-[var(--color-orange-500)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] shadow-md transition-transform hover:-translate-y-0.5"
              >
                ⏸ Pause
              </button>
            )}

            <button
              onClick={handleStop}
              className="flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] shadow-sm transition hover:-translate-y-0.5"
            >
              ⏹ Stop / Reset
            </button>

            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              ◀ Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps - 1}
              className="flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next ▶
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 rounded-full bg-[var(--color-accent-secondary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] shadow-md transition-transform hover:-translate-y-0.5"
            >
              🔄 Restart
            </button>
          </div>
        </section>

        {/* Visualization */}
        <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[0_16px_52px_rgba(15,23,42,0.16)] p-6 space-y-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Live visualization</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">A generous canvas keeps focus on the motion and balance of each step.</p>
            </div>
            {currentStepData?.metadata?.label && (
              <span className="rounded-full bg-[var(--color-bg-chip)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-primary)]">
                {currentStepData.metadata.label}
              </span>
            )}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)]/80 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_40%),_radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.06),transparent_45%)]" />
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl p-6 md:p-8">
              {currentStepData ? (
                <>
                  {algorithm.categoryId === 'sorting' && <SortingBarsCanvas state={currentStepData.state} width={900} height={420} />}
                  {algorithm.categoryId === 'graph' && <GraphCanvas state={currentStepData.state} width={900} height={520} />}
                  {algorithm.categoryId === 'os' && <GanttChart state={currentStepData.state} />}
                </>
              ) : (
                <p className="text-[var(--color-text-secondary)]">Initializing visualization...</p>
              )}
            </div>
          </div>
        </section>

        {/* Step information */}
        <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[0_16px_52px_rgba(15,23,42,0.14)] p-6 space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Step intelligence</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Concise breakdowns, with optional telemetry and pseudo-code to stay grounded.</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <input
                type="checkbox"
                checked={verboseMode}
                onChange={(e) => setVerboseMode(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-accent-primary)]"
              />
              Verbose mode
            </label>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-[var(--color-bg-app)]/80 p-4 shadow-inner md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-bg-pill)] text-base font-semibold text-[var(--color-accent-primary)]">
                {currentStep + 1}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">Step</p>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">{currentStep + 1} of {totalSteps || 1}</p>
              </div>
            </div>

            {currentStepData?.metadata && (
              <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
                {currentStepData.metadata.comparisons !== undefined && (
                  <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1">Comparisons: <strong className="text-[var(--color-text-primary)]">{currentStepData.metadata.comparisons}</strong></span>
                )}
                {currentStepData.metadata.swaps !== undefined && (
                  <span className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1">Swaps: <strong className="text-[var(--color-text-primary)]">{currentStepData.metadata.swaps}</strong></span>
                )}
              </div>
            )}

            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)] md:max-w-xs">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] transition-all"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {currentStepData && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]">
                <button
                  className={`rounded-full px-4 py-2 font-semibold shadow-sm transition ${
                    activeTab === 'explanation'
                      ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-text-primary)]'
                      : 'border border-[var(--color-border-subtle)]'
                  }`}
                  onClick={() => setActiveTab('explanation')}
                >
                  Explanation
                </button>
                <button
                  className={`rounded-full px-4 py-2 font-semibold shadow-sm transition ${
                    activeTab === 'pseudocode'
                      ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-text-primary)]'
                      : 'border border-[var(--color-border-subtle)]'
                  }`}
                  onClick={() => setActiveTab('pseudocode')}
                >
                  Pseudo-code
                </button>
              </div>

              {activeTab === 'explanation' && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] p-5 shadow-inner">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
                      <span className="h-1.5 w-8 rounded-full bg-[var(--color-accent-primary)]"></span>
                      Description
                    </div>
                    <p className="text-[var(--color-text-primary)] leading-relaxed">{currentStepData.description}</p>
                    {verboseMode && currentStepData.state && (
                      <div className="rounded-lg bg-[var(--color-bg-chip)] px-3 py-3 text-sm text-[var(--color-text-secondary)]">
                        <p className="font-semibold text-[var(--color-text-primary)]">State snapshot</p>
                        <p className="mt-1">[{currentStepData.state.array.join(', ')}]</p>
                        {currentStepData.state.comparing && (
                          <p className="mt-1">Comparing indices: {currentStepData.state.comparing[0]} and {currentStepData.state.comparing[1]}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] p-5 shadow-inner">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
                      <span className="h-1.5 w-8 rounded-full bg-[var(--color-accent-secondary)]"></span>
                      Rationale
                    </div>
                    <p className="text-[var(--color-text-primary)] italic leading-relaxed">{currentStepData.reason || 'Following the algorithm sequence.'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'pseudocode' && (
                <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-app)] p-5 shadow-inner">
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
    </div>
  );
}
