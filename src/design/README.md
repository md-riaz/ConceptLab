# ConceptLab Design System

## Overview

This design system is specifically optimized for learners with aphantasia (difficulty forming mental images). It emphasizes:
- **Multi-modal feedback**: Visual + text + semantic meaning
- **Clear color semantics**: Each color has a specific, consistent meaning
- **Minimal cognitive load**: Few colors at a time, purposeful animations
- **Accessibility**: WCAG contrast ratios, keyboard support, theme variants

## Using Design Tokens

### In CSS

```css
.my-component {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
  padding: var(--space-5);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### In TypeScript

```typescript
import { designTokens } from './tokens';

const myColor = designTokens.color.accent.primary; // '#6366f1'
```

## Visualization Color Semantics

**Critical for aphantasia support**: These colors must maintain consistent meanings across all visualizations.

- **Orange** (`--viz-bar-current`, `--viz-node-current`): "I am currently processing this"
- **Purple** (`--viz-bar-comparison`, `--viz-node-visited`): "I am comparing/swapping this" or "I have visited this"
- **Green** (`--viz-bar-final`, `--viz-node-finished`): "This is complete/sorted/in final position"
- **Gray** (`--viz-bar-default`, `--viz-node-unvisited`): "This is inactive/unsorted/unvisited"

## Typography Classes

```html
<h1 class="h1">Main Heading</h1>
<h2 class="h2">Section Heading</h2>
<p class="body">Regular text with good readability</p>
<p class="body-sm">Smaller text for labels</p>
<span class="caption">UPPERCASE LABELS</span>
<code class="code">Monospace for code</code>
```

## Button Patterns

### Primary Action (e.g., "Start Visualization")
```tsx
<button style={{
  backgroundColor: 'var(--color-accent-primary)',
  color: 'var(--color-text-on-primary)',
  borderRadius: 'var(--radius-pill)',
  padding: 'var(--space-3) var(--space-5)',
}}>
  Start
</button>
```

### Secondary Action (e.g., "Next", "Previous")
```tsx
<button style={{
  backgroundColor: 'transparent',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-3) var(--space-5)',
}}>
  Next
</button>
```

## Theme Support

Switch themes by setting the `data-theme` attribute:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
// or 'light' (default)
// or 'high-contrast'
```

In dark theme, visualization colors become more saturated for better visibility.

## Spacing System

Based on 4px grid:
- `space-1`: 4px (tight spacing)
- `space-2`: 8px (compact)
- `space-3`: 12px (standard gap)
- `space-4`: 16px (comfortable)
- `space-5`: 20px (card padding)
- `space-6`: 24px (section spacing)
- `space-8`: 32px (major sections)

## Card Pattern

```tsx
<div style={{
  backgroundColor: 'var(--color-bg-surface)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-md)',
  padding: 'var(--space-6)',
  border: '1px solid var(--color-border-subtle)',
}}>
  Card content
</div>
```

## Future Extensions

When adding new visualizations:
1. Use existing semantic tokens for similar concepts
2. If introducing new states, add new tokens to `tokens.ts`
3. Update all theme variants (light, dark, high-contrast)
4. Document the semantic meaning clearly
5. Test with actual aphantasia users if possible

## Accessibility Checklist

- [ ] Text contrast ratio ≥ 4.5:1 for normal text
- [ ] UI element contrast ratio ≥ 3:1
- [ ] Focus indicators visible and clear
- [ ] Color not used as only means of conveying information
- [ ] Touch targets ≥ 44x44px
- [ ] Keyboard navigation works
- [ ] Screen reader friendly labels
