"use client";

import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Alert } from './ui/Alert';
import { Badge } from './ui/Badge';
import { Tabs } from './ui/Tabs';
import { Users, RocketLaunch, MagnifyingGlass, Spinner, DotsThreeOutlineVertical, Copy, Check, ChartLineUp, Envelope, House, CaretRight, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useTheme } from '@/context/ThemeContext';
import { hexToRgb, generateScale, rgbToHex, cn } from '@/lib/utils';

import { DashboardSection } from './canvas-sections/DashboardSection';
import { TypographySection } from './canvas-sections/TypographySection';
import { MockupsSection } from './canvas-sections/MockupsSection';
import { FormsSection } from './canvas-sections/FormsSection';
import { NavigationSection } from './canvas-sections/NavigationSection';
import { FeedbackSection } from './canvas-sections/FeedbackSection';
import { DataSection } from './canvas-sections/DataSection';
import { AccessibilitySection } from './canvas-sections/AccessibilitySection';
import { DesignTokenSection } from './canvas-sections/DesignTokenSection';
import { DesignSystemExportSection } from './canvas-sections/DesignSystemExportSection';
import { BrandingSection } from './canvas-sections/BrandingSection';
import { InteractionSection } from './canvas-sections/InteractionSection';
import { GridLayoutSection } from './canvas-sections/GridLayoutSection';
import { PageTemplatesSection } from './canvas-sections/PageTemplatesSection';
import { GridFour, DeviceMobile } from '@phosphor-icons/react';

export const Canvas: React.FC = () => {
  const { primaryColor, fontFamily, fontSizeBase, fontScale, gridColumns, gridGutter, gridMargin } = useTheme();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'canvas' | 'tokens' | 'system' | 'templates'>('canvas');
  const [showGrid, setShowGrid] = React.useState(false);

  const pRgb = hexToRgb(primaryColor);
  const pScale = generateScale(pRgb);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Calculate typography values for labels
  const getFontSize = (level: number) => Math.round(fontSizeBase * Math.pow(fontScale, level));
  const h1Px = getFontSize(4);
  const h2Px = getFontSize(3);
  const h3Px = getFontSize(2);
  const h4Px = getFontSize(1.2);
  const smPx = Math.round(fontSizeBase / 1.1);
  const xsPx = Math.round(fontSizeBase / 1.3);

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-bg theme-transition relative">
      {/* Grid Overlay Rendering */}
      {showGrid && viewMode === 'canvas' && (
        <div className="absolute inset-0 pointer-events-none z-50 flex h-full min-h-screen" style={{ padding: `0 ${gridMargin}px` }}>
          <div className="w-full h-full flex" style={{ gap: `${gridGutter}px` }}>
            {Array.from({ length: gridColumns }).map((_, i) => (
              <div key={i} className="h-full flex-1 bg-primary/[0.03] border-x border-primary/[0.07]" />
            ))}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-bordercolor px-8 py-4 flex justify-between items-center theme-transition">
        <div />
        <div className="flex bg-surface border border-bordercolor rounded-[var(--radius-theme)] p-1 theme-transition shadow-sm">
          <button
            onClick={() => setViewMode('canvas')}
            className={`text-xs px-4 py-1.5 rounded-[calc(var(--radius-theme)*0.8)] font-medium transition-all duration-200 ${
              viewMode === 'canvas' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'
            }`}
          >
            Live Canvas
          </button>
          <button
            onClick={() => setViewMode('tokens')}
            className={`text-xs px-4 py-1.5 rounded-[calc(var(--radius-theme)*0.8)] font-medium transition-all duration-200 ${
              viewMode === 'tokens' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'
            }`}
          >
            Design Tokens
          </button>
          <button
            onClick={() => setViewMode('templates')}
            className={`text-xs px-4 py-1.5 rounded-[calc(var(--radius-theme)*0.8)] font-medium transition-all duration-200 ${
              viewMode === 'templates' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'
            }`}
          >
            Page Templates
          </button>
          <button
            onClick={() => setViewMode('system')}
            className={`text-xs px-4 py-1.5 rounded-[calc(var(--radius-theme)*0.8)] font-medium transition-all duration-200 ${
              viewMode === 'system' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'
            }`}
          >
            Design System Export
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
              showGrid 
                ? "bg-primary text-white shadow-lg shadow-primary/25" 
                : "bg-surface border border-bordercolor text-muted hover:text-primary"
            )}
          >
            <GridFour weight={showGrid ? "fill" : "regular"} size={16} />
            {showGrid ? "Grid On" : "Show Grid"}
          </button>
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
        {viewMode === 'system' ? (
          <DesignSystemExportSection />
        ) : viewMode === 'tokens' ? (
          <DesignTokenSection />
        ) : viewMode === 'templates' ? (
          <PageTemplatesSection />
        ) : (
          <>
            {/* Color Palette Scale */}
            <section>
              <div className="mb-6">
                <h3 className="text-xl font-bold">Color Palette Scale</h3>
                <p className="text-sm text-muted mt-1 theme-transition">Auto-generated 11-step color scales based on your color selections.</p>
              </div>
              <div className="flex h-12 w-full rounded-[var(--radius-theme)] overflow-hidden border border-bordercolor shadow-sm cursor-pointer relative group">
                {Object.entries(pScale).map(([step, rgb]) => {
                  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                  // Calculate luminance to decide text color (white or black)
                  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
                  const textColor = luminance > 0.5 ? 'text-black/60' : 'text-white/80';

                  return (
                    <div
                      key={step}
                      className="flex-1 theme-transition relative flex items-end justify-center pb-1.5 hover:flex-[1.5] transition-all duration-300"
                      style={{ backgroundColor: hex }}
                      title={`Click to copy: ${hex}`}
                      onClick={() => copyToClipboard(hex)}
                    >
                      <span className={`text-[10px] sm:text-[12px] font-mono font-bold tracking-tighter pointer-events-none uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${textColor}`}>
                        {hex}
                      </span>
                      {copiedColor === hex && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white animate-in fade-in zoom-in duration-200">
                          <Check weight="bold" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Copied Toast */}
                {copiedColor && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-tx text-surface px-3 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
                    <Check className="text-success" weight="bold" /> Copied: {copiedColor.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-[10px] text-muted mt-1 px-1">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
                  <span key={step} className={step === 500 ? "font-bold text-primary" : ""}>
                    {step === 500 ? "500" : step}
                  </span>
                ))}
              </div>
            </section>

            {/* Accessibility Checker */}
            <AccessibilitySection />

            {/* Component Showcase Tabs */}
            <section className="mt-8 pt-8 border-t border-bordercolor theme-transition">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Component Showcase</h2>
                  <p className="text-sm text-muted mt-1 theme-transition">Explore and test individual components with your design language.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-bordercolor pb-4 mb-8 theme-transition">
                {[
                  { id: 'all', label: 'All (ภาพรวม)' },
                  { id: 'branding', label: 'Branding (แบรนด์)' },
                  { id: 'layout', label: 'Layout & Grid (เลย์เอาต์)' },
                  { id: 'interactions', label: 'Interactions (การตอบสนอง)' },
                  { id: 'dashboard', label: 'Dashboard (แดชบอร์ด)' },
                  { id: 'mockups', label: 'Mockups (ม็อคอัพ)' },
                  { id: 'typography', label: 'Typography (ตัวอักษร)' },
                  { id: 'forms', label: 'Forms (ฟอร์ม & ปุ่ม)' },
                  { id: 'navigation', label: 'Navigation (การนำทาง)' },
                  { id: 'data', label: 'Data Display (ข้อมูล)' },
                  { id: 'feedback', label: 'Feedback (สถานะ)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id 
                      ? 'bg-primary text-[var(--color-primary-foreground)] shadow-[var(--shadow-theme)]' 
                      : 'bg-transparent text-muted hover:bg-bordercolor hover:text-tx'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-16">
                
                {/* Sections */}
                {(activeTab === 'all' || activeTab === 'branding') && <BrandingSection />}
                {(activeTab === 'all' || activeTab === 'layout') && <GridLayoutSection />}
                {(activeTab === 'all' || activeTab === 'interactions') && <InteractionSection />}
                {(activeTab === 'all' || activeTab === 'dashboard') && <DashboardSection />}
                {(activeTab === 'all' || activeTab === 'typography') && <TypographySection />}
                {(activeTab === 'all' || activeTab === 'mockups') && <MockupsSection />}
                {(activeTab === 'all' || activeTab === 'forms') && <FormsSection />}
                {(activeTab === 'all' || activeTab === 'navigation') && <NavigationSection />}
                {(activeTab === 'all' || activeTab === 'feedback') && <FeedbackSection />}
                {(activeTab === 'all' || activeTab === 'data') && <DataSection />}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};
