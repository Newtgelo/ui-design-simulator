"use client";

import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Alert } from './ui/Alert';
import { Badge } from './ui/Badge';
import { Tabs } from './ui/Tabs';
import { Users, RocketLaunch, MagnifyingGlass, Spinner, DotsThreeOutlineVertical, Copy, Check, ChartLineUp, Envelope, House, CaretRight, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useTheme } from '@/context/ThemeContext';
import { hexToRgb, generateScale, rgbToHex } from '@/lib/utils';

export const Canvas: React.FC = () => {
  const { primaryColor } = useTheme();
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('all');

  const pRgb = hexToRgb(primaryColor);
  const pScale = generateScale(pRgb);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-bg theme-transition relative">
      {/* Canvas Header */}
      <header className="sticky top-0 z-10 bg-bg/80 backdrop-blur-md border-b border-bordercolor px-8 py-4 flex justify-between items-center theme-transition">
        <h2 className="font-medium">Live Canvas</h2>
        <div className="flex gap-2">
          <span className="text-xs px-3 py-1.5 bg-surface border border-bordercolor rounded-[var(--radius-theme)] theme-transition font-medium">
            Next.js Preview
          </span>
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">

        {/* Color Palette Scale */}
        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold">Color Palette Scale</h3>
            <p className="text-sm text-muted mt-1 theme-transition">Auto-generated 11-step color scales based on your color selections.</p>
          </div>
          <div className="flex h-12 w-full rounded-[var(--radius-theme)] overflow-hidden border border-bordercolor shadow-sm cursor-pointer relative group">
            {Object.entries(pScale).map(([step, rgb]) => {
              const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
              // Calculate luminance to decide text color (white or black)
              const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
              const textColor = luminance > 0.5 ? 'text-black/60' : 'text-white/80';

              return (
                <div
                  key={step}
                  className="flex-1 theme-transition relative flex items-end justify-center pb-1.5"
                  style={{ backgroundColor: hex }}
                  title={`Click to copy: ${hex}`}
                  onClick={() => copyToClipboard(hex)}
                >
                  <span className={`text-[12px] font-mono font-bold tracking-tighter pointer-events-none uppercase ${textColor}`}>
                    {hex}
                  </span>
                  {copiedColor === hex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white animate-in fade-in zoom-in duration-200">
                      <Check weight="bold" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Copied Toast */}
            {copiedColor && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-tx text-surface px-3 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
                <Check className="text-success" weight="bold" /> Copied: {copiedColor.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex justify-between text-[10px] text-muted mt-1 px-1">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
              <span key={step} className={step === 500 ? "font-bold text-primary" : ""}>
                {step === 500 ? "500 Primary" : step}
              </span>
            ))}
          </div>
        </section>

        {/* Component Showcase Tabs */}
        <section className="mt-8 pt-8 border-t border-bordercolor theme-transition">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Component Showcase</h2>
              <p className="text-sm text-muted mt-1 theme-transition">Explore and test individual components with your design language.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-bordercolor pb-4 mb-8 theme-transition">
            {[
              { id: 'all', label: 'All (ภาพรวม)' },
              { id: 'dashboard', label: 'Dashboard (แดชบอร์ด)' },
              { id: 'mockups', label: 'Mockups (ม็อคอัพ)' },
              { id: 'forms', label: 'Forms (ฟอร์ม & ปุ่ม)' },
              { id: 'navigation', label: 'Navigation (การนำทาง)' },
              { id: 'data', label: 'Data Display (ข้อมูล)' },
              { id: 'feedback', label: 'Feedback (สถานะ)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                  ? 'bg-primary text-[var(--color-primary-foreground)] shadow-[var(--shadow-theme)]' 
                  : 'bg-transparent text-muted hover:bg-bordercolor hover:text-tx'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            
            {/* Dashboard Cards Section */}
            {(activeTab === 'all' || activeTab === 'dashboard') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full"></span> Dashboard Widgets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-[var(--radius-theme)] bg-primary/10 text-primary flex items-center justify-center text-2xl theme-transition">
                        <Users weight="fill" />
                      </div>
                      <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-[var(--radius-theme)] flex items-center gap-1 theme-transition">
                        +12.5%
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted font-medium theme-transition">Total Active Users (ผู้ใช้งานทั้งหมด)</p>
                      <h4 className="text-3xl font-bold mt-1">24,592</h4>
                    </div>
                  </Card>

                  <Card className="flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold flex items-center gap-2">
                        <RocketLaunch weight="fill" className="text-secondary" /> Upgrade Plan (อัปเกรดแผน)
                      </h4>
                      <p className="text-sm text-muted mt-2 theme-transition">Get access to premium features. (เข้าถึงฟีเจอร์พรีเมียมแบบครบครัน)</p>
                    </div>
                    <Button variant="secondary" className="mt-4">Upgrade Now (อัปเกรดเลย)</Button>
                  </Card>

                  <Card title="Admin Login (เข้าสู่ระบบผู้ดูแล)">
                    <div className="space-y-3">
                      <Input label="Email (อีเมล)" defaultValue="admin@syscraft.io" />
                      <Input label="Password (รหัสผ่าน)" type="password" defaultValue="password123" />
                      <Button className="w-full">Sign In (เข้าสู่ระบบ)</Button>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            {/* Mockups Section */}
            {(activeTab === 'all' || activeTab === 'mockups') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full"></span> Mockup Components (Card Varieties)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Product Card */}
                  <div className="group bg-surface rounded-[var(--radius-theme)] border border-bordercolor overflow-hidden shadow-[var(--shadow-theme)] theme-transition hover:translate-y-[-4px] transition-all duration-300">
                    <div className="aspect-square bg-bg overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1714418641975-47021e16428c?auto=format&fit=crop&q=80&w=800" 
                        alt="Product" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3" variant="primary">New Arrival</Badge>
                    </div>
                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="font-bold text-lg">Premium Headphones Pro</h4>
                        <p className="text-xs text-muted">Acoustic Engineering Series</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">$299.00</span>
                        <div className="flex gap-1">
                           {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary/20"></div>)}
                        </div>
                      </div>
                      <Button className="w-full">Add to Cart</Button>
                    </div>
                  </div>

                  {/* Profile Card */}
                  <Card className="flex flex-col items-center text-center p-8 space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden shadow-lg">
                        <img 
                          src="/assets/avatar.png" 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-success border-4 border-surface rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Elena Rodriguez</h4>
                      <p className="text-sm text-muted">Senior Product Designer</p>
                    </div>
                    <div className="flex gap-4 w-full pt-2">
                      <Button variant="outline" className="flex-1">Message</Button>
                      <Button className="flex-1">Follow</Button>
                    </div>
                    <div className="flex justify-around w-full pt-4 border-t border-bordercolor mt-4 theme-transition">
                      <div>
                        <p className="text-lg font-bold">1.2k</p>
                        <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Posts</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">45k</p>
                        <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Followers</p>
                      </div>
                    </div>
                  </Card>

                  {/* Newsletter Card */}
                  <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center space-y-6 p-8">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-primary text-[var(--color-primary-foreground)] rounded-[var(--radius-theme)] flex items-center justify-center shadow-lg">
                        <Envelope size={24} weight="fill" />
                      </div>
                      <h4 className="text-xl font-bold">Subscribe to Newsletter</h4>
                      <p className="text-sm text-muted leading-relaxed">Get the latest design system tips and UI components delivered to your inbox.</p>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="your@email.com" className="bg-surface" />
                      <Button className="w-full shadow-lg shadow-primary/20">Subscribe Now</Button>
                    </div>
                    <p className="text-[10px] text-center text-muted">No spam, ever. Unsubscribe anytime.</p>
                  </Card>

                  {/* Horizontal Card */}
                  <div className="md:col-span-2 lg:col-span-3 bg-surface border border-bordercolor rounded-[var(--radius-theme)] overflow-hidden shadow-[var(--shadow-theme)] theme-transition flex flex-col md:flex-row h-full md:h-48 hover:border-primary/50 transition-colors">
                    <div className="w-full md:w-72 bg-primary/10 flex items-center justify-center p-8">
                       <ChartLineUp size={64} weight="duotone" className="text-primary opacity-80" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                       <div className="space-y-1">
                         <div className="flex justify-between items-start">
                           <Badge variant="info" className="mb-1">Advanced Analytics</Badge>
                           <span className="text-[10px] text-muted font-bold tracking-widest">LAST UPDATED: 2H AGO</span>
                         </div>
                         <h4 className="text-xl font-bold">Real-time Performance Monitoring</h4>
                         <p className="text-sm text-muted max-w-xl">Monitor your application's health, traffic patterns, and user engagement metrics in a single consolidated dashboard with advanced visualization tools.</p>
                       </div>
                       <div className="flex gap-4 items-center pt-4">
                         <Button variant="ghost" className="px-0 text-primary font-bold hover:bg-transparent hover:underline">View Detailed Report &rarr;</Button>
                       </div>
                    </div>
                  </div>
                </div>
              </section>
            )}


            {/* Forms Section */}
            {(activeTab === 'all' || activeTab === 'forms') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-secondary rounded-full"></span> Forms & Buttons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Button Variants</label>
                      <div className="flex flex-wrap gap-3">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Button States</label>
                      <div className="flex flex-wrap gap-3">
                        <Button isLoading>Loading</Button>
                        <Button variant="danger">Danger</Button>
                        <Button disabled>Disabled</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Input Fields</label>
                      <div className="space-y-4">
                        <Input label="Standard Input (ฟอร์มปกติ)" placeholder="Enter text..." />
                        <Input 
                          label="Search Input (ฟอร์มค้นหา)" 
                          placeholder="Search users..." 
                          icon={<MagnifyingGlass />}
                        />
                        <Input 
                          label="Error State (แจ้งเตือนข้อผิดพลาด)" 
                          defaultValue="wrong@email" 
                          error="Invalid email address (รูปแบบอีเมลไม่ถูกต้อง)" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Feedback Section */}
            {(activeTab === 'all' || activeTab === 'feedback') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-danger rounded-full"></span> Feedback & Alerts
                </h3>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Alert Variants</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Alert type="success" title="Payment Successful (ชำระเงินสำเร็จ)" message="Your receipt has been sent to your email. (ใบเสร็จถูกส่งไปยังอีเมลของคุณแล้ว)" />
                    <Alert type="warning" title="Warning (คำเตือน)" message="Please check your connection. (กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต)" />
                    <Alert type="danger" title="Error (เกิดข้อผิดพลาด)" message="Failed to save data. (ไม่สามารถบันทึกข้อมูลได้)" />
                    <Alert type="info" title="New Update (อัปเดตใหม่)" message="Version 2.0 is available. (มีเวอร์ชัน 2.0 พร้อมให้ดาวน์โหลดแล้ว)" />
                  </div>
                </div>
              </section>
            )}

            {/* Navigation Section */}
            {(activeTab === 'all' || activeTab === 'navigation') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-info rounded-full"></span> Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Tabs</label>
                      <Tabs 
                        tabs={[
                          { id: '1', label: 'Overview (ภาพรวม)', icon: <House size={16} /> },
                          { id: '2', label: 'Analytics (วิเคราะห์)', icon: <ChartLineUp size={16} /> },
                          { id: '3', label: 'Messages (ข้อความ)', icon: <Envelope size={16} /> }
                        ]} 
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Breadcrumbs</label>
                      <nav className="flex items-center gap-2 text-sm text-muted font-medium theme-transition bg-surface p-4 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)]">
                        <span className="hover:text-primary cursor-pointer flex items-center gap-1"><House size={16}/> Home</span>
                        <CaretRight size={14} />
                        <span className="hover:text-primary cursor-pointer">Project</span>
                        <CaretRight size={14} />
                        <span className="text-tx">Design System</span>
                      </nav>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Pagination</label>
                      <div className="flex items-center gap-2 bg-surface p-4 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)] w-fit">
                        <Button variant="outline" className="p-2 h-9 w-9"><ArrowLeft size={16} /></Button>
                        {[1, 2, 3].map(n => (
                          <Button key={n} variant={n === 1 ? 'primary' : 'ghost'} className="h-9 w-9 text-sm">{n}</Button>
                        ))}
                        <div className="text-muted px-2 font-bold">...</div>
                        <Button variant="outline" className="p-2 h-9 w-9"><ArrowRight size={16} /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Data Display Section */}
            {(activeTab === 'all' || activeTab === 'data') && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
                  <span className="w-2 h-6 bg-warning rounded-full"></span> Data Display
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Status Badges</label>
                    <div className="flex flex-wrap gap-3 bg-surface p-6 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)]">
                      <Badge variant="primary">New (ใหม่)</Badge>
                      <Badge variant="success">Completed (เสร็จสิ้น)</Badge>
                      <Badge variant="warning">Pending (รอดำเนินการ)</Badge>
                      <Badge variant="danger">High (สำคัญมาก)</Badge>
                      <Badge variant="info">Update (อัปเดต)</Badge>
                      <Badge variant="outline">Draft (ร่าง)</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Data Table</label>
                    <div className="overflow-hidden border border-bordercolor rounded-[var(--radius-theme)] shadow-[var(--shadow-theme)] theme-transition bg-surface">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-bg/50 border-b border-bordercolor theme-transition">
                            <th className="p-4 font-semibold text-muted">User (ผู้ใช้)</th>
                            <th className="p-4 font-semibold text-muted">Status (สถานะ)</th>
                            <th className="p-4 font-semibold text-muted">Role (บทบาท)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-bordercolor theme-transition">
                          {[
                            { name: 'Alex Johnson', status: 'Active', role: 'Admin', variant: 'success' },
                            { name: 'Sarah Connor', status: 'Pending', role: 'Editor', variant: 'warning' },
                            { name: 'John Doe', status: 'Inactive', role: 'Viewer', variant: 'outline' }
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-bg/50 transition-colors">
                              <td className="p-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shadow-sm">
                                  {row.name.charAt(0)}
                                </div>
                                <span className="font-medium">{row.name}</span>
                              </td>
                              <td className="p-4"><Badge variant={row.variant as any}>{row.status}</Badge></td>
                              <td className="p-4 text-muted">{row.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Progress & Elements</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-6 rounded-[var(--radius-theme)] border border-bordercolor shadow-[var(--shadow-theme)]">
                      <div>
                        <div className="flex justify-between text-sm mb-2 theme-transition">
                          <span className="font-bold">Storage Used (พื้นที่จัดเก็บ)</span>
                          <span className="text-primary font-bold">75%</span>
                        </div>
                        <div className="w-full bg-bordercolor h-3 rounded-full overflow-hidden theme-transition shadow-inner">
                          <div className="bg-primary h-full rounded-full transition-all duration-500 theme-transition" style={{ width: '75%' }}></div>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-sm block mb-2">Avatar Stack (ซ้อนโปรไฟล์)</span>
                        <div className="flex -space-x-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-full border-2 border-surface bg-primary text-[var(--color-primary-foreground)] flex items-center justify-center font-bold text-sm theme-transition shadow-sm z-10"
                            >
                              {i}
                            </div>
                          ))}
                          <div className="flex items-center justify-center w-10 h-10 text-xs font-bold text-muted bg-bordercolor border-2 border-surface rounded-full theme-transition shadow-sm">
                            +5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};
