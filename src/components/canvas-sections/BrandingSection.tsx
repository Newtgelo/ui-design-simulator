import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';
import { Palette } from '@phosphor-icons/react';

interface LogoProps {
  type?: 'primary' | 'secondary' | 'white' | 'dark' | 'glass';
  size?: number;
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ type = 'primary', size = 40, className, showText = true }) => {
  const { primaryColor, secondaryColor, fontFamily } = useTheme();
  
  const colors = {
    primary: primaryColor,
    secondary: secondaryColor,
    white: '#FFFFFF',
    dark: '#1A1A1A',
    glass: 'rgba(255, 255, 255, 0.2)'
  };

  const currentColor = colors[type];
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Palette 
        weight="fill" 
        size={size} 
        style={{ color: currentColor }}
        className="theme-transition shrink-0" 
      />
      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{
            fontSize: size * 0.5,
            fontFamily: 'var(--font-theme)',
            color:
              type === 'white'
                ? 'white'
                : type === 'dark'
                ? '#1A1A1A'
                : '#111111', // pin สีดำตายตัว — กล่อง On Light ใช้ bg-white เสมอ
          }}
        >
          SysCraft
        </span>
      )}
    </div>
  );
};

export const BrandingSection: React.FC = () => {
  const { primaryColor, secondaryColor, bgColor, borderRadius } = useTheme();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Primary Variations */}
        <Card className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest border-b border-bordercolor pb-3">Main Variations</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">Primary Brand Logo (On Light)</p>
              <div className="p-6 bg-white border border-bordercolor rounded-xl flex items-center justify-center">
                <Logo type="primary" size={48} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">Secondary Brand Logo (On Light)</p>
              <div className="p-6 bg-white border border-bordercolor rounded-xl flex items-center justify-center">
                <Logo type="secondary" size={48} />
              </div>
            </div>
          </div>
        </Card>

        {/* Contextual Variations */}
        <Card className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest border-b border-bordercolor pb-3">Contextual Variations</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">On Brand Background (Primary)</p>
              <div className="p-6 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <Logo type="white" size={48} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">On Dark Background</p>
              <div className="p-6 bg-slate-900 rounded-xl flex items-center justify-center">
                <Logo type="white" size={48} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Brand Marks & Symbols */}
      <Card className="p-5 space-y-4">
        <h3 className="text-sm font-bold text-muted uppercase tracking-widest border-b border-bordercolor pb-3">Brand Marks & Symbols</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-surface border border-bordercolor rounded-xl flex items-center justify-center shadow-sm">
              <Logo type="primary" size={32} showText={false} />
            </div>
            <span className="text-[10px] font-bold text-muted uppercase">Primary Mark</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shadow-sm">
              <Logo type="primary" size={32} showText={false} />
            </div>
            <span className="text-[10px] font-bold text-muted uppercase">On Alpha 10</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-primary border border-primary/20 rounded-xl flex items-center justify-center shadow-xl">
              <Logo type="white" size={32} showText={false} />
            </div>
            <span className="text-[10px] font-bold text-muted uppercase">Inverted Mark</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-surface border border-bordercolor rounded-full flex items-center justify-center shadow-sm">
              <Logo type="primary" size={28} showText={false} />
            </div>
            <span className="text-[10px] font-bold text-muted uppercase">Circular Mark</span>
          </div>
        </div>
      </Card>

      {/* Tagline & Slogan */}
      <Card className="p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="relative z-10 space-y-4 text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/20">Brand Tagline</Badge>
          <h2 
            className="text-3xl md:text-4xl font-black italic tracking-tighter leading-tight"
            style={{ fontFamily: 'var(--font-theme)' }}
          >
            Crafting Digital <span className="text-primary">Excellence</span> through Design.
          </h2>
          <p className="text-muted">Where sophisticated aesthetics meet powerful functionality.</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-bg flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-primary/20"></div>
                </div>
              ))}
            </div>
            <span className="text-sm font-medium">Trusted by teams everywhere.</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
