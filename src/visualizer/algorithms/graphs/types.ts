/**
 * Graph data structures and types for graph algorithm visualizations
 */

export interface GraphNode {
  id: string;
  label: string;
  x?: number; // Position for rendering
  y?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  directed?: boolean;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed?: boolean;
}

export interface GraphState {
  graph: Graph;
  currentNode?: string;
  visitedNodes: string[];
  frontier: string[]; // Queue for BFS or stack for DFS
  exploringEdge?: { from: string; to: string };
  path?: string[]; // Final path or traversal order
  distances?: Map<string, number>; // For shortest path algorithms
}

// Predefined graph examples for easy testing
export const GRAPH_PRESETS: Record<string, Graph> = {
  'simple-path': {
    nodes: [
      { id: 'A', label: 'A', x: 50, y: 150 },
      { id: 'B', label: 'B', x: 150, y: 100 },
      { id: 'C', label: 'C', x: 150, y: 200 },
      { id: 'D', label: 'D', x: 250, y: 150 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
    ],
    directed: false,
  },
  'cycle': {
    nodes: [
      { id: 'A', label: 'A', x: 150, y: 50 },
      { id: 'B', label: 'B', x: 250, y: 150 },
      { id: 'C', label: 'C', x: 150, y: 250 },
      { id: 'D', label: 'D', x: 50, y: 150 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'A' },
    ],
    directed: false,
  },
  'tree': {
    nodes: [
      { id: 'A', label: 'A', x: 150, y: 50 },
      { id: 'B', label: 'B', x: 100, y: 150 },
      { id: 'C', label: 'C', x: 200, y: 150 },
      { id: 'D', label: 'D', x: 50, y: 250 },
      { id: 'E', label: 'E', x: 150, y: 250 },
      { id: 'F', label: 'F', x: 250, y: 250 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
    ],
    directed: false,
  },
  'grid': {
    nodes: [
      { id: '0,0', label: '0,0', x: 50, y: 50 },
      { id: '0,1', label: '0,1', x: 150, y: 50 },
      { id: '0,2', label: '0,2', x: 250, y: 50 },
      { id: '1,0', label: '1,0', x: 50, y: 150 },
      { id: '1,1', label: '1,1', x: 150, y: 150 },
      { id: '1,2', label: '1,2', x: 250, y: 150 },
      { id: '2,0', label: '2,0', x: 50, y: 250 },
      { id: '2,1', label: '2,1', x: 150, y: 250 },
      { id: '2,2', label: '2,2', x: 250, y: 250 },
    ],
    edges: [
      { from: '0,0', to: '0,1' },
      { from: '0,1', to: '0,2' },
      { from: '1,0', to: '1,1' },
      { from: '1,1', to: '1,2' },
      { from: '2,0', to: '2,1' },
      { from: '2,1', to: '2,2' },
      { from: '0,0', to: '1,0' },
      { from: '1,0', to: '2,0' },
      { from: '0,1', to: '1,1' },
      { from: '1,1', to: '2,1' },
      { from: '0,2', to: '1,2' },
      { from: '1,2', to: '2,2' },
    ],
    directed: false,
  },
};

// Build adjacency list from graph
export function buildAdjacencyList(graph: Graph): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  
  // Initialize all nodes
  graph.nodes.forEach(node => {
    adj.set(node.id, []);
  });
  
  // Add edges
  graph.edges.forEach(edge => {
    adj.get(edge.from)?.push(edge.to);
    if (!graph.directed) {
      adj.get(edge.to)?.push(edge.from);
    }
  });
  
  return adj;
}
