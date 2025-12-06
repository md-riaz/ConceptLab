import { useState } from 'react';
import { Button, Card, Chip, Tabs, Slider } from '../common';

export default function ComponentShowcase() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="h1 text-text-primary mb-2">
          Component Showcase
        </h1>
        <p className="body text-text-secondary">
          Demonstration of all reusable components in the ConceptLab design system
        </p>
      </div>

      <div className="space-y-8">
        {/* Buttons */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Buttons</h2>
          <div className="space-y-6">
            <div>
              <h4 className="h4 text-text-primary mb-3">Primary Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small Primary</Button>
                <Button variant="primary" size="md">Medium Primary</Button>
                <Button variant="primary" size="lg">Large Primary</Button>
                <Button variant="primary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Secondary Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">Small Secondary</Button>
                <Button variant="secondary" size="md">Medium Secondary</Button>
                <Button variant="secondary" size="lg">Large Secondary</Button>
                <Button variant="secondary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Ghost Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">Small Ghost</Button>
                <Button variant="ghost" size="md">Medium Ghost</Button>
                <Button variant="ghost" size="lg">Large Ghost</Button>
                <Button variant="ghost" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Full Width Button</h4>
              <Button variant="primary" size="md" fullWidth>Full Width Button</Button>
            </div>
          </div>
        </Card>

        {/* Cards */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" padding="md">
              <h3 className="h4 text-text-primary mb-2">Default Card</h3>
              <p className="body text-text-secondary">
                This is a default card with medium padding and subtle shadow.
              </p>
            </Card>

            <Card variant="elevated" padding="md">
              <h3 className="h4 text-text-primary mb-2">Elevated Card</h3>
              <p className="body text-text-secondary">
                This is an elevated card with more prominent shadow.
              </p>
            </Card>

            <Card variant="default" padding="md" hover>
              <h3 className="h4 text-text-primary mb-2">Hoverable Card</h3>
              <p className="body text-text-secondary">
                This card has hover effect. Try hovering over it!
              </p>
            </Card>

            <Card variant="default" padding="lg">
              <h3 className="h4 text-text-primary mb-2">Large Padding</h3>
              <p className="body text-text-secondary">
                This card uses large padding for more spacious content.
              </p>
            </Card>
          </div>
        </Card>

        {/* Chips */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Chips</h2>
          <div className="space-y-4">
            <div>
              <h4 className="h4 text-text-primary mb-3">Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Chip variant="default">Default</Chip>
                <Chip variant="primary">Primary</Chip>
                <Chip variant="success">Success</Chip>
                <Chip variant="warning">Warning</Chip>
                <Chip variant="danger">Danger</Chip>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Sizes</h4>
              <div className="flex flex-wrap gap-2 items-center">
                <Chip variant="primary" size="sm">Small Chip</Chip>
                <Chip variant="primary" size="md">Medium Chip</Chip>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">With Icons</h4>
              <div className="flex flex-wrap gap-2">
                <Chip variant="success" icon={<span>✓</span>}>Completed</Chip>
                <Chip variant="warning" icon={<span>⚠</span>}>Warning</Chip>
                <Chip variant="danger" icon={<span>✕</span>}>Error</Chip>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Algorithm Categories</h4>
              <div className="flex flex-wrap gap-2">
                <Chip variant="primary">Sorting</Chip>
                <Chip variant="default">Graph Traversal</Chip>
                <Chip variant="primary">Dynamic Programming</Chip>
                <Chip variant="default">Searching</Chip>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Tabs</h2>
          <Tabs
            tabs={[
              {
                id: 'explanation',
                label: 'Explanation',
                content: (
                  <div className="prose">
                    <h3 className="h4 text-text-primary mb-2">Algorithm Explanation</h3>
                    <p className="body text-text-secondary">
                      This tab contains the step-by-step explanation of the algorithm.
                      The current implementation demonstrates how tabs can be used to organize
                      different types of content in the visualizer.
                    </p>
                  </div>
                ),
              },
              {
                id: 'pseudocode',
                label: 'Pseudo-code',
                content: (
                  <div className="bg-bg-code p-4 rounded-md">
                    <pre className="code text-gray-100">
{`function bubbleSort(array):
    n = length(array)
    for i from 0 to n-1:
        for j from 0 to n-i-1:
            if array[j] > array[j+1]:
                swap(array[j], array[j+1])`}
                    </pre>
                  </div>
                ),
              },
              {
                id: 'timeline',
                label: 'Timeline',
                content: (
                  <div>
                    <p className="body text-text-secondary">
                      Timeline view will show the history of algorithm execution steps.
                    </p>
                  </div>
                ),
              },
            ]}
            defaultTab="explanation"
          />
        </Card>

        {/* Sliders */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Sliders</h2>
          <div className="space-y-6">
            <Slider
              label="Animation Speed"
              min={1}
              max={100}
              value={sliderValue}
              onChange={setSliderValue}
              showValue
            />

            <Slider
              label="Array Size"
              min={5}
              max={50}
              step={5}
              value={25}
              onChange={() => {}}
              showValue
            />

            <Slider
              label="Delay (milliseconds)"
              min={100}
              max={2000}
              step={100}
              value={500}
              onChange={() => {}}
              showValue
              unit="ms"
            />
          </div>
        </Card>

        {/* Typography */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="h1 text-text-primary">Heading 1 - Main Title</h1>
              <h2 className="h2 text-text-primary">Heading 2 - Section Title</h2>
              <h3 className="h3 text-text-primary">Heading 3 - Subsection</h3>
              <h4 className="h4 text-text-primary">Heading 4 - Minor Heading</h4>
            </div>

            <div className="space-y-2">
              <p className="body text-text-primary">
                Body text - This is the default body text used for main content. It has a comfortable line height for readability.
              </p>
              <p className="body-sm text-text-secondary">
                Small body text - Used for secondary information, helper text, and captions.
              </p>
              <p className="caption text-text-secondary">
                Caption text - Used for labels and small annotations
              </p>
              <p className="code text-text-primary">
                Code text - Used for inline code: const example = "value";
              </p>
            </div>
          </div>
        </Card>

        {/* Colors - Visualization Tokens */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Visualization Colors</h2>
          <div className="space-y-4">
            <div>
              <h4 className="h4 text-text-primary mb-3">Sorting Algorithm States</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="w-full h-20 bg-viz-bar-default rounded-md mb-2"></div>
                  <p className="body-sm text-text-secondary text-center">Default</p>
                </div>
                <div>
                  <div className="w-full h-20 bg-viz-bar-current rounded-md mb-2"></div>
                  <p className="body-sm text-text-secondary text-center">Current</p>
                </div>
                <div>
                  <div className="w-full h-20 bg-viz-bar-comparison rounded-md mb-2"></div>
                  <p className="body-sm text-text-secondary text-center">Comparison</p>
                </div>
                <div>
                  <div className="w-full h-20 bg-viz-bar-final rounded-md mb-2"></div>
                  <p className="body-sm text-text-secondary text-center">Final</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="h4 text-text-primary mb-3">Graph Node States</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-viz-bar-default border-2 border-gray-300"></div>
                  <span className="body-sm text-text-secondary">Unvisited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-viz-bar-current border-2 border-orange-500"></div>
                  <span className="body-sm text-text-secondary">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-viz-bar-comparison border-2 border-purple-500"></div>
                  <span className="body-sm text-text-secondary">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-viz-bar-final border-2 border-green-500"></div>
                  <span className="body-sm text-text-secondary">Finished</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Spacing & Layout */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">Spacing Scale (4px base)</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-1 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-1 = 4px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-2 = 8px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-3 = 12px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-4 = 16px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-6 = 24px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 bg-accent-primary" style={{ height: '4px' }}></div>
              <span className="body-sm text-text-secondary">space-8 = 32px</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
