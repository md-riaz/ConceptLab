import { useState } from 'react';
import type { ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export default function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex gap-1" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors duration-200
                  border-b-2 -mb-px
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2
                  ${isActive
                    ? 'border-accent-secondary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-200'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
        className="py-4"
      >
        {activeTabContent}
      </div>
    </div>
  );
}
