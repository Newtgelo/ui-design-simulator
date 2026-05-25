import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Columns, ArrowRight, Layout as LayoutIcon, ArrowsHorizontal, ArrowsInSimple } from '@phosphor-icons/react';

export const GridLayoutSection: React.FC = () => {
  const { gridColumns, setGridColumns, gridGutter, setGridGutter, gridMargin, setGridMargin, primaryColor, showGrid, setShowGrid } = useTheme();

  const handleAdjust = (type: 'cols' | 'gutter' | 'margin', delta: number) => {
    if (type === 'cols') setGridColumns(Math.max(1, Math.min(24, gridColumns + delta)));
    if (type === 'gutter') setGridGutter(Math.max(0, Math.min(64, gridGutter + delta)));
    if (type === 'margin') setGridMargin(Math.max(0, Math.min(160, gridMargin + delta)));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Layout & Grid</h2>
        <p className="text-muted mt-2">Standardized grid system and spatial definitions for consistent layout architecture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Columns weight="fill" size={20} />
              </div>
              <span className="font-bold">Columns</span>
            </div>
            <span className="font-mono font-bold text-primary">{gridColumns}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('cols', -1)}>-</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('cols', 1)}>+</Button>
          </div>
          <p className="text-[10px] text-muted leading-tight">Defines the vertical division of the layout workspace.</p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ArrowsHorizontal weight="fill" size={20} />
              </div>
              <span className="font-bold">Gutter</span>
            </div>
            <span className="font-mono font-bold text-primary">{gridGutter}px</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('gutter', -4)}>-</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('gutter', 4)}>+</Button>
          </div>
          <p className="text-[10px] text-muted leading-tight">The spacing between individual columns.</p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ArrowsInSimple weight="fill" size={20} />
              </div>
              <span className="font-bold">Margin</span>
            </div>
            <span className="font-mono font-bold text-primary">{gridMargin}px</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('margin', -8)}>-</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAdjust('margin', 8)}>+</Button>
          </div>
          <p className="text-[10px] text-muted leading-tight">Exterior padding of the main content container.</p>
        </Card>
      </div>

      <Card className="p-8 space-y-8 overflow-hidden relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <LayoutIcon weight="bold" /> Grid Visualization
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
            <div className="flex items-center gap-2">
              <span>{gridColumns} Cols</span>
              <span>/</span>
              <span>{gridGutter}px Gutter</span>
              <span>/</span>
              <span>{gridMargin}px Margin</span>
            </div>
            <Button
              onClick={() => setShowGrid(!showGrid)}
              variant={showGrid ? "primary" : "outline"}
              size="sm"
              className="h-8 text-[10px] px-3 font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Columns weight={showGrid ? "fill" : "regular"} size={14} />
              {showGrid ? "Hide Grid Guide" : "Show Grid Guide"}
            </Button>
          </div>
        </div>

        <div
          className="relative w-full h-[300px] border border-bordercolor rounded-2xl bg-bg overflow-hidden flex"
          style={{ padding: `0 ${gridMargin}px` }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="text-[120px] font-black uppercase">Grid Spec</div>
          </div>

          <div className="w-full h-full flex" style={{ gap: `${gridGutter}px` }}>
            {Array.from({ length: gridColumns }).map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 bg-primary/5 border-x border-primary/10 flex flex-col items-center justify-between py-4"
              >
                <span className="text-[10px] font-mono text-primary/40 font-bold">{i + 1}</span>
                <div className="w-full h-px bg-primary/10"></div>
                <span className="text-[10px] font-mono text-primary/40 font-bold">Col</span>
              </div>
            ))}
          </div>

          {/* Margin Indicators */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-primary/10 border-r border-primary/20 flex items-center justify-center"
            style={{ width: `${gridMargin}px` }}
          >
            <div className="rotate-90 text-[10px] font-bold text-primary/60 whitespace-nowrap">MARGIN</div>
          </div>
          <div
            className="absolute top-0 bottom-0 right-0 bg-primary/10 border-l border-primary/20 flex items-center justify-center"
            style={{ width: `${gridMargin}px` }}
          >
            <div className="rotate-90 text-[10px] font-bold text-primary/60 whitespace-nowrap">MARGIN</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-6">
          <h4 className="font-bold border-b border-bordercolor pb-4">Spatial Reasoning (เหตุผลเชิงพื้นที่)</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold">8px</div>
              <div>
                <p className="text-sm font-bold">Soft Grid Unit (หน่วยกริดพื้นฐาน)</p>
                <p className="text-xs text-muted">All spacing should be increments of 8px (4px for micro-spacing). (การเว้นระยะทั้งหมดควรเพิ่มทีละ 8px หรือ 4px สำหรับระยะขนาดเล็ก)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl border-2 border-primary flex items-center justify-center text-primary font-bold">80%</div>
              <div>
                <p className="text-sm font-bold">Responsive Logic (หลักการตอบสนอง)</p>
                <p className="text-xs text-muted">Columns scale fluidly while gutters and margins remain fixed. (คอลัมน์จะขยายตามพื้นที่ ในขณะที่ระยะห่างและขอบจะคงที่)</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-primary text-white space-y-6">
          <h4 className="font-bold border-b border-white/20 pb-4">Implementation Note (หมายเหตุการนำไปใช้งาน)</h4>
          <div className="space-y-4 text-white/80 text-sm">
            <p>This grid system follows a <strong>fluid-width container</strong> pattern with fixed gutters. (ระบบกริดนี้ใช้รูปแบบคอนเทนเนอร์แบบยืดหยุ่นพร้อมระยะห่างที่คงที่)</p>
            <div className="bg-white/10 p-4 rounded-xl font-mono text-xs">
              .grid-container {'{'}<br />
              &nbsp;&nbsp;display: grid;<br />
              &nbsp;&nbsp;grid-template-columns: repeat({gridColumns}, 1fr);<br />
              &nbsp;&nbsp;gap: {gridGutter}px;<br />
              &nbsp;&nbsp;padding: 0 {gridMargin}px;<br />
              {'}'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
