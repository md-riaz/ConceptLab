/**
 * Depth-First Search (DFS) Algorithm
 * Explores graph deeply before backtracking using a stack
 */

import type { VisualAlgorithm, VisualStep } from '../../engine/types';
import type { Graph, GraphState } from './types';
import { buildAdjacencyList } from './types';

export const DFS: VisualAlgorithm<GraphState, { graph: Graph; startNode: string }> = {
  id: 'dfs',
  name: 'Depth-First Search',
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
    const stack: string[] = [];
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
      description: `Starting DFS from node ${startNode}`,
      reason: 'DFS explores as deep as possible before backtracking',
      pseudocodeLine: 0,
      metadata: {
        highlightNodes: [],
      },
    });

    // Add start node to stack
    stack.push(startNode);
    steps.push({
      index: stepIndex++,
      state: {
        graph,
        currentNode: startNode,
        visitedNodes: [],
        frontier: [...stack],
        path: [],
      },
      description: `Pushed ${startNode} onto the stack`,
      reason: 'We begin by pushing the start node onto our exploration stack',
      pseudocodeLine: 1,
      metadata: {
        highlightNodes: [startNode],
      },
    });

    // DFS main loop
    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (visited.has(current)) {
        steps.push({
          index: stepIndex++,
          state: {
            graph,
            currentNode: current,
            visitedNodes: Array.from(visited),
            frontier: [...stack],
            path: [...path],
          },
          description: `Node ${current} already visited, skipping`,
          reason: 'We skip nodes that have already been explored',
          pseudocodeLine: 2,
          metadata: {
            highlightNodes: [current],
          },
        });
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
          frontier: [...stack],
          path: [...path],
        },
        description: `Visiting node ${current}`,
        reason: 'We mark this node as visited and add it to our traversal path',
        pseudocodeLine: 3,
        metadata: {
          highlightNodes: [current],
        },
      });

      // Explore neighbors (in reverse order for intuitive visualization)
      const neighbors = adj.get(current) || [];
      const reversedNeighbors = [...neighbors].reverse();
      
      for (const neighbor of reversedNeighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);

          steps.push({
            index: stepIndex++,
            state: {
              graph,
              currentNode: current,
              visitedNodes: Array.from(visited),
              frontier: [...stack],
              path: [...path],
              exploringEdge: { from: current, to: neighbor },
            },
            description: `Discovered node ${neighbor} from ${current}, pushed to stack`,
            reason: 'We push unvisited neighbors onto the stack for deep exploration',
            pseudocodeLine: 4,
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
      description: `DFS complete! Traversal order: ${path.join(' → ')}`,
      reason: 'All reachable nodes have been visited in depth-first order',
      pseudocodeLine: 5,
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
    const stack: string[] = [startNode];
    const path: string[] = [];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (visited.has(current)) continue;
      
      visited.add(current);
      path.push(current);
      
      const neighbors = adj.get(current) || [];
      const reversedNeighbors = [...neighbors].reverse();
      for (const neighbor of reversedNeighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    return path;
  },

  compareResult(finalState: GraphState, referenceResult: string[]): boolean {
    return JSON.stringify(finalState.path) === JSON.stringify(referenceResult);
  },
};
