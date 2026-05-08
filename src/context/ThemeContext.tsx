"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hexToRgb, generateScale, rgbToHex, hslToHex, COLOR_PALETTES } from '@/lib/utils';
import { IconContext, IconWeight } from '@phosphor-icons/react';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: number;
  shadowStyle: string;
  isDarkMode: boolean;
  fontFamily: string;
  fontSizeBase: number;
  fontScale: number;
  bgColor: string;
  iconWeight: IconWeight;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setPalette: (primary: string, secondary: string) => void;
  setBorderRadius: (radius: number) => void;
  setShadowStyle: (style: string) => void;
  setFontFamily: (font: string) => void;
  setFontSizeBase: (size: number) => void;
  setFontScale: (scale: number) => void;
  setIconWeight: (weight: IconWeight) => void;
  toggleDarkMode: () => void;
  randomizeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');
  const [borderRadius, setBorderRadius] = useState(8);
  const [shadowStyle, setShadowStyle] = useState('soft');
  const [fontFamily, setFontFamily] = useState('var(--font-inter)');
  const [fontSizeBase, setFontSizeBase] = useState(16);
  const [fontScale, setFontScale] = useState(1.25);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgColor, setBgColor] = useState('#fafafa');
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');

  const updateCssVariables = useCallback(() => {
    const root = document.documentElement;
    
    // Update Primary
    root.style.setProperty('--color-primary', primaryColor);
    const pRgb = hexToRgb(primaryColor);
    const pScale = generateScale(pRgb);
    Object.entries(pScale).forEach(([step, rgb]) => {
      root.style.setProperty(`--color-primary-${step}`, `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
    });

    // Calculate Contrast Foreground for Primary
    const pLuminance = (0.299 * pRgb.r + 0.587 * pRgb.g + 0.114 * pRgb.b) / 255;
    root.style.setProperty('--color-primary-foreground', pLuminance > 0.55 ? '#000000' : '#ffffff');

    // Update Secondary
    root.style.setProperty('--color-secondary', secondaryColor);
    const sRgb = hexToRgb(secondaryColor);
    const sScale = generateScale(sRgb);
    Object.entries(sScale).forEach(([step, rgb]) => {
      root.style.setProperty(`--color-secondary-${step}`, `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
    });

    // Calculate Contrast Foreground for Secondary
    const sLuminance = (0.299 * sRgb.r + 0.587 * sRgb.g + 0.114 * sRgb.b) / 255;
    root.style.setProperty('--color-secondary-foreground', sLuminance > 0.55 ? '#000000' : '#ffffff');

    // Update Radius
    root.style.setProperty('--radius-theme', `${borderRadius}px`);
    root.style.setProperty('--font-theme', fontFamily);
    
    // Typography Scale
    root.style.setProperty('--font-size-base', `${fontSizeBase}px`);
    root.style.setProperty('--font-size-h1', `${Math.round(fontSizeBase * Math.pow(fontScale, 4))}px`);
    root.style.setProperty('--font-size-h2', `${Math.round(fontSizeBase * Math.pow(fontScale, 3))}px`);
    root.style.setProperty('--font-size-h3', `${Math.round(fontSizeBase * Math.pow(fontScale, 2))}px`);
    root.style.setProperty('--font-size-h4', `${Math.round(fontSizeBase * Math.pow(fontScale, 1.2))}px`);
    root.style.setProperty('--font-size-sm', `${Math.round(fontSizeBase / 1.1)}px`);
    root.style.setProperty('--font-size-xs', `${Math.round(fontSizeBase / 1.3)}px`);

    // Update Dark Mode Class & Backgrounds
    if (isDarkMode) {
      root.classList.add('dark');
      // Remove inline overrides to let .dark class from globals.css take over
      root.style.removeProperty('--color-bg');
      root.style.removeProperty('--color-surface');
      root.style.removeProperty('--color-tx');
      root.style.removeProperty('--color-muted');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--color-bg', bgColor);
      
      const bgRgb = hexToRgb(bgColor);
      const bgLum = (0.299 * bgRgb.r + 0.587 * bgRgb.g + 0.114 * bgRgb.b) / 255;
      
      // If BG is light, surface is pure white. If BG is darker, surface is slightly lighter than BG.
      if (bgLum > 0.92) {
        root.style.setProperty('--color-surface', '#ffffff');
      } else {
        const surfaceRgb = {
          r: Math.min(255, bgRgb.r + 8),
          g: Math.min(255, bgRgb.g + 8),
          b: Math.min(255, bgRgb.b + 8),
        };
        root.style.setProperty('--color-surface', rgbToHex(surfaceRgb.r, surfaceRgb.g, surfaceRgb.b));
      }
      
      // Update Text Color based on BG luminance
      root.style.setProperty('--color-tx', bgLum > 0.5 ? '#09090b' : '#fafafa');
      root.style.setProperty('--color-muted', bgLum > 0.5 ? '#71717a' : '#a1a1aa');
    }

    // Update Shadows
    const shadows: Record<string, string> = {
      none: '0 0 #0000',
      soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      deep: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    };
    root.style.setProperty('--shadow-theme', shadows[shadowStyle] || shadows.soft);

  }, [primaryColor, secondaryColor, borderRadius, shadowStyle, fontFamily, fontSizeBase, fontScale, isDarkMode, bgColor]);

  useEffect(() => {
    updateCssVariables();
  }, [primaryColor, secondaryColor, borderRadius, shadowStyle, fontFamily, fontSizeBase, fontScale, isDarkMode, bgColor]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const setPalette = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
  };

  const randomizeTheme = () => {
    const randomPrimary = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    const randomSecondary = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setPrimaryColor(randomPrimary);
    setSecondaryColor(randomSecondary);
    setBorderRadius(Math.floor(Math.random() * 24));
  };

  return (
    <ThemeContext.Provider value={{
      primaryColor,
      secondaryColor,
      borderRadius,
      shadowStyle,
      fontFamily,
      fontSizeBase,
      fontScale,
      isDarkMode,
      setPrimaryColor,
      setSecondaryColor,
      setPalette,
      setBorderRadius,
      setShadowStyle,
      setFontFamily,
      setFontSizeBase,
      setFontScale,
      bgColor,
      setBgColor,
      iconWeight,
      setIconWeight,
      toggleDarkMode,
      randomizeTheme
    }}>
      <IconContext.Provider
        value={{
          color: "currentColor",
          size: "1em",
          weight: iconWeight,
          mirrored: false,
        }}
      >
        {children}
      </IconContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
