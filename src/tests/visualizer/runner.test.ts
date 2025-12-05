import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VisualRunner } from '../../visualizer/engine/VisualRunner';
import type { VisualStep } from '../../visualizer/engine/types';

describe('VisualRunner - Checkpoint 2', () => {
  let mockSteps: VisualStep<{ value: number }>[];
  
  beforeEach(() => {
    mockSteps = [
      { index: 0, state: { value: 1 }, description: 'Step 1' },
      { index: 1, state: { value: 2 }, description: 'Step 2' },
      { index: 2, state: { value: 3 }, description: 'Step 3' },
      { index: 3, state: { value: 4 }, description: 'Step 4' },
    ];
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with first step', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    expect(runner.getCurrentStepIndex()).toBe(0);
    expect(runner.getCurrentStep()).toEqual(mockSteps[0]);
    expect(runner.getTotalSteps()).toBe(4);
  });

  it('should move to next step', () => {
    const onStepChange = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 500, onStepChange });
    
    runner.next();
    
    expect(runner.getCurrentStepIndex()).toBe(1);
    expect(onStepChange).toHaveBeenCalledWith(1, 4);
  });

  it('should move to previous step', () => {
    const onStepChange = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 500, onStepChange });
    
    runner.next();
    runner.next();
    runner.previous();
    
    expect(runner.getCurrentStepIndex()).toBe(1);
  });

  it('should not go below first step', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    runner.previous();
    
    expect(runner.getCurrentStepIndex()).toBe(0);
  });

  it('should not go beyond last step', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    runner.jumpToStep(3);
    runner.next();
    
    expect(runner.getCurrentStepIndex()).toBe(3);
  });

  it('should play and advance steps automatically', () => {
    const onStepChange = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 100, onStepChange });
    
    runner.play();
    expect(runner.getIsPlaying()).toBe(true);
    
    vi.advanceTimersByTime(100);
    expect(runner.getCurrentStepIndex()).toBe(1);
    
    vi.advanceTimersByTime(100);
    expect(runner.getCurrentStepIndex()).toBe(2);
    
    runner.destroy();
  });

  it('should pause animation', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 100 });
    
    runner.play();
    expect(runner.getIsPlaying()).toBe(true);
    
    vi.advanceTimersByTime(100);
    runner.pause();
    
    expect(runner.getIsPlaying()).toBe(false);
    const currentIndex = runner.getCurrentStepIndex();
    
    vi.advanceTimersByTime(200);
    expect(runner.getCurrentStepIndex()).toBe(currentIndex);
    
    runner.destroy();
  });

  it('should stop and reset to first step', () => {
    const onStepChange = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 100, onStepChange });
    
    runner.next();
    runner.next();
    runner.stop();
    
    expect(runner.getCurrentStepIndex()).toBe(0);
    expect(runner.getIsPlaying()).toBe(false);
  });

  it('should call onComplete when reaching end', () => {
    const onComplete = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 100, onComplete });
    
    runner.jumpToStep(2);
    runner.play();
    
    vi.advanceTimersByTime(100);
    expect(runner.getCurrentStepIndex()).toBe(3);
    
    // Advance one more time to trigger the pause when at the end
    vi.advanceTimersByTime(100);
    expect(runner.getIsPlaying()).toBe(false);
    expect(onComplete).toHaveBeenCalled();
    
    runner.destroy();
  });

  it('should jump to specific step', () => {
    const onStepChange = vi.fn();
    const runner = new VisualRunner(mockSteps, { speedMs: 500, onStepChange });
    
    runner.jumpToStep(2);
    
    expect(runner.getCurrentStepIndex()).toBe(2);
    expect(onStepChange).toHaveBeenCalledWith(2, 4);
  });

  it('should update speed dynamically', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    runner.setSpeed(100);
    runner.play();
    
    vi.advanceTimersByTime(100);
    expect(runner.getCurrentStepIndex()).toBe(1);
    
    runner.destroy();
  });

  it('should correctly identify at start', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    expect(runner.isAtStart()).toBe(true);
    runner.next();
    expect(runner.isAtStart()).toBe(false);
  });

  it('should correctly identify at end', () => {
    const runner = new VisualRunner(mockSteps, { speedMs: 500 });
    
    expect(runner.isAtEnd()).toBe(false);
    runner.jumpToStep(3);
    expect(runner.isAtEnd()).toBe(true);
  });
});
