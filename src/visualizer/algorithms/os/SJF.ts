import type { VisualAlgorithm, VisualStep } from '../../engine/types';
import type { Process, SchedulingState, ProcessExecution } from './types';
import { calculateMetrics } from './types';

interface SJFInput {
  processes: Process[];
}

export const SJF: VisualAlgorithm<SchedulingState, SJFInput> = {
  id: 'sjf',
  name: 'Shortest Job First (SJF)',
  categoryId: 'os',
  inputSchema: 'custom',
  defaultInput: {
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 6 },
      { id: 'P2', arrivalTime: 1, burstTime: 2 },
      { id: 'P3', arrivalTime: 2, burstTime: 8 },
      { id: 'P4', arrivalTime: 3, burstTime: 3 },
    ]
  },

  generateSteps(input: SJFInput): VisualStep<SchedulingState>[] {
    const steps: VisualStep<SchedulingState>[] = [];
    const { processes } = input;
    
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
      description: 'Starting Shortest Job First (SJF) scheduling',
      reason: 'SJF selects the process with the shortest burst time from the ready queue',
      pseudocodeLine: 0,
      metadata: {
        label: 'Initialization'
      }
    });

    // Main scheduling loop
    while (completedProcesses.length < processes.length) {
      // Add arrived processes to ready queue
      const newArrivals = workingProcesses
        .filter(p => p.arrivalTime <= currentTime && 
                     p.remainingTime! > 0 && 
                     !readyQueue.includes(p.id))
        .map(p => p.id);

      newArrivals.forEach(id => readyQueue.push(id));

      if (newArrivals.length > 0) {
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
          description: `Processes ${newArrivals.join(', ')} arrived and added to ready queue`,
          reason: 'New processes that have arrived are added to the ready queue',
          pseudocodeLine: 1
        });
      }

      // If no process ready, advance time
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
            reason: 'No processes are ready, CPU waits for next arrival',
            pseudocodeLine: 2
          });
        }
        continue;
      }

      // Select shortest job
      const shortestJobId = readyQueue.reduce((shortest, current) => {
        const shortestProcess = workingProcesses.find(p => p.id === shortest)!;
        const currentProcess = workingProcesses.find(p => p.id === current)!;
        return currentProcess.burstTime < shortestProcess.burstTime ? current : shortest;
      });

      const index = readyQueue.indexOf(shortestJobId);
      readyQueue.splice(index, 1);
      const process = workingProcesses.find(p => p.id === shortestJobId)!;

      steps.push({
        index: stepIndex++,
        state: {
          currentTime,
          readyQueue: [...readyQueue],
          executingProcess: shortestJobId,
          completedProcesses: [...completedProcesses],
          ganttChart: [...ganttChart],
          processes: workingProcesses,
          waitingTimes: new Map(),
          turnaroundTimes: new Map()
        },
        description: `Select ${shortestJobId} (burst: ${process.burstTime}ms) - shortest job in ready queue`,
        reason: 'SJF selects the process with minimum burst time for execution',
        pseudocodeLine: 3,
        metadata: {
          label: 'Process Selection'
        }
      });

      // Execute process to completion
      const startTime = currentTime;
      const endTime = currentTime + process.burstTime;

      ganttChart.push({
        processId: shortestJobId,
        startTime,
        endTime
      });

      process.remainingTime = 0;
      currentTime = endTime;
      completedProcesses.push(shortestJobId);

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
        description: `Execute ${shortestJobId} from time ${startTime} to ${endTime} - completed`,
        reason: 'Process runs to completion without preemption',
        pseudocodeLine: 4,
        metadata: {
          label: 'Execution Complete'
        }
      });
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
      reason: 'SJF minimizes average waiting time by executing shorter jobs first',
      pseudocodeLine: 5,
      metadata: {
        label: 'Complete'
      }
    });

    return steps;
  },

  referenceImplementation(input: SJFInput): SchedulingState {
    const steps = this.generateSteps(input);
    return steps[steps.length - 1].state;
  },

  compareResult(finalState: SchedulingState, referenceResult: SchedulingState): boolean {
    return finalState.completedProcesses.length === referenceResult.completedProcesses.length &&
           finalState.ganttChart.length === referenceResult.ganttChart.length;
  }
};
