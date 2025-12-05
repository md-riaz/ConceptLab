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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Algorithm Visualizer
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose an algorithm, hit start, and watch each step play out in real time
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algorithm Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Algorithm
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={algoId || 'bubble-sort'}
              onChange={(e) => window.location.href = `/visualizer/${e.target.value}`}
            >
              <option value="bubble-sort">Bubble Sort</option>
              <option value="insertion-sort">Insertion Sort</option>
            </select>
          </div>

          {/* Array Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="3"
              max="20"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Step Delay */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Step Delay: {speed}ms
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Custom Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Transport Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          {!isPlaying ? (
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
            >
              ▶ Start Visualization
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
            >
              ⏸ Pause
            </button>
          )}
          
          <button
            onClick={handleStop}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            ⏹ Stop / Reset
          </button>

          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next ▶
          </button>

          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Visualization</h2>
        {currentStepData && (
          <SortingBarsCanvas state={currentStepData.state} width={800} height={400} />
        )}
      </div>

      {/* Step Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Step Information
        </h2>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Step {currentStep + 1} of {totalSteps}
            </span>
            {currentStepData?.metadata?.label && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {currentStepData.metadata.label}
              </span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentStepData && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Description
              </h3>
              <p className="text-gray-900 dark:text-white">
                {currentStepData.description}
              </p>
            </div>

            {currentStepData.reason && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Why?
                </h3>
                <p className="text-gray-900 dark:text-white italic">
                  {currentStepData.reason}
                </p>
              </div>
            )}

            {currentStepData.metadata && (
              <div className="flex gap-4 text-sm">
                {currentStepData.metadata.comparisons !== undefined && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Comparisons: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {currentStepData.metadata.comparisons}
                    </span>
                  </div>
                )}
                {currentStepData.metadata.swaps !== undefined && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Swaps: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
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
