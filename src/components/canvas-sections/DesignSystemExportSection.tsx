import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { hexToRgb, generateScale, rgbToHex, cn } from '@/lib/utils';
import { Copy, Download, Check, FileJson } from '@phosphor-icons/react';
import { Logo } from './BrandingSection';

const SEMANTIC_BASES = {
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  grey: '#64748b',
  neutral: '#71717a'
};

const ALPHA_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const DesignSystemExportSection: React.FC = () => {
  const { primaryColor, secondaryColor, bgColor, borderRadius, shadowStyle, fontFamily, fontSizeBase, fontScale, isDarkMode } = useTheme();
  const [activeView, setActiveView] = React.useState<'preview' | 'json'>('preview');
  const [jsonPart, setJsonPart] = React.useState<'all' | 'colors' | 'typography' | 'spacing' | 'radius' | 'interactions'>('all');
  const [copied, setCopied] = React.useState(false);
  const [lang, setLang] = React.useState<'en' | 'th'>('en');

  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);
  const bgRgb = hexToRgb(bgColor);

  const scales = {
    primary: generateScale(primaryRgb),
    secondary: generateScale(secondaryRgb),
    background: generateScale(bgRgb),
    neutral: generateScale(hexToRgb(SEMANTIC_BASES.neutral)),
    grey: generateScale(hexToRgb(SEMANTIC_BASES.grey)),
    success: generateScale(hexToRgb(SEMANTIC_BASES.success)),
    danger: generateScale(hexToRgb(SEMANTIC_BASES.danger)),
    warning: generateScale(hexToRgb(SEMANTIC_BASES.warning)),
    info: generateScale(hexToRgb(SEMANTIC_BASES.info)),
  };

  const getFontSize = (level: number) => Math.round(fontSizeBase * Math.pow(fontScale, level));

  const typographyTokens = {
    headings: [
      { name: 'H1. Headline', thName: 'H1. หัวข้อใหญ่', weight: 'Semi Bold', size: getFontSize(4), line: Math.round(getFontSize(4) * 1.2), spacing: 0 },
      { name: 'H2. Headline', thName: 'H2. หัวข้อรอง', weight: 'Semi Bold', size: getFontSize(3), line: Math.round(getFontSize(3) * 1.2), spacing: 0 },
      { name: 'H3. Headline', thName: 'H3. หัวข้อย่อย', weight: 'Semi Bold', size: getFontSize(2), line: Math.round(getFontSize(2) * 1.2), spacing: 0 },
      { name: 'H4. Headline', thName: 'H4. หัวข้อเล็ก', weight: 'Semi Bold', size: getFontSize(1.2), line: Math.round(getFontSize(1.2) * 1.2), spacing: 0 },
      { name: 'H5. Headline', thName: 'H5. หัวข้อจิ๋ว', weight: 'Semi Bold', size: getFontSize(0.5), line: Math.round(getFontSize(0.5) * 1.2), spacing: 0 },
    ],
    subtitles: [
      { name: 'S1. Subtitle', thName: 'S1. คำโปรยหลัก', weight: 'Semi Bold', size: Math.round(fontSizeBase * 1.125), line: Math.round(fontSizeBase * 1.125 * 1.5), spacing: 0 },
      { name: 'S2. Subtitle', thName: 'S2. คำโปรยรอง', weight: 'Semi Bold', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
    ],
    body: [
      { name: 'B1. Body', thName: 'B1. เนื้อหาหลัก', weight: 'Regular', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'B2. Body', thName: 'B2. เนื้อหาเน้น', weight: 'Medium', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'B3. Body', thName: 'B3. เนื้อหารอง', weight: 'Regular', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
      { name: 'B4. Body', thName: 'B4. เนื้อหาเล็ก', weight: 'Medium', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
    ],
    captions: [
      { name: 'C1. Caption', thName: 'C1. คำอธิบาย', weight: 'Regular', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.3), spacing: 0 },
      { name: 'C2. Caption', thName: 'C2. คำอธิบายรอง', weight: 'Medium', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.3), spacing: 0 },
      { name: 'C3. Caption', thName: 'C3. คำอธิบายเล็ก', weight: 'Medium', size: Math.round(fontSizeBase / 1.6), line: Math.round((fontSizeBase / 1.6) * 1.3), spacing: 0 },
    ],
    buttons: [
      { name: 'Giant', thName: 'ปุ่มขนาดใหญ่พิเศษ', weight: 'Semi Bold', size: Math.round(fontSizeBase * 1.125), line: Math.round(fontSizeBase * 1.125 * 1.5), spacing: 0 },
      { name: 'Large', thName: 'ปุ่มขนาดใหญ่', weight: 'Semi Bold', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'Medium', thName: 'ปุ่มขนาดกลาง', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
      { name: 'Small', thName: 'ปุ่มขนาดเล็ก', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.5), spacing: 0 },
      { name: 'Tiny', thName: 'ปุ่มขนาดจิ๋ว', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.6), line: Math.round((fontSizeBase / 1.6) * 1.5), spacing: 0 },
    ]
  };

  const generateFigmaJson = (part: string = 'all') => {
    const json: any = {
      color: {
        $type: "color",
        primary: {},
        secondary: {},
        background: {},
        neutral: {},
        grey: {},
        semantic: {
          success: { $value: SEMANTIC_BASES.success },
          danger: { $value: SEMANTIC_BASES.danger },
          warning: { $value: SEMANTIC_BASES.warning },
          info: { $value: SEMANTIC_BASES.info },
        },
        alpha: {
          black: {},
          white: {}
        }
      },
      typography: {
        $type: "typography",
        fontFamily: { $value: fontFamily.replace('var(--font-', '').replace(')', '') },
        headings: {},
        subtitles: {},
        body: {},
        captions: {},
        buttons: {}
      },
      spacing: {
        $type: "number",
      },
      radius: {
        $type: "number",
      },
      effects: {
        shadows: { $value: shadowStyle, $type: "shadow" }
      }
    };

    // Populate scales
    Object.entries(scales).forEach(([name, scale]) => {
      if (!json.color[name]) json.color[name] = {};
      Object.entries(scale).forEach(([step, rgb]) => {
        json.color[name][step] = {
          $value: rgbToHex(rgb[0], rgb[1], rgb[2])
        };
      });
    });

    // Populate Alphas
    ALPHA_STEPS.forEach(step => {
      if (!json.color.alpha) json.color.alpha = { black: {}, white: {} };
      json.color.alpha.black[`alpha${step}`] = {
        $value: `rgba(0,0,0,${step / 100})`
      };
      json.color.alpha.white[`alpha${step}`] = {
        $value: `rgba(255,255,255,${step / 100})`
      };
    });

    // Populate Typography
    Object.entries(typographyTokens).forEach(([category, tokens]) => {
      tokens.forEach(token => {
        const tokenName = token.name.split('.')[0].trim();
        json.typography[category][tokenName] = {
          fontSize: { $value: `${token.size}px`, $type: "dimension" },
          fontWeight: { $value: token.weight, $type: "fontWeight" },
          lineHeight: { $value: `${token.line}px`, $type: "dimension" },
          letterSpacing: { $value: `${token.spacing}px`, $type: "dimension" }
        };
      });
    });

    // Populate Spacing & Radius
    spacingScale.forEach(s => {
      const cleanLabel = s.label.replace('.', '_');
      const dynamicLabel = `${cleanLabel}-${s.value}px`;
      json.spacing[dynamicLabel] = { $value: s.value };
    });
    radiusScale.forEach(r => {
      const cleanLabel = r.label.replace('.', '_');
      const dynamicLabel = `${cleanLabel}-${r.value}px`;
      json.radius[dynamicLabel] = { $value: r.value };
    });

    if (part === 'colors') return JSON.stringify({ color: json.color }, null, 2);
    if (part === 'typography') return JSON.stringify({ typography: json.typography }, null, 2);
    if (part === 'spacing') return JSON.stringify({ spacing: json.spacing }, null, 2);
    if (part === 'radius') return JSON.stringify({ radius: json.radius }, null, 2);
    if (part === 'interactions') return JSON.stringify({
      durations: {
        $type: "duration",
        fast: { $value: "150ms" },
        normal: { $value: "300ms" },
        slow: { $value: "500ms" }
      },
      states: {
        $type: "number",
        hover: { $value: 0.9 },
        active: { $value: 0.95 },
        disabled: { $value: 0.5 }
      }
    }, null, 2);

    return JSON.stringify(json, null, 2);
  };

  const handleCopy = () => {
    const jsonString = generateFigmaJson(jsonPart);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const data = generateFigmaJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-system-tokens.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ColorRow = ({ label, scale }: { label: string, scale: any }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest">{label}</h4>
        <span className="text-[10px] text-muted font-medium">50 — 950</span>
      </div>
      <div className="flex w-full h-10 rounded-lg overflow-hidden border border-bordercolor shadow-sm group/row">
        {Object.entries(scale).map(([step, rgb]: [string, any]) => {
          const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
          const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
          const textColor = luminance > 0.5 ? 'text-black/60' : 'text-white/80';

          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center justify-end pb-2 hover:flex-[2] transition-all duration-300 relative cursor-pointer"
              style={{ backgroundColor: hex }}
              onClick={() => {
                navigator.clipboard.writeText(hex);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <span className={cn(
                "text-[9px] font-mono font-bold uppercase opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
                textColor
              )}>
                {hex}
              </span>
              <span className={cn(
                "text-[8px] font-bold uppercase opacity-40",
                textColor
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const AlphaRow = ({ label, color }: { label: string, color: 'black' | 'white' }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest">{label} Alpha</h4>
        <span className="text-[10px] text-muted font-medium">10% — 100%</span>
      </div>
      <div className="flex w-full h-10 rounded-lg overflow-hidden border border-bordercolor shadow-sm checkerboard group/row">
        {ALPHA_STEPS.map((step) => {
          const opacity = step / 100;
          const rgba = `rgba(${color === 'black' ? '0,0,0' : '255,255,255'}, ${opacity})`;
          const textColor = color === 'black' && step > 40 ? 'text-white/80' : 'text-black/60';

          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center justify-end pb-2 hover:flex-[2] transition-all duration-300 relative cursor-pointer"
              style={{ backgroundColor: rgba }}
              onClick={() => {
                navigator.clipboard.writeText(rgba);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <span className={cn(
                "text-[9px] font-mono font-bold uppercase opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
                textColor
              )}>
                {step}%
              </span>
              <span className={cn(
                "text-[8px] font-bold uppercase opacity-40",
                textColor
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const TypographyTable = ({ title, groups }: { title: string, groups: any[] }) => (
    <div className="space-y-4">
      <h4 className="font-bold text-lg">{title}</h4>
      <div className="w-full text-sm bg-bg/50 border border-bordercolor rounded-2xl p-6">
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-bordercolor text-muted font-medium text-[10px] uppercase tracking-wider">
          <div className="col-span-6">Typeface</div>
          <div className="col-span-2 text-center">Weight</div>
          <div className="col-span-2 text-center">Size / Line</div>
          <div className="col-span-2 text-center">Spacing</div>
        </div>

        {groups.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {group.map((token: any, idx: number) => {
              const fontWeight = token.weight === 'Semi Bold' ? 600 : token.weight === 'Medium' ? 500 : 400;
              return (
                <div key={idx} className="grid grid-cols-12 gap-4 py-3 border-b border-bordercolor/30 items-center last:border-0 group/item">
                  <div className="col-span-6 flex items-center justify-between gap-4">
                    <div
                      className="truncate"
                      style={{
                        fontSize: `${token.size}px`,
                        lineHeight: '1.2',
                        fontWeight: fontWeight,
                        fontFamily: 'var(--font-theme)'
                      }}
                    >
                      {lang === 'th' ? token.thName : token.name}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] text-muted font-mono bg-bg px-1.5 py-0.5 rounded border border-bordercolor/50 whitespace-nowrap">
                        {token.name.split('.')[0]}/{fontFamily.replace('var(--font-', '').replace(')', '')}/{token.size}/{token.weight}
                      </span>
                      <button
                        onClick={() => {
                          const name = token.name.split('.')[0];
                          const font = fontFamily.replace('var(--font-', '').replace(')', '');
                          const str = `${name}/${font}/${token.size}/${token.weight}`;
                          navigator.clipboard.writeText(str);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1 hover:bg-primary/10 rounded text-primary"
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-muted text-xs">{token.weight}</div>
                  <div className="col-span-2 text-center font-mono text-xs">
                    {token.size} <span className="text-muted/50">/</span> {token.line}
                  </div>
                  <div className="col-span-2 text-center font-mono text-xs">{token.spacing}</div>
                </div>
              );
            })}
            {groupIdx < groups.length - 1 && <div className="h-3"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const spacingScale = [
    { label: 's-px', value: 1 },
    { label: 's-0.5', value: 2 },
    { label: 's-1', value: 4 },
    { label: 's-2', value: 8 },
    { label: 's-3', value: 12 },
    { label: 's-4', value: 16 },
    { label: 's-6', value: 24 },
    { label: 's-8', value: 32 },
    { label: 's-12', value: 48 },
    { label: 's-16', value: 64 },
  ];

  const radiusScale = [
    { label: 'r-none', value: 0 },
    { label: 'r-xs', value: Math.round(borderRadius * 0.25) },
    { label: 'r-sm', value: Math.round(borderRadius * 0.5) },
    { label: 'r-md', value: borderRadius },
    { label: 'r-lg', value: Math.round(borderRadius * 1.5) },
    { label: 'r-xl', value: borderRadius * 2 },
    { label: 'r-2xl', value: borderRadius * 3 },
    { label: 'r-full', value: 9999 },
  ];

  const getShadowValue = (level: 'low' | 'md' | 'hi') => {
    if (shadowStyle === 'None') return 'none';
    const color = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)';
    const blur = level === 'low' ? 4 : level === 'md' ? 12 : 24;
    const spread = level === 'low' ? 0 : level === 'md' ? -2 : -4;
    const y = level === 'low' ? 2 : level === 'md' ? 6 : 12;

    if (shadowStyle === 'Sharp') return `${y}px ${y}px 0px ${color}`;
    if (shadowStyle === 'Glass') return `0 8px 32px 0 rgba(31, 38, 135, 0.15)`;
    return `0 ${y}px ${blur}px ${spread} ${color}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Design System Export</h2>
          <p className="text-muted mt-2">Export your design system variables for Figma and Tokens Studio.</p>
        </div>
        <div className="flex gap-2 bg-surface p-1 rounded-xl border border-bordercolor">
          <button
            onClick={() => setActiveView('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'preview' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'}`}
          >
            Visual Preview
          </button>
          <button
            onClick={() => setActiveView('json')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'json' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-tx'}`}
          >
            JSON Export
          </button>
        </div>
      </div>

      {activeView === 'preview' ? (
        <div className="space-y-8">
          {/* Colors Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4">
              <h3 className="text-2xl font-bold">Colors</h3>
            </div>
            <ColorRow label="Primary" scale={scales.primary} />
            <ColorRow label="Secondary" scale={scales.secondary} />
            <ColorRow label="Background" scale={scales.background} />
            <ColorRow label="Neutral" scale={scales.neutral} />
            <ColorRow label="Grey" scale={scales.grey} />
            <ColorRow label="Green / Success" scale={scales.success} />
            <ColorRow label="Red / Danger" scale={scales.danger} />
            <ColorRow label="Yellow / Warning" scale={scales.warning} />
            <ColorRow label="Blue / Info" scale={scales.info} />
            <div className="pt-4 space-y-6 border-t border-bordercolor/50">
              <AlphaRow label="Black" color="black" />
              <AlphaRow label="White" color="white" />
            </div>
          </Card>

          {/* Typography Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold">Typography</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/20">
                  <span className="text-[10px] font-bold text-primary/60 uppercase tracking-tight">Preview:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setLang('en')}
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-bold rounded-md transition-all",
                        lang === 'en' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
                      )}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLang('th')}
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-bold rounded-md transition-all",
                        lang === 'th' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
                      )}
                    >
                      ภาษาไทย
                    </button>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="font-mono">{fontFamily.replace('var(--font-', '').replace(')', '')}</Badge>
            </div>

            <TypographyTable
              title="Text Font"
              groups={[typographyTokens.headings, typographyTokens.subtitles, typographyTokens.body, typographyTokens.captions]}
            />

            <div className="pt-8">
              <TypographyTable
                title="Button Font"
                groups={[typographyTokens.buttons]}
              />
            </div>
          </Card>

          {/* Grid System Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4">
              <h3 className="text-2xl font-bold">Grid System</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-muted uppercase">
                <span>12 Columns Layout</span>
                <span>Gutter: 24px / Margin: 32px</span>
              </div>
              <div className="grid grid-cols-12 gap-6 h-32 w-full bg-bg/30 border border-bordercolor rounded-xl p-8 relative overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-primary/10 border-x border-primary/20 h-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary/30">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Spacing & Shapes Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spacing */}
            <Card className="p-8 space-y-6">
              <div className="border-b border-bordercolor pb-4">
                <h3 className="text-2xl font-bold">Spacing Scale</h3>
              </div>
              <div className="space-y-4">
                {spacingScale.map((s) => (
                  <div key={s.label} className="flex items-center gap-6 group">
                    <div className="w-16 text-[10px] font-mono text-muted uppercase">{s.label}</div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="bg-primary/20 border border-primary/30 rounded-sm" style={{ width: s.value, height: 12 }}></div>
                      <span className="text-xs font-mono text-muted">{s.value}px</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Radius */}
            <Card className="p-8 space-y-6">
              <div className="border-b border-bordercolor pb-4">
                <h3 className="text-2xl font-bold">Radius Scale</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {radiusScale.map((r) => (
                  <div key={r.label} className="space-y-2">
                    <div
                      className="h-16 bg-bg border border-bordercolor shadow-sm transition-all"
                      style={{ borderRadius: r.value }}
                    ></div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] font-bold uppercase">{r.label}</span>
                      <span className="text-[9px] font-mono text-muted">{r.value}px</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Elevation Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4">
              <h3 className="text-2xl font-bold">Elevation & Shadows</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
              <div className="space-y-4 text-center">
                <div
                  className="aspect-square bg-surface border border-bordercolor flex items-center justify-center"
                  style={{ borderRadius: borderRadius * 2, boxShadow: getShadowValue('low') }}
                >
                  <span className="text-xs font-bold text-muted">Low</span>
                </div>
                <p className="text-[10px] text-muted font-mono uppercase">Elevation 1</p>
              </div>
              <div className="space-y-4 text-center">
                <div
                  className="aspect-square bg-surface border border-bordercolor flex items-center justify-center"
                  style={{ borderRadius: borderRadius * 2, boxShadow: getShadowValue('md') }}
                >
                  <span className="text-xs font-bold text-muted">Medium</span>
                </div>
                <p className="text-[10px] text-muted font-mono uppercase">Elevation 2</p>
              </div>
              <div className="space-y-4 text-center">
                <div
                  className="aspect-square bg-surface border border-bordercolor flex items-center justify-center"
                  style={{ borderRadius: borderRadius * 2, boxShadow: getShadowValue('hi') }}
                >
                  <span className="text-xs font-bold text-muted">High</span>
                </div>
                <p className="text-[10px] text-muted font-mono uppercase">Elevation 3</p>
              </div>
            </div>
          </Card>

          {/* Branding & Logo Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4">
              <h3 className="text-2xl font-bold">Branding & Logo</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="h-32 bg-white border border-bordercolor rounded-xl flex items-center justify-center">
                  <Logo type="primary" size={40} />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-muted uppercase">On Light</span>
                  <Badge variant="outline" className="text-[10px]">{primaryColor.toUpperCase()}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-32 bg-slate-900 border border-bordercolor rounded-xl flex items-center justify-center">
                  <Logo type="white" size={40} />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-muted uppercase">On Dark</span>
                  <Badge variant="outline" className="text-[10px]">#FFFFFF</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-32 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <Logo type="white" size={40} />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-muted uppercase">On Primary</span>
                  <Badge variant="outline" className="text-[10px]">#FFFFFF</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-32 bg-surface border border-bordercolor rounded-xl flex items-center justify-center shadow-inner">
                  <Logo type="primary" size={32} showText={false} />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-muted uppercase">Symbol Only</span>
                  <Badge variant="outline" className="text-[10px]">Mark</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Interaction Tokens Card */}
          <Card className="p-8 space-y-6">
            <div className="border-b border-bordercolor pb-4">
              <h3 className="text-2xl font-bold">Interaction Tokens</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted uppercase">Duration Scale</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Fast</span>
                    <span className="text-[10px] font-mono text-muted">150ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Normal</span>
                    <span className="text-[10px] font-mono text-muted">300ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Slow</span>
                    <span className="text-[10px] font-mono text-muted">500ms</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted uppercase">Interactive Opacity</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Hover State</span>
                    <span className="text-[10px] font-mono text-muted">0.9 / 90%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Active / Pressed</span>
                    <span className="text-[10px] font-mono text-muted">Scale 0.95</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-bg border border-bordercolor rounded-lg">
                    <span className="text-xs font-medium">Disabled State</span>
                    <span className="text-[10px] font-mono text-muted">0.5 / 50%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Export Prompt */}
          <div className="flex items-center justify-center p-8 bg-primary/5 border border-dashed border-primary/30 rounded-2xl">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Ready to export?</p>
              <Button onClick={() => setActiveView('json')} variant="outline" size="sm">Switch to JSON Tab</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 p-1 bg-surface border border-bordercolor rounded-xl">
            {[
              { id: 'all', label: 'Full Tokens' },
              { id: 'colors', label: 'Colors' },
              { id: 'typography', label: 'Typography' },
              { id: 'spacing', label: 'Spacing' },
              { id: 'radius', label: 'Radius' },
              { id: 'interactions', label: 'Interactions' }
            ].map(part => (
              <button
                key={part.id}
                onClick={() => setJsonPart(part.id as any)}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${jsonPart === part.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:bg-bg'
                  }`}
              >
                {part.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleCopy} className="flex-1 h-12">
              {copied ? <Check weight="bold" className="text-success" /> : <Copy weight="bold" />}
              {copied ? 'Copied JSON!' : 'Copy to Clipboard'}
            </Button>
            <Button onClick={handleDownload} variant="secondary" className="flex-1 h-12">
              <Download weight="bold" />
              Download JSON ({jsonPart})
            </Button>
          </div>
          <div className="relative group">
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="outline" className="bg-surface/80 backdrop-blur">JSON Format: {jsonPart}</Badge>
            </div>
            <pre className="bg-surface p-8 rounded-2xl border border-bordercolor overflow-x-auto text-sm font-mono leading-relaxed max-h-[600px] shadow-inner">
              {generateFigmaJson(jsonPart)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
