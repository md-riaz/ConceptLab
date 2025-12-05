/**
 * GraphCanvas - SVG-based renderer for graph visualizations
 * Renders nodes, edges, and highlights for graph algorithms like BFS/DFS
 */

import React from 'react';
import type { GraphState } from '../algorithms/graphs/types';

interface GraphCanvasProps {
  state: GraphState;
  width?: number;
  height?: number;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ 
  state, 
  width = 600, 
  height = 400 
}) => {
  const { graph, currentNode, visitedNodes, frontier, exploringEdge } = state;
  
  const getNodeColor = (nodeId: string): string => {
    if (currentNode === nodeId) {
      return 'var(--viz-node-current)'; // Orange - currently processing
    }
    if (visitedNodes.includes(nodeId)) {
      return 'var(--viz-node-finished)'; // Green - visited/finished
    }
    if (frontier.includes(nodeId)) {
      return 'var(--viz-node-visited)'; // Purple - in frontier
    }
    return 'var(--viz-node-unvisited)'; // Gray - unvisited
  };

  const getEdgeColor = (from: string, to: string): string => {
    if (exploringEdge && 
        ((exploringEdge.from === from && exploringEdge.to === to) ||
         (exploringEdge.from === to && exploringEdge.to === from))) {
      return 'var(--viz-edge-path)'; // Primary color - currently exploring
    }
    return 'var(--viz-edge-default)'; // Gray - default
  };

  const getEdgeWidth = (from: string, to: string): number => {
    if (exploringEdge && 
        ((exploringEdge.from === from && exploringEdge.to === to) ||
         (exploringEdge.from === to && exploringEdge.to === from))) {
      return 3;
    }
    return 2;
  };

  const nodeRadius = 25;

  return (
    <svg
      width={width}
      height={height}
      className="bg-white border border-gray-200 rounded-md"
      style={{ backgroundColor: 'var(--color-bg-surface)' }}
    >
      {/* Render edges first (so they're behind nodes) */}
      {graph.edges.map((edge, index) => {
        const fromNode = graph.nodes.find(n => n.id === edge.from);
        const toNode = graph.nodes.find(n => n.id === edge.to);
        
        if (!fromNode || !toNode) return null;
        
        const x1 = fromNode.x || 0;
        const y1 = fromNode.y || 0;
        const x2 = toNode.x || 0;
        const y2 = toNode.y || 0;
        
        return (
          <line
            key={`edge-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={getEdgeColor(edge.from, edge.to)}
            strokeWidth={getEdgeWidth(edge.from, edge.to)}
            strokeLinecap="round"
          />
        );
      })}
      
      {/* Render nodes */}
      {graph.nodes.map((node) => {
        const x = node.x || 0;
        const y = node.y || 0;
        const color = getNodeColor(node.id);
        const isHighlighted = node.id === currentNode;
        
        return (
          <g key={`node-${node.id}`}>
            {/* Highlight ring for current node */}
            {isHighlighted && (
              <circle
                cx={x}
                cy={y}
                r={nodeRadius + 5}
                fill="none"
                stroke={color}
                strokeWidth="3"
                opacity="0.3"
              />
            )}
            
            {/* Node circle */}
            <circle
              cx={x}
              cy={y}
              r={nodeRadius}
              fill={color}
              stroke={isHighlighted ? color : 'var(--color-border-subtle)'}
              strokeWidth={isHighlighted ? "3" : "2"}
              style={{ 
                transition: 'fill 0.3s ease, stroke 0.3s ease',
              }}
            />
            
            {/* Node label */}
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-text-on-primary)"
              fontSize="16"
              fontWeight="600"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
      
      {/* Legend */}
      <g transform="translate(10, 10)">
        <rect width="200" height="90" fill="white" opacity="0.9" rx="4" />
        
        {[
          { color: 'var(--viz-node-current)', label: 'Current', y: 20 },
          { color: 'var(--viz-node-visited)', label: 'In Frontier', y: 40 },
          { color: 'var(--viz-node-finished)', label: 'Visited', y: 60 },
          { color: 'var(--viz-node-unvisited)', label: 'Unvisited', y: 80 },
        ].map(({ color, label, y }) => (
          <g key={label} transform={`translate(10, ${y})`}>
            <circle cx="8" cy="-5" r="6" fill={color} />
            <text x="20" y="0" fontSize="12" fill="var(--color-text-primary)">
              {label}
            </text>
          </g>
        ))}
      </g>
      
      {/* Frontier display */}
      {frontier.length > 0 && (
        <g transform={`translate(10, ${height - 40})`}>
          <rect width={width - 20} height="30" fill="white" opacity="0.95" rx="4" />
          <text x="10" y="20" fontSize="14" fill="var(--color-text-primary)" fontWeight="600">
            Frontier: {frontier.join(' → ')}
          </text>
        </g>
      )}
    </svg>
  );
};
