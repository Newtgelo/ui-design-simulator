import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useTheme } from '@/context/ThemeContext';
import { getContrastRatio, checkWCAG, getLuminance, cn, hexToRgb, rgbToHex } from '@/lib/utils';
import { CheckCircle, XCircle, Info, Sun, Moon, TextAa } from '@phosphor-icons/react';

export const AccessibilitySection: React.FC = () => {
  const { primaryColor, bgColor: themeBgColor } = useTheme();
  
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

  const ScoreCard = ({ title, bgHex, fgHex, contrast, wcag, description }: any) => (
    <Card className="flex flex-col gap-2 p-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-xs">{title}</h4>
          <p className="text-[9px] text-muted leading-tight">{description}</p>
        </div>
        <div className="text-right flex-shrink-0 bg-bg/50 px-2 py-0.5 rounded border border-bordercolor">
          <span className="text-base font-bold block leading-none">{contrast.toFixed(2)}:1</span>
          <span className="text-[8px] text-muted font-mono uppercase tracking-widest">Ratio</span>
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

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-primary rounded-full"></span> Accessibility & Contrast (การเข้าถึงและความชัดเจน)
      </h3>
      
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
            />
            <ScoreCard 
              title="Primary on Light Surface" 
              description="สีหลักบนพื้นผิวย่อย เช่น Card (โหมดสว่าง)"
              bgHex={lightSurfaceColor} 
              fgHex={primaryColor} 
              contrast={lightContrastSurface} 
              wcag={wcagLightSurface} 
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
            />
            <ScoreCard 
              title="Primary on Dark Surface" 
              description="สีหลักบนพื้นผิวย่อย เช่น Card (โหมดมืด)"
              bgHex={darkSurfaceColor} 
              fgHex={primaryColor} 
              contrast={darkContrastSurface} 
              wcag={wcagDarkSurface} 
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
    </section>
  );
};
