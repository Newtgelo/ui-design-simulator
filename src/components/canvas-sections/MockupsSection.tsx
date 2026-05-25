import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Lightning, Barbell, Fire, Timer, Trophy, Calendar, CaretRight, DotsThreeVertical, PaperPlaneRight, CheckCircle, Clock } from '@phosphor-icons/react';

export const MockupsSection: React.FC = () => {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        {/* Stats & Mini Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="flex flex-col items-center p-6 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
               <Lightning size={20} />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Workout done</p>
            <p className="text-2xl font-bold">567</p>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
               <Barbell size={20} />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Max added weight</p>
            <p className="text-2xl font-bold">85 <span className="text-sm font-normal text-muted">kg</span></p>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
               <Fire size={20} />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Calories Burnt</p>
            <p className="text-2xl font-bold">12.4k</p>
          </Card>
          <Card className="flex flex-col items-center p-6 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
               <Timer size={20} />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Total Hours</p>
            <p className="text-2xl font-bold">142</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Highlight Card */}
          <div className="relative bg-primary rounded-[var(--radius-theme)] p-8 text-[var(--color-primary-foreground)] shadow-xl overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-6">
              <Badge variant="outline" className="bg-white/20 border-white/30 text-[var(--color-primary-foreground)]">Top 5 This Month</Badge>
              <div>
                <h4 className="text-3xl font-bold leading-tight">Keep it up!</h4>
                <p className="text-white/80 mt-2">2 weeks of non-stop training. You're doing great!</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" className="bg-white text-primary border-none hover:bg-white/90">View My Stats</Button>
                <span className="font-bold text-sm underline cursor-pointer">Details</span>
              </div>
            </div>
            <div className="absolute top-8 right-8 opacity-20">
               <Trophy size={96} />
            </div>
          </div>

          {/* Leaderboard List Card */}
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-bordercolor flex justify-between items-center">
              <h4 className="font-bold">Leaderboard</h4>
              <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full uppercase tracking-tighter">View All</span>
            </div>
            <div className="divide-y divide-bordercolor">
              {[
                { name: 'Arnold', workouts: '5.2', rank: 1, avatar: 'A' },
                { name: 'Derek', workouts: '5.1', rank: 2, avatar: 'D' },
                { name: 'Evelin', workouts: '3.7', rank: 3, avatar: 'E' },
                { name: 'John', workouts: '4.3', rank: 4, avatar: 'J' },
              ].map((user, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-bg/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-muted">{user.workouts} workouts/week</p>
                    </div>
                  </div>
                  <Badge variant={user.rank <= 2 ? 'success' : 'outline'}>{user.rank <= 2 ? '🔥 Streak' : 'Active'}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Detail Card */}
          <Card className="space-y-6">
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-bold text-2xl">Dumbbell Press</h4>
                 <p className="text-xs text-muted mt-1 flex items-center gap-1">
                   <Calendar size={14} /> 10 May 2024 - 17 May 2024
                 </p>
               </div>
               <Badge variant="success">Active</Badge>
             </div>
             <div className="bg-bg rounded-[var(--radius-theme)] p-4 flex items-center gap-4 border border-bordercolor theme-transition">
               <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center text-primary text-2xl border border-bordercolor shadow-sm">
                  <Barbell size={32} />
               </div>
               <div>
                  <p className="font-bold">Dumbbell Press</p>
                  <p className="text-xs text-muted">10 reps x 3 sets</p>
                  <Badge variant="primary" className="mt-1 h-5 text-[9px]">Max Weight</Badge>
               </div>
             </div>
             <Button className="w-full">Finish Workout</Button>
          </Card>

          {/* User Profile Card */}
          <Card className="flex flex-col items-center text-center p-8 space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
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

          {/* Product Card */}
          <div className="group bg-surface rounded-[var(--radius-theme)] border border-bordercolor overflow-hidden shadow-[var(--shadow-theme)] theme-transition hover:translate-y-[-4px] transition-all duration-300">
            <div className="aspect-square bg-bg overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
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

          {/* Vertical Exercise Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex gap-6 p-4 items-center group cursor-pointer hover:border-primary transition-colors">
              <div className="w-32 h-32 rounded-xl bg-bg overflow-hidden flex-shrink-0 border border-bordercolor group-hover:scale-95 transition-transform duration-500">
                 <img 
                   src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400" 
                   alt="Exercise" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="flex-1 space-y-2">
                 <Badge variant="primary" className="h-5 text-[9px]">Beginner</Badge>
                 <h4 className="font-bold text-xl">L-Sit Pumps</h4>
                 <p className="text-xs text-muted">Core, Triceps, Balance Training</p>
                 <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">12 mins</span>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">150 cal</span>
                 </div>
              </div>
              <i className="ph ph-caret-right text-muted group-hover:text-primary transition-colors"></i>
            </Card>

            <Card className="flex gap-6 p-4 items-center group cursor-pointer hover:border-primary transition-colors">
              <div className="w-32 h-32 rounded-xl bg-bg overflow-hidden flex-shrink-0 border border-bordercolor group-hover:scale-95 transition-transform duration-500">
                 <img 
                   src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400" 
                   alt="Exercise" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="flex-1 space-y-2">
                 <Badge variant="warning" className="h-5 text-[9px]">Advanced</Badge>
                 <h4 className="font-bold text-xl">Push-ups Pro</h4>
                 <p className="text-xs text-muted">Chest, Arms, Upper Body strength</p>
                 <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">20 mins</span>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">300 cal</span>
                 </div>
              </div>
              <i className="ph ph-caret-right text-muted group-hover:text-primary transition-colors"></i>
            </Card>
          </div>
        </div>

        {/* New Mockup Variety Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-bordercolor theme-transition">
          {/* Messaging Interface */}
          <Card className="p-0 flex flex-col h-[400px]">
            <div className="p-4 border-b border-bordercolor flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">JD</div>
                <div>
                  <h4 className="text-sm font-bold">John Doe</h4>
                  <p className="text-[10px] text-success font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span> Online
                  </p>
                </div>
              </div>
              <DotsThreeVertical size={20} className="text-muted" />
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-bg/30 theme-transition">
              <div className="flex flex-col items-start gap-1">
                <div className="bg-surface border border-bordercolor p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm theme-transition">
                  <p className="text-sm">Hey, have you checked the new design system simulator? it's awesome!</p>
                </div>
                <span className="text-[10px] text-muted ml-1">09:41 AM</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="bg-primary text-[var(--color-primary-foreground)] p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-md theme-transition">
                  <p className="text-sm">Yes! The mockup variety is exactly what we needed for the presentation.</p>
                </div>
                <span className="text-[10px] text-muted mr-1">09:42 AM</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="bg-surface border border-bordercolor p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm theme-transition">
                  <p className="text-sm text-muted italic">Typing...</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-bordercolor bg-surface theme-transition flex gap-2">
              <div className="flex-1 bg-bg border border-bordercolor rounded-full px-4 py-2 text-xs text-muted theme-transition flex items-center">
                Type a message...
              </div>
              <Button size="icon" className="rounded-full w-10 h-10">
                <PaperPlaneRight size={18} weight="fill" />
              </Button>
            </div>
          </Card>

          {/* Pricing & Task Mockups Column */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <Card className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="primary" className="shadow-lg">Popular</Badge>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold">Pro Developer Plan</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">$49</span>
                  <span className="text-muted">/month</span>
                </div>
                <p className="text-sm text-muted">Unlock advanced capabilities and premium assets.</p>
                <div className="space-y-2 py-4">
                  {[
                    'Unlimited design systems',
                    'Advanced color fixer',
                    'Custom chart animations',
                    'Priority export support'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={18} className="text-success" weight="fill" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full h-12 text-md font-bold">Get Started Now</Button>
              </div>
            </Card>

            {/* Task Management Item */}
            <Card className="border-l-4 border-l-secondary">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="pt-1">
                    <div className="w-6 h-6 rounded-full border-2 border-secondary flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full bg-secondary opacity-20"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold">Finalize UI Brand Guidelines</h4>
                    <p className="text-xs text-muted">Update all primary tokens to match the new HSL palette for accessibility.</p>
                    <div className="flex items-center gap-4 pt-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted uppercase">
                        <Clock size={14} /> Today, 5:00 PM
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-bg flex items-center justify-center text-[10px] font-bold theme-transition">
                            {i === 1 ? 'JD' : 'ER'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-secondary border-secondary/30">High Priority</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
