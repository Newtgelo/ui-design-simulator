import React from 'react';
import { Tabs } from '../ui/Tabs';
import { House, ChartLineUp, Envelope, CaretRight } from '@phosphor-icons/react';
import { SectionHeading } from '../ui/SectionHeading';

export const NavigationSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <SectionHeading level="h2" title="Navigation" description="Tab, breadcrumb, and routing UI patterns." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <SectionHeading level="h4" title="Tabs" className="mb-3" />
            <Tabs 
              tabs={[
                { id: '1', label: 'Overview (ภาพรวม)', icon: <House size={16} /> },
                { id: '2', label: 'Analytics (วิเคราะห์)', icon: <ChartLineUp size={16} /> },
                { id: '3', label: 'Messages (ข้อความ)', icon: <Envelope size={16} /> }
              ]} 
            />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <SectionHeading level="h4" title="Breadcrumbs" className="mb-3" />
            <nav className="flex items-center gap-2 text-sm text-muted font-medium theme-transition bg-surface p-4 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)]">
              <span className="hover:text-primary cursor-pointer flex items-center gap-1"><House size={16}/> Home</span>
              <CaretRight size={14} />
              <span className="hover:text-primary cursor-pointer">Project</span>
              <CaretRight size={14} />
              <span className="text-tx">Design System</span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};
