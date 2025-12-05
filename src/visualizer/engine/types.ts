/**
 * Core types for the visualization engine
 */

// A single step in the visualization
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface VisualStep<State = any> {
  index: number;            // 0-based step index
  state: State;             // serializable state to be rendered
  description: string;      // plain text step description
  reason?: string;          // "why" explanation
  pseudocodeLine?: number;  // line number to highlight
  metadata?: {
    comparisons?: number;
    swaps?: number;
    visitedNodeId?: string;
    highlightIndices?: number[];
    highlightNodes?: string[];
    label?: string;         // e.g., "Divide phase", "Merge phase"
  };
}

// Generic algorithm descriptor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface VisualAlgorithm<State = any, Input = any> {
  id: string;
  name: string;
  categoryId: string;       // e.g. "sorting", "graph"
  inputSchema: "array" | "graph" | "tree" | "custom";
  defaultInput: Input;
  generateSteps(input: Input): VisualStep<State>[];

  // For self-validation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  referenceImplementation(input: Input): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareResult(finalState: State, referenceResult: any): boolean;
}

// Content types
export interface Category {
  id: string;              // "dsa", "os", "dbms"
  name: string;
  description: string;
  icon?: string;
}

export interface TopicSection {
  id: string;
  title: string;
  contentMarkdown: string;
}

export interface Topic {
  id: string;              // "merge-sort"
  slug: string;            // URL slug
  title: string;
  categoryId: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  summary: string;
  visualAlgorithmId?: string;
  sections: TopicSection[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  topicIds: string[];      // order matters
}

// Progress tracking (local only)
export interface TopicProgress {
  topicId: string;
  status: "not_started" | "in_progress" | "completed";
  lastVisitedAt: string;
}

export interface UserSettings {
  theme: "light" | "dark" | "high-contrast";
  defaultLanguage: "cpp" | "java" | "python" | "js";
  defaultSpeedMs: number;
  defaultRepresentation: "bars" | "tree" | "graph" | "text";
}
