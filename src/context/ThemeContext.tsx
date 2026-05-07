"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hexToRgb, generateScale, rgbToHex, hslToHex, COLOR_PALETTES } from '@/lib/utils';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: number;
  shadowStyle: string;
  isDarkMode: boolean;
  fontFamily: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setPalette: (primary: string, secondary: string) => void;
  setBorderRadius: (radius: number) => void;
  setShadowStyle: (style: string) => void;
  setFontFamily: (font: string) => void;
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateCssVariables = useCallback(() => {
    const root = document.documentElement;
    
    // Update Primary
    root.style.setProperty('--color-primary', primaryColor);
    const pRgb = hexToRgb(primaryColor);
    const pScale = generateScale(pRgb);
    Object.entries(pScale).forEach(([step, rgb]) => {
      root.style.setProperty(`--color-primary-${step}`, `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
    });

    // Update Secondary
    root.style.setProperty('--color-secondary', secondaryColor);
    const sRgb = hexToRgb(secondaryColor);
    const sScale = generateScale(sRgb);
    Object.entries(sScale).forEach(([step, rgb]) => {
      root.style.setProperty(`--color-secondary-${step}`, `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
    });

    // Update Radius
    const displayRadius = borderRadius === 24 ? '999px' : `${borderRadius}px`;
    root.style.setProperty('--radius-theme', displayRadius);

    // Update Dark Mode Class
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update Font Family
    root.style.setProperty('--font-sans', fontFamily);

    // Update Shadows
    const shadows: Record<string, string> = {
      none: '0 0 #0000',
      soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      deep: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    };
    root.style.setProperty('--shadow-theme', shadows[shadowStyle] || shadows.soft);

  }, [primaryColor, secondaryColor, borderRadius, shadowStyle, fontFamily, isDarkMode]);

  useEffect(() => {
    updateCssVariables();
  }, [updateCssVariables]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const setPalette = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
  };

  const randomizeTheme = () => {
    // Truly Random but vibrant/clean colors using HSL
    const randomHue1 = Math.floor(Math.random() * 360);
    const randomHue2 = (randomHue1 + 180 + (Math.random() * 60 - 30)) % 360; // Complementary-ish
    
    setPrimaryColor(hslToHex(randomHue1, 70, 50));
    setSecondaryColor(hslToHex(randomHue2, 60, 60));
    setBorderRadius(Math.floor(Math.random() * 5) * 4);
  };

  return (
    <ThemeContext.Provider value={{
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
    }}>
      {children}
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
