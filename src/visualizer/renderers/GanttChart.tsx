import React from 'react';
import type { SchedulingState } from '../algorithms/os/types';

interface GanttChartProps {
  state: SchedulingState;
}

export const GanttChart: React.FC<GanttChartProps> = ({ state }) => {
  const { ganttChart, processes, currentTime, executingProcess, readyQueue, completedProcesses } = state;

  if (ganttChart.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No processes scheduled yet</p>
      </div>
    );
  }

  const maxTime = Math.max(...ganttChart.map(e => e.endTime), currentTime);
  const chartWidth = 800;
  const barHeight = 60;
  const timeScale = chartWidth / maxTime;

  // Color mapping for processes
  const processColors = new Map<string, string>();
  const colors = [
    'var(--viz-node-current)',      // Orange
    'var(--viz-node-visited)',      // Purple
    'var(--color-primary-500)',     // Blue
    'var(--color-green-500)',       // Green
    'var(--color-yellow-500)',      // Yellow
  ];
  processes.forEach((p, i) => {
    processColors.set(p.id, colors[i % colors.length]);
  });

  return (
    <div className="space-y-6">
      {/* Gantt Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Gantt Chart</h3>
        
        <div className="relative" style={{ height: barHeight + 40 }}>
          {/* Timeline bar */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Time labels */}
            <div className="relative" style={{ height: barHeight }}>
              {ganttChart.map((execution, idx) => {
                const x = execution.startTime * timeScale;
                const width = (execution.endTime - execution.startTime) * timeScale;
                const isExecuting = executingProcess === execution.processId;
                
                return (
                  <div
                    key={idx}
                    className="absolute flex items-center justify-center font-semibold text-white"
                    style={{
                      left: `${x}px`,
                      width: `${width}px`,
                      height: `${barHeight}px`,
                      backgroundColor: processColors.get(execution.processId),
                      border: isExecuting ? '3px solid var(--color-orange-500)' : '2px solid rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      boxShadow: isExecuting ? '0 0 0 3px rgba(249, 115, 22, 0.2)' : 'none'
                    }}
                  >
                    {execution.processId}
                  </div>
                );
              })}
            </div>
            
            {/* Time axis */}
            <div className="absolute bottom-0 left-0 w-full h-6 border-t-2 border-gray-300">
              {Array.from({ length: Math.ceil(maxTime) + 1 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-xs text-gray-600"
                  style={{ left: `${i * timeScale}px`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-px h-2 bg-gray-300 mx-auto mb-1"></div>
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Status */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ready Queue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Ready Queue</h4>
          <div className="flex flex-wrap gap-2">
            {readyQueue.length > 0 ? (
              readyQueue.map((processId, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--viz-node-visited)' }}
                >
                  {processId}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">Empty</span>
            )}
          </div>
        </div>

        {/* Completed Processes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Completed</h4>
          <div className="flex flex-wrap gap-2">
            {completedProcesses.length > 0 ? (
              completedProcesses.map((processId, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--viz-node-finished)' }}
                >
                  {processId}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>
      </div>

      {/* Process Details Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm font-semibold mb-3 text-gray-700">Process Details</h4>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Process</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Arrival</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Burst</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Remaining</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => {
              const isExecuting = executingProcess === process.id;
              const isCompleted = completedProcesses.includes(process.id);
              const isReady = readyQueue.includes(process.id);
              
              return (
                <tr key={process.id} className="border-t border-gray-100">
                  <td className="px-4 py-2 font-medium">{process.id}</td>
                  <td className="px-4 py-2">{process.arrivalTime}ms</td>
                  <td className="px-4 py-2">{process.burstTime}ms</td>
                  <td className="px-4 py-2">{process.remainingTime || 0}ms</td>
                  <td className="px-4 py-2">
                    {isExecuting && (
                      <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: 'var(--viz-node-current)' }}>
                        Executing
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: 'var(--viz-node-finished)' }}>
                        Completed
                      </span>
                    )}
                    {isReady && !isExecuting && (
                      <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: 'var(--viz-node-visited)' }}>
                        Ready
                      </span>
                    )}
                    {!isExecuting && !isCompleted && !isReady && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-600">
                        Waiting
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Legend</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--viz-node-current)' }}></div>
            <span>Executing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--viz-node-visited)' }}></div>
            <span>Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--viz-node-finished)' }}></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200"></div>
            <span>Waiting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
