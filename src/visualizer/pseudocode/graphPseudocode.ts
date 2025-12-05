/**
 * Pseudo-code for graph algorithms (BFS, DFS)
 */

export const graphPseudocode: Record<string, string> = {
  bfs: `function BFS(graph, start):
    queue = [start]
    visited = set()
    
    while queue is not empty:
        node = queue.dequeue()
        if node in visited:
            continue
            
        visited.add(node)
        
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                queue.enqueue(neighbor)
    
    return visited`,
  
  dfs: `function DFS(graph, start):
    stack = [start]
    visited = set()
    
    while stack is not empty:
        node = stack.pop()
        if node in visited:
            continue
            
        visited.add(node)
        
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                stack.push(neighbor)
    
    return visited`,
};
