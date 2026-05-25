import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { getContrastRatio, checkWCAG, getLuminance, cn, hexToRgb, rgbToHex, findCompliantColor } from '@/lib/utils';
import { CheckCircle, XCircle, Info, Sun, Moon, TextAa, Sparkle, CaretDown, CaretUp } from '@phosphor-icons/react';

export const AccessibilitySection: React.FC = () => {
  const { primaryColor, setPrimaryColor, bgColor: themeBgColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // --- Light Mode Calculations ---
  const lightBgColor = themeBgColor;
  let lightSurfaceColor = '#ffffff';
  const { r: lr, g: lg, b: lb } = hexToRgb(lightBgColor);
  const lightBgLum = (0.299 * lr + 0.587 * lg + 0.114 * lb) / 255;
  if (lightBgLum <= 0.92) {
    lightSurfaceColor = rgbToHex(Math.min(255, lr + 8), Math.min(255, lg + 8), Math.min(255, lb + 8));
  }
  const lightContrastBg = getContrastRatio(primaryColor, lightBgColor);
  const lightContrastSurface = getContrastRatio(primaryColor, lightSurfaceColor);

  const wcagLightBg = checkWCAG(lightContrastBg);
  const wcagLightSurface = checkWCAG(lightContrastSurface);

  // --- Dark Mode Calculations ---
  const darkBgColor = '#09090b';
  const darkSurfaceColor = '#18181b';
  const darkContrastBg = getContrastRatio(primaryColor, darkBgColor);
  const darkContrastSurface = getContrastRatio(primaryColor, darkSurfaceColor);

  const wcagDarkBg = checkWCAG(darkContrastBg);
  const wcagDarkSurface = checkWCAG(darkContrastSurface);
  
  // --- Text on Primary ---
  const pLuminance = getLuminance(primaryColor);
  const fgColor = pLuminance > 0.55 ? '#000000' : '#ffffff';
  const contrastFg = getContrastRatio(fgColor, primaryColor);
  const wcagFg = checkWCAG(contrastFg);

  const ScoreCard = ({ title, bgHex, fgHex, contrast, wcag, description, onFix }: any) => (
    <Card className="flex flex-col gap-2 p-3">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h4 className="font-bold text-xs">{title}</h4>
          <p className="text-[9px] text-muted leading-tight">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {contrast < 4.5 && onFix && (
            <Button 
              variant="ghost" 
              className="h-7 px-2 text-[9px] bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 animate-pulse-subtle"
              onClick={onFix}
              title="Click to find a compliant color"
            >
              <Sparkle weight="fill" size={10} className="mr-1" /> Fix Color
            </Button>
          )}
          <div className="text-right flex-shrink-0 bg-bg/50 px-2 py-0.5 rounded border border-bordercolor">
            <span className="text-base font-bold block leading-none">{contrast.toFixed(2)}:1</span>
            <span className="text-[8px] text-muted font-mono uppercase tracking-widest">Ratio</span>
          </div>
        </div>
      </div>

      <div className="flex rounded-md overflow-hidden h-10 border border-bordercolor shadow-sm">
        <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: bgHex }}>
          <span className="font-bold text-lg" style={{ color: fgHex }}>Aa</span>
        </div>
        <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: fgHex }}>
          <span className="font-bold text-lg" style={{ color: bgHex }}>Aa</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {/* Normal AA */}
        <div className={cn("relative group p-1.5 rounded border flex flex-col items-center justify-center text-center cursor-help transition-colors", wcag.normalAA ? "bg-success/10 border-success/20 text-success hover:bg-success/20" : "bg-danger/10 border-danger/20 text-danger hover:bg-danger/20")}>
          <div className="flex items-center gap-1">
            {wcag.normalAA ? <CheckCircle weight="fill" size={14} /> : <XCircle weight="fill" size={14} />}
            <span className="text-[8px] font-bold uppercase tracking-wider">Normal</span>
          </div>
          
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-tx text-surface text-[10px] rounded-[var(--radius-theme)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none text-left leading-relaxed">
            <strong className="block text-[11px] mb-1 text-[var(--color-primary)]">Normal AA (4.5:1)</strong>
            สำหรับ <b>"ตัวหนังสือขนาดปกติ"</b> (เล็กกว่า 18pt) ต้องมีคะแนนอย่างน้อย 4.5:1 เพื่อให้คนทั่วไปอ่านได้โดยไม่ต้องเพ่ง
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-tx rotate-45"></div>
          </div>
        </div>

        {/* Large AA */}
        <div className={cn("relative group p-1.5 rounded border flex flex-col items-center justify-center text-center cursor-help transition-colors", wcag.largeAA ? "bg-success/10 border-success/20 text-success hover:bg-success/20" : "bg-danger/10 border-danger/20 text-danger hover:bg-danger/20")}>
          <div className="flex items-center gap-1">
            {wcag.largeAA ? <CheckCircle weight="fill" size={14} /> : <XCircle weight="fill" size={14} />}
            <span className="text-[8px] font-bold uppercase tracking-wider">Large</span>
          </div>
          
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-tx text-surface text-[10px] rounded-[var(--radius-theme)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none text-left leading-relaxed">
            <strong className="block text-[11px] mb-1 text-[var(--color-primary)]">Large AA (3.0:1)</strong>
            สำหรับ <b>"หัวข้อ/ตัวหนังสือใหญ่"</b> (18pt ขึ้นไป) หรือตัวหนา 14pt ขึ้นไป เนื่องจากใหญ่พอจึงอ่านง่ายกว่า เลยต้องการคะแนนแค่ 3.0:1
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-tx rotate-45"></div>
          </div>
        </div>

        {/* UI Object */}
        <div className={cn("relative group p-1.5 rounded border flex flex-col items-center justify-center text-center cursor-help transition-colors", wcag.uiComponent ? "bg-success/10 border-success/20 text-success hover:bg-success/20" : "bg-danger/10 border-danger/20 text-danger hover:bg-danger/20")}>
          <div className="flex items-center gap-1">
            {wcag.uiComponent ? <CheckCircle weight="fill" size={14} /> : <XCircle weight="fill" size={14} />}
            <span className="text-[8px] font-bold uppercase tracking-wider">UI Obj</span>
          </div>
          
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-tx text-surface text-[10px] rounded-[var(--radius-theme)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none text-left leading-relaxed">
            <strong className="block text-[11px] mb-1 text-[var(--color-primary)]">UI Object (3.0:1)</strong>
            สำหรับ <b>"สิ่งที่ไม่ใช่ตัวอักษร"</b> เช่น ขอบปุ่ม, รูปไอคอน, หรือสีกราฟ ต้องมีคะแนนอย่างน้อย 3.0:1 เพื่อให้ผู้ใช้มองเห็นและกดได้
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-tx rotate-45"></div>
          </div>
        </div>
      </div>
    </Card>
  );

  const passCount = [
    wcagLightBg.normalAA,
    wcagLightSurface.normalAA,
    wcagDarkBg.normalAA,
    wcagDarkSurface.normalAA,
    wcagFg.normalAA
  ].filter(Boolean).length;

  const totalChecks = 5;
  const isFullyCompliant = passCount === totalChecks;
  const isPartiallyCompliant = passCount >= 3;

  return (
    <section className="bg-surface/40 border border-bordercolor/60 rounded-2xl p-6 theme-transition space-y-4 shadow-sm hover:border-primary/20 transition-all duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer select-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-tx group-hover:text-primary transition-colors flex items-center gap-2">
              Accessibility & Contrast (การเข้าถึงและความชัดเจน)
            </h3>
            <p className="text-xs text-muted mt-0.5 hidden sm:block">
              ตรวจสอบการตัดกันของสีตามมาตรฐาน WCAG 2.1 สำหรับสีหลักและสีพื้นหลังต่างๆ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Status Badge */}
          <span className={cn(
            "text-[10px] font-bold px-2.5 py-1 rounded-full border theme-transition",
            isFullyCompliant 
              ? "bg-success/10 border-success/20 text-success" 
              : isPartiallyCompliant 
                ? "bg-warning/10 border-warning/20 text-warning" 
                : "bg-danger/10 border-danger/20 text-danger"
          )}>
            {isFullyCompliant 
              ? `🟢 ผ่านเกณฑ์ทั้งหมด (${passCount}/${totalChecks})` 
              : isPartiallyCompliant 
                ? `🟡 ผ่านบางส่วน (${passCount}/${totalChecks})` 
                : `🔴 ค่าความต่างสีต่ำ (${passCount}/${totalChecks})`
            }
          </span>
          <span className="text-muted group-hover:text-primary transition-colors">
            {isOpen ? <CaretUp weight="bold" size={16} /> : <CaretDown weight="bold" size={16} />}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="pt-6 border-t border-bordercolor/40 space-y-6 animate-in fade-in duration-300">
          <div className="bg-info/10 text-info border border-info/20 p-4 rounded-[var(--radius-theme)] flex items-start gap-3">
            <Info size={24} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">มาตรฐานการตัดกันของสี (WCAG 2.1 Contrast Guidelines)</h4>
              <p className="text-xs mt-1 opacity-90 leading-relaxed">
                ตรวจสอบว่าสีหลักที่คุณเลือกมีความชัดเจนเพียงพอเมื่ออยู่บนพื้นหลังต่างๆ หรือไม่ 
                การที่สีตัดกันอย่างชัดเจนจะช่วยให้ผู้ที่มีปัญหาทางสายตาสามารถอ่านตัวหนังสือและใช้งานปุ่มต่างๆ ได้ง่ายขึ้น
              </p>
            </div>
          </div>

          <div className="space-y-8 mt-6">
            <div>
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-tx"><Sun size={20} className="text-warning" weight="fill" /> Light Mode Performance</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreCard 
                  title="Primary on Light BG" 
                  description="สีหลักบนพื้นหลังแอป (โหมดสว่าง)"
                  bgHex={lightBgColor} 
                  fgHex={primaryColor} 
                  contrast={lightContrastBg} 
                  wcag={wcagLightBg} 
                  onFix={() => setPrimaryColor(findCompliantColor(primaryColor, lightBgColor))}
                />
                <ScoreCard 
                  title="Primary on Light Surface" 
                  description="สีหลักบนพื้นผิวย่อย เช่น Card (โหมดสว่าง)"
                  bgHex={lightSurfaceColor} 
                  fgHex={primaryColor} 
                  contrast={lightContrastSurface} 
                  wcag={wcagLightSurface} 
                  onFix={() => setPrimaryColor(findCompliantColor(primaryColor, lightSurfaceColor))}
                />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-tx"><Moon size={20} className="text-primary" weight="fill" /> Dark Mode Performance</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreCard 
                  title="Primary on Dark BG" 
                  description="สีหลักบนพื้นหลังแอป (โหมดมืด)"
                  bgHex={darkBgColor} 
                  fgHex={primaryColor} 
                  contrast={darkContrastBg} 
                  wcag={wcagDarkBg} 
                  onFix={() => setPrimaryColor(findCompliantColor(primaryColor, darkBgColor))}
                />
                <ScoreCard 
                  title="Primary on Dark Surface" 
                  description="สีหลักบนพื้นผิวย่อย เช่น Card (โหมดมืด)"
                  bgHex={darkSurfaceColor} 
                  fgHex={primaryColor} 
                  contrast={darkContrastSurface} 
                  wcag={wcagDarkSurface} 
                  onFix={() => setPrimaryColor(findCompliantColor(primaryColor, darkSurfaceColor))}
                />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-tx"><TextAa size={20} className="text-muted" weight="fill" /> Component Performance</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreCard 
                  title="Text on Primary" 
                  description="ข้อความบนสีหลัก (เช่น สีข้อความที่อยู่ข้างในปุ่มหรือป้าย)"
                  bgHex={primaryColor} 
                  fgHex={fgColor} 
                  contrast={contrastFg} 
                  wcag={wcagFg} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
