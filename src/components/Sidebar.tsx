"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette, Moon, Sun, DiceThree, PaintBrush, BoundingBox, TextAa, Copy, Check, Sparkle } from '@phosphor-icons/react';
import { Button } from './ui/Button';
import { COLOR_PALETTES, cn } from '@/lib/utils';

const PRESETS = [
  { name: 'SysCraft', primary: '#6366f1', secondary: '#8b5cf6', radius: 8, font: 'var(--font-inter)' },
  { name: 'Midnight', primary: '#4f46e5', secondary: '#1e293b', radius: 8, font: 'var(--font-inter)' },
  { name: 'Sunset', primary: '#f43f5e', secondary: '#fb923c', radius: 16, font: 'var(--font-outfit)' },
  { name: 'Ocean', primary: '#0ea5e9', secondary: '#0f172a', radius: 4, font: 'var(--font-roboto)' },
  { name: 'Cyber', primary: '#f0abfc', secondary: '#818cf8', radius: 0, font: 'var(--font-jetbrains-mono)' },
  { name: 'Forest', primary: '#10b981', secondary: '#064e3b', radius: 12, font: 'var(--font-outfit)' },
];

export const Sidebar: React.FC = () => {
  const {
    primaryColor,
    secondaryColor,
    borderRadius,
    shadowStyle,
    fontFamily,
    isDarkMode,
    setPrimaryColor,
    setSecondaryColor,
    setPalette,
    setBorderRadius,
    setShadowStyle,
    setFontFamily,
    toggleDarkMode,
    randomizeTheme
  } = useTheme();

  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [isPalettesExpanded, setIsPalettesExpanded] = React.useState(false);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setBorderRadius(preset.radius);
    setFontFamily(preset.font);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <aside className="w-full md:w-80 h-auto md:h-screen flex-shrink-0 bg-surface border-b md:border-b-0 md:border-r border-bordercolor flex flex-col z-20 shadow-sm theme-transition">
      {/* Header */}
      <div className="p-6 border-b border-bordercolor flex justify-between items-center theme-transition">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Palette weight="fill" className="text-primary text-2xl theme-transition" />
            SysCraft
          </h1>
          <p className="text-xs text-muted mt-1">Design System Simulator</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-[var(--radius-theme)] hover:bg-bg theme-transition"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Controls container */}
      <div className="p-6 flex-1 overflow-y-auto space-y-8">

        {/* Quick Themes Section */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkle size={14} weight="fill" className="text-primary" /> Quick Themes (ธีมสำเร็จรูป)
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => {
              const isActive = primaryColor.toLowerCase() === preset.primary.toLowerCase() &&
                secondaryColor.toLowerCase() === preset.secondary.toLowerCase();
              return (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "p-3 rounded-xl border text-left theme-transition group hover:border-primary/50 transition-all duration-300",
                    isActive ? "border-primary bg-primary/5 shadow-sm" : "border-bordercolor bg-surface/50"
                  )}
                >
                  <div className="flex gap-1 mb-2">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: preset.primary }}></div>
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: preset.secondary }}></div>
                  </div>
                  <p className={cn(
                    "text-[10px] font-bold theme-transition",
                    isActive ? "text-primary" : "text-tx"
                  )}>{preset.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-bordercolor theme-transition" />

        <Button onClick={randomizeTheme} className="w-full">
          <DiceThree weight="bold" size={20} />
          Randomize Theme
        </Button>

        <hr className="border-bordercolor theme-transition" />

        {/* Typography Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2 theme-transition">
            <TextAa /> Typography
          </h2>

          <div className="space-y-3">
            <label className="text-sm font-medium">Font Family</label>
            <div className="relative">
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-surface border border-bordercolor text-tx rounded-[var(--radius-theme)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 theme-transition shadow-sm appearance-none cursor-pointer"
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
        </div>

        {/* Colors Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2 theme-transition">
            <PaintBrush /> Brand Colors
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Primary</label>
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
              <label className="text-sm font-medium">Secondary</label>
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
          </div>

          {/* Quick Palettes */}
          <div className="pt-2 space-y-4">
            <button 
              onClick={() => setIsPalettesExpanded(!isPalettesExpanded)}
              className="w-full flex items-center justify-between py-2 px-3 bg-bg/50 border border-bordercolor rounded-lg text-[10px] font-bold text-muted uppercase tracking-widest hover:text-primary hover:border-primary/30 transition-all group"
            >
              <span>Browse Palettes (ดูพาเลทสีเพิ่มเติม)</span>
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

        <hr className="border-bordercolor theme-transition" />

        {/* Shapes Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2 theme-transition">
              <BoundingBox /> Shape & Radius
            </h2>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-[var(--radius-theme)] theme-transition">
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
          <div className="flex justify-between text-xs text-muted theme-transition">
            <span>Sharp</span>
            <span>Rounded</span>
            <span>Pill</span>
          </div>
        </div>

        <hr className="border-bordercolor theme-transition" />

        {/* Shadows Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2 theme-transition">
            <Palette /> Shadow Style
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {['none', 'soft', 'medium', 'deep'].map((style) => (
              <button
                key={style}
                onClick={() => setShadowStyle(style)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border theme-transition capitalize ${shadowStyle === style
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
    </aside>
  );
};
