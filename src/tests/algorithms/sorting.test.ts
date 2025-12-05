import { describe, it, expect } from 'vitest';
import { BubbleSort } from '../../visualizer/algorithms/sorting/BubbleSort';
import { InsertionSort } from '../../visualizer/algorithms/sorting/InsertionSort';

describe('Sorting Algorithms - Checkpoint 2', () => {
  describe('Bubble Sort', () => {
    it('should correctly sort an already sorted array', () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];
      const result = BubbleSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort a reverse sorted array', () => {
      const input = [5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5];
      const result = BubbleSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort a random array', () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      const result = BubbleSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort an array with duplicates', () => {
      const input = [5, 2, 8, 2, 9, 1, 5];
      const expected = [1, 2, 2, 5, 5, 8, 9];
      const result = BubbleSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should generate steps with correct final state', () => {
      const input = [3, 1, 2];
      const steps = BubbleSort.generateSteps(input);
      const finalState = steps[steps.length - 1].state;
      const referenceResult = BubbleSort.referenceImplementation(input);
      
      expect(BubbleSort.compareResult(finalState, referenceResult)).toBe(true);
      expect(finalState.array).toEqual([1, 2, 3]);
    });

    it('should generate a reasonable number of steps', () => {
      const input = [5, 2, 8, 1];
      const steps = BubbleSort.generateSteps(input);
      
      expect(steps.length).toBeGreaterThan(0);
      expect(steps.length).toBeLessThan(100); // Reasonable upper bound
    });

    it('should have non-empty descriptions for all steps', () => {
      const input = [3, 1, 2];
      const steps = BubbleSort.generateSteps(input);
      
      steps.forEach(step => {
        expect(step.description).toBeTruthy();
        expect(step.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Insertion Sort', () => {
    it('should correctly sort an already sorted array', () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];
      const result = InsertionSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort a reverse sorted array', () => {
      const input = [5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5];
      const result = InsertionSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort a random array', () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      const result = InsertionSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should correctly sort an array with duplicates', () => {
      const input = [5, 2, 8, 2, 9, 1, 5];
      const expected = [1, 2, 2, 5, 5, 8, 9];
      const result = InsertionSort.referenceImplementation(input);
      expect(result).toEqual(expected);
    });

    it('should generate steps with correct final state', () => {
      const input = [3, 1, 2];
      const steps = InsertionSort.generateSteps(input);
      const finalState = steps[steps.length - 1].state;
      const referenceResult = InsertionSort.referenceImplementation(input);
      
      expect(InsertionSort.compareResult(finalState, referenceResult)).toBe(true);
      expect(finalState.array).toEqual([1, 2, 3]);
    });

    it('should generate a reasonable number of steps', () => {
      const input = [5, 2, 8, 1];
      const steps = InsertionSort.generateSteps(input);
      
      expect(steps.length).toBeGreaterThan(0);
      expect(steps.length).toBeLessThan(100); // Reasonable upper bound
    });

    it('should have non-empty descriptions for all steps', () => {
      const input = [3, 1, 2];
      const steps = InsertionSort.generateSteps(input);
      
      steps.forEach(step => {
        expect(step.description).toBeTruthy();
        expect(step.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Visualization Step Consistency', () => {
    it('BubbleSort: array length should remain constant throughout', () => {
      const input = [5, 2, 8, 1, 9];
      const steps = BubbleSort.generateSteps(input);
      const initialLength = steps[0].state.array.length;
      
      steps.forEach(step => {
        expect(step.state.array.length).toBe(initialLength);
      });
    });

    it('InsertionSort: array length should remain constant throughout', () => {
      const input = [5, 2, 8, 1, 9];
      const steps = InsertionSort.generateSteps(input);
      const initialLength = steps[0].state.array.length;
      
      steps.forEach(step => {
        expect(step.state.array.length).toBe(initialLength);
      });
    });

    it('BubbleSort: step indices should be sequential', () => {
      const input = [3, 1, 2];
      const steps = BubbleSort.generateSteps(input);
      
      steps.forEach((step, idx) => {
        expect(step.index).toBe(idx);
      });
    });

    it('InsertionSort: step indices should be sequential', () => {
      const input = [3, 1, 2];
      const steps = InsertionSort.generateSteps(input);
      
      steps.forEach((step, idx) => {
        expect(step.index).toBe(idx);
      });
    });
  });
});
