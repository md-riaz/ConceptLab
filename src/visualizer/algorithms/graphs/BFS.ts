/**
 * Breadth-First Search (BFS) Algorithm
 * Explores graph level by level using a queue
 */

import type { VisualAlgorithm, VisualStep } from '../../engine/types';
import type { Graph, GraphState } from './types';
import { buildAdjacencyList } from './types';

export const BFS: VisualAlgorithm<GraphState, { graph: Graph; startNode: string }> = {
  id: 'bfs',
  name: 'Breadth-First Search',
  categoryId: 'graph',
  inputSchema: 'graph',
  defaultInput: {
    graph: {
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
    startNode: 'A',
  },

  generateSteps(input: { graph: Graph; startNode: string }): VisualStep<GraphState>[] {
    const steps: VisualStep<GraphState>[] = [];
    const { graph, startNode } = input;
    const adj = buildAdjacencyList(graph);
    
    const visited = new Set<string>();
    const queue: string[] = [];
    const path: string[] = [];
    
    let stepIndex = 0;

    // Initial state
    steps.push({
      index: stepIndex++,
      state: {
        graph,
        currentNode: undefined,
        visitedNodes: [],
        frontier: [],
        path: [],
      },
      description: `Starting BFS from node ${startNode}`,
      reason: 'BFS explores nodes level by level, starting from the source node',
      pseudocodeLine: 0,
      metadata: {
        highlightNodes: [],
      },
    });

    // Add start node to queue
    queue.push(startNode);
    steps.push({
      index: stepIndex++,
      state: {
        graph,
        currentNode: startNode,
        visitedNodes: [],
        frontier: [...queue],
        path: [],
      },
      description: `Added ${startNode} to the queue`,
      reason: 'We begin by adding the start node to our exploration queue',
      pseudocodeLine: 1,
      metadata: {
        highlightNodes: [startNode],
      },
    });

    // BFS main loop
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current)) {
        continue;
      }

      // Visit current node
      visited.add(current);
      path.push(current);

      steps.push({
        index: stepIndex++,
        state: {
          graph,
          currentNode: current,
          visitedNodes: Array.from(visited),
          frontier: [...queue],
          path: [...path],
        },
        description: `Visiting node ${current}`,
        reason: 'We mark this node as visited and add it to our traversal path',
        pseudocodeLine: 2,
        metadata: {
          highlightNodes: [current],
        },
      });

      // Explore neighbors
      const neighbors = adj.get(current) || [];
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);

          steps.push({
            index: stepIndex++,
            state: {
              graph,
              currentNode: current,
              visitedNodes: Array.from(visited),
              frontier: [...queue],
              path: [...path],
              exploringEdge: { from: current, to: neighbor },
            },
            description: `Discovered node ${neighbor} from ${current}, added to queue`,
            reason: 'We add unvisited neighbors to the queue for future exploration',
            pseudocodeLine: 3,
            metadata: {
              highlightNodes: [current, neighbor],
            },
          });
        }
      }
    }

    // Final state
    steps.push({
      index: stepIndex++,
      state: {
        graph,
        currentNode: undefined,
        visitedNodes: Array.from(visited),
        frontier: [],
        path: [...path],
      },
      description: `BFS complete! Traversal order: ${path.join(' → ')}`,
      reason: 'All reachable nodes have been visited in breadth-first order',
      pseudocodeLine: 4,
      metadata: {
        highlightNodes: path,
      },
    });

    return steps;
  },

  referenceImplementation(input: { graph: Graph; startNode: string }): string[] {
    const { graph, startNode } = input;
    const adj = buildAdjacencyList(graph);
    const visited = new Set<string>();
    const queue: string[] = [startNode];
    const path: string[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      
      visited.add(current);
      path.push(current);
      
      const neighbors = adj.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    return path;
  },

  compareResult(finalState: GraphState, referenceResult: string[]): boolean {
    return JSON.stringify(finalState.path) === JSON.stringify(referenceResult);
  },
};
