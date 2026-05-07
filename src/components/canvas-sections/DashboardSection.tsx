import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users, RocketLaunch } from '@phosphor-icons/react';

export const DashboardSection: React.FC = () => {
  return (
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
  );
};
