import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].id);

  return (
    <div className={cn('space-y-4 w-full', className)}>
      <div className="flex border-b border-bordercolor theme-transition">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all theme-transition -mb-px',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-tx hover:border-bordercolor'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-surface rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)] theme-transition min-h-[100px] flex items-center justify-center text-muted italic text-sm">
        Content for {tabs.find((t) => t.id === activeTab)?.label}
      </div>
    </div>
  );
};
