import type { VisualAlgorithm, VisualStep } from '../../engine/types';

export interface SortingState {
  array: number[];
  comparing?: [number, number];
  inserting?: number;
  sorted?: number[];
}

export const InsertionSort: VisualAlgorithm<SortingState, number[]> = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  categoryId: 'sorting',
  inputSchema: 'array',
  defaultInput: [64, 34, 25, 12, 22, 11, 90],

  generateSteps(input: number[]): VisualStep<SortingState>[] {
    const steps: VisualStep<SortingState>[] = [];
    const array = [...input];
    const n = array.length;
    let stepIndex = 0;
    let totalComparisons = 0;
    let totalShifts = 0;

    // Initial state
    steps.push({
      index: stepIndex++,
      state: { array: [...array], sorted: [0] },
      description: 'Starting Insertion Sort - first element is considered sorted',
      reason: 'A single element is always sorted by itself',
      pseudocodeLine: 0,
      metadata: {
        comparisons: 0,
        swaps: 0,
      },
    });

    // Insertion sort algorithm
    for (let i = 1; i < n; i++) {
      const key = array[i];
      let j = i - 1;

      steps.push({
        index: stepIndex++,
        state: {
          array: [...array],
          inserting: i,
          sorted: Array.from({ length: i }, (_, idx) => idx),
        },
        description: `Selecting element at index ${i}: ${key}`,
        reason: `We need to insert this element into its correct position in the sorted portion`,
        pseudocodeLine: 1,
        metadata: {
          comparisons: totalComparisons,
          swaps: totalShifts,
          highlightIndices: [i],
          label: `Inserting ${key}`,
        },
      });

      // Move elements greater than key one position ahead
      while (j >= 0 && array[j] > key) {
        totalComparisons++;
        steps.push({
          index: stepIndex++,
          state: {
            array: [...array],
            comparing: [j, i],
            sorted: Array.from({ length: i }, (_, idx) => idx),
          },
          description: `Comparing ${array[j]} with ${key}: ${array[j]} > ${key}, need to shift`,
          reason: `Elements greater than the key must be shifted right to make room`,
          pseudocodeLine: 2,
          metadata: {
            comparisons: totalComparisons,
            swaps: totalShifts,
            highlightIndices: [j, i],
          },
        });

        totalShifts++;
        array[j + 1] = array[j];

        steps.push({
          index: stepIndex++,
          state: {
            array: [...array],
            sorted: Array.from({ length: i }, (_, idx) => idx),
          },
          description: `Shifted ${array[j]} to the right`,
          reason: `Making space for the key element`,
          pseudocodeLine: 3,
          metadata: {
            comparisons: totalComparisons,
            swaps: totalShifts,
          },
        });

        j--;
      }

      if (j >= 0) {
        totalComparisons++;
        steps.push({
          index: stepIndex++,
          state: {
            array: [...array],
            comparing: [j, i],
            sorted: Array.from({ length: i }, (_, idx) => idx),
          },
          description: `Comparing ${array[j]} with ${key}: ${array[j]} ≤ ${key}, found correct position`,
          reason: `We've found where the key should be inserted`,
          pseudocodeLine: 2,
          metadata: {
            comparisons: totalComparisons,
            swaps: totalShifts,
            highlightIndices: [j, i],
          },
        });
      }

      // Place key at its correct position
      array[j + 1] = key;

      steps.push({
        index: stepIndex++,
        state: {
          array: [...array],
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        },
        description: `Inserted ${key} at position ${j + 1}`,
        reason: `The key is now in its correct position among the sorted elements`,
        pseudocodeLine: 4,
        metadata: {
          comparisons: totalComparisons,
          swaps: totalShifts,
          highlightIndices: [j + 1],
        },
      });
    }

    // Final state
    steps.push({
      index: stepIndex++,
      state: { array: [...array], sorted: Array.from({ length: n }, (_, idx) => idx) },
      description: `Sorting complete! Final array: [${array.join(', ')}]`,
      reason: `All elements have been inserted into their correct positions`,
      pseudocodeLine: 5,
      metadata: {
        comparisons: totalComparisons,
        swaps: totalShifts,
        label: 'Complete',
      },
    });

    return steps;
  },

  referenceImplementation(input: number[]): number[] {
    const arr = [...input];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  },

  compareResult(finalState: SortingState, referenceResult: number[]): boolean {
    return JSON.stringify(finalState.array) === JSON.stringify(referenceResult);
  },
};
