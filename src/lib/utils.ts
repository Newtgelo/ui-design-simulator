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
