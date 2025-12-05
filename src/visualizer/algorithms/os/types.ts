// OS Scheduling Algorithm Types

export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  remainingTime?: number;
}

export interface ProcessExecution {
  processId: string;
  startTime: number;
  endTime: number;
}

export interface SchedulingState {
  currentTime: number;
  readyQueue: string[];
  executingProcess: string | null;
  completedProcesses: string[];
  ganttChart: ProcessExecution[];
  processes: Process[];
  waitingTimes: Map<string, number> | Map<string, { waitingTime: number; turnaroundTime: number; completionTime: number }>;
  turnaroundTimes: Map<string, number> | Map<string, { waitingTime: number; turnaroundTime: number; completionTime: number }>;
}

export interface SchedulingMetrics {
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  processMetrics: Map<string, {
    waitingTime: number;
    turnaroundTime: number;
    completionTime: number;
  }>;
}

export function calculateMetrics(
  processes: Process[],
  ganttChart: ProcessExecution[]
): SchedulingMetrics {
  const processMetrics = new Map<string, {
    waitingTime: number;
    turnaroundTime: number;
    completionTime: number;
  }>();

  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  processes.forEach(process => {
    const executions = ganttChart.filter(e => e.processId === process.id);
    const completionTime = executions.length > 0
      ? Math.max(...executions.map(e => e.endTime))
      : 0;
    
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    processMetrics.set(process.id, {
      waitingTime,
      turnaroundTime,
      completionTime
    });

    totalWaitingTime += waitingTime;
    totalTurnaroundTime += turnaroundTime;
  });

  return {
    averageWaitingTime: totalWaitingTime / processes.length,
    averageTurnaroundTime: totalTurnaroundTime / processes.length,
    processMetrics
  };
}
