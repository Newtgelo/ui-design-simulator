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
import { UserFlowsSection } from './canvas-sections/UserFlowsSection';
import { GridFour, DeviceMobile } from '@phosphor-icons/react';
import { SectionHeading } from './ui/SectionHeading';
import { SectionNavOverlay, NavSection } from './SectionNavOverlay';

// Section definitions per view mode
const SECTION_MAP: Record<string, NavSection[]> = {
  overview: [
    { id: 'sec-color', label: 'Color Palette' },
    { id: 'sec-accessibility', label: 'Accessibility', level: 1 },
    { id: 'sec-mockups', label: 'Mockup Variety' },
    { id: 'sec-dashboard', label: 'Dashboard Widgets', level: 1 },
    { id: 'sec-branding', label: 'Branding & Logo' },
    { id: 'sec-typography', label: 'Typography Scale' },
  ],
  components: [
    { id: 'sec-grid', label: 'Grid Layout' },
    { id: 'sec-interaction', label: 'Interactions' },
    { id: 'sec-forms', label: 'Forms' },
    { id: 'sec-navigation', label: 'Navigation' },
    { id: 'sec-feedback', label: 'Feedback' },
    { id: 'sec-data', label: 'Data Display' },
  ],
  templates: [
    { id: 'sec-templates', label: 'Page Templates' },
  ],
  flows: [
    { id: 'sec-flows', label: 'User Flows' },
  ],
  tokens_export: [
    { id: 'sec-tokens', label: 'Design Tokens' },
    { id: 'sec-export', label: 'Export', level: 1 },
  ],
};

export const Canvas: React.FC = () => {
  const { primaryColor, fontFamily, fontSizeBase, fontScale, gridColumns, gridGutter, gridMargin, showSnackbar, showGrid, setShowGrid } = useTheme();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'overview' | 'components' | 'templates' | 'flows' | 'tokens_export'>('overview');
  const scrollContainerRef = React.useRef<HTMLElement | null>(null);

  const pRgb = hexToRgb(primaryColor);
  const pScale = generateScale(pRgb);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    showSnackbar(`copy ค่าสี ${hex.toUpperCase()} แล้ว`);
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
    <main ref={scrollContainerRef as React.RefObject<HTMLElement>} className="flex-1 h-screen overflow-y-auto bg-bg theme-transition relative">
      {/* Grid Overlay Rendering */}
      {showGrid && (viewMode === 'overview' || viewMode === 'components') && (
        <div className="absolute inset-0 pointer-events-none z-50 flex h-full min-h-screen" style={{ padding: `0 ${gridMargin}px` }}>
          <div className="w-full h-full flex" style={{ gap: `${gridGutter}px` }}>
            {Array.from({ length: gridColumns }).map((_, i) => (
              <div key={i} className="h-full flex-1 bg-primary/[0.03] border-x border-primary/[0.07]" />
            ))}
          </div>
        </div>
      )}

      <header className="sticky top-16 md:top-0 z-30 bg-bg/80 backdrop-blur-md border-b border-bordercolor px-4 md:px-8 h-16 flex items-center justify-between gap-4 theme-transition">
        <div className="flex-1 overflow-x-auto scrollbar-none py-1">
          <div className="flex bg-surface border border-bordercolor rounded-[var(--radius-theme)] p-1 theme-transition shadow-sm w-max overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'components', label: 'UI Components' },
              { id: 'templates', label: 'Page Templates' },
              { id: 'flows', label: 'User Flows' },
              { id: 'tokens_export', label: 'Tokens & Export' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as any)}
                className={`text-xs px-4 py-1.5 rounded-[calc(var(--radius-theme)*0.8)] font-medium transition-all duration-200 shrink-0 ${
                  viewMode === tab.id ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </header>

      {/* Notion-style floating section nav */}
      <SectionNavOverlay
        sections={SECTION_MAP[viewMode] ?? []}
        scrollContainerRef={scrollContainerRef}
      />

      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-12 pb-24">
        {viewMode === 'templates' ? (
          <div id="sec-templates"><PageTemplatesSection /></div>
        ) : viewMode === 'flows' ? (
          <div id="sec-flows"><UserFlowsSection /></div>
        ) : viewMode === 'tokens_export' ? (
          <div className="space-y-12">
            <div id="sec-tokens"><DesignTokenSection /></div>
            <div id="sec-export" className="pt-8 border-t border-bordercolor theme-transition">
              <DesignSystemExportSection />
            </div>
          </div>
        ) : viewMode === 'components' ? (
          <div className="space-y-16 animate-in fade-in duration-300">
            <div id="sec-grid"><GridLayoutSection /></div>
            <div id="sec-interaction" className="pt-8 border-t border-bordercolor theme-transition">
              <InteractionSection />
            </div>
            <div id="sec-forms" className="pt-8 border-t border-bordercolor theme-transition">
              <FormsSection />
            </div>
            <div id="sec-navigation" className="pt-8 border-t border-bordercolor theme-transition">
              <NavigationSection />
            </div>
            <div id="sec-feedback" className="pt-8 border-t border-bordercolor theme-transition">
              <FeedbackSection />
            </div>
            <div id="sec-data" className="pt-8 border-t border-bordercolor theme-transition">
              <DataSection />
            </div>
          </div>
        ) : (
          /* viewMode === 'overview' */
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* 1. Color Palette Scale */}
            <section id="sec-color" className="space-y-6">
              <SectionHeading level="h2" title="Color Palette Scale" description="Auto-generated 11-step color scales based on your color selections." />
              <div className="flex h-12 w-full rounded-[var(--radius-theme)] overflow-hidden border border-bordercolor shadow-sm cursor-pointer relative group">
                {Object.entries(pScale).map(([step, rgb]) => {
                  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
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
              </div>
              <div className="flex justify-between text-[10px] text-muted mt-1 px-1">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
                  <span key={step} className={step === 500 ? "font-bold text-primary" : ""}>
                    {step === 500 ? "500" : step}
                  </span>
                ))}
              </div>
              
              {/* Accessibility Checker (Contrast checker - keep directly under color scale) */}
              <div id="sec-accessibility"><AccessibilitySection /></div>
            </section>

            {/* 2. Mockup Variety */}
            <section id="sec-mockups" className="pt-8 border-t border-bordercolor theme-transition space-y-8">
              <SectionHeading level="h2" title="Mockup Variety" description="A collection of responsive page layouts and live dashboard modules to preview your design system." />
              <MockupsSection />
              <div id="sec-dashboard" className="pt-8 theme-transition space-y-6">
                <SectionHeading level="h4" title="Dashboard Widgets" />
                <DashboardSection />
              </div>
            </section>

            {/* 3. Branding & Logo */}
            <section id="sec-branding" className="pt-8 border-t border-bordercolor theme-transition space-y-6">
              <SectionHeading level="h2" title="Branding & Logo" description="Visual representation of your brand across different contexts and backgrounds." />
              <BrandingSection />
            </section>

            {/* 4. Typography Scale (ระบบตัวอักษร) */}
            <section id="sec-typography" className="pt-8 border-t border-bordercolor theme-transition space-y-6">
              <SectionHeading level="h2" title="Typography Scale (ระบบตัวอักษร)" description="Scale of font sizes, line heights, and weights for English and Thai typography." />
              <TypographySection />
            </section>
          </div>
        )}
      </div>
    </main>
  );
};
