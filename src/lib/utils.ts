import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function mixColors(color1: number[], color2: number[], weight: number) {
  const w1 = weight;
  const w2 = 1 - w1;
  return [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)
  ];
}

export function generateScale(baseRgb: { r: number, g: number, b: number }) {
  const baseArray = [baseRgb.r, baseRgb.g, baseRgb.b];
  const white = [255, 255, 255];
  const black = [0, 0, 0];

  return {
    50: mixColors(white, baseArray, 0.9),
    100: mixColors(white, baseArray, 0.8),
    200: mixColors(white, baseArray, 0.6),
    300: mixColors(white, baseArray, 0.4),
    400: mixColors(white, baseArray, 0.2),
    500: baseArray,
    600: mixColors(black, baseArray, 0.2),
    700: mixColors(black, baseArray, 0.4),
    800: mixColors(black, baseArray, 0.6),
    900: mixColors(black, baseArray, 0.8),
    950: mixColors(black, baseArray, 0.9)
  };
}

export const COLOR_PALETTES = [
  { 
    category: 'วัยรุ่น (Vibrant)',
    items: [
      { name: 'Cyberpunk', primary: '#d946ef', secondary: '#facc15' },
      { name: 'Neon Night', primary: '#22d3ee', secondary: '#f472b6' },
      { name: 'Electric', primary: '#6366f1', secondary: '#4ade80' },
      { name: 'Hot Chili', primary: '#ef4444', secondary: '#fbbf24' }
    ]
  },
  { 
    category: 'มินิมอล (Minimal)',
    items: [
      { name: 'Minimalist', primary: '#18181b', secondary: '#71717a' },
      { name: 'Soft Slate', primary: '#475569', secondary: '#94a3b8' },
      { name: 'Earth', primary: '#78350f', secondary: '#d6d3d1' },
      { name: 'Clean White', primary: '#0f172a', secondary: '#f1f5f9' }
    ]
  },
  { 
    category: 'สุขุม (Professional)',
    items: [
      { name: 'Corporate', primary: '#2563eb', secondary: '#64748b' },
      { name: 'Indigo Dream', primary: '#4f46e5', secondary: '#ec4899' },
      { name: 'Deep Sea', primary: '#0f172a', secondary: '#0ea5e9' },
      { name: 'Royal', primary: '#4338ca', secondary: '#6366f1' }
    ]
  }
];

export function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function checkWCAG(ratio: number) {
  return {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5,
    uiComponent: ratio >= 3,
  };
}

export function hexToHsl(hex: string) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function findCompliantColor(fgHex: string, bgHex: string, targetRatio: number = 4.5): string {
  const fgHsl = hexToHsl(fgHex);
  const bgLum = getLuminance(bgHex);
  
  // If background is light, try making foreground darker. If background is dark, try lighter.
  const directions = bgLum > 0.5 ? [-1, 1] : [1, -1]; 
  
  for (const dir of directions) {
    let currentL = fgHsl.l;
    // Iterate in 0.5% steps for precision
    while (currentL >= 0 && currentL <= 100) {
      const currentHex = hslToHex(fgHsl.h, fgHsl.s, currentL);
      if (getContrastRatio(currentHex, bgHex) >= targetRatio) {
        return currentHex;
      }
      currentL += dir * 0.5;
    }
  }
  
  return bgLum > 0.5 ? '#000000' : '#ffffff'; 
}

