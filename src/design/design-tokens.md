# ConceptLab Design System

## Design Principles

### 1. Clarity over flashiness
- Few colors at a time, minimal motion
- Every color and animation has a clear meaning (current, compared, visited, done)

### 2. Aphantasia-friendly
- Visual + text + structure together
- Clear color coding, labels, and states
- Diagrams always paired with step descriptions and pseudo-code highlights

### 3. Consistent mental model
- The same semantic role always looks the same
- "Current item" is always one color
- "Compared item" is another
- "Visited node" is another

### 4. Accessible
- Meets WCAG contrast ratios
- Keyboard focus visible
- High-contrast theme available

## Color System

### Base Palette

#### Neutral Scale
| Token | Value | Usage |
|-------|-------|-------|
| `color-gray-50` | `#f8fafc` | App background (light mode) |
| `color-gray-100` | `#edf2f7` | Card background / subtle surfaces |
| `color-gray-200` | `#e2e8f0` | Borders, dividers |
| `color-gray-300` | `#cbd5e0` | Disabled controls |
| `color-gray-700` | `#2d3748` | Body text |
| `color-gray-900` | `#171923` | High-emphasis text |

#### Brand / Accent Scales
| Token | Value | Usage |
|-------|-------|-------|
| `color-primary-500` | `#6366f1` | Main CTA (Start Visualization) |
| `color-primary-600` | `#4f46e5` | CTA hover |
| `color-primary-100` | `#e0e7ff` | Primary soft background |
| `color-purple-500` | `#a855f7` | Selection, focus, current step |
| `color-purple-100` | `#f3e8ff` | Slider rails, subtle highlights |
| `color-orange-500` | `#f97316` | Current element / current node |
| `color-orange-100` | `#ffedd5` | Current step background highlight |
| `color-green-500` | `#22c55e` | Finished / sorted / success state |
| `color-red-500` | `#ef4444` | Errors (invalid input, failed tests) |
| `color-yellow-500` | `#eab308` | Warnings (slow speed, big input) |

### Semantic UI Color Tokens

| Token | Maps to | Description |
|-------|---------|-------------|
| `color-bg-app` | `color-gray-50` | Global background |
| `color-bg-surface` | `#ffffff` | Cards / panels |
| `color-bg-elevated` | `#ffffff` | Modals, dropdowns |
| `color-border-subtle` | `color-gray-200` | Card borders, dividers |
| `color-border-strong` | `color-gray-300` | Input borders on focus/hover |
| `color-text-primary` | `color-gray-900` | Main text |
| `color-text-secondary` | `color-gray-700` | Muted text, labels |
| `color-text-muted` | `color-gray-300` | Disabled text |
| `color-text-on-primary` | `#ffffff` | Text on primary buttons |
| `color-accent-primary` | `color-primary-500` | Main accent (CTAs, sliders) |
| `color-accent-secondary` | `color-purple-500` | Secondary accent (tabs, selection chips) |
| `color-bg-chip` | `color-primary-100` | Algorithm / category chips |
| `color-bg-code` | `#0f172a` | Code blocks in dark-ish panel |
| `color-bg-pill` | `color-purple-100` | Step chips & tags |

### Visualization Semantic Tokens

| Token | Purpose |
|-------|---------|
| `viz-bar-default` | Unspecial array bars / nodes |
| `viz-bar-current` | Element currently being processed |
| `viz-bar-comparison` | Element we compare against |
| `viz-bar-final` | Element in final sorted position |
| `viz-node-unvisited` | Unvisited graph node |
| `viz-node-current` | Node currently being explored |
| `viz-node-visited` | Node visited but not finished |
| `viz-node-finished` | Completely processed |
| `viz-edge-default` | Normal graph edge |
| `viz-edge-path` | Edge in shortest path or DFS tree |

## Typography System

### Font Families
- **Base**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Mono**: `"JetBrains Mono", "Fira Code", monospace`

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `font-size-xs` | 12px | Captions, labels, chips |
| `font-size-sm` | 14px | Secondary text, helper text |
| `font-size-md` | 16px | Body text |
| `font-size-lg` | 18px | Emphasized body / section lead |
| `font-size-xl` | 20px | Small headings |
| `font-size-2xl` | 24px | H3 |
| `font-size-3xl` | 30px | H2 |
| `font-size-4xl` | 36px | H1 |

### Typography Classes
- `.h1` - Font size 36px, weight 700
- `.h2` - Font size 30px, weight 700
- `.h3` - Font size 24px, weight 600
- `.h4` - Font size 20px, weight 600
- `.body` - Font size 16px, line-height 1.6
- `.body-sm` - Font size 14px, line-height 1.5
- `.caption` - Font size 12px, uppercase, letter-spacing 0.03em
- `.code` - Mono font family, font size 14px

## Spacing System

Based on a 4px grid:

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |

### Layout Guidelines
- **Card padding**: `space-5` or `space-6`
- **Gaps between controls**: `space-3` / `space-4`
- **Page margins**: `space-8` on desktop, `space-4` on mobile
- **Max content width**: 1200px centered

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Chips, inputs |
| `radius-md` | 8px | Cards, panels |
| `radius-lg` | 16px | Main containers, modals |
| `radius-pill` | 999px | Tags, chips, step indicators |

## Shadows & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Basic cards |
| `shadow-md` | `0 4px 10px rgba(15,23,42,0.08)` | Main panels |
| `shadow-lg` | `0 10px 30px rgba(15,23,42,0.18)` | Modals, floating panels |
| `focus-ring` | `0 0 0 3px rgba(99,102,241,0.5)` | Keyboard focus outline |

## Components

### Button
**Variants:**
- **Primary**: Main CTAs (Start Visualization)
  - Background: `color-accent-primary`
  - Text: `color-text-on-primary`
  - Hover: `color-primary-600`
  
- **Secondary**: Secondary actions (Stop, Pause)
  - Background: transparent
  - Border: 1px `color-border-subtle`
  - Hover: `color-primary-100` background
  
- **Ghost**: Icon buttons (timeline controls)
  - Background: transparent
  - Hover: `color-gray-100` background

**Sizes:** sm, md, lg

### Card
**Variants:**
- **Default**: Basic card with `shadow-sm`
- **Elevated**: Card with `shadow-md`

**Padding:** none, sm (16px), md (20px), lg (24px)

### Chip
**Variants:**
- **Default**: Algorithm type chips
- **Primary**: Primary category
- **Success**: Completed/sorted state
- **Warning**: Warnings
- **Danger**: Errors

**Sizes:** sm, md

### Tabs
- Used for Explanation / Pseudo-code / Timeline
- Active tab has bottom border with `color-accent-secondary`
- Inactive tabs are `color-text-secondary`

### Slider
- Track height: 4px
- Track background: `color-gray-200`
- Filled portion: `color-accent-primary`
- Thumb: 16px circle, white with 2px `color-accent-primary` border

## Breakpoints

| Token | Width |
|-------|-------|
| `breakpoint-sm` | 640px |
| `breakpoint-md` | 768px |
| `breakpoint-lg` | 1024px |
| `breakpoint-xl` | 1280px |

## Theme Support

### Light Theme (Default)
- Background: `color-gray-50`
- Surface: `#ffffff`
- Text: `color-gray-900`

### Dark Theme
- Background: `#020617`
- Surface: `#0f172a`
- Text: `#e5e7eb`
- More saturated visualization colors

### High-Contrast Theme
- Background: pure black `#000000`
- Surface: pure white `#ffffff`
- Text: `#000000`
- High-saturation accent colors
- Minimum 4.5:1 contrast for text, 3:1 for UI elements

## Usage in Code

### Using Tailwind Classes
```tsx
// Button example
<button className="bg-accent-primary text-white px-5 py-3 rounded-pill">
  Start
</button>

// Card example
<div className="bg-bg-surface shadow-md rounded-md p-5">
  Content
</div>
```

### Using CSS Variables
```tsx
// When Tailwind doesn't have the exact utility
<div style={{ backgroundColor: 'var(--color-bg-surface)' }}>
  Content
</div>
```

### Using Reusable Components
```tsx
import { Button, Card, Chip, Tabs, Slider } from '@/components/common';

// Button
<Button variant="primary" size="md">Start Visualization</Button>

// Card
<Card variant="elevated" padding="md">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Chip
<Chip variant="success" icon={<CheckIcon />}>Completed</Chip>

// Tabs
<Tabs tabs={[
  { id: 'explanation', label: 'Explanation', content: <div>...</div> },
  { id: 'code', label: 'Pseudo-code', content: <div>...</div> }
]} />

// Slider
<Slider 
  label="Speed" 
  min={1} 
  max={100} 
  value={speed} 
  onChange={setSpeed}
  unit="ms"
/>
```
