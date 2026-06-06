import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CodeBlock, Palette, TextT, BoundingBox, DropHalfBottom } from '@phosphor-icons/react';
import { SectionHeading } from '../ui/SectionHeading';

export const DesignTokenSection: React.FC = () => {
  const { 
    primaryColor, 
    secondaryColor, 
    bgColor, 
    fontFamily, 
    fontSizeBase, 
    fontScale,
    borderRadius,
    shadowStyle,
    isDarkMode,
    iconWeight
  } = useTheme();

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      <SectionHeading
        level="h2"
        title="Design Tokens"
        description="Your centralized source of truth for design decisions. These tokens define the visual language of your application."
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colors */}
        <Card className="space-y-6">
          <SectionHeading level="h3" title="Colors" className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Primary</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-mono">{primaryColor.toUpperCase()}</span>
                <div className="w-6 h-6 rounded-md shadow-sm border border-bordercolor" style={{ backgroundColor: primaryColor }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Secondary</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-mono">{secondaryColor.toUpperCase()}</span>
                <div className="w-6 h-6 rounded-md shadow-sm border border-bordercolor" style={{ backgroundColor: secondaryColor }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Background</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-mono">{bgColor.toUpperCase()}</span>
                <div className="w-6 h-6 rounded-md shadow-sm border border-bordercolor" style={{ backgroundColor: bgColor }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mode</span>
              <Badge variant={isDarkMode ? "secondary" : "outline"}>{isDarkMode ? "Dark" : "Light"}</Badge>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card className="space-y-6">
          <SectionHeading level="h3" title="Typography" className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Font Family</span>
              <span className="text-xs text-muted font-mono">{fontFamily.replace('var(--', '').replace(')', '')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Base Size</span>
              <span className="text-xs text-muted font-mono">{fontSizeBase}px</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Scale Ratio</span>
              <span className="text-xs text-muted font-mono">{fontScale}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Icon Weight</span>
              <span className="text-xs text-muted font-mono uppercase">{iconWeight}</span>
            </div>
          </div>
        </Card>

        {/* Shapes & Shadows */}
        <Card className="space-y-6">
          <SectionHeading level="h3" title="Shapes & Structure" className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Border Radius (Base)</span>
              <span className="text-xs text-muted font-mono">{borderRadius}px</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Button Radius</span>
              <span className="text-xs text-muted font-mono">var(--radius-theme)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Card Radius</span>
              <span className="text-xs text-muted font-mono">calc(var(--radius-theme) * 1.5)</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <SectionHeading level="h3" title="Effects" className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Shadow Style</span>
              <span className="text-xs text-muted font-mono uppercase">{shadowStyle}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transition Duration</span>
              <span className="text-xs text-muted font-mono">300ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transition Timing</span>
              <span className="text-xs text-muted font-mono">ease-in-out</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <CodeBlock size={32} weight="duotone" />
        </div>
        <SectionHeading level="h3" title="ต้องการส่งออกโค้ด (Export)?" className="mb-2" />
        <p className="text-sm text-muted max-w-md">
            คุณสามารถเลือกแท็บ <strong>Design System Export</strong> ด้านบน เพื่อคัดลอกหรือดาวน์โหลดไฟล์ JSON สำหรับ Figma, Tokens Studio หรือใช้ในโปรเจกต์ของคุณได้ทันที
        </p>
      </div>
    </div>
  );
};
