import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users, RocketLaunch, Envelope, CaretRight, MagnifyingGlass } from '@phosphor-icons/react';

export const FormsSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-secondary rounded-full"></span> Forms & Buttons
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Button Variants</label>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Button Sizes</label>
            <div className="flex flex-wrap items-end gap-4">
              <Button size="sm">Small (sm)</Button>
              <Button size="md">Medium (md)</Button>
              <Button size="lg">Large (lg)</Button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Icon Buttons</label>
            <div className="flex flex-wrap gap-4">
              <Button size="icon"><Users size={20} /></Button>
              <Button size="icon" variant="secondary"><RocketLaunch size={20} /></Button>
              <Button size="icon" variant="outline"><Envelope size={20} /></Button>
              <Button variant="primary" size="md">
                  <Users size={18} weight="bold" />
                  With Icon Left
              </Button>
              <Button variant="secondary" size="md">
                  Right Icon
                  <CaretRight size={18} weight="bold" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Complex & Full Width</label>
            <div className="space-y-4">
              <Button className="w-full">Full Width Button</Button>
              <div className="flex w-full">
                  <Button className="rounded-r-none flex-1">Left Group</Button>
                  <Button variant="outline" className="rounded-none border-x-0 flex-1">Middle</Button>
                  <Button variant="outline" className="rounded-l-none flex-1">Right Group</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-10">
          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Input Fields</label>
            <div className="space-y-4">
              <Input label="Standard Input (ฟอร์มปกติ)" placeholder="Enter text..." />
              <Input 
                label="Search Input (ฟอร์มค้นหา)" 
                placeholder="Search users..." 
                icon={<MagnifyingGlass />}
              />
              <Input 
                label="Error State (แจ้งเตือนข้อผิดพลาด)" 
                defaultValue="wrong@email" 
                error="Invalid email address (รูปแบบอีเมลไม่ถูกต้อง)" 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 block">Advanced Controls</label>
            <div className="bg-surface p-6 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)] theme-transition space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automatic Updates</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                  <span className="text-sm font-medium">Desktop Notifications</span>
                  <div className="w-10 h-5 bg-bordercolor rounded-full relative">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-muted rounded-full"></div>
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-xs text-muted mb-2 block">Volume Level</label>
                  <div className="w-full h-1.5 bg-bordercolor rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: '65%' }}></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
