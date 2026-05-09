import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { hexToRgb, generateScale, rgbToHex, cn } from '@/lib/utils';
import { Copy, Download, Check, FileJson } from '@phosphor-icons/react';

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
  const { primaryColor, secondaryColor, bgColor, borderRadius, shadowStyle, fontFamily, fontSizeBase, fontScale } = useTheme();
  const [activeView, setActiveView] = React.useState<'preview' | 'json'>('preview');
  const [copied, setCopied] = React.useState(false);

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
      { name: 'H1. Headline', weight: 'Semi Bold', size: getFontSize(4), line: Math.round(getFontSize(4) * 1.2), spacing: 0 },
      { name: 'H2. Headline', weight: 'Semi Bold', size: getFontSize(3), line: Math.round(getFontSize(3) * 1.2), spacing: 0 },
      { name: 'H3. Headline', weight: 'Semi Bold', size: getFontSize(2), line: Math.round(getFontSize(2) * 1.2), spacing: 0 },
      { name: 'H4. Headline', weight: 'Semi Bold', size: getFontSize(1.2), line: Math.round(getFontSize(1.2) * 1.2), spacing: 0 },
      { name: 'H5. Headline', weight: 'Semi Bold', size: getFontSize(0.5), line: Math.round(getFontSize(0.5) * 1.2), spacing: 0 },
    ],
    subtitles: [
      { name: 'S1. Subtitle', weight: 'Semi Bold', size: Math.round(fontSizeBase * 1.125), line: Math.round(fontSizeBase * 1.125 * 1.5), spacing: 0 },
      { name: 'S2. Subtitle', weight: 'Semi Bold', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
    ],
    body: [
      { name: 'B1. Body', weight: 'Regular', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'B2. Body', weight: 'Medium', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'B3. Body', weight: 'Regular', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
      { name: 'B4. Body', weight: 'Medium', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
    ],
    captions: [
      { name: 'C1. Caption', weight: 'Regular', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.3), spacing: 0 },
      { name: 'C2. Caption', weight: 'Medium', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.3), spacing: 0 },
      { name: 'C3. Caption', weight: 'Medium', size: Math.round(fontSizeBase / 1.6), line: Math.round((fontSizeBase / 1.6) * 1.3), spacing: 0 },
    ],
    buttons: [
      { name: 'Giant', weight: 'Semi Bold', size: Math.round(fontSizeBase * 1.125), line: Math.round(fontSizeBase * 1.125 * 1.5), spacing: 0 },
      { name: 'Large', weight: 'Semi Bold', size: fontSizeBase, line: Math.round(fontSizeBase * 1.5), spacing: 0 },
      { name: 'Medium', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.14), line: Math.round((fontSizeBase / 1.14) * 1.5), spacing: 0 },
      { name: 'Small', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.33), line: Math.round((fontSizeBase / 1.33) * 1.5), spacing: 0 },
      { name: 'Tiny', weight: 'Semi Bold', size: Math.round(fontSizeBase / 1.6), line: Math.round((fontSizeBase / 1.6) * 1.5), spacing: 0 },
    ]
  };

  const generateFigmaJson = () => {
    const json: any = {
      name: "Design System Tokens",
      collections: {
        Colors: {
          Primary: {},
          Secondary: {},
          Background: {},
          Neutral: {},
          Grey: {},
          Success: {},
          Danger: {},
          Warning: {},
          Info: {},
          BlackAlpha: {},
          WhiteAlpha: {}
        },
        Typography: {
            FontFamily: { value: fontFamily.replace('var(--font-', '').replace(')', ''), type: "fontFamily" },
            Headings: {},
            Subtitles: {},
            Body: {},
            Captions: {},
            Buttons: {}
        },
        Effects: {
          Shadows: {
            theme: { value: shadowStyle, type: "shadow" }
          },
          Radius: {
            theme: { value: `${borderRadius}px`, type: "dimension" }
          }
        }
      }
    };

    // Populate scales
    Object.entries(scales).forEach(([name, scale]) => {
      const key = name.charAt(0).toUpperCase() + name.slice(1);
      Object.entries(scale).forEach(([step, rgb]) => {
        json.collections.Colors[key][step] = {
          value: rgbToHex(rgb[0], rgb[1], rgb[2]),
          type: "color"
        };
      });
    });

    // Populate Alphas
    ALPHA_STEPS.forEach(step => {
      json.collections.Colors.BlackAlpha[`alpha${step}`] = {
        value: `rgba(0,0,0,${step / 100})`,
        type: "color"
      };
      json.collections.Colors.WhiteAlpha[`alpha${step}`] = {
        value: `rgba(255,255,255,${step / 100})`,
        type: "color"
      };
    });

    // Populate Typography
    Object.entries(typographyTokens).forEach(([category, tokens]) => {
        const key = category.charAt(0).toUpperCase() + category.slice(1);
        tokens.forEach(token => {
            const tokenName = token.name.split('.')[0].trim(); // e.g. "H1", "B1", "Giant"
            json.collections.Typography[key][tokenName] = {
                fontSize: { value: `${token.size}px`, type: "dimension" },
                fontWeight: { value: token.weight, type: "fontWeight" },
                lineHeight: { value: `${token.line}px`, type: "dimension" },
                letterSpacing: { value: `${token.spacing}px`, type: "dimension" }
            };
        });
    });

    return JSON.stringify(json, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFigmaJson());
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
                <div key={idx} className="grid grid-cols-12 gap-4 py-3 border-b border-bordercolor/30 items-center last:border-0">
                  <div 
                    className="col-span-6 truncate" 
                    style={{ 
                      fontSize: `${token.size}px`,
                      lineHeight: '1.2',
                      fontWeight: fontWeight,
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {token.name}
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🔵</span> Design System Export
          </h2>
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
            <div className="border-b border-bordercolor pb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Typography</h3>
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
          <div className="flex gap-4">
            <Button onClick={handleCopy} className="flex-1 h-12">
              {copied ? <Check weight="bold" className="text-success" /> : <Copy weight="bold" />}
              {copied ? 'Copied JSON!' : 'Copy to Clipboard'}
            </Button>
            <Button onClick={handleDownload} variant="secondary" className="flex-1 h-12">
              <Download weight="bold" />
              Download JSON
            </Button>
          </div>
          <div className="relative group">
            <div className="absolute top-4 right-4 z-10">
                <Badge variant="outline" className="bg-surface/80 backdrop-blur">JSON Format</Badge>
            </div>
            <pre className="bg-surface p-8 rounded-2xl border border-bordercolor overflow-x-auto text-sm font-mono leading-relaxed max-h-[600px] shadow-inner">
              {generateFigmaJson()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
