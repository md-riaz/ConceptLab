import type { VisualStep } from './types';

export interface VisualRunnerOptions {
  speedMs: number;
  onStepChange?: (step: number, total: number) => void;
  onComplete?: () => void;
}

export class VisualRunner<State = any> {
  private steps: VisualStep<State>[];
  private currentStepIndex: number = 0;
  private isPlaying: boolean = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private options: VisualRunnerOptions;

  constructor(steps: VisualStep<State>[], options: VisualRunnerOptions) {
    this.steps = steps;
    this.options = options;
  }

  getCurrentStep(): VisualStep<State> {
    return this.steps[this.currentStepIndex];
  }

  getCurrentStepIndex(): number {
    return this.currentStepIndex;
  }

  getTotalSteps(): number {
    return this.steps.length;
  }

  getAllSteps(): VisualStep<State>[] {
    return this.steps;
  }

  setSpeed(speedMs: number): void {
    this.options.speedMs = speedMs;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  play(): void {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.intervalId = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.next();
      } else {
        this.pause();
        this.options.onComplete?.();
      }
    }, this.options.speedMs);
  }

  pause(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop(): void {
    this.pause();
    this.currentStepIndex = 0;
    this.options.onStepChange?.(this.currentStepIndex, this.steps.length);
  }

  next(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.options.onStepChange?.(this.currentStepIndex, this.steps.length);
    }
  }

  previous(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.options.onStepChange?.(this.currentStepIndex, this.steps.length);
    }
  }

  jumpToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
      this.options.onStepChange?.(this.currentStepIndex, this.steps.length);
    }
  }

  isAtEnd(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  isAtStart(): boolean {
    return this.currentStepIndex === 0;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  destroy(): void {
    this.pause();
  }
}
