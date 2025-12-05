import type { VisualAlgorithm, VisualStep } from '../../engine/types';
import type { Process, SchedulingState, ProcessExecution } from './types';
import { calculateMetrics } from './types';

interface RoundRobinInput {
  processes: Process[];
  timeQuantum: number;
}

export const RoundRobin: VisualAlgorithm<SchedulingState, RoundRobinInput> = {
  id: 'round-robin',
  name: 'Round Robin Scheduling',
  categoryId: 'os',
  inputSchema: 'custom',
  defaultInput: {
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 4 },
      { id: 'P2', arrivalTime: 1, burstTime: 3 },
      { id: 'P3', arrivalTime: 2, burstTime: 1 },
      { id: 'P4', arrivalTime: 3, burstTime: 2 },
    ],
    timeQuantum: 2
  },

  generateSteps(input: RoundRobinInput): VisualStep<SchedulingState>[] {
    const steps: VisualStep<SchedulingState>[] = [];
    const { processes, timeQuantum } = input;
    
    // Create working copies with remaining time
    const workingProcesses: Process[] = processes.map(p => ({
      ...p,
      remainingTime: p.burstTime
    }));

    let currentTime = 0;
    const readyQueue: string[] = [];
    const ganttChart: ProcessExecution[] = [];
    const completedProcesses: string[] = [];
    let stepIndex = 0;

    // Initial state
    steps.push({
      index: stepIndex++,
      state: {
        currentTime,
        readyQueue: [],
        executingProcess: null,
        completedProcesses: [],
        ganttChart: [],
        processes: workingProcesses,
        waitingTimes: new Map(),
        turnaroundTimes: new Map()
      },
      description: `Starting Round Robin scheduling with time quantum ${timeQuantum}`,
      reason: 'We begin by initializing the scheduling algorithm with all processes',
      pseudocodeLine: 0,
      metadata: {
        label: 'Initialization'
      }
    });

    // Add processes that arrive at time 0
    workingProcesses
      .filter(p => p.arrivalTime === 0)
      .forEach(p => readyQueue.push(p.id));

    if (readyQueue.length > 0) {
      steps.push({
        index: stepIndex++,
        state: {
          currentTime,
          readyQueue: [...readyQueue],
          executingProcess: null,
          completedProcesses: [],
          ganttChart: [],
          processes: workingProcesses,
          waitingTimes: new Map(),
          turnaroundTimes: new Map()
        },
        description: `Processes ${readyQueue.join(', ')} arrive at time 0 and enter ready queue`,
        reason: 'Processes with arrival time 0 are immediately added to the ready queue',
        pseudocodeLine: 1
      });
    }

    // Main scheduling loop
    while (readyQueue.length > 0 || workingProcesses.some(p => p.remainingTime! > 0)) {
      // If ready queue is empty but processes remain, advance time
      if (readyQueue.length === 0) {
        const nextArrival = workingProcesses
          .filter(p => p.arrivalTime > currentTime && p.remainingTime! > 0)
          .sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
        
        if (nextArrival) {
          currentTime = nextArrival.arrivalTime;
          readyQueue.push(nextArrival.id);
          
          steps.push({
            index: stepIndex++,
            state: {
              currentTime,
              readyQueue: [...readyQueue],
              executingProcess: null,
              completedProcesses: [...completedProcesses],
              ganttChart: [...ganttChart],
              processes: workingProcesses,
              waitingTimes: new Map(),
              turnaroundTimes: new Map()
            },
            description: `CPU idle until time ${currentTime}. Process ${nextArrival.id} arrives`,
            reason: 'No processes are ready, so we advance to the next arrival time',
            pseudocodeLine: 2
          });
        }
      }

      if (readyQueue.length === 0) break;

      // Get next process from queue
      const processId = readyQueue.shift()!;
      const process = workingProcesses.find(p => p.id === processId)!;

      steps.push({
        index: stepIndex++,
        state: {
          currentTime,
          readyQueue: [...readyQueue],
          executingProcess: processId,
          completedProcesses: [...completedProcesses],
          ganttChart: [...ganttChart],
          processes: workingProcesses,
          waitingTimes: new Map(),
          turnaroundTimes: new Map()
        },
        description: `Dequeue ${processId} from ready queue (remaining: ${process.remainingTime}ms)`,
        reason: 'Round Robin selects the first process in the ready queue',
        pseudocodeLine: 3,
        metadata: {
          label: 'Process Selection'
        }
      });

      // Execute for time quantum or remaining time
      const executionTime = Math.min(timeQuantum, process.remainingTime!);
      const startTime = currentTime;
      const endTime = currentTime + executionTime;

      ganttChart.push({
        processId,
        startTime,
        endTime
      });

      process.remainingTime! -= executionTime;
      currentTime = endTime;

      steps.push({
        index: stepIndex++,
        state: {
          currentTime,
          readyQueue: [...readyQueue],
          executingProcess: processId,
          completedProcesses: [...completedProcesses],
          ganttChart: [...ganttChart],
          processes: workingProcesses,
          waitingTimes: new Map(),
          turnaroundTimes: new Map()
        },
        description: `Execute ${processId} from time ${startTime} to ${endTime} (${executionTime}ms)`,
        reason: `Process executes for ${executionTime}ms (time quantum: ${timeQuantum}, remaining: ${process.remainingTime}ms)`,
        pseudocodeLine: 4,
        metadata: {
          label: 'Execution'
        }
      });

      // Add newly arrived processes to queue
      const newArrivals = workingProcesses
        .filter(p => p.arrivalTime > startTime && p.arrivalTime <= currentTime && 
                     p.remainingTime! > 0 && !readyQueue.includes(p.id) && p.id !== processId)
        .sort((a, b) => a.arrivalTime - b.arrivalTime);

      newArrivals.forEach(p => readyQueue.push(p.id));

      // Check if process completed
      if (process.remainingTime === 0) {
        completedProcesses.push(processId);
        
        steps.push({
          index: stepIndex++,
          state: {
            currentTime,
            readyQueue: [...readyQueue],
            executingProcess: null,
            completedProcesses: [...completedProcesses],
            ganttChart: [...ganttChart],
            processes: workingProcesses,
            waitingTimes: new Map(),
            turnaroundTimes: new Map()
          },
          description: `${processId} completed at time ${currentTime}`,
          reason: 'Process has finished all its burst time',
          pseudocodeLine: 5,
          metadata: {
            label: 'Completion'
          }
        });
      } else {
        // Re-add to ready queue
        readyQueue.push(processId);
        
        steps.push({
          index: stepIndex++,
          state: {
            currentTime,
            readyQueue: [...readyQueue],
            executingProcess: null,
            completedProcesses: [...completedProcesses],
            ganttChart: [...ganttChart],
            processes: workingProcesses,
            waitingTimes: new Map(),
            turnaroundTimes: new Map()
          },
          description: `${processId} preempted, moved to end of ready queue (remaining: ${process.remainingTime}ms)`,
          reason: 'Time quantum expired, process returns to ready queue for fairness',
          pseudocodeLine: 6,
          metadata: {
            label: 'Preemption'
          }
        });
      }
    }

    // Calculate final metrics
    const metrics = calculateMetrics(processes, ganttChart);
    
    steps.push({
      index: stepIndex++,
      state: {
        currentTime,
        readyQueue: [],
        executingProcess: null,
        completedProcesses: [...completedProcesses],
        ganttChart: [...ganttChart],
        processes: workingProcesses,
        waitingTimes: metrics.processMetrics,
        turnaroundTimes: metrics.processMetrics
      },
      description: `All processes completed. Avg waiting time: ${metrics.averageWaitingTime.toFixed(2)}ms, Avg turnaround time: ${metrics.averageTurnaroundTime.toFixed(2)}ms`,
      reason: 'Scheduling complete. Round Robin provides fair CPU time distribution',
      pseudocodeLine: 7,
      metadata: {
        label: 'Complete'
      }
    });

    return steps;
  },

  referenceImplementation(input: RoundRobinInput): SchedulingState {
    const steps = this.generateSteps(input);
    return steps[steps.length - 1].state;
  },

  compareResult(finalState: SchedulingState, referenceResult: SchedulingState): boolean {
    return finalState.completedProcesses.length === referenceResult.completedProcesses.length &&
           finalState.ganttChart.length === referenceResult.ganttChart.length;
  }
};
