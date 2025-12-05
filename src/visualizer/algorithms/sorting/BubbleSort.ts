import type { VisualAlgorithm, VisualStep } from '../../engine/types';

export interface SortingState {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
}

export const BubbleSort: VisualAlgorithm<SortingState, number[]> = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  categoryId: 'sorting',
  inputSchema: 'array',
  defaultInput: [64, 34, 25, 12, 22, 11, 90],

  generateSteps(input: number[]): VisualStep<SortingState>[] {
    const steps: VisualStep<SortingState>[] = [];
    const array = [...input];
    const n = array.length;
    let stepIndex = 0;
    let totalComparisons = 0;
    let totalSwaps = 0;

    // Initial state
    steps.push({
      index: stepIndex++,
      state: { array: [...array], sorted: [] },
      description: 'Starting Bubble Sort with the initial array',
      reason: 'We begin by examining the unsorted array',
      pseudocodeLine: 0,
      metadata: {
        comparisons: 0,
        swaps: 0,
      },
    });

    // Bubble sort algorithm
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      steps.push({
        index: stepIndex++,
        state: { array: [...array], sorted: Array.from({ length: n - i }, (_, idx) => n - idx - 1) },
        description: `Pass ${i + 1}: Starting new pass through the array`,
        reason: `Each pass will bubble the largest unsorted element to its final position`,
        pseudocodeLine: 1,
        metadata: {
          comparisons: totalComparisons,
          swaps: totalSwaps,
          label: `Pass ${i + 1}`,
        },
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Comparing elements
        totalComparisons++;
        steps.push({
          index: stepIndex++,
          state: {
            array: [...array],
            comparing: [j, j + 1],
            sorted: Array.from({ length: n - i }, (_, idx) => n - idx - 1),
          },
          description: `Comparing elements at indices ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`,
          reason: `We compare adjacent elements to determine if they need to be swapped`,
          pseudocodeLine: 2,
          metadata: {
            comparisons: totalComparisons,
            swaps: totalSwaps,
            highlightIndices: [j, j + 1],
          },
        });

        if (array[j] > array[j + 1]) {
          // Swapping elements
          totalSwaps++;
          steps.push({
            index: stepIndex++,
            state: {
              array: [...array],
              swapping: [j, j + 1],
              sorted: Array.from({ length: n - i }, (_, idx) => n - idx - 1),
            },
            description: `Swapping ${array[j]} and ${array[j + 1]} because ${array[j]} > ${array[j + 1]}`,
            reason: `The larger element needs to move towards the end of the array`,
            pseudocodeLine: 3,
            metadata: {
              comparisons: totalComparisons,
              swaps: totalSwaps,
              highlightIndices: [j, j + 1],
            },
          });

          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;

          steps.push({
            index: stepIndex++,
            state: {
              array: [...array],
              sorted: Array.from({ length: n - i }, (_, idx) => n - idx - 1),
            },
            description: `Swapped: array is now [${array.join(', ')}]`,
            reason: `The elements are now in correct relative order`,
            pseudocodeLine: 3,
            metadata: {
              comparisons: totalComparisons,
              swaps: totalSwaps,
            },
          });
        }
      }

      if (!swapped) {
        steps.push({
          index: stepIndex++,
          state: {
            array: [...array],
            sorted: Array.from({ length: n - i + 1 }, (_, idx) => n - idx - 1),
          },
          description: 'No swaps in this pass - array is already sorted!',
          reason: 'When no swaps occur, all elements are in their correct positions',
          pseudocodeLine: 4,
          metadata: {
            comparisons: totalComparisons,
            swaps: totalSwaps,
            label: 'Early termination',
          },
        });
        break;
      }
    }

    // Final state
    steps.push({
      index: stepIndex++,
      state: { array: [...array], sorted: Array.from({ length: n }, (_, idx) => idx) },
      description: `Sorting complete! Final array: [${array.join(', ')}]`,
      reason: `All elements have been moved to their correct positions`,
      pseudocodeLine: 5,
      metadata: {
        comparisons: totalComparisons,
        swaps: totalSwaps,
        label: 'Complete',
      },
    });

    return steps;
  },

  referenceImplementation(input: number[]): number[] {
    const arr = [...input];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  },

  compareResult(finalState: SortingState, referenceResult: number[]): boolean {
    return JSON.stringify(finalState.array) === JSON.stringify(referenceResult);
  },
};
