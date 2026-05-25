import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CaretRight, MagnifyingGlass, DotsThreeOutlineVertical } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export const DataSection: React.FC = () => {
  return (
    <section className="space-y-12">
      <h3 className="text-xl font-bold theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-warning rounded-full"></span> Data & Information (การแสดงผลข้อมูล)
      </h3>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calendar Card */}
        <Card className="xl:col-span-1 p-0 overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-bordercolor flex justify-between items-center bg-surface/50 theme-transition">
            <div>
              <h4 className="font-bold">May 2024</h4>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">Event Calendar</p>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="w-8 h-8"><CaretRight className="rotate-180" /></Button>
              <Button variant="outline" size="icon" className="w-8 h-8"><CaretRight /></Button>
            </div>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-[10px] font-bold text-muted text-center py-2 uppercase tracking-tighter">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 15;
                const hasEvent = [4, 12, 15, 22, 28].includes(day);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all cursor-pointer relative group",
                      isToday ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-bg border border-transparent hover:border-bordercolor"
                    )}
                  >
                    <span className={cn("font-medium", isToday ? "" : "text-tx")}>{day}</span>
                    {hasEvent && !isToday && (
                      <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                    )}
                    {isToday && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-warning border-2 border-primary"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-4 bg-bg/50 border-t border-bordercolor theme-transition">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Today's Schedule</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                 <div>
                   <p className="text-xs font-bold">Design System Sync</p>
                   <p className="text-[10px] text-muted">10:00 AM - 11:30 AM</p>
                 </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rich Data Table */}
        <Card className="xl:col-span-2 p-0 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-bordercolor flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface/30 theme-transition">
            <div>
              <h4 className="font-bold">Team Performance</h4>
              <p className="text-xs text-muted mt-0.5">Overview of active contributors this quarter</p>
            </div>
            <div className="flex gap-2">
               <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search team..." 
                    className="pl-9 pr-4 py-1.5 bg-bg border border-bordercolor rounded-lg text-xs w-48 focus:outline-none focus:ring-1 focus:ring-primary theme-transition" 
                  />
               </div>
               <Button variant="outline" className="h-8 text-[10px] px-3 font-bold uppercase tracking-wider">Export CSV</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg/50 border-b border-bordercolor theme-transition">
                  <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Member</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Progress</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bordercolor theme-transition">
                {[
                  { name: 'Alex Rivera', role: 'UI Lead', progress: 85, status: 'Active', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Sarah Chen', role: 'Frontend', progress: 42, status: 'In Review', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Marcus Ho', role: 'UX Designer', progress: 100, status: 'Completed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
                  { name: 'Elena Krul', role: 'DevOps', progress: 15, status: 'On Hold', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={row.avatar} className="w-8 h-8 rounded-full object-cover border border-bordercolor" alt="" />
                        <span className="font-bold text-sm">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted">{row.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32 space-y-1.5">
                         <div className="flex justify-between text-[9px] font-bold text-muted uppercase">
                           <span>{row.progress}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden border border-bordercolor theme-transition">
                            <div 
                              className="h-full bg-primary transition-all duration-1000" 
                              style={{ width: `${row.progress}%` }}
                            ></div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        row.status === 'Active' ? 'success' : 
                        row.status === 'Completed' ? 'primary' : 
                        row.status === 'In Review' ? 'warning' : 'outline'
                      }>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-muted hover:text-primary transition-colors p-1 rounded-md hover:bg-primary/10">
                         <DotsThreeOutlineVertical weight="bold" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-bordercolor flex items-center justify-between bg-surface/10 theme-transition">
             <span className="text-xs text-muted">Showing 4 of 24 members</span>
             <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-8 px-2"><CaretRight className="rotate-180" /></Button>
                <Button variant="outline" size="sm" className="h-8 px-2 font-bold">1</Button>
                <Button variant="outline" size="sm" className="h-8 px-2 font-bold">2</Button>
                <Button variant="outline" size="sm" className="h-8 px-2"><CaretRight /></Button>
             </div>
          </div>
        </Card>

        {/* Activity & Stats Column */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h4 className="font-bold">Monthly Usage</h4>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">Performance Metrics</p>
                 </div>
                 <Badge variant="primary">+12%</Badge>
              </div>
              <div className="h-48 flex items-end gap-2 px-2">
                 {[40, 65, 45, 90, 55, 75, 40, 85, 60, 95, 30, 50].map((h, i) => (
                   <div 
                     key={i} 
                     className="flex-1 group relative cursor-pointer"
                     style={{ height: `${h}%` }}
                   >
                      <div className="absolute inset-0 bg-primary rounded-t-sm opacity-20 group-hover:opacity-100 transition-all theme-transition group-hover:scale-x-110"></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-tx text-surface text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-10 shadow-xl border border-white/10 translate-y-2 group-hover:translate-y-0">
                         <p className="font-bold">{h}k requests</p>
                         <p className="text-[8px] opacity-60">May {i + 1}, 2024</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted font-bold uppercase tracking-tighter">
                 <span>Jan</span>
                 <span>Jun</span>
                 <span>Dec</span>
              </div>
           </Card>

           <Card className="p-6 flex flex-col items-center justify-center">
              <div className="w-full mb-6">
                 <h4 className="font-bold">System Health</h4>
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">Real-time Status</p>
              </div>
              
              <div className="relative flex items-center justify-center">
                {/* Custom CSS Pie Chart */}
                <div 
                  className="w-36 h-36 rounded-full shadow-inner relative group transition-transform duration-500 hover:rotate-12"
                  style={{ 
                    background: `conic-gradient(var(--color-primary) 0% 65%, var(--color-secondary) 65% 85%, #e2e8f0 85% 100%)` 
                  }}
                >
                  <div className="absolute inset-6 bg-surface rounded-full flex flex-col items-center justify-center border border-bordercolor theme-transition shadow-sm z-10">
                     <span className="text-2xl font-bold">98%</span>
                     <span className="text-[8px] text-muted font-bold uppercase tracking-widest">Uptime</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                  <div>
                    <p className="text-[10px] font-bold leading-none">Healthy</p>
                    <p className="text-[8px] text-muted mt-0.5">65% Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm"></div>
                  <div>
                    <p className="text-[10px] font-bold leading-none">Standby</p>
                    <p className="text-[8px] text-muted mt-0.5">20% Ready</p>
                  </div>
                </div>
              </div>
           </Card>

           <Card className="bg-tx text-surface flex flex-col justify-center items-center text-center p-8 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="ph-fill ph-crown text-9xl -mr-8 -mt-8 rotate-12"></i>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-3xl shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                 <i className="ph-fill ph-crown"></i>
              </div>
              <div className="space-y-1 relative z-10">
                 <h4 className="text-xl font-bold">Premium Plan</h4>
                 <p className="text-xs text-surface/60 leading-relaxed">Unlock advanced data analytics and unlimited team members.</p>
              </div>
              <Button className="w-full bg-surface text-tx border-none hover:bg-surface/90 mt-2 relative z-10">Upgrade Now</Button>
           </Card>
        </div>
      </div>
    </section>
  );
};

