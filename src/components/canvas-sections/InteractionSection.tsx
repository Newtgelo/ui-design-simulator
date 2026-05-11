import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';
import { Timer, Wind, CircleNotch, CursorClick, WarningCircle, CheckCircle, Info, XCircle } from '@phosphor-icons/react';

export const InteractionSection: React.FC = () => {
  const { primaryColor, borderRadius } = useTheme();

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <CursorClick className="text-primary" weight="fill" /> Interactions & States
        </h2>
        <p className="text-muted mt-2">Defining how components respond to user actions and provide feedback.</p>
      </div>

      {/* Button States Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-bordercolor pb-4">
            <h3 className="text-xl font-bold">Button State Matrix</h3>
            <Badge variant="outline">Interactive</Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] text-muted uppercase tracking-widest border-b border-bordercolor">
                <th className="pb-4 pr-4 font-bold">Variant</th>
                <th className="pb-4 px-4 font-bold">Default</th>
                <th className="pb-4 px-4 font-bold">Hover</th>
                <th className="pb-4 px-4 font-bold">Active / Pressed</th>
                <th className="pb-4 px-4 font-bold">Loading</th>
                <th className="pb-4 pl-4 font-bold">Disabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bordercolor/50">
              {/* Primary */}
              <tr className="group">
                <td className="py-6 pr-4 align-middle">
                  <span className="text-xs font-bold">Primary</span>
                </td>
                <td className="py-6 px-4"><Button size="sm">Button</Button></td>
                <td className="py-6 px-4"><Button size="sm" className="opacity-90">Button</Button></td>
                <td className="py-6 px-4"><Button size="sm" className="scale-95">Button</Button></td>
                <td className="py-6 px-4"><Button size="sm" isLoading>Button</Button></td>
                <td className="py-6 pl-4"><Button size="sm" disabled>Button</Button></td>
              </tr>
              {/* Secondary */}
              <tr>
                <td className="py-6 pr-4 align-middle">
                  <span className="text-xs font-bold">Secondary</span>
                </td>
                <td className="py-6 px-4"><Button variant="secondary" size="sm">Button</Button></td>
                <td className="py-6 px-4"><Button variant="secondary" size="sm" className="opacity-90">Button</Button></td>
                <td className="py-6 px-4"><Button variant="secondary" size="sm" className="scale-95">Button</Button></td>
                <td className="py-6 px-4"><Button variant="secondary" size="sm" isLoading>Button</Button></td>
                <td className="py-6 pl-4"><Button variant="secondary" size="sm" disabled>Button</Button></td>
              </tr>
              {/* Outline */}
              <tr>
                <td className="py-6 pr-4 align-middle">
                  <span className="text-xs font-bold">Outline</span>
                </td>
                <td className="py-6 px-4"><Button variant="outline" size="sm">Button</Button></td>
                <td className="py-6 px-4"><Button variant="outline" size="sm" className="bg-primary/5">Button</Button></td>
                <td className="py-6 px-4"><Button variant="outline" size="sm" className="scale-95 bg-primary/10">Button</Button></td>
                <td className="py-6 px-4"><Button variant="outline" size="sm" isLoading>Button</Button></td>
                <td className="py-6 pl-4"><Button variant="outline" size="sm" disabled>Button</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input States */}
        <Card className="p-8 space-y-6">
          <h3 className="text-lg font-bold border-b border-bordercolor pb-4">Input & Form States</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Default</span>
                  <Input placeholder="Placeholder text" />
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Hover</span>
                  <Input placeholder="Hover state" className="border-primary/50" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Focused / Active</span>
                  <Input defaultValue="Focus ring active" className="border-primary ring-2 ring-primary/20" />
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Disabled</span>
                  <Input placeholder="Disabled state" disabled />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Error</span>
                  <Input defaultValue="Invalid data" className="border-danger text-danger ring-2 ring-danger/10" />
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted uppercase">Success</span>
                  <Input defaultValue="Correct data" className="border-success text-success ring-2 ring-success/10" />
               </div>
            </div>
          </div>
        </Card>

        {/* Motion Tokens */}
        <Card className="p-8 space-y-6">
          <h3 className="text-lg font-bold border-b border-bordercolor pb-4 flex items-center justify-between">
            Motion Tokens
            <Timer className="text-muted" size={20} />
          </h3>
          <div className="space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold">Fast Duration</span>
                    <Badge variant="outline">150ms</Badge>
                </div>
                <div className="group h-12 bg-surface border border-bordercolor rounded-xl overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-y-0 left-0 bg-primary w-4 transition-all duration-150 ease-out group-hover:w-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 text-white transition-opacity delay-75">Preview Fast</div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold">Normal Duration</span>
                    <Badge variant="outline">300ms</Badge>
                </div>
                <div className="group h-12 bg-surface border border-bordercolor rounded-xl overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-y-0 left-0 bg-primary w-4 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 text-white transition-opacity delay-150">Preview Normal</div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold">Slow Duration</span>
                    <Badge variant="outline">500ms</Badge>
                </div>
                <div className="group h-12 bg-surface border border-bordercolor rounded-xl overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-y-0 left-0 bg-primary w-4 transition-all duration-500 ease-out group-hover:w-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 text-white transition-opacity delay-300">Preview Slow</div>
                </div>
             </div>
          </div>
        </Card>
      </div>

      {/* Status & Feedback */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b border-bordercolor pb-4">Feedback & Messaging</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3">
              <CheckCircle className="text-success" size={24} weight="fill" />
              <div>
                 <p className="text-xs font-bold text-success">Success</p>
                 <p className="text-[10px] text-success/80">Operation completed.</p>
              </div>
           </div>
           <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-center gap-3">
              <XCircle className="text-danger" size={24} weight="fill" />
              <div>
                 <p className="text-xs font-bold text-danger">Error</p>
                 <p className="text-[10px] text-danger/80">Something went wrong.</p>
              </div>
           </div>
           <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-center gap-3">
              <WarningCircle className="text-warning" size={24} weight="fill" />
              <div>
                 <p className="text-xs font-bold text-warning">Warning</p>
                 <p className="text-[10px] text-warning/80">Needs attention.</p>
              </div>
           </div>
           <div className="p-4 bg-info/10 border border-info/20 rounded-xl flex items-center gap-3">
              <Info className="text-info" size={24} weight="fill" />
              <div>
                 <p className="text-xs font-bold text-info">Information</p>
                 <p className="text-[10px] text-info/80">For your info.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
