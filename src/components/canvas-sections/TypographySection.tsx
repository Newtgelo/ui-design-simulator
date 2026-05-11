import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export const TypographySection: React.FC = () => {
  const { fontFamily, fontSizeBase, fontScale } = useTheme();
  const [lang, setLang] = React.useState<'en' | 'th'>('en');

  const phrases = {
    en: {
      h1: "Design is the silent ambassador of your brand.",
      h2: "The details are not the details. They make the design.",
      h3: "Simplicity is the ultimate sophistication.",
      h4: "Everything is designed. Few things are designed well.",
      bodyL: "SysCraft helps you visualize your design system in real-time, providing a bridge between design and code.",
      bodyBase: "Design systems are the foundation of modern digital products. They ensure consistency, speed up development, and improve the user experience across all platforms.",
      bodySm: "A collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.",
      button: "Action Label",
      link: "Learn More",
      caption: "Last updated: Oct 24, 2024 • Version 2.0.4"
    },
    th: {
      h1: "การออกแบบคือทูตเงียบที่บ่งบอกตัวตนของแบรนด์คุณ",
      h2: "รายละเอียดไม่ใช่แค่ส่วนหนึ่งของงาน แต่มันคือตัวงานออกแบบ",
      h3: "ความเรียบง่ายคือความประณีตขั้นสูงสุดที่เหนือกว่าสิ่งใด",
      h4: "ทุกสิ่งถูกออกแบบไว้แล้ว แต่มีเพียงไม่กี่อย่างที่ถูกออกแบบมาดี",
      bodyL: "SysCraft ช่วยให้คุณเห็นภาพรวมของระบบการออกแบบแบบเรียลไทม์ เชื่อมต่อระหว่างงานออกแบบและโค้ดเข้าด้วยกัน",
      bodyBase: "ระบบการออกแบบเป็นรากฐานของผลิตภัณฑ์ดิจิทัลสมัยใหม่ ช่วยให้เกิดความสม่ำเสมอ เร่งความเร็วในการพัฒนา และปรับปรุงประสบการณ์ผู้ใช้ในทุกแพลตฟอร์ม",
      bodySm: "คอลเลกชันของส่วนประกอบที่นำกลับมาใช้ใหม่ได้ ซึ่งได้รับคำแนะนำตามมาตรฐานที่ชัดเจน สามารถประกอบเข้าด้วยกันเพื่อสร้างแอปพลิเคชันจำนวนเท่าใดก็ได้",
      button: "เริ่มต้นการใช้งาน",
      link: "เรียนรู้เพิ่มเติม",
      caption: "อัปเดตล่าสุด: 24 ต.ค. 2024 • เวอร์ชัน 2.0.4"
    }
  };
  
  // Calculate typography values for labels
  const getFontSize = (level: number) => Math.round(fontSizeBase * Math.pow(fontScale, level));
  const h1Px = getFontSize(4);
  const h2Px = getFontSize(3);
  const h3Px = getFontSize(2);
  const h4Px = getFontSize(1.2);
  const smPx = Math.round(fontSizeBase / 1.1);
  const xsPx = Math.round(fontSizeBase / 1.3);

  return (
    <section className="space-y-8">
      <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-info rounded-full"></span> Typography Scale (ระบบตัวอักษร)
      </h3>
      
      <Card className="p-0 overflow-hidden">
        <div className="bg-bg/30 p-4 border-b border-bordercolor flex justify-between items-center theme-transition flex-wrap gap-4">
          <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-tx uppercase tracking-widest">Type Specimen</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-bordercolor shadow-sm">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-tight">Language:</span>
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
          <Badge variant="info">Current Font: {fontFamily.replace('var(--font-', '').replace(')', '').replace('-', ' ')}</Badge>
        </div>
        
        <div className="p-8 space-y-12">
          {/* Headings */}
          <div className="space-y-6">
            <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] block mb-4">Headings (หัวข้อ)</label>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="w-16 text-[10px] font-mono text-muted flex-shrink-0">H1 / {h1Px}px</span>
                  <h1 className="font-bold leading-tight flex-1" style={{ fontSize: 'var(--font-size-h1)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].h1}</h1>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="w-16 text-[10px] font-mono text-muted flex-shrink-0">H2 / {h2Px}px</span>
                  <h2 className="font-bold leading-tight flex-1" style={{ fontSize: 'var(--font-size-h2)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].h2}</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="w-16 text-[10px] font-mono text-muted flex-shrink-0">H3 / {h3Px}px</span>
                  <h3 className="font-bold leading-tight flex-1" style={{ fontSize: 'var(--font-size-h3)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].h3}</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="w-16 text-[10px] font-mono text-muted flex-shrink-0">H4 / {h4Px}px</span>
                  <h4 className="font-bold leading-tight flex-1" style={{ fontSize: 'var(--font-size-h4)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].h4}</h4>
              </div>
            </div>
          </div>

          <hr className="border-bordercolor theme-transition" />

          {/* Body Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] block">Body Text (เนื้อหา)</label>
              <div className="space-y-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-muted mb-1">Body Large / {Math.round(fontSizeBase * 1.1)}px</p>
                    <p className="leading-relaxed" style={{ fontSize: 'calc(var(--font-size-base) * 1.1)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].bodyL}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-muted mb-1">Body Base / {fontSizeBase}px</p>
                    <p className="leading-relaxed text-tx/80" style={{ fontSize: 'var(--font-size-base)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].bodyBase}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-muted mb-1">Body Small / {smPx}px</p>
                    <p className="leading-relaxed text-muted" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-theme)' }}>{phrases[lang].bodySm}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] block">Functional & Utility (การใช้งานทั่วไป)</label>
              <div className="space-y-8">
                <div className="flex items-center gap-8">
                    <div className="flex-1">
                      <p className="text-[10px] font-mono text-muted mb-1">Button Text</p>
                      <Button className="w-full">{phrases[lang].button}</Button>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-mono text-muted mb-1">Link Label / {smPx}px</p>
                      <span className="font-bold text-primary underline cursor-pointer" style={{ fontSize: 'var(--font-size-sm)' }}>{phrases[lang].link} &rarr;</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-muted mb-1">Caption / {xsPx}px</p>
                    <p className="text-muted/60 font-medium" style={{ fontSize: 'var(--font-size-xs)' }}>{phrases[lang].caption}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-mono text-muted mb-1">Overline / 10px</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">Analytics Dashboard Overview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
