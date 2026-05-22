import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { cn } from '@/lib/utils';
import { 
  Monitor, 
  DeviceMobile, 
  Layout, 
  House, 
  ChartPie, 
  Users, 
  Gear, 
  Bell, 
  MagnifyingGlass,
  Plus,
  CaretRight,
  DotsThreeVertical,
  CheckCircle,
  Star,
  CurrencyDollar,
  Briefcase,
  ArrowRight,
  List,
  UserCircle
} from '@phosphor-icons/react';

export const PageTemplatesSection: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<'dashboard' | 'landing' | 'mobile' | 'ecommerce' | 'saas' | 'portfolio'>('dashboard');
  const { primaryColor, secondaryColor, borderRadius, fontFamily, isDarkMode } = useTheme();

  const TemplateHeader = () => (
    <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl font-bold">Page Templates</h2>
        <p className="text-muted mt-2">See your design system applied to full-page layouts and real-world scenarios.</p>
      </div>
      <div className="flex bg-surface border border-bordercolor rounded-2xl p-1 shadow-sm overflow-x-auto scrollbar-none flex-nowrap shrink-0 max-w-full">
        <button 
          onClick={() => setActiveTemplate('dashboard')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'dashboard' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTemplate('landing')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'landing' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          Brand Landing
        </button>
        <button 
          onClick={() => setActiveTemplate('ecommerce')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'ecommerce' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          E-commerce
        </button>
        <button 
          onClick={() => setActiveTemplate('saas')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'saas' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          SaaS
        </button>
        <button 
          onClick={() => setActiveTemplate('portfolio')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'portfolio' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          Portfolio
        </button>
        <button 
          onClick={() => setActiveTemplate('mobile')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
            activeTemplate === 'mobile' ? "bg-primary text-white shadow-lg" : "text-muted hover:text-tx"
          )}
        >
          Mobile
        </button>
      </div>
    </div>
  );

  const DashboardTemplate = () => (
    <div className="w-full min-h-[600px] border border-bordercolor rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-bg shadow-2xl animate-in zoom-in-95 duration-500">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-bordercolor flex flex-col p-6 space-y-8 bg-surface shrink-0">
        <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white not-italic">S</div>
          SysCraft
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { icon: <House />, label: 'Home', active: true },
            { icon: <ChartPie />, label: 'Analytics' },
            { icon: <Users />, label: 'Customers' },
            { icon: <Gear />, label: 'Settings' },
          ].map((item, i) => (
            <button 
              key={i}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                item.active ? "bg-primary text-white shadow-lg" : "text-muted hover:bg-bg hover:text-tx"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Pro Plan</p>
          <p className="text-xs text-muted leading-tight mb-3">Get unlimited access to all premium features.</p>
          <Button size="sm" className="w-full text-[10px]">Upgrade Now</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg/50">
        <header className="h-auto min-h-16 py-3 border-b border-bordercolor px-4 md:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface/50 backdrop-blur-md">
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <Input className="pl-10 h-9 text-xs" placeholder="Search anything..." />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted hover:text-primary transition-colors"><Bell size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30"></div>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Dashboard Overview</h3>
              <p className="text-sm text-muted">Welcome back! Here's what's happening today.</p>
            </div>
            <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <Plus weight="bold" /> Create New
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: <CurrencyDollar /> },
              { label: 'Active Users', value: '+2,350', change: '+180.1%', icon: <Users /> },
              { label: 'Sales', value: '+12,234', change: '+19%', icon: <ChartPie /> },
            ].map((stat, i) => (
              <Card key={i} className="p-6 space-y-2">
                <div className="flex items-center justify-between text-muted">
                  <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                  <span className="text-primary">{stat.icon}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black">{stat.value}</span>
                  <span className="text-xs text-success font-bold">{stat.change}</span>
                </div>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="p-6 border-b border-bordercolor flex items-center justify-between">
              <h4 className="font-bold">Recent Transactions</h4>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="divide-y divide-bordercolor/30">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-bg/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Alex Johnson</p>
                      <p className="text-[10px] text-muted">alex@example.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-success border-success/20 bg-success/5">Completed</Badge>
                  <p className="font-bold text-sm">+$250.00</p>
                  <button className="text-muted"><DotsThreeVertical size={20} /></button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );

  const LandingTemplate = () => (
    <div className="w-full min-h-[600px] border border-bordercolor rounded-2xl overflow-hidden bg-bg shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-500">
      <nav className="px-4 md:px-12 h-auto py-4 md:h-20 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-bordercolor/50 bg-surface/30">
        <div className="flex items-center gap-2 font-black text-2xl italic tracking-tighter">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white not-italic text-lg">S</div>
          SysCraft
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button className="hover:text-primary transition-colors">Product</button>
          <button className="hover:text-primary transition-colors">Solutions</button>
          <button className="hover:text-primary transition-colors">Pricing</button>
          <button className="hover:text-primary transition-colors">About</button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -top-1/2 left-1/2 -translate-x-1/2 w-full h-full -z-10"></div>
        <Badge variant="outline" className="text-primary border-primary/20 px-4 py-1">New Feature: Variable Support ✨</Badge>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] max-w-4xl">
          Build <span className="text-primary">Beautiful</span> Design Systems <span className="italic font-serif text-secondary">Faster.</span>
        </h1>
        <p className="text-base md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform to simulate, validate, and export production-ready design tokens to your favorite tools.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <Button size="lg" className="h-14 px-8 text-lg flex items-center justify-center gap-2 w-full sm:w-auto">
            Start Designing <ArrowRight weight="bold" />
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">Watch Demo</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-10 md:pt-20 w-full max-w-5xl">
            {[
              { icon: <CheckCircle />, title: 'W3C Compliant' },
              { icon: <Plus />, title: 'Variable Export' },
              { icon: <Layout />, title: 'Grid Control' },
              { icon: <Users />, title: 'Team Sync' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-surface border border-bordercolor flex items-center justify-center text-primary shadow-sm">
                  {feature.icon}
                </div>
                <p className="text-sm font-bold">{feature.title}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );

  const MobileTemplate = () => (
    <div className="w-full flex justify-center py-12 bg-surface/50 rounded-2xl border border-bordercolor overflow-hidden relative animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-100),_transparent)] opacity-10"></div>
      
      {/* Phone Frame */}
      <div className="w-[320px] h-[640px] bg-bg border-[8px] border-tx rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-tx rounded-b-2xl z-50"></div>
        
        {/* Content */}
        <header className="pt-10 pb-4 px-6 flex items-center justify-between">
          <button className="w-10 h-10 rounded-full bg-surface border border-bordercolor flex items-center justify-center text-muted">
            <List size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Plus size={20} weight="bold" />
          </div>
        </header>

        <div className="px-6 flex-1 overflow-y-auto space-y-6 pb-20">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Wallet</h2>
            <p className="text-sm text-muted">Check your balance and activity.</p>
          </div>

          <Card className="p-6 bg-primary text-white space-y-6 shadow-xl shadow-primary/25 relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Current Balance</span>
              <div className="w-8 h-5 rounded-md bg-white/20"></div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black">$12,450.00</p>
              <p className="text-[10px] font-bold opacity-60">**** **** **** 4567</p>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold">Recent Spending</h4>
              <button className="text-xs text-primary font-bold">See All</button>
            </div>
            {[
              { icon: <ChartPie />, label: 'Groceries', amount: '-$84.00' },
              { icon: <Briefcase />, label: 'Transport', amount: '-$12.50' },
              { icon: <Star />, label: 'Subscription', amount: '-$19.00' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface border border-bordercolor rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg border border-bordercolor flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                <span className="text-sm font-black">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Bar */}
        <div className="absolute bottom-6 left-6 right-6 h-16 bg-surface/90 backdrop-blur-md border border-bordercolor rounded-2xl shadow-xl flex items-center justify-around px-2">
            {[
              <House weight="fill" size={20} key="house" />,
              <ChartPie size={20} key="chart" />,
              <Users size={20} key="users" />,
              <Gear size={20} key="gear" />
            ].map((icon, i) => (
                <button key={i} className={cn(
                    "p-3 rounded-xl transition-all",
                    i === 0 ? "text-primary bg-primary/10" : "text-muted hover:text-tx"
                )}>
                    {icon}
                </button>
            ))}
        </div>
      </div>
    </div>
  );

  const EcommerceTemplate = () => (
    <div className="w-full min-h-[600px] border border-bordercolor rounded-2xl overflow-hidden bg-bg shadow-2xl flex flex-col animate-in zoom-in-95 duration-500">
      <nav className="px-4 md:px-8 py-3 md:py-0 md:h-16 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-bordercolor bg-surface/50 backdrop-blur-md">
        <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white not-italic text-sm">S</div>
          Store
        </div>
        <div className="flex items-center gap-6 text-xs font-bold">
          <button className="text-primary border-b-2 border-primary pb-0.5">New Arrivals</button>
          <button className="text-muted hover:text-tx">Collections</button>
          <button className="text-muted hover:text-tx">Sales</button>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <MagnifyingGlass size={20} />
          <div className="relative">
             <Briefcase size={20} />
             <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[8px] text-white flex items-center justify-center font-bold">2</span>
          </div>
        </div>
      </nav>
      
      <div className="p-4 md:p-8 space-y-8 md:space-y-12">
        <div className="relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-tx/40 flex flex-col justify-center p-6 md:p-12 text-surface">
            <Badge className="w-fit mb-2 md:mb-4 bg-primary text-white border-none">Limited Edition</Badge>
            <h3 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">Style Meets Comfort.</h3>
            <p className="text-xs opacity-80 max-w-sm mb-4 md:mb-6">Experience the new summer collection designed for urban explorers.</p>
            <Button size="sm" className="w-fit">Shop Collection</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Minimalist Chair', price: '$240.00', tag: 'Hot', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80' },
            { name: 'Ceramic Vase', price: '$45.00', img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80' },
            { name: 'Wall Clock', price: '$120.00', img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80' },
            { name: 'Wool Rug', price: '$350.00', tag: 'Sale', img: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=600&q=80' },
          ].map((item, i) => (
            <div key={i} className="group space-y-3">
              <div className="aspect-[3/4] bg-surface rounded-2xl border border-bordercolor relative overflow-hidden">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" alt={item.name} />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
                {item.tag && <Badge className="absolute top-3 left-3 bg-tx text-surface text-[8px]">{item.tag}</Badge>}
                <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-surface border border-bordercolor shadow-sm flex items-center justify-center text-muted hover:text-primary hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  <Plus weight="bold" />
                </button>
              </div>
              <div>
                <p className="text-xs font-bold">{item.name}</p>
                <p className="text-xs text-muted font-mono">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SaaSLandingTemplate = () => (
    <div className="w-full min-h-[600px] border border-bordercolor rounded-2xl overflow-hidden bg-bg shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-500">
      <div className="px-6 md:px-12 py-10 md:py-16 flex flex-col items-center text-center space-y-6">
        <Badge variant="outline" className="border-primary/20 text-primary">Trusted by 2,000+ Teams</Badge>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter max-w-2xl leading-[1.1]">
          The OS for <span className="text-primary underline decoration-primary/30 underline-offset-8">Modern Teams.</span>
        </h2>
        <p className="text-sm md:text-lg text-muted max-w-xl">
          Streamline your workflow, manage your assets, and collaborate in real-time with one simple platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
           <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 shadow-xl shadow-primary/20 w-full sm:w-auto">Start Free Trial</Button>
           <Button variant="outline" size="lg" className="h-12 md:h-14 px-6 md:px-8 w-full sm:w-auto">Schedule Demo</Button>
        </div>
      </div>

      <div className="px-6 md:px-12 pb-12 md:pb-20">
         <div className="bg-surface rounded-3xl border border-bordercolor p-1 shadow-lg md:shadow-2xl relative">
            <div className="h-[200px] md:h-[300px] bg-bg rounded-[calc(var(--radius-theme)+8px)] border border-bordercolor/50 flex flex-col">
               <div className="h-10 border-b border-bordercolor flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-danger/50"></div>
                  <div className="w-2 h-2 rounded-full bg-warning/50"></div>
                  <div className="w-2 h-2 rounded-full bg-success/50"></div>
               </div>
               <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="hidden md:block col-span-1 space-y-4">
                     <div className="h-6 w-full bg-primary/10 rounded-lg"></div>
                     <div className="h-2 w-1/2 bg-muted/20 rounded-full"></div>
                     <div className="h-2 w-3/4 bg-muted/20 rounded-full"></div>
                  </div>
                  <div className="col-span-1 md:col-span-3 bg-primary/5 rounded-2xl border border-primary/10 border-dashed flex items-center justify-center">
                     <p className="text-[10px] md:text-xs text-primary/40 font-bold uppercase tracking-widest italic">Interface Preview</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const PortfolioTemplate = () => (
    <div className="w-full min-h-[600px] border border-bordercolor rounded-2xl overflow-hidden bg-bg shadow-2xl flex flex-col animate-in fade-in duration-700">
      <header className="px-6 md:px-12 py-4 md:py-0 md:h-24 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <span className="font-bold tracking-tighter text-lg">Alex.Designer</span>
        <div className="flex items-center gap-6 md:gap-8 text-xs font-bold uppercase tracking-widest text-muted">
          <button className="text-tx border-b border-tx pb-1">Work</button>
          <button className="hover:text-tx transition-colors">About</button>
          <button className="hover:text-tx transition-colors">Contact</button>
        </div>
      </header>
      
      <main className="px-6 md:px-12 py-8 md:py-12 flex-1">
        <div className="max-w-3xl mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
            I craft <span className="italic text-primary">digital experiences</span> that people love.
          </h1>
          <p className="text-muted text-sm md:text-lg leading-relaxed max-w-xl">
            Currently designing future systems at <span className="text-tx font-bold underline decoration-primary underline-offset-4">CreativeLab.</span> Based in San Francisco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {[
            { category: 'Mobile App', name: 'Zentask Management', img: 'https://images.unsplash.com/photo-1551288049-bbbda536ad37?auto=format&fit=crop&w=800&q=80' },
            { category: 'Brand Identity', name: 'Flux Energy', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&w=800&q=80' },
            { category: 'Interaction', name: 'Motion System v2', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' },
            { category: 'Product Design', name: 'Echo Speaker', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
          ].map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-surface rounded-2xl border border-bordercolor overflow-hidden relative mb-4">
                <img src={project.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={project.name} />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-tx text-surface flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                    <CaretRight weight="bold" size={24} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{project.category}</p>
              <h4 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">{project.name}</h4>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-6 md:px-12 py-8 md:py-12 border-t border-bordercolor/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-[10px] text-muted font-bold uppercase tracking-widest">© 2024 Alex Johnson</p>
        <div className="flex gap-6">
          {['LinkedIn', 'Dribbble', 'Twitter'].map(link => (
            <button key={link} className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">{link}</button>
          ))}
        </div>
      </footer>
    </div>
  );

  return (
    <div className="space-y-12">
      <TemplateHeader />
      
      <div className="relative">
        {activeTemplate === 'dashboard' && <DashboardTemplate />}
        {activeTemplate === 'landing' && <LandingTemplate />}
        {activeTemplate === 'ecommerce' && <EcommerceTemplate />}
        {activeTemplate === 'saas' && <SaaSLandingTemplate />}
        {activeTemplate === 'portfolio' && <PortfolioTemplate />}
        {activeTemplate === 'mobile' && <MobileTemplate />}
      </div>

      <Card className="p-8 border-dashed border-2 border-bordercolor bg-transparent text-center">
        <p className="text-sm text-muted font-medium">
          All templates above are using your <span className="text-primary font-bold">Design System tokens</span> automatically.<br/>
          Switch between them to see how your colors and typography adapt to different industry contexts.
        </p>
      </Card>
    </div>
  );
};
