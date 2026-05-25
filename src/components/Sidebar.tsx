"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from './ui/Card';
import { Palette, Moon, Sun, DiceThree, PaintBrush, BoundingBox, TextAa, Copy, Check, Sparkle, ArrowCounterClockwise, X, List, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Button } from './ui/Button';
import { COLOR_PALETTES, cn } from '@/lib/utils';

const ARCHETYPES = [
  {
    name: 'Apple Minimal',
    primary: '#0071e3',
    secondary: '#86868b',
    radius: 12,
    shadow: 'soft',
    font: 'var(--font-inter)',
    description: 'Clean & Premium'
  },
  {
    name: 'Linear Pro',
    primary: '#5e6ad2',
    secondary: '#f472b6',
    radius: 8,
    shadow: 'deep',
    font: 'var(--font-inter)',
    description: 'Sleek & Deep'
  },
  {
    name: 'Cyberpunk',
    primary: '#ff0055',
    secondary: '#f0f000',
    radius: 0,
    shadow: 'none',
    font: 'var(--font-mono)',
    description: 'Raw & Futuristic'
  },
  {
    name: 'Soft Nature',
    primary: '#10b981',
    secondary: '#06b6d4',
    radius: 24,
    shadow: 'soft',
    font: 'var(--font-inter)',
    description: 'Gentle & Organic'
  },
  {
    name: 'Classic Corp',
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    radius: 4,
    shadow: 'medium',
    font: 'var(--font-inter)',
    description: 'Solid & Reliable'
  },
  {
    name: 'Playful UI',
    primary: '#f59e0b',
    secondary: '#ec4899',
    radius: 16,
    shadow: 'medium',
    font: 'var(--font-inter)',
    description: 'Vibrant & Fun'
  },
  {
    name: 'Midnight',
    primary: '#334155',
    secondary: '#94a3b8',
    radius: 8,
    shadow: 'deep',
    font: 'var(--font-inter)',
    description: 'Dark & Deep'
  },
  {
    name: 'Bubblegum',
    primary: '#f472b6',
    secondary: '#a855f7',
    radius: 30,
    shadow: 'soft',
    font: 'var(--font-inter)',
    description: 'Sweet & Round'
  },
  {
    name: 'Eco Green',
    primary: '#15803d',
    secondary: '#84cc16',
    radius: 12,
    shadow: 'soft',
    font: 'var(--font-inter)',
    description: 'Fresh & Natural'
  },
  {
    name: 'Industrial',
    primary: '#4b5563',
    secondary: '#f97316',
    radius: 0,
    shadow: 'none',
    font: 'var(--font-mono)',
    description: 'Raw & Solid'
  },
  {
    name: 'Royal',
    primary: '#581c87',
    secondary: '#eab308',
    radius: 8,
    shadow: 'deep',
    font: 'var(--font-inter)',
    description: 'Purple & Gold'
  },
  {
    name: 'Sunset',
    primary: '#ea580c',
    secondary: '#fbbf24',
    radius: 16,
    shadow: 'medium',
    font: 'var(--font-inter)',
    description: 'Warm & Bright'
  },
  {
    name: 'Vivid Berry',
    primary: '#be185d',
    secondary: '#4338ca',
    radius: 12,
    shadow: 'medium',
    font: 'var(--font-inter)',
    description: 'Bold & Deep'
  },
  {
    name: 'Sandy',
    primary: '#92400e',
    secondary: '#0ea5e9',
    radius: 8,
    shadow: 'soft',
    font: 'var(--font-inter)',
    description: 'Earth & Sea'
  },
  {
    name: 'Night Forest',
    primary: '#064e3b',
    secondary: '#10b981',
    radius: 12,
    shadow: 'deep',
    font: 'var(--font-inter)',
    description: 'Dark & Natural'
  },
];

export const Sidebar: React.FC = () => {
  const {
    primaryColor,
    secondaryColor,
    borderRadius,
    shadowStyle,
    fontFamily,
    fontSizeBase,
    setFontSizeBase,
    fontScale,
    setFontScale,
    isDarkMode,
    bgColor,
    iconWeight,
    setPrimaryColor,
    setSecondaryColor,
    setBgColor,
    setPalette,
    setBorderRadius,
    setShadowStyle,
    setFontFamily,
    setIconWeight,
    toggleDarkMode,
    randomizeTheme
  } = useTheme();

  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [isPalettesExpanded, setIsPalettesExpanded] = React.useState(false);
  const [isPresetsExpanded, setIsPresetsExpanded] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const [expandedGroups, setExpandedGroups] = React.useState({
    presets: true,
    colors: true,
    typography: false,
    shapes: false,
  });

  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const applyArchetype = (type: typeof ARCHETYPES[0]) => {
    setPrimaryColor(type.primary);
    setSecondaryColor(type.secondary);
    setBorderRadius(type.radius);
    setShadowStyle(type.shadow);
    setFontFamily(type.font);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between w-full px-6 py-4 bg-surface border-b border-bordercolor h-16 shrink-0 z-30 theme-transition sticky top-0">
        <div className="flex items-center gap-2">
          <Palette weight="fill" className="text-primary text-2xl theme-transition" />
          <span className="font-bold text-lg tracking-tight">SysCraft</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-[var(--radius-theme)] hover:bg-bg transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-[var(--radius-theme)] bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            title="Open Design Tokens"
          >
            <List size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Settings Panel (Aside / Drawer) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-80 max-w-[calc(100vw-3rem)] bg-surface border-r border-bordercolor flex flex-col z-50 shadow-2xl theme-transition transition-transform duration-300 transform md:translate-x-0 md:static md:h-screen md:w-80 md:border-b-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="px-5 border-b border-bordercolor flex items-center justify-between theme-transition shrink-0 h-16">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Palette weight="fill" className="text-primary text-2xl theme-transition" />
            SysCraft
          </h1>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-[var(--radius-theme)] hover:bg-bg theme-transition"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-[var(--radius-theme)] hover:bg-bg theme-transition md:hidden"
              title="Close Settings"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Controls container */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">

          {/* Accordion 1: Presets & Quick Theme */}
          <div className="border border-bordercolor/60 rounded-xl p-4 bg-surface/30 hover:border-primary/20 transition-all duration-300 space-y-4">
            <button
              onClick={() => toggleGroup('presets')}
              className="w-full flex items-center justify-between text-left select-none group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Sparkle weight="fill" className="text-primary group-hover:scale-110 transition-transform duration-300" size={16} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-tx">Presets & Quick Theme</span>
              </div>
              <span className="text-muted group-hover:text-primary transition-colors">
                {expandedGroups.presets ? <CaretUp weight="bold" size={14} /> : <CaretDown weight="bold" size={14} />}
              </span>
            </button>

            {expandedGroups.presets && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-muted/80 uppercase tracking-widest">สไตล์สำเร็จรูป</span>
                    <button
                      onClick={() => setIsPresetsExpanded(!isPresetsExpanded)}
                      className="text-[9px] font-bold text-primary hover:underline underline-offset-4"
                    >
                      {isPresetsExpanded ? 'Show Less' : 'View All'}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(isPresetsExpanded ? ARCHETYPES : ARCHETYPES.slice(0, 6)).map((type) => {
                      const isActive = primaryColor.toLowerCase() === type.primary.toLowerCase() &&
                        borderRadius === type.radius && shadowStyle === type.shadow;
                      return (
                        <button
                          key={type.name}
                          onClick={() => applyArchetype(type)}
                          className={cn(
                            "p-2 rounded-xl border flex flex-col items-center gap-1.5 theme-transition group hover:border-primary transition-all duration-300 relative overflow-hidden",
                            isActive ? "border-primary bg-primary/5 shadow-sm" : "border-bordercolor bg-surface/50 hover:bg-bg"
                          )}
                        >
                          <div className="flex -space-x-1">
                            <div className="w-2.5 h-2.5 rounded-full border border-surface shadow-xs" style={{ backgroundColor: type.primary }}></div>
                            <div className="w-2.5 h-2.5 rounded-full border border-surface shadow-xs" style={{ backgroundColor: type.secondary }}></div>
                          </div>
                          <span className={cn(
                            "text-[8px] font-bold text-center leading-tight theme-transition",
                            isActive ? "text-primary" : "text-tx"
                          )}>{type.name}</span>
                          {isActive && (
                            <div className="absolute top-0 right-0 p-0.5">
                              <Check size={8} className="text-primary" weight="bold" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Button onClick={randomizeTheme} className="w-full text-xs py-2">
                  <DiceThree weight="bold" size={16} />
                  Randomize Theme
                </Button>
              </div>
            )}
          </div>

          {/* Accordion 2: Color Settings */}
          <div className="border border-bordercolor/60 rounded-xl p-4 bg-surface/30 hover:border-primary/20 transition-all duration-300 space-y-4">
            <button
              onClick={() => toggleGroup('colors')}
              className="w-full flex items-center justify-between text-left select-none group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <PaintBrush weight="fill" className="text-primary group-hover:scale-110 transition-transform duration-300" size={16} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-tx">Color Settings</span>
              </div>
              <span className="text-muted group-hover:text-primary transition-colors">
                {expandedGroups.colors ? <CaretUp weight="bold" size={14} /> : <CaretDown weight="bold" size={14} />}
              </span>
            </button>

            {expandedGroups.colors && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium">Primary</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copyToClipboard(primaryColor)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-bg border border-bordercolor text-[10px] font-mono text-muted hover:text-primary transition-colors group"
                        title="Copy Hex Code"
                      >
                        {primaryColor.toUpperCase()}
                        {copiedColor === primaryColor ? <Check size={12} className="text-success" /> : <Copy size={12} className="group-hover:scale-110 transition-transform" />}
                      </button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() => {
                            const r = Math.floor(Math.random() * 255);
                            const g = Math.floor(Math.random() * 255);
                            const b = Math.floor(Math.random() * 255);
                            const { rgbToHex } = require('@/lib/utils');
                            setPrimaryColor(rgbToHex(r, g, b));
                          }}
                          title="Random Primary"
                        >
                          <DiceThree size={16} />
                        </Button>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-bordercolor theme-transition shadow-sm cursor-pointer">
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium">Secondary</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copyToClipboard(secondaryColor)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-bg border border-bordercolor text-[10px] font-mono text-muted hover:text-secondary transition-colors group"
                        title="Copy Hex Code"
                      >
                        {secondaryColor.toUpperCase()}
                        {copiedColor === secondaryColor ? <Check size={12} className="text-success" /> : <Copy size={12} className="group-hover:scale-110 transition-transform" />}
                      </button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() => {
                            const r = Math.floor(Math.random() * 255);
                            const g = Math.floor(Math.random() * 255);
                            const b = Math.floor(Math.random() * 255);
                            const { rgbToHex } = require('@/lib/utils');
                            setSecondaryColor(rgbToHex(r, g, b));
                          }}
                          title="Random Secondary"
                        >
                          <DiceThree size={16} />
                        </Button>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-bordercolor theme-transition shadow-sm cursor-pointer">
                          <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium">BG Color</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copyToClipboard(bgColor)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-bg border border-bordercolor text-[10px] font-mono text-muted hover:text-tx transition-colors group"
                        title="Copy Hex Code"
                      >
                        {bgColor.toUpperCase()}
                        {copiedColor === bgColor ? <Check size={12} className="text-success" /> : <Copy size={12} className="group-hover:scale-110 transition-transform" />}
                      </button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() => setBgColor('#fafafa')}
                          title="Reset Background"
                        >
                          <ArrowCounterClockwise size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-1 h-auto"
                          onClick={() => {
                            const r = Math.floor(235 + Math.random() * 20);
                            const g = Math.floor(235 + Math.random() * 20);
                            const b = Math.floor(235 + Math.random() * 20);
                            const { rgbToHex } = require('@/lib/utils');
                            setBgColor(rgbToHex(r, g, b));
                          }}
                          title="Random Light Background"
                        >
                          <DiceThree size={16} />
                        </Button>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-bordercolor theme-transition shadow-sm cursor-pointer">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Palettes */}
                <div className="pt-2 space-y-4">
                  <button
                    onClick={() => setIsPalettesExpanded(!isPalettesExpanded)}
                    className="w-full flex items-center justify-between py-2 px-3 bg-bg/50 border border-bordercolor rounded-lg text-[9px] font-bold text-muted uppercase tracking-widest hover:text-primary hover:border-primary/30 transition-all group"
                  >
                    <span>Browse Palettes (พาเลทสีเพิ่มเติม)</span>
                    <div className={cn("transition-transform duration-300", isPalettesExpanded ? "rotate-180" : "")}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {isPalettesExpanded && (
                    <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {COLOR_PALETTES.map((category) => (
                        <div key={category.category}>
                          <label className="text-[9px] font-bold text-muted/60 uppercase tracking-widest mb-1.5 block">{category.category}</label>
                          <div className="grid grid-cols-6 gap-1.5">
                            {category.items.map((palette) => (
                              <button
                                key={palette.name}
                                onClick={() => setPalette(palette.primary, palette.secondary)}
                                className={`group relative w-full aspect-square rounded-lg border transition-all duration-200 flex items-center justify-center overflow-hidden ${primaryColor === palette.primary && secondaryColor === palette.secondary
                                  ? 'border-primary scale-110 shadow-md z-10'
                                  : 'border-transparent hover:border-bordercolor hover:scale-105'
                                  }`}
                                title={palette.name}
                              >
                                <div className="absolute inset-0 flex -rotate-45">
                                  <div className="flex-1" style={{ backgroundColor: palette.primary }}></div>
                                  <div className="flex-1" style={{ backgroundColor: palette.secondary }}></div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Typography & Icons */}
          <div className="border border-bordercolor/60 rounded-xl p-4 bg-surface/30 hover:border-primary/20 transition-all duration-300 space-y-4">
            <button
              onClick={() => toggleGroup('typography')}
              className="w-full flex items-center justify-between text-left select-none group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <TextAa weight="bold" className="text-primary group-hover:scale-110 transition-transform duration-300" size={16} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-tx">Typography & Icons</span>
              </div>
              <span className="text-muted group-hover:text-primary transition-colors">
                {expandedGroups.typography ? <CaretUp weight="bold" size={14} /> : <CaretDown weight="bold" size={14} />}
              </span>
            </button>

            {expandedGroups.typography && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <label className="text-xs font-medium">Font Family</label>
                  <div className="relative">
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full bg-surface border border-bordercolor text-tx rounded-[var(--radius-theme)] px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 theme-transition shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="var(--font-inter)">Inter (Default)</option>
                      <option value="var(--font-noto-sans-thai)">Noto Sans Thai (ทางการ)</option>
                      <option value="var(--font-prompt)">Prompt (โมเดิร์น)</option>
                      <option value="var(--font-kanit)">Kanit (แข็งแรง)</option>
                      <option value="var(--font-sarabun)">Sarabun (ราชการ)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium">Base Size</label>
                    <span className="text-xs font-mono text-primary font-bold">{fontSizeBase}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    step="1"
                    value={fontSizeBase}
                    onChange={(e) => setFontSizeBase(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="text-xs font-medium">Scale Ratio</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Major Second', val: 1.125 },
                      { name: 'Minor Third', val: 1.200 },
                      { name: 'Major Third', val: 1.250 },
                      { name: 'Perfect Fourth', val: 1.333 },
                    ].map((ratio) => (
                      <button
                        key={ratio.name}
                        onClick={() => setFontScale(ratio.val)}
                        className={cn(
                          "px-2.5 py-1.5 text-[9px] font-bold rounded-lg border theme-transition",
                          fontScale === ratio.val
                            ? "bg-primary text-white border-primary"
                            : "bg-surface border-bordercolor hover:border-primary/50"
                        )}
                      >
                        {ratio.name} ({ratio.val})
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-bordercolor/40 theme-transition" />

                <div className="space-y-3">
                  <label className="text-xs font-medium">Icon Style</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['thin', 'light', 'regular', 'bold', 'fill', 'duotone'].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setIconWeight(weight as any)}
                        className={cn(
                          "p-1.5 rounded-lg border flex flex-col items-center gap-1 theme-transition transition-all",
                          iconWeight === weight
                            ? "bg-primary text-white border-primary shadow-sm scale-105"
                            : "bg-surface border-bordercolor hover:border-primary/50"
                        )}
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Sparkle weight={weight as any} size={16} />
                        </div>
                        <span className="text-[7px] font-bold uppercase tracking-tighter">{weight}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: Shapes & Effects */}
          <div className="border border-bordercolor/60 rounded-xl p-4 bg-surface/30 hover:border-primary/20 transition-all duration-300 space-y-4">
            <button
              onClick={() => toggleGroup('shapes')}
              className="w-full flex items-center justify-between text-left select-none group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <BoundingBox weight="bold" className="text-primary group-hover:scale-110 transition-transform duration-300" size={16} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-tx">Shapes & Effects</span>
              </div>
              <span className="text-muted group-hover:text-primary transition-colors">
                {expandedGroups.shapes ? <CaretUp weight="bold" size={14} /> : <CaretDown weight="bold" size={14} />}
              </span>
            </button>

            {expandedGroups.shapes && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium">Shape & Radius</label>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-[var(--radius-theme)] theme-transition">
                      {borderRadius === 24 ? 'Pill' : `${borderRadius}px`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted theme-transition">
                    <span>Sharp</span>
                    <span>Rounded</span>
                    <span>Pill</span>
                  </div>
                </div>

                <hr className="border-bordercolor/40 theme-transition" />

                <div className="space-y-3">
                  <label className="text-xs font-medium">Shadow Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['none', 'soft', 'medium', 'deep'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setShadowStyle(style)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border theme-transition capitalize ${shadowStyle === style
                          ? 'bg-primary text-[var(--color-primary-foreground)] border-primary shadow-md'
                          : 'bg-surface text-tx border-bordercolor hover:border-primary/50'
                          }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  );
};
